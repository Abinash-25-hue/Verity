"use client";

import Link from "next/link";
import { use, useEffect, useState } from "react";
import { ArrowLeft, Check, CircleAlert, FileText, Loader2, MessageSquareText, Sparkles, X } from "lucide-react";
import { decideRequest, getAudit, getBrief, getRequests } from "@/lib/api";
import { ApprovalBrief, ApprovalRequest, AuditEvent } from "@/lib/types";
import { formatCurrency, formatDateTime } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/status-badge";
import { ApprovalBriefPanel } from "@/components/approval-brief";
import { AuditTimeline } from "@/components/audit-timeline";

export default function ReviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [request, setRequest] = useState<ApprovalRequest | null>(null);
  const [brief, setBrief] = useState<ApprovalBrief | null>(null);
  const [audit, setAudit] = useState<AuditEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [decisionLoading, setDecisionLoading] = useState(false);
  const [decision, setDecision] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([getRequests(), getBrief(id), getAudit(id)])
      .then(([requests, generatedBrief, events]) => {
        setRequest(requests.find((item) => item.id === id) ?? {
          id,
          employee_name: "Demo employee",
          request_type: "Approval Request",
          title: "Request under review",
          description: "Request details are being loaded from the approval system.",
          amount: 0,
          department: "Operations",
          status: "pending",
          created_at: new Date().toISOString()
        });
        setBrief(generatedBrief);
        setAudit(events);
      })
      .finally(() => setLoading(false));
  }, [id]);

  async function makeDecision(next: "approve" | "reject" | "request_changes") {
    setDecisionLoading(true);
    try {
      await decideRequest(id, next);
      setDecision(next);
      setRequest((current) =>
        current
          ? { ...current, status: next === "approve" ? "approved" : next === "reject" ? "rejected" : "changes_requested" }
          : current
      );
    } finally {
      setDecisionLoading(false);
    }
  }

  if (loading || !request || !brief) {
    return (
      <div className="grid min-h-[70vh] place-items-center">
        <div className="flex items-center gap-2 text-sm font-semibold text-[#667085]">
          <Loader2 className="animate-spin" size={18} /> Preparing approval context...
        </div>
      </div>
    );
  }

  return (
    <div className="animate-in">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold text-[#667085] hover:text-[#635bff]">
          <ArrowLeft size={15} /> Back to dashboard
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#98a2b3]">Request {request.id}</span>
          <StatusBadge status={request.status} />
        </div>
      </div>

      <div className="mb-7">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.14em] text-[#635bff]">Approval review</div>
            <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-[#101828] sm:text-3xl">{request.title}</h1>
            <p className="mt-2 text-sm text-[#667085]">
              Submitted by <strong className="text-[#344054]">{request.employee_name}</strong> · {formatDateTime(request.created_at)}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => makeDecision("request_changes")} disabled={decisionLoading || !!decision}>
              <MessageSquareText size={16} /> Request changes
            </Button>
            <Button variant="danger" onClick={() => makeDecision("reject")} disabled={decisionLoading || !!decision}>
              <X size={16} /> Reject
            </Button>
            <Button variant="success" onClick={() => makeDecision("approve")} disabled={decisionLoading || !!decision}>
              <Check size={16} /> Approve
            </Button>
          </div>
        </div>
      </div>

      {decision && (
        <div className="mb-5 flex items-center gap-3 rounded-2xl border border-[#d1fadf] bg-[#ecfdf3] p-4 text-sm text-[#027a48]">
          <Check size={18} />
          <span className="font-semibold">
            Decision recorded: {decision === "approve" ? "Approved" : decision === "reject" ? "Rejected" : "Changes requested"}.
          </span>
        </div>
      )}

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_380px]">
        <div className="space-y-5">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText size={18} className="text-[#635bff]" />
                Submitted request
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-3">
                <Info label="Requester" value={request.employee_name} />
                <Info label="Department" value={request.department} />
                <Info label="Amount" value={formatCurrency(request.amount)} />
              </div>
              <div className="mt-5 rounded-xl bg-[#f9fafb] p-4">
                <div className="text-xs font-bold uppercase tracking-wide text-[#98a2b3]">Business context</div>
                <p className="mt-2 text-sm leading-6 text-[#475467]">{request.description}</p>
              </div>
              {request.document_name && (
                <div className="mt-4 flex items-center gap-3 rounded-xl border border-[#e4e7ec] p-3">
                  <FileText size={17} className="text-[#635bff]" />
                  <div className="text-xs font-semibold text-[#344054]">{request.document_name}</div>
                </div>
              )}
            </CardContent>
          </Card>

          <ApprovalBriefPanel brief={brief} />
        </div>

        <aside className="space-y-5">
          <Card className="sticky top-[92px]">
            <CardHeader>
              <CardTitle>Audit timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <AuditTimeline events={audit} />
            </CardContent>
          </Card>

          <div className="rounded-2xl border border-[#fef0c7] bg-[#fffaeb] p-5">
            <div className="flex items-center gap-2 text-sm font-bold text-[#b54708]">
              <CircleAlert size={17} />
              Human decision required
            </div>
            <p className="mt-2 text-xs leading-5 text-[#667085]">
              Verity provides validation, context and recommendations. The final decision is yours.
            </p>
          </div>

          <div className="rounded-2xl bg-[#f5f3ff] p-5">
            <div className="flex items-center gap-2 text-sm font-bold text-[#5148e8]">
              <Sparkles size={17} />
              AI transparency
            </div>
            <p className="mt-2 text-xs leading-5 text-[#667085]">
              The recommendation above is paired with validation findings and policy references so the reasoning is inspectable.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#98a2b3]">{label}</div>
      <div className="mt-1 text-sm font-bold text-[#344054]">{value}</div>
    </div>
  );
}
