# Project Brief — Verity

## Project Overview

**Verity** is an AI-powered Approval Copilot designed to help managers and approval teams make faster, more informed decisions by automatically validating requests, gathering relevant context, generating concise approval briefs, and maintaining a transparent audit trail.

Rather than replacing human decision-makers, Verity acts as an intelligent assistant that reduces the time spent collecting information and identifying compliance issues, allowing approvers to focus on judgment and accountability.

---

## Problem Statement

In many organizations, approval processes are slow because decision-makers must manually review submitted requests, verify supporting documents, consult policies, and gather contextual information before reaching a decision.

### Common Challenges

- Missing or incomplete documentation
- Inconsistent policy compliance checks
- Time spent searching for relevant context
- Lack of clear justification for approval decisions
- Poor auditability of approval workflows

These inefficiencies create delays, increase operational costs, and make it difficult to maintain consistent decision-making standards.

---

## Proposed Solution

Verity introduces an AI-assisted approval workflow that supports decision-makers throughout the approval process.

When a request is submitted, Verity:

1. Validates the request against predefined requirements.
2. Identifies missing documents or potential compliance concerns.
3. Retrieves relevant policy and contextual information.
4. Generates a structured Approval Brief summarizing key details, risks, and recommendations.
5. Records decisions and reasoning in an auditable timeline.

The final approval decision always remains with a human approver.

---

## Target Users

### Employees

Submit requests and supporting documentation.

### Managers

Review requests and make approval decisions using AI-generated context.

### Finance Teams

Verify compliance, spending justification, and policy alignment.

### Procurement Teams

Review purchasing and vendor-related approvals.

---

## Core Features (Hackathon Scope)

### 1. Request Upload

Users can submit approval requests along with supporting documents and metadata.

### 2. Validation Agent

Checks request completeness and identifies missing information or policy violations.

### 3. Approval Brief Generator

Creates a concise summary containing:

- Request overview
- Key facts
- Potential risks
- Relevant policy context
- Suggested recommendation

### 4. Human Approval Workflow

Allows managers to approve or reject requests after reviewing the generated brief.

### 5. Audit Timeline

Maintains a chronological record of:

- Submission events
- Validation results
- Generated recommendations
- Approval decisions

---

## Design Principles

### Human-in-the-Loop

AI provides assistance and recommendations, but never makes final approval decisions.

### Explainability

Every recommendation should be traceable to supporting information and policy references.

### Transparency

All actions and decisions should be visible through the audit trail.

### Practicality

The system prioritizes usability and real-world applicability over experimental automation.

---

## Technical Approach

### Frontend

- Next.js
- Tailwind CSS
- shadcn/ui

### Backend

- FastAPI

### Database

- Supabase (PostgreSQL)

### AI Layer

- Gemini API
- Structured JSON outputs
- Prompt-based reasoning

### Deployment

- Vercel (Frontend)
- Render / Railway / Fly.io (Backend)

---

## Success Criteria

The project will be considered successful if it can:

1. Accept an approval request.
2. Validate submitted information.
3. Generate a useful Approval Brief.
4. Allow a human approval decision.
5. Maintain a visible audit trail.
6. Demonstrate a complete end-to-end workflow during judging.

---

## Hackathon Constraints & Decisions

### Decision 1: Use Existing Foundation Models

Rather than training custom models, Verity leverages Gemini for reasoning and summarization to maximize development speed and reliability within the hackathon timeframe.

### Decision 2: Human Approval Remains Mandatory

The system assists decision-makers rather than replacing them, improving trust and reducing risk.

### Decision 3: Focus on Approval Intelligence

The project prioritizes generating high-quality approval context instead of building a complex enterprise workflow engine.

### Decision 4: Scope Limited to One Approval Flow

To ensure a complete and demonstrable product within 24 hours, Verity focuses on a single approval workflow with AI assistance and auditability.

---

## Elevator Pitch

**Verity is an AI-powered Approval Copilot that helps managers make faster, more informed decisions by validating requests, gathering policy context, generating approval briefs, and maintaining a transparent audit trail—all while keeping humans firmly in control of the final decision.**