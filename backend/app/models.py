import json
from datetime import datetime, timezone
from sqlalchemy import Column, Integer, String, Text, DateTime
from app.database import Base


class Report(Base):
    __tablename__ = "reports"

    id = Column(Integer, primary_key=True, index=True)
    template_id = Column(String(50), nullable=False, index=True)
    template_name = Column(String(100), nullable=False)
    patient_id = Column(String(50), nullable=True)
    form_values = Column(Text, nullable=False)  # JSON string
    generated_text = Column(Text, nullable=False)
    conclusion = Column(Text, nullable=True)
    notes = Column(Text, nullable=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    def get_form_values(self) -> dict:
        return json.loads(self.form_values) if self.form_values else {}

    def set_form_values(self, values: dict):
        self.form_values = json.dumps(values, ensure_ascii=False)
