from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from datetime import timedelta
from bson import ObjectId
from datetime import datetime

from db.mongo import get_database
from models import UserCreate, UserResponse, UserInDB
from utils.auth import (
    get_password_hash,
    verify_password,
    create_access_token,
    ACCESS_TOKEN_EXPIRE_MINUTES,
    get_current_user
)
from services.email_service import email_service
from models import ForgotPasswordRequest, VerifyOTPRequest, ResetPasswordRequest

router = APIRouter()

@router.post("/register", response_model=UserResponse)
async def register_user(user: UserCreate):
    db = get_database()
    # Check if user exists
    existing_user = await db.users.find_one({"email": user.email})
    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )
    
    # Hash password
    hashed_password = get_password_hash(user.password)
    
    # Create user dictionary
    user_dict = {
        "email": user.email,
        "password": hashed_password,
        "role": "user",
        "created_at": datetime.utcnow()
    }
    
    # Insert to db
    result = await db.users.insert_one(user_dict)
    user_dict["id"] = str(result.inserted_id)
    
    return user_dict

@router.post("/login")
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    db = get_database()
    user = await db.users.find_one({"email": form_data.username})
    
    if not user or not verify_password(form_data.password, user["password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": str(user["_id"]), "role": user.get("role", "user")},
        expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer", "role": user.get("role", "user")}

@router.get("/me", response_model=UserResponse)
async def read_users_me(current_user: dict = Depends(get_current_user)):
    return current_user

@router.post("/forgot-password")
async def forgot_password(request: ForgotPasswordRequest):
    db = get_database()
    user = await db.users.find_one({"email": request.email})
    if not user:
        # We return success even if user not found for security (prevent email enumeration)
        return {"message": "If an account exists, a verification code has been sent."}
    
    otp = email_service.generate_otp()
    expiry = datetime.utcnow() + timedelta(minutes=10)
    
    await db.otps.update_one(
        {"email": request.email},
        {"$set": {"otp": otp, "expires_at": expiry}},
        upsert=True
    )
    
    email_service.send_otp_email(request.email, otp)
    return {"message": "Verification code sent to your email."}

@router.post("/verify-otp")
async def verify_otp(request: VerifyOTPRequest):
    db = get_database()
    otp_record = await db.otps.find_one({"email": request.email})
    
    if not otp_record or otp_record["otp"] != request.otp:
        raise HTTPException(status_code=400, detail="Invalid verification code.")
    
    if datetime.utcnow() > otp_record["expires_at"]:
        raise HTTPException(status_code=400, detail="Verification code has expired.")
    
    return {"message": "Code verified successfully."}

@router.post("/reset-password")
async def reset_password(request: ResetPasswordRequest):
    db = get_database()
    otp_record = await db.otps.find_one({"email": request.email})
    
    if not otp_record or otp_record["otp"] != request.otp:
        raise HTTPException(status_code=400, detail="Invalid verification code.")
    
    if datetime.utcnow() > otp_record["expires_at"]:
        raise HTTPException(status_code=400, detail="Verification code has expired.")
    
    # Update password
    hashed_password = get_password_hash(request.new_password)
    await db.users.update_one(
        {"email": request.email},
        {"$set": {"password": hashed_password}}
    )
    
    # Delete OTP record after successful reset
    await db.otps.delete_one({"email": request.email})
    
    return {"message": "Password reset successful. You can now login."}
