from datetime import date

from app.schemas.patient import PatientSummaryResponse


def _calculate_age(date_of_birth: date) -> int:
    today = date.today()
    age = today.year - date_of_birth.year
    if (today.month, today.day) < (date_of_birth.month, date_of_birth.day):
        age -= 1
    return age


def build_patient_summary(
    first_name: str,
    last_name: str,
    date_of_birth: date,
    status: str,
    notes: list[tuple[str, str]],  # (content, created_at_str)
) -> PatientSummaryResponse:
    name = f"{first_name} {last_name}"
    age = _calculate_age(date_of_birth)

    identifiers = {
        "name": name,
        "age": age,
        "blood_type": None,  # placeholder for future schema
    }

    clinical = {
        "conditions": [],  # placeholder for future schema
        "allergies": [],  # placeholder for future schema
        "status": status,
    }

    narrative_parts = [f"[{dt}] {content}" for content, dt in notes]
    narrative = " ".join(narrative_parts) if narrative_parts else "No notes on file."


    return PatientSummaryResponse(
        identifiers=identifiers,
        narrative=narrative,
        clinical=clinical,
    )
