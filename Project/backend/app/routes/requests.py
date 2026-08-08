from fastapi import APIRouter
from app.schemas import RequestCreate
from app.db import supabase

router = APIRouter()

@router.post("/api/request")
def create_request(data: RequestCreate):

    result = (
        supabase.table("requests")
        .insert(data.model_dump())
        .execute()
    )

    return result.data