import { LucideIcon, ArrowUpRight } from "lucide-react";

export function StatCard({
  label,
  value,
  helper,
  icon: Icon,
  tone = "purple"
}: {
  label: string;
  value: string | number;
  helper: string;
  icon: LucideIcon;
  tone?: "purple" | "blue" | "green" | "amber";
}) {
  const tones = {
    purple: "bg-[#eeecff] text-[#635bff]",
    blue: "bg-[#eaf3ff] text-[#2e90fa]",
    green: "bg-[#e9fbf2] text-[#12b76a]",
    amber: "bg-[#fff6e5] text-[#f79009]"
  };

  return (
    <div className="rounded-2xl border border-[#e4e7ec] bg-white p-5 shadow-card transition hover:-translate-y-0.5 hover:shadow-soft">
      <div className="flex items-start justify-between">
        <div className={`grid h-10 w-10 place-items-center rounded-xl ${tones[tone]}`}>
          <Icon size={19} />
        </div>
        <ArrowUpRight size={16} className="text-[#98a2b3]" />
      </div>
      <div className="mt-5 text-2xl font-extrabold tracking-tight text-[#101828]">{value}</div>
      <div className="mt-1 text-sm font-semibold text-[#344054]">{label}</div>
      <div className="mt-1 text-xs text-[#98a2b3]">{helper}</div>
    </div>
  );
}
