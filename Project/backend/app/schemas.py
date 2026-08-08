from pydantic import BaseModel

class FactCheckRequest(BaseModel):
    claim: str