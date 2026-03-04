from datetime import date, datetime
from pydantic import BaseModel


class PatientBase(BaseModel):
    first_name: str
    last_name: str
    date_of_birth: date
    last_visit: date | None = None
    status: str = "active"


class PatientCreate(PatientBase):
    pass


class PatientUpdate(BaseModel):
    first_name: str | None = None
    last_name: str | None = None
    date_of_birth: date | None = None
    last_visit: date | None = None
    status: str | None = None


class PatientResponse(PatientBase):
    id: int

    class Config:
        from_attributes = True


class PatientListResponse(BaseModel):
    items: list[PatientResponse]
    total: int


class PatientNote(BaseModel):
    id: int
    content: str
    created_at: datetime

    class Config:
        from_attributes = True


class PatientNoteCreate(BaseModel):
    content: str


class PatientNoteListResponse(BaseModel):
    items: list[PatientNote]