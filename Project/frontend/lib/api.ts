import {
  ApprovalBrief,
  ApprovalRequest,
  AuditEvent,
  DashboardStats
} from "@/lib/types";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";
const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK_API !== "false";

const now = new Date();
const iso = (minutesAgo: number) =>
  new Date(now.getTime() - minutesAgo * 60000).toISOString();

const mockRequests: ApprovalRequest[] = [
  {
    id: "VR-1048",
    employee_name: "Aarav Mehta",
    request_type: "Expense Reimbursement",
    title: "Client meeting travel reimbursement",
    description: "Reimbursement for local travel and client hospitality during the Orion account meeting.",
    amount: 18500,
    department: "Sales",
    document_name: "orion-travel-receipt.pdf",
    status: "pending",
    created_at: iso(18)
  },
  {
    id: "VR-1047",
    employee_name: "Priya Nair",
    request_type: "Procurement",
    title: "Design tooling renewal",
    description: "Annual renewal for the product design team collaboration suite.",
    amount: 42000,
    department: "Design",
    document_name: "vendor-quote.pdf",
    status: "pending",
    created_at: iso(46)
  },
  {
    id: "VR-1046",
    employee_name: "Rohan Singh",
    request_type: "Travel Request",
    title: "Bengaluru customer workshop",
    description: "Three-day customer workshop travel request including airfare and hotel.",
    amount: 36500,
    department: "Customer Success",
    document_name: "travel-itinerary.pdf",
    status: "approved",
    created_at: iso(125)
  },
  {
    id: "VR-1045",
    employee_name: "Ishita Das",
    request_type: "Expense Reimbursement",
    title: "Conference registration",
    description: "Reimbursement request for an approved industry conference registration.",
    amount: 12000,
    department: "Engineering",
    document_name: "conference-invoice.pdf",
    status: "changes_requested",
    created_at: iso(240)
  },
  {
    id: "VR-1044",
    employee_name: "Kabir Shah",
    request_type: "Procurement",
    title: "Cloud testing credits",
    description: "Purchase of additional testing credits for the release validation environment.",
    amount: 28000,
    department: "Engineering",
    document_name: "cloud-quote.pdf",
    status: "approved",
    created_at: iso(420)
  }
];

function mockBrief(id: string): ApprovalBrief {
  const request = mockRequests.find((item) => item.id === id) ?? mockRequests[0];
  return {
    id: `brief-${id}`,
    request_id: id,
    summary: `${request.employee_name} is requesting ${new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0
    }).format(request.amount)} for ${request.title.toLowerCase()}. The submitted information is substantially complete and aligns with the documented approval flow.`,
    key_facts: [
      `${request.request_type} submitted by ${request.employee_name}`,
      `Department: ${request.department}`,
      `Requested amount: ${new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0
      }).format(request.amount)}`,
      "Supporting document attached"
    ],
    risks: [
      {
        level: "low",
        title: "Documentation",
        detail: "Supporting documentation is present and readable."
      },
      {
        level: "low",
        title: "Policy alignment",
        detail: "No material policy exception was detected in the demo policy set."
      }
    ],
    recommendation: "approve",
    recommendation_reason: "The request is complete, the supporting document is present, and no high-risk compliance concern was identified.",
    validation: {
      status: "passed",
      score: 94,
      findings: [
        "Required request metadata present",
        "Supporting document detected",
        "No missing mandatory field detected"
      ]
    },
    policies: [
      {
        title: "Expense & Reimbursement Policy",
        section: "Section 3.2",
        excerpt: "Eligible business expenses may be reimbursed when supported by appropriate documentation.",
        relevance: "Supports the reimbursement request and documentation requirement."
      },
      {
        title: "Manager Approval Guidelines",
        section: "Section 2.1",
        excerpt: "Managers remain responsible for reviewing context and making the final approval decision.",
        relevance: "Confirms human-in-the-loop approval authority."
      }
    ],
    generated_at: iso(4)
  };
}

function mockAudit(id: string): AuditEvent[] {
  return [
    {
      id: "a1",
      request_id: id,
      event_type: "Decision pending",
      details: "Request is waiting for human review.",
      actor: "Verity",
      timestamp: iso(3)
    },
    {
      id: "a2",
      request_id: id,
      event_type: "Approval Brief generated",
      details: "Validation, policy context and recommendation were generated.",
      actor: "Verity AI",
      timestamp: iso(4)
    },
    {
      id: "a3",
      request_id: id,
      event_type: "Policy context retrieved",
      details: "Relevant approval and reimbursement policy references attached.",
      actor: "Policy Context Agent",
      timestamp: iso(5)
    },
    {
      id: "a4",
      request_id: id,
      event_type: "Validation completed",
      details: "Request completeness check passed with 94% confidence.",
      actor: "Validation Agent",
      timestamp: iso(6)
    },
    {
      id: "a5",
      request_id: id,
      event_type: "Request submitted",
      details: "Employee submitted the request with supporting documentation.",
      actor: "Aarav Mehta",
      timestamp: iso(18)
    }
  ];
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {})
    },
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return response.json();
}

export async function getRequests(): Promise<ApprovalRequest[]> {
  if (USE_MOCK) return mockRequests;
  return request<ApprovalRequest[]>("/api/request");
}

export async function getDashboardStats(): Promise<DashboardStats> {
  if (USE_MOCK) {
    return {
      pending: mockRequests.filter((r) => r.status === "pending").length,
      approved: mockRequests.filter((r) => r.status === "approved").length,
      needsAttention: mockRequests.filter((r) => r.status === "changes_requested").length,
      averageReviewTime: "8m 42s"
    };
  }
  return request<DashboardStats>("/api/dashboard/stats");
}

export async function getBrief(id: string): Promise<ApprovalBrief> {
  if (USE_MOCK) return mockBrief(id);
  return request<ApprovalBrief>(`/api/brief/${id}`);
}

export async function getAudit(id: string): Promise<AuditEvent[]> {
  if (USE_MOCK) return mockAudit(id);
  return request<AuditEvent[]>(`/api/audit/${id}`);
}

export async function submitRequest(payload: {
  employee_name: string;
  request_type: string;
  title: string;
  description: string;
  amount: number;
  department: string;
  document_name?: string;
}): Promise<ApprovalRequest> {
  if (USE_MOCK) {
    const id = `VR-${1050 + Math.floor(Math.random() * 90)}`;
    const item: ApprovalRequest = {
      id,
      ...payload,
      status: "pending",
      created_at: new Date().toISOString()
    };
    mockRequests.unshift(item);
    return item;
  }

  return request<ApprovalRequest>("/api/request", {
    method: "POST",
    body: JSON.stringify(payload)
  });
}

export async function decideRequest(
  id: string,
  decision: "approve" | "reject" | "request_changes"
) {
  if (USE_MOCK) {
    return { success: true, request_id: id, decision };
  }

  const endpoint =
    decision === "approve"
      ? `/api/approve/${id}`
      : decision === "reject"
        ? `/api/reject/${id}`
        : `/api/request-changes/${id}`;

  return request(endpoint, { method: "POST" });
}
