"""
LLM service for generating patient summaries using Groq.
Falls back gracefully when API key is missing or request fails.
"""
import logging
import os

from groq import Groq

logger = logging.getLogger(__name__)


SYSTEM_PROMPT = """You are a medical assistant. Given patient data and clinical notes, write a concise clinical summary in the style of a doctor's note. In a second paragraph, write a concise care plan based on the patient's issues and progress on addressing them.

Format your response as a single paragraph or short narrative. Include:
- Patient name and age
- Blood type (or "not on file" if unknown)
- Conditions (or "no conditions noted" if none)
- Allergies (or "no known allergies" if none)
- Current status
- Recent updates from notes (no timestamps, just the content) - use the most recent 5 notes

Use plain, professional medical language. Be concise. Do not add information not provided."""


def generate_summary_narrative(
    patient_context: str,
    recent_notes: str,
) -> str | None:
    """
    Call Groq API to generate a doctor-style summary narrative.
    Returns None if API key is missing or request fails.
    """
    api_key = os.environ.get("GROQ_API_KEY")
    if not api_key or not api_key.strip():
        logger.warning("GROQ_API_KEY not set, using template summary")
        return None

    try:
        client = Groq(api_key=api_key)
        user_content = f"""Patient data:
{patient_context}

Recent notes (past week):
{recent_notes if recent_notes else "No recent notes."}"""

        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": user_content},
            ],
            max_tokens=512,
            temperature=0.3,
        )
        content = response.choices[0].message.content
        return content.strip() if content else None
    except Exception as e:
        logger.warning("Groq API failed, using template summary: %s", e)
        return None
