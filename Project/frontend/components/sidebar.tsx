"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  BarChart3,
  CheckCircle2,
  FileClock,
  FilePlus2,
  LayoutDashboard,
  Settings2,
  ShieldCheck,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/requests/new", label: "New Request", icon: FilePlus2 },
  { href: "/audit", label: "Audit Trail", icon: FileClock }
];

export function Sidebar({
  mobileOpen,
  onClose
}: {
  mobileOpen: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();

  return (
    <>
      {mobileOpen && (
        <button
          aria-label="Close navigation"
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-[250px] border-r border-[#e4e7ec] bg-white transition-transform lg:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-[72px] items-center justify-between border-b border-[#f0f2f5] px-5">
            <Link href="/" onClick={onClose} className="flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-[#635bff] text-white shadow-sm">
                <ShieldCheck size={20} />
              </div>
              <div>
                <div className="text-[17px] font-extrabold tracking-tight text-[#101828]">verity</div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#98a2b3]">approval copilot</div>
              </div>
            </Link>
            <button onClick={onClose} className="rounded-lg p-2 text-[#667085] hover:bg-[#f2f4f7] lg:hidden">
              <X size={18} />
            </button>
          </div>

          <div className="px-3 py-5">
            <div className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.15em] text-[#98a2b3]">
              Workspace
            </div>
            <nav className="space-y-1">
              {links.map((link) => {
                const Icon = link.icon;
                const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={onClose}
                    className={cn(
                      "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition",
                      active
                        ? "bg-[#eeecff] text-[#5148e8]"
                        : "text-[#667085] hover:bg-[#f8f9fc] hover:text-[#344054]"
                    )}
                  >
                    <Icon size={18} />
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="mt-auto p-4">
            <div className="rounded-2xl bg-[#101828] p-4 text-white">
              <div className="mb-3 flex items-center gap-2">
                <Activity size={16} className="text-[#a9a3ff]" />
                <span className="text-xs font-bold">AI system status</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#d0d5dd]">
                <span className="h-2 w-2 rounded-full bg-[#32d583]" />
                All agents operational
              </div>
            </div>
            <Link href="#" className="mt-3 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-[#667085] hover:bg-[#f8f9fc]">
              <Settings2 size={18} />
              Settings
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
