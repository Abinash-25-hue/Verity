export type RequestStatus = "pending" | "approved" | "rejected" | "changes_requested";
export type RiskLevel = "low" | "medium" | "high";

export interface ApprovalRequest {
  id: string;
  employee_name: string;
  request_type: string;
  title: string;
  description: string;
  amount: number;
  department: string;
  document_name?: string;
  status: RequestStatus;
  created_at: string;
}

export interface ValidationResult {
  status: "passed" | "needs_review" | "failed";
  score: number;
  findings: string[];
}

export interface PolicyReference {
  title: string;
  section: string;
  excerpt: string;
  relevance: string;
}

export interface ApprovalBrief {
  id: string;
  request_id: string;
  summary: string;
  key_facts: string[];
  risks: Array<{ level: RiskLevel; title: string; detail: string }>;
  recommendation: "approve" | "reject" | "request_changes";
  recommendation_reason: string;
  validation: ValidationResult;
  policies: PolicyReference[];
  generated_at: string;
}

export interface AuditEvent {
  id: string;
  request_id: string;
  event_type: string;
  details: string;
  actor: string;
  timestamp: string;
}

export interface DashboardStats {
  pending: number;
  approved: number;
  needsAttention: number;
  averageReviewTime: string;
}
