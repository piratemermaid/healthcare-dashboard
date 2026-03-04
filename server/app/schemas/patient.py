from datetime import date, datetime

from pydantic import BaseModel, computed_field


class PatientBase(BaseModel):
    first_name: str
    last_name: str
    date_of_birth: date
    last_visit: date | None = None
    status: str = "active"
    blood_type: str | None = None
    allergies: list[str] = []
    conditions: list[str] = []


class PatientCreate(PatientBase):
    pass


class PatientUpdate(BaseModel):
    first_name: str | None = None
    last_name: str | None = None
    date_of_birth: date | None = None
    last_visit: date | None = None
    status: str | None = None
    blood_type: str | None = None
    allergies: list[str] | None = None
    conditions: list[str] | None = None


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


class PatientSummaryIdentifiers(BaseModel):
    name: str
    age: int
    blood_type: str | None


class PatientSummaryClinical(BaseModel):
    conditions: list[str]
    allergies: list[str]
    status: str


class PatientSummaryResponse(BaseModel):
    identifiers: PatientSummaryIdentifiers
    clinical: PatientSummaryClinical
    narrative: str