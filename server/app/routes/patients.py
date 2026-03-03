from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.schemas.patient import PatientCreate, PatientResponse, PatientUpdate

router = APIRouter(prefix="/patients", tags=["patients"])


@router.get("", response_model=list[PatientResponse])
def list_patients(db: Session = Depends(get_db)):
    pass


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
    pass


@router.put("/{id}", response_model=PatientResponse)
def update_patient(
    id: int,
    patient: PatientUpdate,
    db: Session = Depends(get_db),
):
    pass


@router.delete("/{id}", status_code=204)
def delete_patient(
    id: int,
    db: Session = Depends(get_db),
):
    pass
