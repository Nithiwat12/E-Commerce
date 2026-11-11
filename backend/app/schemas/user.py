from pydantic import BaseModel
from typing import Literal


class UserRegister(BaseModel):
    username: str 
    password: str 
    category: Literal["customer", "seller"] = "customer"


class UserResponse(BaseModel):
    id: int
    username: str
    category: str

    model_config = {"from_attributes": True}


class UserLogin(BaseModel):
    username: str 
    password: str 
