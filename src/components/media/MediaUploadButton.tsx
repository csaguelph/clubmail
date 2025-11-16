"use client";

import { api } from "@/trpc/react";
import { Loader2, Upload } from "lucide-react";
import { useCallback, useState } from "react";

interface MediaUploadButtonProps {
  clubId?: string;
  onUpload: (media: { id: string; url: string; alt: string }) => void;
  accept?: string;
  className?: string;
  children?: React.ReactNode;
}

export function MediaUploadButton({
  clubId,
  onUpload,
  accept = "image/*",
  className = "",
  children,
}: MediaUploadButtonProps) {
  const [uploading, setUploading] = useState(false);

  const uploadMutation = api.media.upload.useMutation({
    onSuccess: (data) => {
      onUpload({
        id: data.id,
        url: data.url,
        alt: data.altText || data.filename,
      });
      setUploading(false);
    },
    onError: (error) => {
      alert(`Upload failed: ${error.message}`);
      setUploading(false);
    },
  });

  const handleFileSelect = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      setUploading(true);

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

      // Reset input
      e.target.value = "";
    },
    [uploadMutation, clubId],
  );

  return (
    <label
      className={
        className ||
        "inline-flex cursor-pointer items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
      }
    >
      <input
        type="file"
        className="hidden"
        accept={accept}
        onChange={handleFileSelect}
        disabled={uploading}
      />
      {uploading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Upload className="h-4 w-4" />
      )}
      {children || (uploading ? "Uploading..." : "Upload")}
    </label>
  );
}
