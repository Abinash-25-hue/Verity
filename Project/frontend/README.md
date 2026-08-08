# Verity Frontend

Production-style Next.js frontend for **Verity — AI Approval Copilot**.

The UI is designed around the documented MVP flow:

1. Submit an approval request
2. Validate the request
3. Retrieve policy context
4. Generate an Approval Brief
5. Human review
6. Approve / Reject / Request Changes
7. Inspect the audit trail

## Stack

- Next.js + React
- TypeScript
- Tailwind CSS
- shadcn/ui-compatible component structure
- Lucide icons

## 1. Install

```bash
cd Project/Frontend
npm install
```

## 2. Configure environment

Copy `.env.example` to `.env.local`.

```bash
cp .env.example .env.local
```

On Windows PowerShell:

```powershell
Copy-Item .env.example .env.local
```

For frontend-only development keep:

```env
NEXT_PUBLIC_USE_MOCK_API=true
```

This lets the complete UI work before the FastAPI backend is connected.

When the backend is ready:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
NEXT_PUBLIC_USE_MOCK_API=false
```

## 3. Run

```bash
npm run dev
```

Open:

http://localhost:3000

## Backend contract used by this frontend

The frontend wrapper is aligned to the documented endpoints:

- `POST /api/request`
- `POST /api/brief/{request_id}`
- `GET /api/brief/{request_id}`
- `POST /api/approve/{request_id}`
- `POST /api/reject/{request_id}`
- `GET /api/audit/{request_id}`

## Main routes

- `/` — manager dashboard
- `/requests/new` — request submission
- `/requests/[id]` — approval review
- `/audit` — audit history

## Demo flow

1. Open `/requests/new`.
2. Fill the form and upload a document.
3. Submit.
4. Open the generated request.
5. Review validation, policy context, AI recommendation and risks.
6. Choose Approve, Reject or Request Changes.
7. Open Audit Trail.

## Production integration

The mock layer is intentionally isolated in `lib/api.ts`. Replace it by setting:

```env
NEXT_PUBLIC_USE_MOCK_API=false
```

and pointing `NEXT_PUBLIC_API_BASE_URL` to the FastAPI service.

Never put Gemini, Supabase service-role, or other secret credentials in frontend environment variables. Those belong in the backend.
