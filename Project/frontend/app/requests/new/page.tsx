"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, CheckCircle2, FileCheck2, ShieldCheck, Sparkles } from "lucide-react";
import Link from "next/link";
import { submitRequest } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/page-header";
import { UploadZone } from "@/components/upload-zone";

export default function NewRequestPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("");
  const [form, setForm] = useState({
    employee_name: "Aarav Mehta",
    request_type: "Expense Reimbursement",
    title: "",
    description: "",
    amount: "",
    department: "Sales"
  });

  function update(key: string, value: string) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    try {
      const request = await submitRequest({
        ...form,
        amount: Number(form.amount || 0),
        document_name: fileName
      });
      router.push(`/requests/${request.id}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="animate-in">
      <div className="mb-5">
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold text-[#667085] hover:text-[#635bff]">
          <ArrowLeft size={15} /> Back to dashboard
        </Link>
      </div>

      <PageHeader
        eyebrow="Request submission"
        title="Create an approval request"
        description="Submit the request and supporting context. Verity will validate it and prepare an Approval Brief for the reviewer."
      />

      <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
        <Card>
          <CardHeader>
            <CardTitle>Request details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Employee name" value={form.employee_name} onChange={(v) => update("employee_name", v)} />
                <SelectField label="Request type" value={form.request_type} onChange={(v) => update("request_type", v)} options={["Expense Reimbursement", "Travel Request", "Procurement"]} />
                <Field label="Request title" value={form.title} onChange={(v) => update("title", v)} placeholder="e.g. Client meeting travel reimbursement" required />
                <Field label="Amount (INR)" value={form.amount} onChange={(v) => update("amount", v)} placeholder="18500" type="number" required />
                <SelectField label="Department" value={form.department} onChange={(v) => update("department", v)} options={["Sales", "Engineering", "Design", "Finance", "Customer Success", "Procurement"]} />
              </div>

              <label className="block">
                <span className="mb-2 block text-xs font-bold text-[#344054]">Description</span>
                <textarea
                  required
                  value={form.description}
                  onChange={(e) => update("description", e.target.value)}
                  rows={5}
                  placeholder="Explain the business purpose, relevant context and expected outcome..."
                  className="w-full rounded-xl border border-[#d0d5dd] bg-white px-3.5 py-3 text-sm text-[#344054] outline-none transition placeholder:text-[#98a2b3] focus:border-[#8f89ff] focus:ring-4 focus:ring-[#635bff]/10"
                />
              </label>

              <div>
                <div className="mb-2 text-xs font-bold text-[#344054]">Supporting document</div>
                <UploadZone onFile={(file) => setFileName(file?.name ?? "")} />
              </div>

              <div className="flex flex-col justify-end gap-3 border-t border-[#e4e7ec] pt-5 sm:flex-row">
                <Link href="/">
                  <Button type="button" variant="outline" className="w-full sm:w-auto">Cancel</Button>
                </Link>
                <Button type="submit" disabled={loading} className="w-full sm:w-auto">
                  <Sparkles size={16} />
                  {loading ? "Preparing request..." : "Submit for AI review"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldCheck size={18} className="text-[#635bff]" />
                What happens next?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                ["Validation", "Completeness and potential issues are checked."],
                ["Policy context", "Relevant policies and guidelines are surfaced."],
                ["Approval Brief", "A concise decision-support summary is generated."],
                ["Human decision", "The manager approves, rejects or requests changes."]
              ].map(([title, text], index) => (
                <div key={title} className="flex gap-3">
                  <div className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#eeecff] text-xs font-extrabold text-[#635bff]">{index + 1}</div>
                  <div>
                    <div className="text-sm font-bold text-[#344054]">{title}</div>
                    <div className="mt-0.5 text-xs leading-5 text-[#667085]">{text}</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="rounded-2xl border border-[#dbeafe] bg-[#eff6ff] p-5">
            <div className="flex items-center gap-2 text-sm font-bold text-[#175cd3]">
              <FileCheck2 size={17} />
              Human-in-the-loop
            </div>
            <p className="mt-2 text-xs leading-5 text-[#475467]">
              AI recommendations are decision support only. Final approval authority remains with the human reviewer.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-bold text-[#344054]">{label}</span>
      <input
        required={required}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 w-full rounded-xl border border-[#d0d5dd] bg-white px-3.5 text-sm text-[#344054] outline-none transition placeholder:text-[#98a2b3] focus:border-[#8f89ff] focus:ring-4 focus:ring-[#635bff]/10"
      />
    </label>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-bold text-[#344054]">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 w-full rounded-xl border border-[#d0d5dd] bg-white px-3.5 text-sm text-[#344054] outline-none focus:border-[#8f89ff] focus:ring-4 focus:ring-[#635bff]/10"
      >
        {options.map((option) => <option key={option}>{option}</option>)}
      </select>
    </label>
  );
}
