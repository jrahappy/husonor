const API_BASE = '/api';

export interface ReportCreatePayload {
  template_id: string;
  template_name: string;
  patient_id?: string;
  form_values: Record<string, unknown>;
  generated_text: string;
  conclusion?: string;
  notes?: string;
}

export interface ReportListItem {
  id: number;
  template_id: string;
  template_name: string;
  patient_id: string | null;
  created_at: string;
}

export interface ReportDetail {
  id: number;
  template_id: string;
  template_name: string;
  patient_id: string | null;
  form_values: Record<string, unknown>;
  generated_text: string;
  conclusion: string | null;
  notes: string | null;
  created_at: string;
}

export async function createReport(data: ReportCreatePayload): Promise<ReportDetail> {
  const res = await fetch(`${API_BASE}/reports`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to save report');
  return res.json();
}

export async function listReports(templateId?: string): Promise<ReportListItem[]> {
  const params = templateId ? `?template_id=${templateId}` : '';
  const res = await fetch(`${API_BASE}/reports${params}`);
  if (!res.ok) throw new Error('Failed to fetch reports');
  return res.json();
}

export async function getReport(id: number): Promise<ReportDetail> {
  const res = await fetch(`${API_BASE}/reports/${id}`);
  if (!res.ok) throw new Error('Failed to fetch report');
  return res.json();
}

export async function deleteReport(id: number): Promise<void> {
  const res = await fetch(`${API_BASE}/reports/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete report');
}
