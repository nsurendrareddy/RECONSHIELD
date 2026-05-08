from fastapi import APIRouter, Depends, HTTPException, status, File, UploadFile
from typing import List, Optional
from bson import ObjectId
from datetime import datetime
import os
import uuid
import shutil

from db.mongo import get_database
from models import Article, ArticleCreate, ArticleUpdate
from utils.auth import get_current_admin

import re
import cloudinary
import cloudinary.uploader
from config import settings

# Helper to ensure Cloudinary is configured
def configure_cloudinary():
    cloudinary.config(
        cloud_name=settings.CLOUDINARY_CLOUD_NAME,
        api_key=settings.CLOUDINARY_API_KEY,
        api_secret=settings.CLOUDINARY_API_SECRET,
        secure=True
    )

router = APIRouter()

def sanitize_slug(slug: str) -> str:
    if not slug: return ""
    # Convert to lowercase, replace spaces and special chars with hyphens
    s = slug.strip().lower()
    s = re.sub(r'[^a-z0-9]+', '-', s)
    s = re.sub(r'-+', '-', s) # Remove duplicate hyphens
    return s.strip('-')

@router.get("/", response_model=List[Article])
async def get_articles():
    db = get_database()
    cursor = db.articles.find().sort("created_at", -1)
    articles = await cursor.to_list(length=100)
    for article in articles:
        article["_id"] = str(article["_id"])
    return articles

@router.get("/{slug}", response_model=Article)
async def get_article(slug: str):
    db = get_database()
    # Normalize slug for lookup
    slug_normalized = sanitize_slug(slug)
    print(f">>> BLOG REQUEST: raw='{slug}', normalized='{slug_normalized}'", flush=True)
    article = await db.articles.find_one({"slug": slug_normalized})
    
    if not article:
        # Fallback for exact match just in case
        article = await db.articles.find_one({"slug": slug.strip()})
        
    if not article:
        raise HTTPException(status_code=404, detail="Article not found")
    article["_id"] = str(article["_id"])
    return article

@router.get("/id/{id}", response_model=Article)
async def get_article_by_id(id: str):
    db = get_database()
    if not ObjectId.is_valid(id):
        raise HTTPException(status_code=400, detail="Invalid Article ID")
    article = await db.articles.find_one({"_id": ObjectId(id)})
    if not article:
        raise HTTPException(status_code=404, detail="Article not found")
    article["_id"] = str(article["_id"])
    return article

@router.post("/create", response_model=Article)
async def create_article(article_in: ArticleCreate, current_admin: dict = Depends(get_current_admin)):
    db = get_database()
    
    # Check for existing slug
    existing = await db.articles.find_one({"slug": article_in.slug})
    if existing:
        raise HTTPException(status_code=400, detail="Slug already exists")
        
    article_dict = article_in.model_dump()
    article_dict["slug"] = sanitize_slug(article_dict["slug"])
    article_dict["author_id"] = current_admin["id"]
    article_dict["created_at"] = datetime.utcnow()
    
    result = await db.articles.insert_one(article_dict)
    article_dict["_id"] = str(result.inserted_id)
    return article_dict

@router.put("/update/{id}", response_model=Article)
async def update_article(id: str, article_in: ArticleUpdate, current_admin: dict = Depends(get_current_admin)):
    db = get_database()
    if not ObjectId.is_valid(id):
        raise HTTPException(status_code=400, detail="Invalid Article ID")
        
    update_data = {k: v for k, v in article_in.model_dump().items() if v is not None}
    
    if "slug" in update_data:
        update_data["slug"] = sanitize_slug(update_data["slug"])
        existing = await db.articles.find_one({"slug": update_data["slug"], "_id": {"$ne": ObjectId(id)}})
        if existing:
            raise HTTPException(status_code=400, detail="Slug already exists")
            
    result = await db.articles.update_one({"_id": ObjectId(id)}, {"$set": update_data})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Article not found")
        
    updated_article = await db.articles.find_one({"_id": ObjectId(id)})
    updated_article["_id"] = str(updated_article["_id"])
    return updated_article

@router.delete("/delete/{id}")
async def delete_article(id: str, current_admin: dict = Depends(get_current_admin)):
    db = get_database()
    if not ObjectId.is_valid(id):
        raise HTTPException(status_code=400, detail="Invalid Article ID")
        
    result = await db.articles.delete_one({"_id": ObjectId(id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Article not found")
        
    return {"message": "Article deleted successfully"}

@router.post("/upload-image")
async def upload_image(file: UploadFile = File(...), current_admin: dict = Depends(get_current_admin)):
    try:
        configure_cloudinary()
        # Upload to Cloudinary
        result = cloudinary.uploader.upload(
            file.file,
            folder="reconshield_blog",
            resource_type="auto"
        )
        
        # Return the secure URL from Cloudinary
        return {"url": result.get("secure_url")}
    except Exception as e:
        print(f"!!! CLOUDINARY UPLOAD ERROR: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to upload to Cloudinary: {str(e)}")

