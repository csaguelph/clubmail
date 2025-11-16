"use client";

import PageContainer from "@/components/layout/PageContainer";
import { api } from "@/trpc/react";
import {
  FileIcon,
  Image as ImageIcon,
  Loader2,
  Search,
  Trash2,
} from "lucide-react";
import { useState } from "react";

export default function AdminMediaPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [mimeTypeFilter, setMimeTypeFilter] = useState<
    "image" | "document" | "all"
  >("all");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const {
    data: mediaData,
    isLoading,
    fetchNextPage,
    hasNextPage,
    refetch,
  } = api.media.list.useInfiniteQuery(
    {
      limit: 50,
      mimeTypeFilter,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    },
  );

  const { data: stats } = api.media.getStats.useQuery();

  const deleteMutation = api.media.delete.useMutation({
    onSuccess: () => {
      void refetch();
    },
  });

  const bulkDeleteMutation = api.media.bulkDelete.useMutation({
    onSuccess: () => {
      setSelectedIds(new Set());
      void refetch();
    },
  });

  const allItems = mediaData?.pages.flatMap((page) => page.items) ?? [];
  const filteredItems = allItems.filter((item) =>
    item.filename.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this media file?")) {
      await deleteMutation.mutateAsync({ id });
    }
  };

  const handleBulkDelete = async () => {
    if (
      selectedIds.size === 0 ||
      !confirm(
        `Are you sure you want to delete ${selectedIds.size} media file(s)?`,
      )
    ) {
      return;
    }

    await bulkDeleteMutation.mutateAsync({ ids: Array.from(selectedIds) });
  };

  const toggleSelection = (id: string) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === filteredItems.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredItems.map((item) => item.id)));
    }
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Media Library</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage uploaded media files across all clubs
        </p>
      </div>

      {/* Stats */}
      {stats && (
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-lg bg-white p-4 shadow">
            <p className="text-sm font-medium text-gray-500">Total Files</p>
            <p className="mt-1 text-2xl font-semibold text-gray-900">
              {stats.totalFiles}
            </p>
          </div>
          <div className="rounded-lg bg-white p-4 shadow">
            <p className="text-sm font-medium text-gray-500">Total Size</p>
            <p className="mt-1 text-2xl font-semibold text-gray-900">
              {formatBytes(stats.totalSize)}
            </p>
          </div>
          <div className="rounded-lg bg-white p-4 shadow">
            <p className="text-sm font-medium text-gray-500">By Type</p>
            <div className="mt-1 space-y-1">
              {stats.byMimeType.slice(0, 3).map((type) => (
                <div key={type.mimeType} className="text-sm text-gray-600">
                  {type.mimeType.split("/")[0]}: {type._count}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Filters and Search */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search files..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="rounded-md border border-gray-300 py-2 pr-4 pl-10 text-sm focus:border-[#b1d135] focus:ring-1 focus:ring-[#b1d135] focus:outline-none"
            />
          </div>

          <select
            value={mimeTypeFilter}
            onChange={(e) =>
              setMimeTypeFilter(e.target.value as "image" | "document" | "all")
            }
            className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-[#b1d135] focus:ring-1 focus:ring-[#b1d135] focus:outline-none"
          >
            <option value="all">All Types</option>
            <option value="image">Images</option>
            <option value="document">Documents</option>
          </select>
        </div>

        {selectedIds.size > 0 && (
          <button
            onClick={handleBulkDelete}
            disabled={bulkDeleteMutation.isPending}
            className="inline-flex items-center gap-2 rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {bulkDeleteMutation.isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Trash2 className="h-4 w-4" />
            )}
            Delete {selectedIds.size} item{selectedIds.size > 1 ? "s" : ""}
          </button>
        )}
      </div>

      {/* Media Grid */}
      <div className="rounded-lg bg-white shadow">
        {isLoading ? (
          <div className="flex h-64 items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="flex h-64 flex-col items-center justify-center text-gray-500">
            <ImageIcon className="mb-2 h-12 w-12 text-gray-300" />
            <p className="text-sm">
              {searchQuery ? "No matching files found" : "No media files yet"}
            </p>
          </div>
        ) : (
          <>
            {/* Table Header */}
            <div className="border-b border-gray-200 px-6 py-3">
              <div className="grid grid-cols-12 gap-4 text-xs font-medium tracking-wide text-gray-500 uppercase">
                <div className="col-span-1">
                  <input
                    type="checkbox"
                    checked={
                      filteredItems.length > 0 &&
                      selectedIds.size === filteredItems.length
                    }
                    onChange={toggleSelectAll}
                    className="h-4 w-4 rounded border-gray-300 text-[#b1d135] focus:ring-[#b1d135]"
                  />
                </div>
                <div className="col-span-1">Preview</div>
                <div className="col-span-3">Filename</div>
                <div className="col-span-2">Club</div>
                <div className="col-span-2">Uploaded By</div>
                <div className="col-span-1">Size</div>
                <div className="col-span-1">Date</div>
                <div className="col-span-1">Actions</div>
              </div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-gray-200">
              {filteredItems.map((item) => (
                <MediaRow
                  key={item.id}
                  item={item}
                  isSelected={selectedIds.has(item.id)}
                  onToggleSelect={() => toggleSelection(item.id)}
                  onDelete={() => void handleDelete(item.id)}
                  formatBytes={formatBytes}
                />
              ))}
            </div>

            {/* Load More */}
            {hasNextPage && (
              <div className="border-t border-gray-200 p-4 text-center">
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
    </PageContainer>
  );
}

interface MediaRowProps {
  item: {
    id: string;
    url: string;
    filename: string;
    mimeType: string;
    size: number;
    createdAt: Date;
    club: { id: string; name: string; slug: string } | null;
    uploadedBy: { id: string; name: string; email: string };
  };
  isSelected: boolean;
  onToggleSelect: () => void;
  onDelete: () => void;
  formatBytes: (bytes: number) => string;
}

function MediaRow({
  item,
  isSelected,
  onToggleSelect,
  onDelete,
  formatBytes,
}: MediaRowProps) {
  const isImage = item.mimeType.startsWith("image/");

  return (
    <div className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-50">
      <div className="col-span-1 flex items-center">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={onToggleSelect}
          className="h-4 w-4 rounded border-gray-300 text-[#b1d135] focus:ring-[#b1d135]"
        />
      </div>
      <div className="col-span-1 flex items-center">
        {isImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.url}
            alt={item.filename}
            className="h-10 w-10 rounded object-cover"
          />
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded bg-gray-100">
            <FileIcon className="h-6 w-6 text-gray-400" />
          </div>
        )}
      </div>
      <div className="col-span-3 flex items-center">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-gray-900">
            {item.filename}
          </p>
          <p className="text-xs text-gray-500">{item.mimeType}</p>
        </div>
      </div>
      <div className="col-span-2 flex items-center">
        <p className="text-sm text-gray-900">{item.club?.name ?? "Global"}</p>
      </div>
      <div className="col-span-2 flex items-center">
        <div className="min-w-0">
          <p className="truncate text-sm text-gray-900">
            {item.uploadedBy.name}
          </p>
          <p className="truncate text-xs text-gray-500">
            {item.uploadedBy.email}
          </p>
        </div>
      </div>
      <div className="col-span-1 flex items-center">
        <p className="text-sm text-gray-900">{formatBytes(item.size)}</p>
      </div>
      <div className="col-span-1 flex items-center">
        <p className="text-sm text-gray-900">
          {new Date(item.createdAt).toLocaleDateString()}
        </p>
      </div>
      <div className="col-span-1 flex items-center">
        <button
          onClick={onDelete}
          className="rounded-md p-1 text-red-600 hover:bg-red-50"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
