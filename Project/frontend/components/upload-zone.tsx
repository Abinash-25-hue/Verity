"use client";

import { useRef, useState } from "react";
import { FileUp, FileText, X } from "lucide-react";

export function UploadZone({
  onFile
}: {
  onFile: (file: File | null) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);

  function selectFile(next: File | null) {
    setFile(next);
    onFile(next);
  }

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
        onChange={(e) => selectFile(e.target.files?.[0] ?? null)}
      />
      {!file ? (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#d0d5dd] bg-[#fcfcfd] px-6 py-10 text-center transition hover:border-[#a9a3ff] hover:bg-[#faf9ff]"
        >
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#eeecff] text-[#635bff]">
            <FileUp size={22} />
          </div>
          <div className="mt-4 text-sm font-bold text-[#344054]">Upload supporting document</div>
          <div className="mt-1 text-xs text-[#98a2b3]">PDF, DOCX, PNG or JPG · up to 10 MB</div>
        </button>
      ) : (
        <div className="flex items-center justify-between rounded-2xl border border-[#d0d5dd] bg-[#fcfcfd] p-4">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#eef4ff] text-[#2e90fa]">
              <FileText size={18} />
            </div>
            <div>
              <div className="text-sm font-bold text-[#344054]">{file.name}</div>
              <div className="text-xs text-[#98a2b3]">{(file.size / 1024 / 1024).toFixed(2)} MB</div>
            </div>
          </div>
          <button type="button" onClick={() => selectFile(null)} className="rounded-lg p-2 text-[#98a2b3] hover:bg-[#f2f4f7] hover:text-[#344054]">
            <X size={18} />
          </button>
        </div>
      )}
    </div>
  );
}
