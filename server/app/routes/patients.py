from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import func
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.db.models import Patient
from app.schemas.patient import (
    PatientCreate,
    PatientListResponse,
    PatientResponse,
    PatientUpdate,
)

router = APIRouter(prefix="/patients", tags=["patients"])


@router.get("", response_model=PatientListResponse)
def list_patients(
    db: Session = Depends(get_db),
    page: int = Query(1, ge=1),
    page_size: int = Query(15, ge=1, le=100),
):
    offset = (page - 1) * page_size
    total = db.query(func.count(Patient.id)).scalar()
    items = db.query(Patient).order_by(Patient.id).offset(offset).limit(page_size).all()
    return PatientListResponse(items=items, total=total)


@router.get("/{id}", response_model=PatientResponse)
def get_patient(
    id: int,
    db: Session = Depends(get_db),
):
    patient = db.query(Patient).filter(Patient.id == id).first()
    if patient is None:
        raise HTTPException(status_code=404, detail="Patient not found")
    return patient


@router.post("")
def create_patient(
    patient: PatientCreate,
    db: Session = Depends(get_db),
):
    db_patient = Patient(**patient.model_dump())
    db.add(db_patient)
    db.commit()


@router.put("/{id}")
def update_patient(
    id: int,
    patient: PatientUpdate,
    db: Session = Depends(get_db),
):
    db_patient = db.query(Patient).filter(Patient.id == id).first()
    if db_patient is None:
        raise HTTPException(status_code=404, detail="Patient not found")
    for field, value in patient.model_dump(exclude_unset=True).items():
        setattr(db_patient, field, value)
    db.commit()


@router.delete("/{id}")
def delete_patient(
    id: int,
    db: Session = Depends(get_db),
):
    db_patient = db.query(Patient).filter(Patient.id == id).first()
    if db_patient is None:
        raise HTTPException(status_code=404, detail="Patient not found")
    db.delete(db_patient)
    db.commit()