import { CheckCircle2, CircleDot, Clock3, FileText, Sparkles } from "lucide-react";
import { AuditEvent } from "@/lib/types";
import { formatDateTime } from "@/lib/utils";

const icons = [FileText, CheckCircle2, Sparkles, CircleDot, Clock3];

export function AuditTimeline({ events }: { events: AuditEvent[] }) {
  return (
    <div className="space-y-0">
      {events.map((event, index) => {
        const Icon = icons[index % icons.length];
        return (
          <div key={event.id} className="relative flex gap-4 pb-6 last:pb-0">
            {index < events.length - 1 && (
              <div className="absolute left-[15px] top-9 h-[calc(100%-18px)] w-px bg-[#e4e7ec]" />
            )}
            <div className="relative z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-[#e4e7ec] bg-white text-[#635bff]">
              <Icon size={15} />
            </div>
            <div className="min-w-0 pt-0.5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="text-sm font-bold text-[#344054]">{event.event_type}</div>
                <div className="text-[11px] text-[#98a2b3]">{formatDateTime(event.timestamp)}</div>
              </div>
              <p className="mt-1 text-xs leading-5 text-[#667085]">{event.details}</p>
              <div className="mt-1 text-[11px] font-semibold text-[#98a2b3]">Actor: {event.actor}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
