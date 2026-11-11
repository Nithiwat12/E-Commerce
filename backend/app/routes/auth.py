from fastapi import APIRouter, Depends, HTTPException,Response
from app.utils.password import hash_password
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.user import User
from app.schemas.user import UserRegister, UserResponse

from app.schemas.user import UserLogin
from app.utils.password import verify_password

from app.utils.token import create_token

from app.utils.dependencies import get_current_user

router = APIRouter(prefix="/api/auth", tags=["Authentication"])


@router.post("/login")
async def login(
    body: UserLogin,
    response: Response,
    db: Session = Depends(get_db)):

    user = db.query(User).filter(
        User.username == body.username
    ).first()

    if not user:
        return {
                    "available": False,
                    "message": "Invalid username or password"
            }
    if not verify_password(body.password, user.password):
        return {
                            "available": False,
                            "message": "Invalid username or password"
                    }

    
    access_token = create_token(
        user_id=user.id,
        role=user.category
    )
    
    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,
        secure=False,  
        samesite="lax",
        max_age=30 * 60,
        path="/"
    )

    return {
        "available": True,
        "message" : "Login Sussessful",
        "user" : {
            "id": user.id,
            "username": user.username,
            "category": user.category
        }
    }


@router.post("/register", response_model=UserResponse)
async def register(
    body: UserRegister,
    db: Session = Depends(get_db)
):
    existing_user = db.query(User).filter(
        User.username == body.username
    ).first()

    if existing_user:
        raise HTTPException(
            status_code=409,
            detail="Username already exists"
        )

    
    hashed_password = hash_password(body.password)

    new_user = User(
        username = body.username,
        password = hashed_password,
        category = body.category
    )

    try:
        db.add(new_user)
        db.commit()
        db.refresh(new_user)

        return new_user

    except Exception:
        db.rollback
        raise HTTPException(
            status_code = 500,
            detail = "Failed to Register"
        )



@router.get("/check-user-existing")
async def check_username(
    username:str,
    db: Session = Depends(get_db)
):

    user = db.query(User).filter(
        User.username == username
    ).first()
    print("Database result:", user)
    if user:
        return {
            "available": False,
            "message": "Username already Exist."
    }
    
    return {
        "available": True,
        "message": "Username is available."
    }


@router.get("/me")
async def get_profile(
    curren_user: User = Depends(get_current_user)
):
    return{
        "id":curren_user.id,
        "username":curren_user.username,
        "catagory":curren_user.category
    }
    
     

        

    
