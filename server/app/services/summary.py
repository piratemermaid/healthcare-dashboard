from datetime import date, datetime, timedelta

from app.db.models import Patient
from app.schemas.patient import (
    PatientSummaryClinical,
    PatientSummaryIdentifiers,
    PatientSummaryResponse,
)


def _calculate_age(date_of_birth: date) -> int:
    today = date.today()
    age = today.year - date_of_birth.year
    if (today.month, today.day) < (date_of_birth.month, date_of_birth.day):
        age -= 1
    return age


def build_patient_summary(
    patient: Patient,
    notes: list[tuple[str, datetime]],  # (content, created_at)
) -> PatientSummaryResponse:
    name = f"{patient.first_name} {patient.last_name}"
    age = _calculate_age(patient.date_of_birth)
    conditions = patient.conditions or []
    allergies = patient.allergies or []

    # Build doctor-style narrative
    parts = [f"{name} is {age} years old."]

    if patient.blood_type:
        parts.append(f"Blood type {patient.blood_type}.")
    else:
        parts.append("Blood type not on file.")

    if conditions:
        parts.append(f"Patient has conditions: {', '.join(conditions)}.")
    else:
        parts.append("No conditions noted.")

    if allergies:
        parts.append(f"Patient has allergies to: {', '.join(allergies)}.")
    else:
        parts.append("No known allergies.")

    parts.append(f"Patient is currently {patient.status}.")

    # Recent updates: notes from past week, no timestamps
    week_ago = datetime.utcnow() - timedelta(days=7)
    recent_notes = [content for content, created_at in notes if created_at >= week_ago]
    if recent_notes:
        parts.append("Recent updates:")
        parts.extend(recent_notes)
    else:
        parts.append("No recent updates.")

    narrative = " ".join(parts)

    return PatientSummaryResponse(
        identifiers=PatientSummaryIdentifiers(
            name=name,
            age=age,
            blood_type=patient.blood_type,
        ),
        clinical=PatientSummaryClinical(
            conditions=conditions,
            allergies=allergies,
            status=patient.status,
        ),
        narrative=narrative,
    )
