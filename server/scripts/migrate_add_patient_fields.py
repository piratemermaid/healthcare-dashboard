"""
One-time migration to add new columns to the patients table.
Run this if you have an existing database before the schema change.

Usage: python -m scripts.migrate_add_patient_fields

Or with Docker: docker exec -it <container> python -m scripts.migrate_add_patient_fields
"""
import os
import sys

# Add parent to path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from sqlalchemy import text
from app.db.database import engine


def migrate():
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
                print(f"Added column: {col_name}")
            except Exception as e:
                conn.rollback()
                print(f"Column {col_name}: {e}")
        print("Migration complete.")


if __name__ == "__main__":
    migrate()
