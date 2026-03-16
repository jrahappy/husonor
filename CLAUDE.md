# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

HuSonor is a medical Structured Report generation tool. Users enter measurements in the left panel's exam template form, and an English sentence-form report is auto-generated in real time on the right panel. The report format follows the Sonoreview standard: Header → Clinical History → Findings → CONCLUSION → Sonographer.

**Supported exam types**: Cardiac Echo, Renal Ultrasound, Shoulder Ultrasound, Vascular DVT, Obstetric 2nd Trimester Morphology

## Tech Stack

- **Frontend**: React 19 + TypeScript (Vite 8), Zustand (state management), Tailwind CSS 4
- **Backend**: FastAPI 0.115, SQLAlchemy 2.0, SQLite (`husonor.db` auto-created at backend root)
- **Structure**: Monorepo (`frontend/`, `backend/`), backend venv at `backend/venv/`

## Commands

```bash
# Frontend
cd frontend && npm install        # install dependencies
cd frontend && npm run dev        # dev server (localhost:5173)
cd frontend && npm run build      # production build (tsc + vite build)
cd frontend && npm run lint       # ESLint check

# Backend
cd backend && source venv/Scripts/activate      # activate venv (Windows Git Bash)
cd backend && pip install -r requirements.txt   # install dependencies
cd backend && uvicorn app.main:app --reload     # dev server (localhost:8000)
# Swagger UI: http://localhost:8000/docs
```

## Architecture

### Template-Driven Design

Everything is driven by the `ExamTemplate` schema. A single template defines both form rendering and sentence generation.

```
ExamTemplate → sections[] → fields[] (form rendering)
                           → sentencePattern (sentence generation)
```

**Adding a new exam type**: Create a new TS file in `frontend/src/templates/`, register it in `index.ts`. No UI/engine code changes needed. Add a conclusion builder in `reportGenerator.ts` if needed.

**NAD pattern**: Many templates use an NAD (No Abnormality Detected) checkbox per anatomical structure. When unchecked, detailed pathology fields appear. This overcomes Sonoreview's main limitation.

### Sentence Pattern Syntax

Placeholders handled by `frontend/src/engine/sentenceBuilder.ts`:

| Syntax | Meaning |
|--------|---------|
| `{{fieldId}}` | Direct value substitution |
| `{{fieldId:normal:A\|B}}` | A if in normal range, B otherwise |
| `{{fieldId:sentence}}` | Select option's sentenceFragment |
| `{{fieldId:checked}}` | Checkbox's checkedSentence |
| `{{?fieldId:text}}` | Include only when value is present |

### Data Flow

```
User input → useFormStore → useReportGeneration (debounce 300ms)
  → reportGenerator(template, values) → useReportStore → RightPanel rendering
```

### Save/Load Flow

Reports are saved to the backend (SQLite) via `useReportStore`, which calls `reportApi.ts` fetch wrappers. The right panel has two tabs: **Report** (live preview + Copy/Save/Export toolbar) and **Saved** (list with Load/Delete). Loading a saved report restores the template selection and form values, triggering auto-regeneration.

```
Save: currentReport + formValues → reportApi.createReport() → backend SQLite
Load: reportApi.getReport(id) → selectTemplate() → setAllValues(form_values) → auto-regenerate
```

### Key Directories

- `frontend/src/types/` — TypeScript interfaces (template.ts, report.ts)
- `frontend/src/templates/` — Exam template definitions (data, one file per exam type)
- `frontend/src/engine/` — Report generation engine (pure functions, no UI dependency), includes `reportFormatter.ts` for plain text conversion
- `frontend/src/stores/` — Zustand stores (template, form, report — report store uses backend API)
- `frontend/src/api/` — Backend API client (`reportApi.ts`)
- `frontend/src/components/left-panel/` — Input form UI
- `frontend/src/components/right-panel/` — Report display, toolbar (Save/Copy/Export), saved reports list
- `frontend/src/components/common/` — Shared UI components (Modal)
- `backend/app/routers/` — FastAPI endpoints
- `backend/app/models.py` — SQLAlchemy models

### Backend API

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/reports` | Save a report (body: template_id, form_values, generated_text, etc.) |
| GET | `/api/reports` | List reports (query: `template_id`, `skip`, `limit`) |
| GET | `/api/reports/{id}` | Get report detail (includes form_values for restore) |
| DELETE | `/api/reports/{id}` | Delete a report |

CORS allows `localhost:5173` and `localhost:3000`. Vite dev server proxies `/api` to `localhost:8000`.

## TypeScript & Lint Rules

- `strict: true` with `noUnusedLocals` and `noUnusedParameters` enabled
- `verbatimModuleSyntax` enabled: always use `import type` for type-only imports
- Tailwind CSS via PostCSS (`@tailwindcss/postcss`), not the Vite plugin
- ESLint flat config with `typescript-eslint`, `react-hooks`, `react-refresh` plugins
