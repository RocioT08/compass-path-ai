from pydantic import BaseModel
from sqlalchemy import Column, Integer, String
from ..database import Base

# Modelo de Pydantic para validar los datos que recibes.
class Profile(BaseModel):
    age: int
    gender: str
    education: str
    field: str
    experience: str
    yearsInCountry: int
    languageLevel: str
    currentlySatisfaction: str
    barriers: str
    goals: str
    expectedTimeline: str 

# Modelo de SQLAlchemy para la tabla de tu base de datos.
class DBProfile(Base):
    __tablename__ = "profile"
    id = Column(Integer, primary_key=True, index=True)
    age = Column(Integer)
    gender = Column(String)
    education = Column(String)
    field = Column(String)
    experience = Column(String)
    yearsInCountry = Column(Integer)
    languageLevel = Column(String)
    currentlySatisfaction = Column(String)
    barriers = Column(String)
    goals = Column(String)
    expectedTimeline = Column(String)