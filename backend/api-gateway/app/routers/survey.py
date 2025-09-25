from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from sqlalchemy import text
from ..database import get_db
from ..schemas.profile import Profile, DBProfile
from typing import Dict, Any
import logging
import traceback

# Configurar logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

router = APIRouter()

@router.post("/submit-survey", response_model=Dict[str, Any])
async def submit_survey(user_profile: Profile, db: Session = Depends(get_db)):
    """
    Guarda los datos del formulario de encuesta en la base de datos.
    """
    logger.info("Iniciando guardado de perfil")
    
    try:
        # Verificar conexión a la base de datos
        db.execute(text("SELECT 1"))
        
        # Crear una instancia del modelo de base de datos
        db_profile = DBProfile(
            age=user_profile.age,
            gender=user_profile.gender,
            education=user_profile.education,
            field=user_profile.field,
            experience=user_profile.experience,
            yearsInCountry=user_profile.yearsInCountry,
            languageLevel=user_profile.languageLevel,
            currentlySatisfaction=user_profile.currentlySatisfaction,
            barriers=user_profile.barriers,
            goals=user_profile.goals,
            expectedTimeline=user_profile.expectedTimeline
        )
        
        # Guardar en la base de datos
        db.add(db_profile)
        db.flush()
        db.commit()
        db.refresh(db_profile)
        
        # Verificar que se guardó correctamente
        saved_profile = db.query(DBProfile).filter(DBProfile.id == db_profile.id).first()
        if not saved_profile:
            raise Exception("Error al verificar el perfil guardado")
        
        logger.info(f"Perfil guardado exitosamente con ID: {db_profile.id}")
        
        return {
            "message": "Survey data saved successfully!",
            "profile_id": db_profile.id,
            "status": "success",
            "data": {
                "id": db_profile.id,
                "age": db_profile.age,
                "gender": db_profile.gender,
                "education": db_profile.education,
                "field": db_profile.field,
                "goals": db_profile.goals
            }
        }
        
    except Exception as e:
        logger.error(f"Error al guardar perfil: {str(e)}")
        logger.error(f"Traceback: {traceback.format_exc()}")
        
        # Rollback en caso de error
        try:
            db.rollback()
        except Exception as rollback_error:
            logger.error(f"Error en rollback: {rollback_error}")
        
        raise HTTPException(
            status_code=500,
            detail=f"Error interno del servidor: {str(e)}"
        )

@router.get("/test-db")
async def test_database(db: Session = Depends(get_db)):
    """
    Endpoint para probar la conexión a la base de datos
    """
    try:
        # Test básico de conexión
        result = db.execute(text("SELECT version()")).fetchone()
        
        # Verificar que la tabla existe
        table_check = db.execute(text("SELECT to_regclass('profile')")).fetchone()
        table_exists = bool(table_check[0])
        
        records_count = 0
        if table_exists:
            count = db.execute(text("SELECT COUNT(*) FROM profile")).fetchone()
            records_count = count[0]
        
        logger.info(f"Test BD exitoso - Tabla existe: {table_exists}, Registros: {records_count}")
        
        return {
            "status": "success",
            "database_version": result[0],
            "table_exists": table_exists,
            "records_count": records_count
        }
        
    except Exception as e:
        logger.error(f"Error en test de BD: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Error en test de BD: {str(e)}"
        )

@router.get("/profile/{profile_id}")
async def get_profile(profile_id: int, db: Session = Depends(get_db)):
    """
    Obtiene un perfil por su ID.
    """
    try:
        profile = db.query(DBProfile).filter(DBProfile.id == profile_id).first()
        
        if not profile:
            raise HTTPException(
                status_code=404,
                detail=f"Perfil con ID {profile_id} no encontrado"
            )
        
        return {
            "id": profile.id,
            "age": profile.age,
            "gender": profile.gender,
            "education": profile.education,
            "field": profile.field,
            "experience": profile.experience,
            "yearsInCountry": profile.yearsInCountry,
            "languageLevel": profile.languageLevel,
            "currentlySatisfaction": profile.currentlySatisfaction,
            "barriers": profile.barriers,
            "goals": profile.goals,
            "expectedTimeline": profile.expectedTimeline
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error al obtener el perfil {profile_id}: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="Error interno del servidor"
        )

@router.get("/profiles")
async def get_all_profiles(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """
    Obtiene todos los perfiles con paginación.
    """
    try:
        profiles = db.query(DBProfile).offset(skip).limit(limit).all()
        total_count = db.query(DBProfile).count()
        
        return {
            "profiles": [
                {
                    "id": profile.id,
                    "age": profile.age,
                    "gender": profile.gender,
                    "education": profile.education,
                    "field": profile.field,
                    "goals": profile.goals
                }
                for profile in profiles
            ],
            "total": total_count,
            "showing": len(profiles),
            "skip": skip,
            "limit": limit
        }
        
    except Exception as e:
        logger.error(f"Error al obtener los perfiles: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="Error interno del servidor"
        )