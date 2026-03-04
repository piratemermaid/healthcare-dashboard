import os
from sqlalchemy import text, create_engine
from sqlalchemy.orm import sessionmaker

from app.db.models import Base

DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql://postgres:postgres@localhost:5432/healthcare",
)

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def _run_migrations():
    """Add new columns to patients table if they don't exist (for existing DBs)."""
    columns = [
        ("blood_type", "VARCHAR(10)"),
        ("allergies", "JSONB DEFAULT '[]'::jsonb"),
        ("conditions", "JSONB DEFAULT '[]'::jsonb"),
    ]
    with engine.connect() as conn:
        for col_name, col_type in columns:
            try:
                conn.execute(
                    text(
                        f"ALTER TABLE patients ADD COLUMN IF NOT EXISTS {col_name} {col_type}"
                    )
                )
                conn.commit()
            except Exception:
                conn.rollback()


def init_db():
    Base.metadata.create_all(bind=engine)
    _run_migrations()
