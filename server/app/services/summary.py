from datetime import date, datetime, timedelta

from app.db.models import Patient
from app.schemas.patient import (
    PatientSummaryClinical,
    PatientSummaryIdentifiers,
    PatientSummaryResponse,
)
from app.services.llm import generate_summary_narrative


def _calculate_age(date_of_birth: date) -> int:
    today = date.today()
    age = today.year - date_of_birth.year
    if (today.month, today.day) < (date_of_birth.month, date_of_birth.day):
        age -= 1
    return age


def _build_template_narrative(
    name: str,
    age: int,
    patient: Patient,
    recent_notes: list[str],
) -> str:
    """Fallback template-based narrative when LLM is unavailable."""
    conditions = patient.conditions or []
    allergies = patient.allergies or []

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

    if recent_notes:
        parts.append("Recent updates:")
        parts.extend(recent_notes)
    else:
        parts.append("No recent updates.")

    return " ".join(parts)


def build_patient_summary(
    patient: Patient,
    notes: list[tuple[str, datetime]],  # (content, created_at)
) -> PatientSummaryResponse:
    name = f"{patient.first_name} {patient.last_name}"
    age = _calculate_age(patient.date_of_birth)
    conditions = patient.conditions or []
    allergies = patient.allergies or []

    # Recent notes from past week
    week_ago = datetime.utcnow() - timedelta(days=7)
    recent_notes = [content for content, created_at in notes if created_at >= week_ago]
    recent_notes_text = " ".join(recent_notes) if recent_notes else ""

    # Try LLM first, fallback to template
    patient_context = f"""Name: {name}
Age: {age}
Blood type: {patient.blood_type or 'Not on file'}
Conditions: {', '.join(conditions) if conditions else 'None'}
Allergies: {', '.join(allergies) if allergies else 'None'}
Status: {patient.status}"""

    llm_narrative = generate_summary_narrative(patient_context, recent_notes_text)
    narrative = (
        llm_narrative
        if llm_narrative
        else _build_template_narrative(name, age, patient, recent_notes)
    )

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
