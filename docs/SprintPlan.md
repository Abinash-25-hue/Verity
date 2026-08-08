## Sprint Plan for Verity 

**Team Size:** 4 (Frontend, Backend, AI Agents, Integration & Testing)  
**Tech Stack:** Next.js, FastAPI, Supabase, Gemini

---
### 1. Sprint Backlog

#### Frontend (Owner: Member 1)
| # | Task | Priority | Dependencies | Estimated Effort |
|---|------|----------|--------------|------------------|
| F1 | Scaffold Next.js project with Tailwind & shadcn/ui | High | None | 1 h |
| F2 | Build Request Submission page (form + file upload) | High | F1 | 2 h |
| F3 | Build Dashboard (list pending requests) | Medium | F1 | 1.5 h |
| F4 | Build Approval Review page (display brief, approve/reject) | High | F2, F3, Backend API ready | 2 h |
| F5 | Implement basic auth placeholder (email mock) | Low | F1 | 0.5 h |

#### Backend (Owner: Member 2)
| # | Task | Priority | Dependencies | Estimated Effort |
|---|------|----------|--------------|------------------|
| B1 | Scaffold FastAPI project, set up Dockerfile | High | None | 1 h |
| B2 | Implement `/api/request` endpoint (store in Supabase) | High | B1 | 1.5 h |
| B3 | Implement `/api/brief/{id}` endpoint (orchestrates AI agents) | High | B1, Supabase schema | 2 h |
| B4 | Implement `/api/approve` & `/api/reject` endpoints | Medium | B1 | 1 h |
| B5 | Implement audit‑log endpoint `/api/audit/{id}` | Medium | B1 | 1 h |
| B6 | Set up Supabase tables (requests, approval_briefs, audit_logs) | High | None | 0.5 h |

#### AI Agents (Owner: Member 3)
| # | Task | Priority | Dependencies | Estimated Effort |
|---|------|----------|--------------|------------------|
| A1 | Write Gemini prompt for Validation Agent | High | None | 0.5 h |
| A2 | Write Gemini prompt for Policy Context Agent | High | None | 0.5 h |
| A3 | Write Gemini prompt for Approval Brief Agent | High | A1, A2 | 1 h |
| A4 | Implement Python wrapper calling Gemini API (structured JSON) | High | A1‑A3 | 1 h |
| A5 | Unit‑test each agent with sample payloads | Medium | A4 | 0.5 h |

#### Integration & Testing (Owner: Member 4)
| # | Task | Priority | Dependencies | Estimated Effort |
|---|------|----------|--------------|------------------|
| I1 | Wire frontend to backend endpoints (F2 → B2, F4 → B3/B4) | High | F2, B2, B3 | 1 h |
| I2 | End‑to‑end flow test: submit → validate → policy → brief → approve | High | All previous tasks | 1 h |
| I3 | Write simple integration test script (e.g., using Playwright) | Medium | I1 | 0.5 h |
| I4 | Prepare demo presentation slides & run‑through | Medium | All tasks | 0.5 h |
| I5 | Deploy Frontend to Vercel (preview) and Backend to Railway/Render | Medium | F1, B1 | 0.5 h |

---
### 2. Recommended Implementation Order (chronological)
1. **Backend foundation** – B1, B6, B2 (set up API & DB).  
2. **AI agents** – A1‑A4 (so the brief endpoint can call them).  
3. **Frontend scaffold** – F1, then connect request page to B2 (F2).  
4. **Dashboard & Review UI** – F3, F4 (once brief endpoint B3 is ready).  
5. **Integration wiring** – I1, I2.  
6. **Testing** – I3, plus unit tests for agents (A5) and backend endpoints.  
7. **Deployment & Demo prep** – I5, I4.

---
### 3. Sprint Timeline (24 h total)
| Phase | Hours | Activities |
|-------|-------|------------|
| Setup & Foundations | 4 h | B1, B6, B2, B3, A1‑A4 |
| UI Development | 5 h | F1‑F4 |
| Integration & Wiring | 3 h | I1, I2 |
| Testing & QA | 3 h | A5, I3, manual end‑to‑end checks |
| Deployment & Demo | 2 h | I5, I4 |
| Buffer / Polish | 2 h | Low‑priority tweaks (F5, B4/B5, documentation) |
| **Total** | **19 h** | (leaves ~5 h buffer for unexpected issues)

---
### 4. Next Steps
1. Review the plan with the team and adjust estimates if needed.
2. Begin implementation following the order above.
3. Use the remaining buffer time for polishing and handling any blockers.

---
**Task Progress**
- [x] Read Architecture document
- [x] Read ProjectBrief
- [x] Read PRD
- [x] Draft Sprint Plan (completed above)
- [x] Create `docs/SprintPlan.md`