import json
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Report
from app.schemas import ReportCreate, ReportResponse, ReportListItem

router = APIRouter(prefix="/api/reports", tags=["reports"])


@router.post("", response_model=ReportResponse)
def create_report(data: ReportCreate, db: Session = Depends(get_db)):
    report = Report(
        template_id=data.template_id,
        template_name=data.template_name,
        patient_id=data.patient_id,
        form_values=json.dumps(data.form_values, ensure_ascii=False),
        generated_text=data.generated_text,
        conclusion=data.conclusion,
        notes=data.notes,
    )
    db.add(report)
    db.commit()
    db.refresh(report)
    return _to_response(report)


@router.get("", response_model=list[ReportListItem])
def list_reports(
    template_id: str | None = None,
    skip: int = 0,
    limit: int = 50,
    db: Session = Depends(get_db),
):
    query = db.query(Report)
    if template_id:
        query = query.filter(Report.template_id == template_id)
    query = query.order_by(Report.created_at.desc())
    return query.offset(skip).limit(limit).all()


@router.get("/{report_id}", response_model=ReportResponse)
def get_report(report_id: int, db: Session = Depends(get_db)):
    report = db.query(Report).filter(Report.id == report_id).first()
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")
    return _to_response(report)


@router.delete("/{report_id}")
def delete_report(report_id: int, db: Session = Depends(get_db)):
    report = db.query(Report).filter(Report.id == report_id).first()
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")
    db.delete(report)
    db.commit()
    return {"detail": "Report deleted"}


def _to_response(report: Report) -> dict:
    return {
        "id": report.id,
        "template_id": report.template_id,
        "template_name": report.template_name,
        "patient_id": report.patient_id,
        "form_values": report.get_form_values(),
        "generated_text": report.generated_text,
        "conclusion": report.conclusion,
        "notes": report.notes,
        "created_at": report.created_at,
    }
