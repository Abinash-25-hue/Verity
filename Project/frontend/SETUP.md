# Verity Frontend — Beginner Setup Guide

## Required software

Install:

1. Node.js LTS
2. Git
3. VS Code

Verify Node:

```bash
node --version
npm --version
```

## Open the project

In VS Code, open the `Project/Frontend` folder.

Then open Terminal → New Terminal.

Run:

```bash
npm install
npm run dev
```

Open:

```text
http://localhost:3000
```

## If the screen is blank

Stop the server with `Ctrl + C`, then run:

```bash
npm run dev
```

Look at the terminal for compilation errors.

## Connect FastAPI later

Create `.env.local`:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
NEXT_PUBLIC_USE_MOCK_API=false
```

Restart Next.js after changing environment variables.

## Important security rule

Do not put Gemini API keys or Supabase service-role keys in the frontend. The frontend should call FastAPI; FastAPI handles Gemini and privileged Supabase operations.
