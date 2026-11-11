import os
import jwt

from dotenv import load_dotenv
from fastapi import Cookie, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.user import User

load_dotenv()

SECRET_KEY = os.getenv("JWT_SECRET_KEY")
ALGORITHM = os.getenv("JWT_ALGORITHM", "HS256")

def get_current_user(
        access_token:str = Cookie(None),
        db: Session = Depends(get_db)
):
    if not access_token:
        raise HTTPException(
            status_code = 401,
            detail = "Not authenticated"
        )

    try:
        payload = jwt.decode(
            access_token,
            SECRET_KEY,
            algorithms=ALGORITHM
        )
        
        user_id = int[payload["sub"]]

    except (jwt.InvalidAlgorithmError, KeyError, TypeError, ValueError):
        raise HTTPException(
            status_code=401,
            detail="Invalid or expired token"
        )
    
    user = db.query(User).filter(
        User.id == user_id
    ).first()
    
    if not user:
        raise HTTPException(
            status_code=401,
            detail="User not found"
        )

    return user
