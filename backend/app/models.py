from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, Text, DateTime, JSON
from sqlalchemy.orm import relationship
from .database import Base
from datetime import datetime

class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, index=True) # Clerk ID
    username = Column(String, unique=True, index=True)
    dino_id = Column(String, nullable=True)
    onboarding_complete = Column(Boolean, default=False)
    
    # Relationships
    journal_entries = relationship("JournalEntry", back_populates="user")
    mood_entries = relationship("MoodEntry", back_populates="user")


class JournalEntry(Base):
    __tablename__ = "journal_entries"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String, ForeignKey("users.id"))
    title = Column(String)
    content = Column(Text)
    date = Column(String) # Storing as string for simplicity to match frontend "Oct 24", or use Date type. Let's use Date type ideally but frontend sends string.
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="journal_entries")


class MoodEntry(Base):
    __tablename__ = "mood_entries"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String, ForeignKey("users.id"))
    rating = Column(Integer)
    mood_tags = Column(JSON) # Changed from ARRAY to JSON for SQLite compatibility
    note = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="mood_entries")

# Dino config is static in frontend code, but we can store it here if we want dynamic updates. 
# For now, we will just store the user's *choice* (dino_id) in the User model.
