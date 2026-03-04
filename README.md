# Healthcare Dashboard

A patient management dashboard with a React (Vite) frontend and FastAPI backend.

## Structure

```
├── client/          # React (Vite + TypeScript) frontend
├── server/          # FastAPI (Python) backend
├── docs/            # Requirements and notes
├── docker-compose.yml
└── .env.example
```

## Prerequisites

- **Node.js** 18+ (for frontend)
- **Python** 3.12+ (for backend)
- **PostgreSQL** 16 (or use Docker)

## Quick Start (Docker)

1. **Start the backend and database:**
   ```bash
   docker-compose up -d
   ```
   This starts the API at http://localhost:8000 and PostgreSQL on port 5432.

2. **Set up and run the frontend:**
   ```bash
   cd client
   cp ../.env.example .env
   npm install
   npm run dev
   ```
   The app will be at http://localhost:5173.

## Local Development (without Docker)

1. **Start PostgreSQL** and create the database:
   ```bash
   createdb healthcare
   # Or via psql: CREATE DATABASE healthcare;
   ```
   Use credentials: user `postgres`, password `postgres` (or set `DATABASE_URL` accordingly).

2. **Backend:**
   ```bash
   cd server
   python -m venv venv
   source venv/bin/activate   # Windows: venv\Scripts\activate
   pip install -r requirements.txt
   uvicorn app.main:app --reload --port 8000
   ```

3. **Frontend** (in a new terminal):
   ```bash
   cd client
   cp ../.env.example .env
   npm install
   npm run dev
   ```

## Environment Variables

Copy `.env.example` to `.env` in the `client` directory. The frontend needs:

| Variable       | Description                    | Default              |
|----------------|--------------------------------|----------------------|
| `VITE_API_URL` | Backend API base URL           | `http://localhost:8000` |

For local backend (no Docker), optionally set `DATABASE_URL` in the server environment (default: `postgresql://postgres:postgres@localhost:5432/healthcare`).

## API

- Health check: `GET http://localhost:8000/health`
- Patients: `GET http://localhost:8000/patients`
