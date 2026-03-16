import type { GeneratedReport } from '../types/report';

export function reportToPlainText(
  report: GeneratedReport,
  clinicalHistory: string,
  sonographer: string,
): string {
  const lines: string[] = [];
  lines.push(report.header);
  lines.push('');
  lines.push(`Clinical history: ${clinicalHistory}`);
  lines.push('');
  lines.push(`Findings: ${report.findingsIntro}`);
  lines.push('');

  for (const section of report.sections) {
    if (!section.sentences) continue;
    lines.push(section.sentences);
    lines.push('');
  }

  if (report.conclusion) {
    lines.push(`CONCLUSION: ${report.conclusion}`);
    lines.push('');
  }

  lines.push(`Sonographer: ${sonographer}`);

  return lines.join('\n');
}
