from datetime import date
from sqlalchemy import Column, Integer, String, Date

from sqlalchemy.orm import declarative_base

Base = declarative_base()


class Patient(Base):
    __tablename__ = "patients"

    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String(100), nullable=False)
    last_name = Column(String(100), nullable=False)
    date_of_birth = Column(Date, nullable=False)
    last_visit = Column(Date, nullable=True)
    status = Column(String(50), default="active")
