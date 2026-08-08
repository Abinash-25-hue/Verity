# System Architecture Document

# Verity – AI Approval Copilot

**Version:** 1.0  
**Team:** Verity  
**Date:** August 2026

---

# 1. Architecture Overview

Verity follows a simple AI-assisted approval workflow architecture designed specifically for rapid development during a hackathon while remaining scalable for future expansion.

The system consists of four primary layers:

1. Frontend Application
2. Backend API Layer
3. AI Agent Layer
4. Database Layer

The architecture ensures that AI assists decision-making while human users retain final approval authority.

---

# 2. High-Level System Architecture

```text
┌─────────────────────┐
│      Employee       │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│   Next.js Frontend  │
└──────────┬──────────┘
           │ REST API
           ▼
┌─────────────────────┐
│    FastAPI Backend  │
└──────────┬──────────┘
           │
    ┌──────┼──────┐
    │      │      │
    ▼      ▼      ▼
Validation Policy Brief
 Agent     Agent Agent
    │      │      │
    └──────┼──────┘
           ▼
      Gemini API
           │
           ▼
┌─────────────────────┐
│      Supabase       │
└─────────────────────┘
```

---

# 3. System Components

## 3.1 Frontend Layer

### Technology

- Next.js
- React
- Tailwind CSS

### Responsibilities

The frontend serves as the primary user interface for all users.

Features include:

- Request submission
- Approval dashboard
- Approval brief viewing
- Approval actions
- Audit trail viewing

### User Interfaces

#### Employee Portal

Allows employees to:

- Create requests
- Upload supporting documents
- Track request status

#### Manager Dashboard

Allows managers to:

- View pending approvals
- Review approval briefs
- Approve or reject requests

#### Audit Dashboard

Allows users to:

- View approval history
- Inspect approval decisions
- Review AI-generated outputs

---

# 3.2 Backend Layer

### Technology

- FastAPI
- Python

### Responsibilities

The backend acts as the orchestration layer between users, AI agents, and the database.

Functions include:

- Request processing
- Agent orchestration
- Database operations
- Audit logging
- API management

---

# 3.3 AI Agent Layer

### Technology

- Gemini API

The AI layer consists of three specialized agents.

---

## Validation Agent

### Purpose

Validate request completeness before review.

### Inputs

- Request details
- Uploaded documents
- Metadata

### Outputs

- Validation status
- Missing information
- Potential issues

### Example

Input:

Expense reimbursement request

Output:

- Missing invoice number
- Receipt attached
- Requires correction

---

## Policy Context Agent

### Purpose

Retrieve relevant company policies.

### Inputs

- Request type
- Request content

### Outputs

- Relevant policy references
- Supporting guidelines
- Compliance notes

### Example

Input:

Travel reimbursement

Output:

- Travel Policy Section 3.2
- Daily reimbursement limit
- Approval requirements

---

## Approval Brief Agent

### Purpose

Generate a concise decision-support summary.

### Inputs

- Request information
- Validation results
- Policy references

### Outputs

- Executive summary
- Risk assessment
- Recommendation

### Example

Output:

Summary:
Employee requests reimbursement for client travel.

Risks:
None identified.

Recommendation:
Approve.

---

# 3.4 Database Layer

### Technology

- Supabase

### Responsibilities

- Store requests
- Store AI outputs
- Store audit records
- Store approval decisions

---

# 4. Database Design

## Table: requests

Stores submitted requests.

| Field | Type |
|---------|---------|
| id | UUID |
| employee_name | TEXT |
| request_type | TEXT |
| description | TEXT |
| document_url | TEXT |
| status | TEXT |
| created_at | TIMESTAMP |

---

## Table: approval_briefs

Stores AI-generated approval briefs.

| Field | Type |
|---------|---------|
| id | UUID |
| request_id | UUID |
| summary | TEXT |
| risks | TEXT |
| recommendation | TEXT |
| generated_at | TIMESTAMP |

---

## Table: audit_logs

Stores workflow events.

| Field | Type |
|---------|---------|
| id | UUID |
| request_id | UUID |
| event_type | TEXT |
| details | TEXT |
| timestamp | TIMESTAMP |

---

# 5. API Design

## Submit Request

### Endpoint

```http
POST /api/request
```

### Purpose

Create a new approval request.

---

## Generate Approval Brief

### Endpoint

```http
POST /api/brief/{request_id}
```

### Purpose

Run AI workflow and generate approval brief.

---

## Retrieve Approval Brief

### Endpoint

```http
GET /api/brief/{request_id}
```

### Purpose

Fetch generated approval brief.

---

## Approve Request

### Endpoint

```http
POST /api/approve/{request_id}
```

### Purpose

Approve a request.

---

## Reject Request

### Endpoint

```http
POST /api/reject/{request_id}
```

### Purpose

Reject a request.

---

## Retrieve Audit Trail

### Endpoint

```http
GET /api/audit/{request_id}
```

### Purpose

Fetch complete approval history.

---

# 6. Request Lifecycle

The following workflow describes how a request moves through the system.

### Step 1

Employee submits a request.

↓

### Step 2

Backend stores request in Supabase.

↓

### Step 3

Validation Agent checks request quality.

↓

### Step 4

Policy Context Agent retrieves relevant policies.

↓

### Step 5

Approval Brief Agent generates recommendation.

↓

### Step 6

Results stored in database.

↓

### Step 7

Manager reviews generated brief.

↓

### Step 8

Manager approves or rejects request.

↓

### Step 9

Audit trail updated.

---

# 7. Security Considerations

For the hackathon MVP:

- User authentication may be simplified
- Approval decisions remain human-controlled
- All actions are logged
- API keys stored in environment variables
- No secrets committed to GitHub

Future versions may include:

- Role-based access control
- Enterprise authentication
- Multi-organization support

---

# 8. Scalability Considerations

Although designed for a hackathon, the architecture supports future expansion.

Possible upgrades include:

- Multi-level approval workflows
- Email notifications
- Slack integration
- SAP integration
- Multiple AI agents
- Policy knowledge base indexing
- Enterprise identity management

---

# 9. Team Responsibilities

## Member 1 – Frontend

Responsible for:

- Request submission page
- Dashboard page
- Approval review page
- Audit trail page

---

## Member 2 – Backend

Responsible for:

- FastAPI server
- API endpoints
- Database integration
- Audit logging

---

## Member 3 – AI

Responsible for:

- Validation Agent
- Policy Context Agent
- Approval Brief Agent
- Prompt engineering

---

## Member 4 – Integration & Documentation

Responsible for:

- Architecture documentation
- System integration
- Testing
- Presentation preparation
- Deployment

---

# 10. Technology Stack Summary

## Frontend

- Next.js
- React
- Tailwind CSS

## Backend

- FastAPI

## Database

- Supabase

## AI

- Gemini

## Deployment

- Vercel (Frontend)
- Railway / Render (Backend)

---

# Final Architectural Principle

Verity is designed around a human-in-the-loop approval model.

AI is responsible for validation, context gathering, summarization, and recommendation generation. Final approval authority always remains with human decision makers, ensuring transparency, accountability, and trust in the approval process.