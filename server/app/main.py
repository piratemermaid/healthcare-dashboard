from contextlib import asynccontextmanager
from fastapi import FastAPI

from app.db.database import get_db, init_db
from app.db.seed import seed_patients
from app.routes import health, patients


@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    db = next(get_db())
    seed_patients(db)
    yield


app = FastAPI(lifespan=lifespan)

app.include_router(health.router)
app.include_router(patients.router)
