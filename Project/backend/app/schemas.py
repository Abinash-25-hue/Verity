from pydantic import BaseModel

class FactCheckRequest(BaseModel):
    claim: str
    
class RequestCreate(BaseModel):
    employee_name: str
    request_type: str
    amount: float
    purpose: str
    
class DecisionRequest(BaseModel):
    request_id: str