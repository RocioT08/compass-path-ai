from app.database import Base, engine
from app.schemas.profile import DBProfile
from sqlalchemy.orm import sessionmaker

# Cambia la dirección del motor de la base de datos a localhost
engine.url = engine.url.set(host='localhost')

def create_tables():
    """
    Crea todas las tablas definidas en los modelos de SQLAlchemy.
    """
    Base.metadata.create_all(bind=engine)

if __name__ == "__main__":
    create_tables()
    print("¡Tablas de la base de datos creadas!")