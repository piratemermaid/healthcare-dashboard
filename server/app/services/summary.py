from datetime import date

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
    notes: list[tuple[str, str]],  # (content, created_at_str)
) -> PatientSummaryResponse:
    name = f"{patient.first_name} {patient.last_name}"
    age = _calculate_age(patient.date_of_birth)

    identifiers = PatientSummaryIdentifiers(
        name=name,
        age=age,
        blood_type=patient.blood_type,
    )

    clinical = PatientSummaryClinical(
        conditions=patient.conditions or [],
        allergies=patient.allergies or [],
        status=patient.status,
    )

    narrative_parts = [f"[{dt}] {content}" for content, dt in notes]
    narrative = " ".join(narrative_parts) if narrative_parts else "No notes on file."

    return PatientSummaryResponse(
        identifiers=identifiers,
        clinical=clinical,
        narrative=narrative,
    )
