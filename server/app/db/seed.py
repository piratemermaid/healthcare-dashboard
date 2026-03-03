from datetime import date, timedelta
from random import choice, randint

from sqlalchemy.orm import Session

from app.db.models import Patient

FIRST_NAMES = [
    "James", "Mary", "John", "Patricia", "Robert", "Jennifer", "Michael", "Linda",
    "William", "Elizabeth", "David", "Barbara", "Richard", "Susan", "Joseph", "Jessica",
]
LAST_NAMES = [
    "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis",
    "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas",
]
STATUSES = ["active", "inactive", "pending", "discharged"]


def seed_patients(db: Session, count: int = 20):
    if db.query(Patient).count() > 0:
        return

    base_date = date.today()
    patients = []
    for _ in range(count):
        first = choice(FIRST_NAMES)
        last = choice(LAST_NAMES)
        dob = base_date - timedelta(days=randint(365 * 18, 365 * 85))
        last_visit = base_date - timedelta(days=randint(0, 365)) if randint(0, 4) else None
        patient = Patient(
            first_name=first,
            last_name=last,
            date_of_birth=dob,
            last_visit=last_visit,
            status=choice(STATUSES),
        )
        patients.append(patient)

    db.add_all(patients)
    db.commit()
