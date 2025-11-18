import { Check, FileIcon, Trash2 } from "lucide-react";

import type { RouterOutputs } from "@/trpc/react";
import { cn } from "@/lib/utils";

type MediaItemData = RouterOutputs["media"]["list"]["items"][number];

interface MediaItemProps {
  item: MediaItemData;
  isSelected: boolean;
  onSelect: () => void;
  onDelete: () => void;
}

export function MediaItem({
  item,
  isSelected,
  onSelect,
  onDelete,
}: MediaItemProps) {
  const isImage = item.mimeType.startsWith("image/");
  const sizeKB = (item.size / 1024).toFixed(1);

  return (
    <div
      onClick={onSelect}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect();
        }
      }}
      className={cn(
        "group relative cursor-pointer overflow-hidden rounded-lg border-2 transition-colors",
        isSelected
          ? "ring-opacity-50 border-[#b1d135] ring-2 ring-[#b1d135]"
          : "border-gray-200 hover:border-gray-300",
      )}
      aria-label={`Select ${item.filename}`}
      aria-pressed={isSelected}
    >
      {/* Preview */}
      <div className="aspect-square bg-gray-100">
        {isImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.url}
            alt={item.altText ?? item.filename}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <FileIcon className="h-12 w-12 text-gray-400" aria-hidden="true" />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-2">
        <p className="truncate text-xs font-medium text-gray-900">
          {item.filename}
        </p>
        <p className="text-xs text-gray-500">{sizeKB} KB</p>
      </div>

      {/* Selection indicator */}
      {isSelected && (
        <div
          className="absolute top-2 right-2 rounded-full bg-[#b1d135] p-1"
          aria-hidden="true"
        >
          <Check className="h-4 w-4 text-white" />
        </div>
      )}

      {/* Delete button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        className={cn(
          "absolute top-2 left-2 rounded-full bg-red-500 p-1 text-white",
          "opacity-0 transition-opacity group-hover:opacity-100",
          "focus:opacity-100 focus:ring-2 focus:ring-red-500 focus:outline-none",
        )}
        aria-label={`Delete ${item.filename}`}
        title="Delete media file"
      >
        <Trash2 className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
}
