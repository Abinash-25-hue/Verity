from fastapi import FastAPI

from app.db import supabase
from app.schemas import FactCheckRequest

from app.routes.requests import router as request_router
from app.routes.briefs import router as brief_router
from app.schemas import DecisionRequest


app = FastAPI(
    title="Verity Backend",
    version="1.0.0"
)


# Register routes
app.include_router(request_router)
app.include_router(brief_router)


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

@app.post("/api/approve")
def approve_request(data: DecisionRequest):

    response = (
        supabase
        .table("requests")
        .update({"status": "approved"})
        .eq("id", data.request_id)
        .execute()
    )

    return response.data

@app.post("/api/reject")
def reject_request(data: DecisionRequest):

    response = (
        supabase
        .table("requests")
        .update({"status": "rejected"})
        .eq("id", data.request_id)
        .execute()
    )

    return response.data