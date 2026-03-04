from datetime import date, datetime
from sqlalchemy import Column, DateTime, ForeignKey, Integer, String, Date, Text
from sqlalchemy.dialects.postgresql import JSONB

from sqlalchemy.orm import declarative_base, relationship

Base = declarative_base()


class Patient(Base):
    __tablename__ = "patients"

    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String(100), nullable=False)
    last_name = Column(String(100), nullable=False)
    date_of_birth = Column(Date, nullable=False)
    last_visit = Column(Date, nullable=True)
    status = Column(String(50), default="active")
    blood_type = Column(String(10), nullable=True)
    allergies = Column(JSONB, nullable=True, default=list)  # ["allergy1", "allergy2"]
    conditions = Column(JSONB, nullable=True, default=list)  # ["condition1", "condition2"]
    notes = relationship("PatientNote", back_populates="patient")


class PatientNote(Base):
    __tablename__ = "patient_notes"

    id = Column(Integer, primary_key=True, index=True)
    patient_id = Column(Integer, ForeignKey("patients.id"), nullable=False)
    content = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    patient = relationship("Patient", back_populates="notes")
