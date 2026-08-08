import { Badge } from "@/components/ui/badge";
import { RequestStatus } from "@/lib/types";

const config: Record<RequestStatus, { label: string; className: string }> = {
  pending: { label: "Pending review", className: "bg-[#eef4ff] text-[#175cd3]" },
  approved: { label: "Approved", className: "bg-[#ecfdf3] text-[#027a48]" },
  rejected: { label: "Rejected", className: "bg-[#fef3f2] text-[#b42318]" },
  changes_requested: { label: "Changes requested", className: "bg-[#fffaeb] text-[#b54708]" }
};

export function StatusBadge({ status }: { status: RequestStatus }) {
  const item = config[status];
  return <Badge className={item.className}>{item.label}</Badge>;
}
