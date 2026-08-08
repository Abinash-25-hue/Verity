from fastapi import APIRouter
from app.db import supabase

router = APIRouter()

@router.get("/api/brief/{request_id}")
def generate_brief(request_id: str):

    request_data = (
        supabase
        .table("requests")
        .select("*")
        .eq("id", request_id)
        .execute()
    )

    if not request_data.data:
        return {"error": "Request not found"}

    request = request_data.data[0]

    return {
        "request_id": request_id,
        "summary": f"{request['employee_name']} requested ₹{request['amount']} for {request['request_type']}",
        "risks": "No risks identified",
        "policy_context": "Policy check pending",
        "recommendation": "Approve"
    }