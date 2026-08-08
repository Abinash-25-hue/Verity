"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, FileClock, Search } from "lucide-react";
import { getRequests } from "@/lib/api";
import { ApprovalRequest } from "@/lib/types";
import { formatDateTime } from "@/lib/utils";
import { PageHeader } from "@/components/page-header";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/status-badge";

export default function AuditPage() {
  const [requests, setRequests] = useState<ApprovalRequest[]>([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    getRequests().then(setRequests);
  }, []);

  const filtered = requests.filter((item) =>
    `${item.id} ${item.title} ${item.employee_name} ${item.department}`.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="animate-in">
      <PageHeader
        eyebrow="Transparency"
        title="Audit trail"
        description="Inspect approval activity and keep a clear record of requests, decisions and AI-assisted workflow events."
      />

      <Card className="overflow-hidden">
        <div className="flex flex-col justify-between gap-3 border-b border-[#e4e7ec] p-5 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2 text-sm font-bold text-[#344054]">
            <FileClock size={18} className="text-[#635bff]" />
            Approval history
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-[#e4e7ec] bg-[#f9fafb] px-3 py-2">
            <Search size={15} className="text-[#98a2b3]" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Filter history..."
              className="w-full bg-transparent text-xs outline-none placeholder:text-[#98a2b3] sm:w-56"
            />
          </div>
        </div>

        <div className="divide-y divide-[#f0f2f5]">
          {filtered.map((request) => (
            <Link
              href={`/requests/${request.id}`}
              key={request.id}
              className="flex flex-col gap-3 p-5 transition hover:bg-[#fafbff] sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#ecfdf3] text-[#12b76a]">
                  <CheckCircle2 size={18} />
                </div>
                <div>
                  <div className="text-sm font-bold text-[#344054]">{request.title}</div>
                  <div className="mt-1 text-xs text-[#98a2b3]">
                    {request.id} · {request.employee_name} · {formatDateTime(request.created_at)}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 pl-12 sm:pl-0">
                <StatusBadge status={request.status} />
                <ArrowRight size={16} className="text-[#98a2b3]" />
              </div>
            </Link>
          ))}
        </div>
      </Card>
    </div>
  );
}
