import os

import jwt
from dotenv import load_dotenv
from datetime import datetime, timedelta, timezone

load_dotenv()

SECERTE_KEY = os.getenv("JWT_SECRET_KEY")
ALGORITHM = os.getenv("JWT_ALGORITHM", "HS256")

ACCESS_TOKEN_EXPIRE_MINUTES = int(
    os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES","30")
)

if not SECERTE_KEY:
    raise RuntimeError("JWT_SECERTE_KEY is missing")

def create_token(user_id:int, role:str):
    
    expire = datetime.now(timezone.utc) + timedelta(
        minutes = ACCESS_TOKEN_EXPIRE_MINUTES 
    )

    payload = {
        "sub": str(user_id),
        "role": role,
        "exp": expire
    }


    token = jwt.encode(
        payload,
        SECERTE_KEY,
        algorithm = ALGORITHM
    )
    return token