"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, CheckCircle2, Clock3, FileClock, FilePlus2, ShieldAlert, Sparkles } from "lucide-react";
import { getDashboardStats, getRequests } from "@/lib/api";
import { ApprovalRequest, DashboardStats } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/page-header";
import { StatCard } from "@/components/stat-card";
import { RequestTable } from "@/components/request-table";

const initialStats: DashboardStats = {
  pending: 0,
  approved: 0,
  needsAttention: 0,
  averageReviewTime: "—"
};

export default function DashboardPage() {
  const [requests, setRequests] = useState<ApprovalRequest[]>([]);
  const [stats, setStats] = useState(initialStats);

  useEffect(() => {
    Promise.all([getRequests(), getDashboardStats()]).then(([items, dashboard]) => {
      setRequests(items);
      setStats(dashboard);
    });
  }, []);

  return (
    <div className="animate-in">
      <PageHeader
        eyebrow="Manager workspace"
        title="Good afternoon, Kavya."
        description="Review AI-prepared approval context and keep the final decision firmly in human hands."
        action={
          <Link href="/requests/new">
            <Button size="lg">
              <FilePlus2 size={17} />
              New request
            </Button>
          </Link>
        }
      />

      <div className="mb-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Pending approvals" value={stats.pending} helper="Awaiting your review" icon={Clock3} tone="purple" />
        <StatCard label="Approved requests" value={stats.approved} helper="Completed successfully" icon={CheckCircle2} tone="green" />
        <StatCard label="Needs attention" value={stats.needsAttention} helper="Changes or review required" icon={ShieldAlert} tone="amber" />
        <StatCard label="Average review time" value={stats.averageReviewTime} helper="Across recent requests" icon={Sparkles} tone="blue" />
      </div>

      <div className="mb-7 grid gap-5 lg:grid-cols-[1.5fr_0.5fr]">
        <div className="rounded-2xl bg-[#101828] p-6 text-white shadow-soft">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.13em] text-[#a9a3ff]">
                <Sparkles size={15} />
                Verity intelligence
              </div>
              <h2 className="mt-2 text-xl font-extrabold tracking-tight">Your queue is ready for review.</h2>
              <p className="mt-2 max-w-xl text-sm leading-6 text-[#d0d5dd]">
                Verity has already assembled validation findings, policy context and recommendations so you can focus on judgment.
              </p>
            </div>
            <Link href="/requests/VR-1048">
              <Button variant="secondary" className="bg-white text-[#101828] hover:bg-[#f2f4f7]">
                Review next
                <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
        </div>

        <div className="rounded-2xl border border-[#e4e7ec] bg-white p-6 shadow-card">
          <div className="flex items-center gap-2 text-sm font-bold text-[#344054]">
            <FileClock size={18} className="text-[#635bff]" />
            Auditability
          </div>
          <div className="mt-5 text-3xl font-extrabold text-[#101828]">100%</div>
          <p className="mt-1 text-xs leading-5 text-[#667085]">
            Workflow events are designed to remain visible from submission through final decision.
          </p>
          <Link href="/audit" className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-[#635bff]">
            Open audit trail <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      <RequestTable requests={requests} />
    </div>
  );
}
