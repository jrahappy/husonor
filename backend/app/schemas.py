from datetime import datetime
from pydantic import BaseModel


class ReportCreate(BaseModel):
    template_id: str
    template_name: str
    patient_id: str | None = None
    form_values: dict
    generated_text: str
    conclusion: str | None = None
    notes: str | None = None


class ReportResponse(BaseModel):
    id: int
    template_id: str
    template_name: str
    patient_id: str | None
    form_values: dict
    generated_text: str
    conclusion: str | None
    notes: str | None
    created_at: datetime

    model_config = {"from_attributes": True}


class ReportListItem(BaseModel):
    id: int
    template_id: str
    template_name: str
    patient_id: str | None
    created_at: datetime

    model_config = {"from_attributes": True}
