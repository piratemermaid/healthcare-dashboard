from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import func
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.db.models import Patient, PatientNote as PatientNoteModel
from app.schemas.patient import (
    PatientCreate,
    PatientListResponse,
    PatientNote,
    PatientNoteCreate,
    PatientNoteListResponse,
    PatientResponse,
    PatientSummaryResponse,
    PatientUpdate,
)
from app.services.summary import build_patient_summary

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


@router.get("/{id}/summary", response_model=PatientSummaryResponse)
def get_patient_summary(
    id: int,
    db: Session = Depends(get_db),
):
    patient = db.query(Patient).filter(Patient.id == id).first()
    if patient is None:
        raise HTTPException(status_code=404, detail="Patient not found")
    notes = (
        db.query(PatientNoteModel)
        .filter(PatientNoteModel.patient_id == id)
        .order_by(PatientNoteModel.created_at)
        .all()
    )
    note_tuples = [
        (n.content, n.created_at.strftime("%Y-%m-%d %H:%M"))
        for n in notes
    ]
    return build_patient_summary(
        first_name=patient.first_name,
        last_name=patient.last_name,
        date_of_birth=patient.date_of_birth,
        status=patient.status,
        notes=note_tuples,
    )


@router.get("/{id}", response_model=PatientResponse)
def get_patient(
    id: int,
    db: Session = Depends(get_db),
):
    patient = db.query(Patient).filter(Patient.id == id).first()
    if patient is None:
        raise HTTPException(status_code=404, detail="Patient not found")
    
    return patient


@router.post("", response_model=PatientResponse, status_code=201)
def create_patient(
    patient: PatientCreate,
    db: Session = Depends(get_db),
):
    db_patient = Patient(**patient.model_dump())
    db.add(db_patient)
    db.commit()
    db.refresh(db_patient)
    return db_patient



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

@router.get("/{id}/notes", response_model=PatientNoteListResponse)
def get_patient_notes(
    id: int,
    db: Session = Depends(get_db),
):
    patient = db.query(Patient).filter(Patient.id == id).first()
    if patient is None:
        raise HTTPException(status_code=404, detail="Patient not found")
    
    items = db.query(PatientNoteModel).filter(PatientNoteModel.patient_id == id).all()
    return PatientNoteListResponse(items=items)


@router.post("/{id}/notes", response_model=PatientNote, status_code=201)
def create_patient_note(
    id: int,
    note: PatientNoteCreate,
    db: Session = Depends(get_db),
):
    patient = db.query(Patient).filter(Patient.id == id).first()
    if patient is None:
        raise HTTPException(status_code=404, detail="Patient not found")
    
    db_note = PatientNoteModel(patient_id=id, content=note.content)
    db.add(db_note)
    db.commit()
    db.refresh(db_note)
    return db_note


@router.delete("/{id}/notes/{note_id}", status_code=204)
def delete_patient_note(
    id: int,
    note_id: int,
    db: Session = Depends(get_db),
):
    db_note = (
        db.query(PatientNoteModel)
        .filter(PatientNoteModel.id == note_id, PatientNoteModel.patient_id == id)
        .first()
    )
    if db_note is None:
        raise HTTPException(status_code=404, detail="Note not found")
    
    db.delete(db_note)
    db.commit()