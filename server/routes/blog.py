from fastapi import APIRouter, Depends, HTTPException, status
from typing import List, Optional
from bson import ObjectId
from datetime import datetime
import re

from db.mongo import get_database
from models import Article, ArticleCreate, ArticleUpdate
from utils.auth import get_current_admin

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
    slug_normalized = sanitize_slug(slug)
    article = await db.articles.find_one({"slug": slug_normalized})
    
    if not article:
        article = await db.articles.find_one({"slug": slug.strip()})
        
    if not article:
        raise HTTPException(status_code=404, detail="Article not found")
    article["_id"] = str(article["_id"])
    return article

@router.post("/create", response_model=Article)
async def create_article(article_in: ArticleCreate, current_admin: dict = Depends(get_current_admin)):
    db = get_database()
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

@router.delete("/delete/{id}")
async def delete_article(id: str, current_admin: dict = Depends(get_current_admin)):
    db = get_database()
    if not ObjectId.is_valid(id):
        raise HTTPException(status_code=400, detail="Invalid Article ID")
        
    result = await db.articles.delete_one({"_id": ObjectId(id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Article not found")
        
    return {"message": "Article deleted successfully"}


