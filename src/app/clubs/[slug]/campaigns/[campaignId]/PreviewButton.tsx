"use client";

import { Eye } from "lucide-react";

interface PreviewButtonProps {
  html: string;
}

export default function PreviewButton({ html }: PreviewButtonProps) {
  const handleClick = () => {
    const win = window.open("", "_blank");
    if (win) {
      win.document.write(html);
      win.document.close();
    }
  };

  return (
    <button
      onClick={handleClick}
      className="inline-flex items-center gap-2 rounded-md bg-white px-3 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
    >
      <Eye className="h-4 w-4" />
      Open in New Tab
    </button>
  );
}
