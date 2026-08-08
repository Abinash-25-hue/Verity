"use client";

import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import { ApprovalRequest } from "@/lib/types";
import { formatCurrency, formatDateTime } from "@/lib/utils";
import { StatusBadge } from "@/components/status-badge";

export function RequestTable({ requests }: { requests: ApprovalRequest[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#e4e7ec] bg-white shadow-card">
      <div className="flex items-center justify-between border-b border-[#e4e7ec] px-5 py-4">
        <div>
          <h2 className="text-sm font-bold text-[#101828]">Recent requests</h2>
          <p className="mt-0.5 text-xs text-[#98a2b3]">Latest activity across the approval queue</p>
        </div>
        <Link href="/audit" className="text-xs font-bold text-[#635bff] hover:underline">
          View audit trail
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-left">
          <thead className="bg-[#f9fafb] text-[10px] font-bold uppercase tracking-[0.12em] text-[#98a2b3]">
            <tr>
              <th className="px-5 py-3">Request</th>
              <th className="px-5 py-3">Requester</th>
              <th className="px-5 py-3">Amount</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Submitted</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f0f2f5]">
            {requests.map((request) => (
              <tr key={request.id} className="group hover:bg-[#fafbff]">
                <td className="px-5 py-4">
                  <Link href={`/requests/${request.id}`} className="flex items-center gap-3">
                    <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[#f2f4f7] text-[#667085]">
                      <FileText size={16} />
                    </div>
                    <div>
                      <div className="max-w-[280px] truncate text-sm font-bold text-[#344054] group-hover:text-[#635bff]">
                        {request.title}
                      </div>
                      <div className="mt-0.5 text-xs text-[#98a2b3]">{request.id} · {request.request_type}</div>
                    </div>
                  </Link>
                </td>
                <td className="px-5 py-4 text-sm text-[#475467]">{request.employee_name}</td>
                <td className="px-5 py-4 text-sm font-bold text-[#344054]">{formatCurrency(request.amount)}</td>
                <td className="px-5 py-4"><StatusBadge status={request.status} /></td>
                <td className="px-5 py-4 text-xs text-[#667085]">{formatDateTime(request.created_at)}</td>
                <td className="px-5 py-4 text-right">
                  <Link href={`/requests/${request.id}`} className="inline-flex rounded-lg p-2 text-[#98a2b3] hover:bg-[#f2f4f7] hover:text-[#635bff]">
                    <ArrowRight size={17} />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
