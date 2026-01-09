from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List
from . import models, schemas, database

# Create tables
models.Base.metadata.create_all(bind=database.engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Allow all origins for dev/demo purposes
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency
def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def read_root():
    return {"message": "Welcome to Rootine API"}

# --- Users ---
@app.post("/users", response_model=schemas.UserResponse)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    print(f"DEBUG: Received create_user request for {user.id}")
    db_user = db.query(models.User).filter(models.User.id == user.id).first()
    if db_user:
        print(f"DEBUG: User {user.id} already exists")
        return db_user # Idempotent for now
    
    print(f"DEBUG: Creating new user {user.id}")
    db_user = models.User(
        id=user.id,
        username=user.username,
        dino_id=user.dino_id,
        onboarding_complete=user.onboarding_complete
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    print(f"DEBUG: User {user.id} created successfully")
    return db_user

@app.get("/users/{user_id}", response_model=schemas.UserResponse)
def read_user(user_id: str, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.id == user_id).first()
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

@app.put("/users/{user_id}", response_model=schemas.UserResponse)
def update_user(user_id: str, user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.id == user_id).first()
    if db_user is None:
        # Create if not exists (upsert-ish)
        return create_user(user, db)
    
    db_user.username = user.username
    db_user.dino_id = user.dino_id
    db_user.onboarding_complete = user.onboarding_complete
    db.commit()
    db.refresh(db_user)
    return db_user

# --- Journal ---
@app.get("/journal/{user_id}", response_model=List[schemas.JournalEntryResponse])
def get_journal_entries(user_id: str, db: Session = Depends(get_db)):
    return db.query(models.JournalEntry).filter(models.JournalEntry.user_id == user_id).all()

@app.post("/journal/{user_id}", response_model=schemas.JournalEntryResponse)
def create_journal_entry(user_id: str, entry: schemas.JournalEntryCreate, db: Session = Depends(get_db)):
    db_entry = models.JournalEntry(**entry.dict(), user_id=user_id)
    db.add(db_entry)
    db.commit()
    db.refresh(db_entry)
    return db_entry

# --- Moods ---
@app.get("/moods/{user_id}", response_model=List[schemas.MoodEntryResponse])
def get_mood_entries(user_id: str, db: Session = Depends(get_db)):
    return db.query(models.MoodEntry).filter(models.MoodEntry.user_id == user_id).all()

@app.post("/moods/{user_id}", response_model=schemas.MoodEntryResponse)
def create_mood_entry(user_id: str, entry: schemas.MoodEntryCreate, db: Session = Depends(get_db)):
    # Simple validation using Pydantic, but we can check if user exists
    db_entry = models.MoodEntry(**entry.dict(), user_id=user_id)
    db.add(db_entry)
    db.commit()
    db.refresh(db_entry)
    return db_entry
