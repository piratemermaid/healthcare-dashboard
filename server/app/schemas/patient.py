from datetime import date, datetime

from pydantic import BaseModel, computed_field


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

    @computed_field
    @property
    def age(self) -> int:
        today = date.today()
        age = today.year - self.date_of_birth.year
        if (today.month, today.day) < (
            self.date_of_birth.month,
            self.date_of_birth.day,
        ):
            age -= 1
        return age

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


class PatientSummaryResponse(BaseModel):
    identifiers: dict  # name, age, blood_type (when available)
    clinical: dict  # conditions, allergies (when available)
    narrative: str