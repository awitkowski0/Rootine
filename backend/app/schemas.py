from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

# User Schemas
class UserBase(BaseModel):
    username: Optional[str] = None
    dino_id: Optional[str] = None
    onboarding_complete: Optional[bool] = False

class UserCreate(UserBase):
    id: str # We receive ID from Clerk

class UserResponse(UserBase):
    id: str

    class Config:
        orm_mode = True

# Journal Schemas
class JournalEntryBase(BaseModel):
    title: str
    content: str
    date: str

class JournalEntryCreate(JournalEntryBase):
    pass

class JournalEntryResponse(JournalEntryBase):
    id: int
    user_id: str
    created_at: datetime

    class Config:
        orm_mode = True

# Mood Schemas
class MoodEntryBase(BaseModel):
    rating: int
    mood_tags: List[str]
    note: Optional[str] = None

class MoodEntryCreate(MoodEntryBase):
    pass

class MoodEntryResponse(MoodEntryBase):
    id: int
    user_id: str
    created_at: datetime

    class Config:
        orm_mode = True
