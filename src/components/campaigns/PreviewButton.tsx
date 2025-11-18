import { Eye } from "lucide-react";

import { Button } from "@/components/ui";

interface PreviewButtonProps {
  html: string;
}

export function PreviewButton({ html }: PreviewButtonProps) {
  const handleClick = () => {
    const win = window.open("", "_blank");
    if (win) {
      win.document.write(html);
      win.document.close();
    }
  };

  return (
    <Button
      onClick={handleClick}
      variant="secondary"
      size="sm"
      className="inline-flex items-center gap-2"
    >
      <Eye className="h-4 w-4" aria-hidden="true" />
      Open in New Tab
    </Button>
  );
}
