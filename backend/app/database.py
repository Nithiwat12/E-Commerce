import os
from dotenv import load_dotenv

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

load_dotenv()

#URL สำหรับเชื่อมต่อ Database
DATABASE_URL = os.getenv("DATABASE_URL")
#Engine สำหรับเชื่อมต่อ PostgreSQL
engine = create_engine(DATABASE_URL)

#Session สำหรับใช้งาน Database
SessionLocal = sessionmaker(
    autocommit = False,
    autoflush = False,
    bind = engine
)

# Base สำหรับสร้าง Model
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
