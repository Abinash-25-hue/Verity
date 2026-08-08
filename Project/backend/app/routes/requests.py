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

    created_request = result.data[0]

    supabase.table("audit_logs").insert({
        "request_id": created_request["id"],
        "action": "request_created",
        "details": f"Request submitted by {created_request['employee_name']}"
    }).execute()

    return result.data