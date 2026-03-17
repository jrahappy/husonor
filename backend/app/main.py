import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, Base
from app.routers import reports

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="HuSonor API", version="1.0.0")

# CORS
cors_origins = os.getenv(
    "CORS_ORIGINS", "http://localhost:5173,http://localhost:3000"
).split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(reports.router)


@app.get("/api/health")
def health_check():
    return {"status": "ok"}
