from backend.app import database, models
from sqlalchemy.orm import Session

db = database.SessionLocal()
users = db.query(models.User).all()

print(f"Total Users: {len(users)}")
for u in users:
    print(f"User: {u.id}, Dino: {u.dino_id}, Onboarding: {u.onboarding_complete}")

db.close()
