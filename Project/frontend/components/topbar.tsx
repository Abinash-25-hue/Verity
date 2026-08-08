"use client";

import { Bell, Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Topbar({ onMenu }: { onMenu: () => void }) {
  return (
    <header className="sticky top-0 z-30 flex h-[72px] items-center justify-between border-b border-[#e4e7ec] bg-white/90 px-4 backdrop-blur sm:px-6 lg:px-8">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="lg:hidden" onClick={onMenu}>
          <Menu size={20} />
        </Button>
        <div className="hidden items-center gap-2 rounded-xl border border-[#e4e7ec] bg-[#f9fafb] px-3 py-2 sm:flex">
          <Search size={16} className="text-[#98a2b3]" />
          <input
            className="w-48 bg-transparent text-sm outline-none placeholder:text-[#98a2b3]"
            placeholder="Search requests..."
          />
          <kbd className="rounded-md border border-[#e4e7ec] bg-white px-1.5 py-0.5 text-[10px] text-[#98a2b3]">⌘ K</kbd>
        </div>
      </div>
      <div className="flex items-center gap-2 sm:gap-3">
        <Button variant="ghost" size="icon" className="sm:hidden">
          <Search size={19} />
        </Button>
        <Button variant="ghost" size="icon" className="relative">
          <Bell size={19} />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[#f04438]" />
        </Button>
        <div className="ml-1 flex items-center gap-2 border-l border-[#e4e7ec] pl-3">
          <div className="grid h-9 w-9 place-items-center rounded-full bg-[#e8e6ff] text-sm font-bold text-[#5148e8]">KM</div>
          <div className="hidden sm:block">
            <div className="text-xs font-bold text-[#344054]">Kavya Manager</div>
            <div className="text-[10px] text-[#98a2b3]">Approvals</div>
          </div>
        </div>
      </div>
    </header>
  );
}
