from fastapi import FastAPI
from .routers import survey

app = FastAPI()

# Incluye el router de la encuesta para que FastAPI lo use.
app.include_router(survey.router)

@app.get("/")
def read_root():
    return {"message": "API Gateway is running!"}