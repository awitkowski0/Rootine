# Rootine

## Local Development

### Prerequisites
- Python 3.9+
- Bun (or Node.js)
- Docker (optional, for local Postgres)

### Backend
The backend is a FastAPI application located in `/backend`.

1. **Install Dependencies**:
   ```bash
   pip install -r backend/requirements.txt
   ```
2. **Run Server**:
   ```bash
   uvicorn backend.app.main:app --reload --port 8000
   ```
   The API will be available at `http://localhost:8000`.
   Docs are at `http://localhost:8000/docs`.

   *Note: By default, it uses a local SQLite database (`sql_app.db`). To use Supabase or Postgres, set `DATABASE_URL` in a `.env` file.*

### Frontend
The frontend is a React/Vite application located in `/frontend`.

1. **Install Dependencies**:
   ```bash
   cd frontend
   bun install
   ```
2. **Run Dev Server**:
   ```bash
   bun run dev
   ```
   The app will typically run at `http://localhost:5173`.

### Environment Variables
**Frontend (`frontend/.env`):**
```
VITE_CLERK_PUBLISHABLE_KEY=...
VITE_API_URL=http://localhost:8000
```

**Backend (`backend/.env`):**
```
DATABASE_URL=postgresql://user:pass@host:port/db # Optional, defaults to SQLite
```
