"use client";

import { api } from "@/trpc/react";
import {
  Check,
  FileIcon,
  Image as ImageIcon,
  Loader2,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { useCallback, useState } from "react";

interface MediaBrowserProps {
  clubId?: string;
  onSelect?: (media: { id: string; url: string; alt: string }) => void;
  onClose?: () => void;
  allowUpload?: boolean;
  mimeTypeFilter?: "image" | "document" | "all";
}

export function MediaBrowser({
  clubId,
  onSelect,
  onClose,
  allowUpload = true,
  mimeTypeFilter = "image",
}: MediaBrowserProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [uploadingFile, setUploadingFile] = useState(false);

  const { data: configData } = api.media.isConfigured.useQuery();
  const {
    data: mediaData,
    isLoading,
    fetchNextPage,
    hasNextPage,
    refetch,
  } = api.media.list.useInfiniteQuery(
    {
      clubId,
      limit: 24,
      mimeTypeFilter,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    },
  );

  const uploadMutation = api.media.upload.useMutation({
    onSuccess: () => {
      void refetch();
      setUploadingFile(false);
    },
    onError: (error) => {
      alert(`Upload failed: ${error.message}`);
      setUploadingFile(false);
    },
  });

  const deleteMutation = api.media.delete.useMutation({
    onSuccess: () => {
      void refetch();
      setSelectedId(null);
    },
  });

  const handleFileSelect = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      setUploadingFile(true);

      // Read file as base64
      const reader = new FileReader();
      reader.onload = async (event) => {
        const base64Data = event.target?.result as string;
        const base64Content = base64Data.split(",")[1] ?? "";

        try {
          await uploadMutation.mutateAsync({
            filename: file.name,
            mimeType: file.type,
            base64Data: base64Content,
            clubId,
          });
        } catch (error) {
          console.error("Upload error:", error);
        }
      };
      reader.readAsDataURL(file);
    },
    [uploadMutation, clubId],
  );

  const handleSelect = useCallback(() => {
    if (!selectedId || !onSelect) return;

    const allItems = mediaData?.pages.flatMap((page) => page.items) ?? [];
    const selected = allItems.find((item) => item.id === selectedId);

    if (selected) {
      onSelect({
        id: selected.id,
        url: selected.url,
        alt: selected.altText ?? selected.filename,
      });
      onClose?.();
    }
  }, [selectedId, mediaData, onSelect, onClose]);

  const handleDelete = useCallback(
    async (id: string) => {
      if (confirm("Are you sure you want to delete this media file?")) {
        await deleteMutation.mutateAsync({ id });
      }
    },
    [deleteMutation],
  );

  const allItems = mediaData?.pages.flatMap((page) => page.items) ?? [];

  if (!configData?.configured) {
    return (
      <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
        <p className="text-sm text-yellow-800">
          Media uploads are not configured. Please contact your administrator to
          set up Cloudflare R2 storage.
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 p-4">
        <h3 className="text-lg font-semibold text-gray-900">Media Library</h3>
        <div className="flex items-center gap-2">
          {allowUpload && (
            <label className="cursor-pointer rounded-md bg-[#b1d135] px-3 py-1.5 text-sm font-medium text-gray-900 hover:bg-[#a0c030]">
              <input
                type="file"
                className="hidden"
                accept={
                  mimeTypeFilter === "image"
                    ? "image/*"
                    : mimeTypeFilter === "document"
                      ? "application/pdf"
                      : "*/*"
                }
                onChange={handleFileSelect}
                disabled={uploadingFile}
              />
              <div className="flex items-center gap-2">
                {uploadingFile ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Upload className="h-4 w-4" />
                )}
                Upload
              </div>
            </label>
          )}
          {onClose && (
            <button
              onClick={onClose}
              className="rounded-md p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      {/* Media Grid */}
      <div className="flex-1 overflow-y-auto p-4">
        {isLoading ? (
          <div className="flex h-full items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
          </div>
        ) : allItems.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center text-gray-500">
            <ImageIcon className="mb-2 h-12 w-12 text-gray-300" />
            <p className="text-sm">No media files yet</p>
            {allowUpload && (
              <p className="mt-1 text-xs text-gray-400">
                Click Upload to add files
              </p>
            )}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {allItems.map((item) => (
                <MediaItem
                  key={item.id}
                  item={item}
                  isSelected={selectedId === item.id}
                  onSelect={() => setSelectedId(item.id)}
                  onDelete={() => void handleDelete(item.id)}
                />
              ))}
            </div>

            {hasNextPage && (
              <div className="mt-4 text-center">
                <button
                  onClick={() => void fetchNextPage()}
                  className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Load More
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Footer */}
      {onSelect && (
        <div className="flex items-center justify-between border-t border-gray-200 p-4">
          <p className="text-sm text-gray-500">
            {selectedId ? "1 item selected" : "Select an item"}
          </p>
          <div className="flex gap-2">
            {onClose && (
              <button
                onClick={onClose}
                className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
            )}
            <button
              onClick={handleSelect}
              disabled={!selectedId}
              className="rounded-md bg-[#b1d135] px-4 py-2 text-sm font-medium text-gray-900 hover:bg-[#a0c030] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Insert
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

interface MediaItemProps {
  item: {
    id: string;
    url: string;
    filename: string;
    mimeType: string;
    altText: string | null;
    size: number;
  };
  isSelected: boolean;
  onSelect: () => void;
  onDelete: () => void;
}

function MediaItem({ item, isSelected, onSelect, onDelete }: MediaItemProps) {
  const isImage = item.mimeType.startsWith("image/");
  const sizeKB = (item.size / 1024).toFixed(1);

  return (
    <div
      onClick={onSelect}
      className={`group relative cursor-pointer overflow-hidden rounded-lg border-2 ${
        isSelected
          ? "ring-opacity-50 border-[#b1d135] ring-2 ring-[#b1d135]"
          : "border-gray-200 hover:border-gray-300"
      }`}
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
            <FileIcon className="h-12 w-12 text-gray-400" />
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
        <div className="absolute top-2 right-2 rounded-full bg-[#b1d135] p-1">
          <Check className="h-4 w-4 text-white" />
        </div>
      )}

      {/* Delete button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        className="absolute top-2 left-2 rounded-full bg-red-500 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
}
