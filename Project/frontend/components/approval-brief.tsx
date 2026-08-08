import { CheckCircle2, FileCheck2, Lightbulb, ShieldAlert, Sparkles } from "lucide-react";
import { ApprovalBrief } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ApprovalBriefPanel({ brief }: { brief: ApprovalBrief }) {
  return (
    <div className="space-y-5">
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-[#101828] to-[#25204f] p-5 text-white">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.13em] text-[#c7c4ff]">
            <Sparkles size={15} />
            AI Approval Brief
          </div>
          <p className="mt-3 text-sm leading-6 text-[#eaecf0]">{brief.summary}</p>
        </div>
        <CardContent className="pt-5">
          <div className="grid gap-3 sm:grid-cols-2">
            {brief.key_facts.map((fact) => (
              <div key={fact} className="flex gap-2.5 rounded-xl bg-[#f9fafb] p-3 text-sm text-[#475467]">
                <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-[#12b76a]" />
                {fact}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShieldAlert size={18} className="text-[#f79009]" />
            Risk assessment
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {brief.risks.map((risk) => (
            <div key={risk.title} className="flex items-start justify-between gap-4 rounded-xl border border-[#e4e7ec] p-4">
              <div>
                <div className="text-sm font-bold text-[#344054]">{risk.title}</div>
                <div className="mt-1 text-xs leading-5 text-[#667085]">{risk.detail}</div>
              </div>
              <Badge
                className={cn(
                  "shrink-0",
                  risk.level === "low" && "bg-[#ecfdf3] text-[#027a48]",
                  risk.level === "medium" && "bg-[#fffaeb] text-[#b54708]",
                  risk.level === "high" && "bg-[#fef3f2] text-[#b42318]"
                )}
              >
                {risk.level}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileCheck2 size={18} className="text-[#635bff]" />
            Validation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative grid h-24 w-24 shrink-0 place-items-center rounded-full border-[7px] border-[#e8e6ff]">
              <div className="text-xl font-extrabold text-[#5148e8]">{brief.validation.score}%</div>
            </div>
            <div className="space-y-2">
              {brief.validation.findings.map((finding) => (
                <div key={finding} className="flex items-center gap-2 text-sm text-[#475467]">
                  <CheckCircle2 size={15} className="text-[#12b76a]" />
                  {finding}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb size={18} className="text-[#635bff]" />
            Recommendation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-xl bg-[#f5f3ff] p-4">
            <div className="text-sm font-extrabold uppercase tracking-wide text-[#5148e8]">
              {brief.recommendation.replace("_", " ")}
            </div>
            <p className="mt-2 text-sm leading-6 text-[#475467]">{brief.recommendation_reason}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Relevant policy context</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {brief.policies.map((policy) => (
            <div key={`${policy.title}-${policy.section}`} className="rounded-xl border border-[#e4e7ec] p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="text-sm font-bold text-[#344054]">{policy.title}</div>
                <Badge className="bg-[#f2f4f7] text-[#667085]">{policy.section}</Badge>
              </div>
              <p className="mt-2 text-sm leading-6 text-[#667085]">“{policy.excerpt}”</p>
              <p className="mt-2 text-xs font-semibold text-[#635bff]">{policy.relevance}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
