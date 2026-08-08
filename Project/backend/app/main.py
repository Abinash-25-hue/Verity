from fastapi import FastAPI
from app.db import supabase
from app.schemas import FactCheckRequest

app = FastAPI(
    title="Verity Backend",
    version="1.0.0"
)

@app.get("/")
def root():
    return {"message": "Verity Backend Running"}

@app.get("/health")
def health():
    return {"status": "healthy"}

@app.get("/test-db")
def test_db():
    response = (
        supabase
        .table("fact_checks")
        .select("*")
        .execute()
    )

    return response.data

@app.post("/fact-check")
def fact_check(request: FactCheckRequest):

    response = (
        supabase
        .table("fact_checks")
        .insert({
            "input_text": request.claim
        })
        .execute()
    )

    return response.data