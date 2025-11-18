"use client";

/*
  Note: some generated preview HTML may include <img> tags coming from user content.
  The accessibility rule for alt text is important, but those images are part of preview
  HTML and handled elsewhere. Disable the file-level rule to avoid false positives
  while keeping the rest of lint checks active.
*/
/* eslint-disable jsx-a11y/alt-text */

import { MediaBrowser } from "@/components/media/MediaBrowser";
import { MediaUploadButton } from "@/components/media/MediaUploadButton";
import {
  ChevronDown,
  ChevronUp,
  Eye,
  GripVertical,
  Heading1,
  Image,
  Link,
  Minus,
  Plus,
  Trash2,
  Type,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { RichTextEditor } from "./RichTextEditor";
import type { EmailBlock, EmailBlockType } from "./types";
import { generateEmailHTML } from "./utils";

interface EmailEditorProps {
  blocks: EmailBlock[];
  onChange: (blocks: EmailBlock[]) => void;
  clubName?: string;
  brandColor?: string;
  clubId?: string;
  socialLinks?: Record<string, string> | null;
}

export function EmailEditor({
  blocks,
  onChange,
  clubName = "Your Club",
  brandColor = "#b1d135",
  clubId,
  socialLinks,
}: EmailEditorProps) {
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(true);
  const [draggedBlockId, setDraggedBlockId] = useState<string | null>(null);

  const addBlock = (type: EmailBlockType) => {
    const newBlock: EmailBlock = createDefaultBlock(type);
    onChange([...blocks, newBlock]);
    setSelectedBlockId(newBlock.id);
  };

  const updateBlock = (id: string, updates: Partial<EmailBlock>) => {
    onChange(
      blocks.map((block) =>
        block.id === id ? ({ ...block, ...updates } as EmailBlock) : block,
      ),
    );
  };

  const deleteBlock = (id: string) => {
    onChange(blocks.filter((block) => block.id !== id));
    if (selectedBlockId === id) {
      setSelectedBlockId(null);
    }
  };

  const moveBlock = (id: string, direction: "up" | "down") => {
    const index = blocks.findIndex((b) => b.id === id);
    if (index === -1) return;

    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= blocks.length) return;

    const newBlocks = [...blocks];
    [newBlocks[index], newBlocks[newIndex]] = [
      newBlocks[newIndex]!,
      newBlocks[index]!,
    ];
    onChange(newBlocks);
  };

  const handleDragStart = (id: string) => {
    setDraggedBlockId(id);
  };

  const handleDragOver = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    if (!draggedBlockId || draggedBlockId === targetId) return;

    const draggedIndex = blocks.findIndex((b) => b.id === draggedBlockId);
    const targetIndex = blocks.findIndex((b) => b.id === targetId);

    if (draggedIndex === -1 || targetIndex === -1) return;

    const newBlocks = [...blocks];
    const [draggedBlock] = newBlocks.splice(draggedIndex, 1);
    newBlocks.splice(targetIndex, 0, draggedBlock!);
    onChange(newBlocks);
  };

  const handleDragEnd = () => {
    setDraggedBlockId(null);
  };

  const selectedBlock = blocks.find((b) => b.id === selectedBlockId);

  return (
    <div className="space-y-4">
      {/* Preview Toggle */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-700">Email Content</h3>
        <button
          type="button"
          onClick={() => setShowPreview(!showPreview)}
          className="inline-flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          <Eye className="h-4 w-4" />
          {showPreview ? "Hide Preview" : "Show Preview"}
        </button>
      </div>

      <div className="flex flex-col gap-4 lg:flex-row lg:gap-6">
        {/* Block List */}
        <div
          className={`space-y-2 ${showPreview ? "lg:flex-1" : selectedBlock ? "lg:flex-1" : "w-full"}`}
        >
          <div className="mb-4 flex items-center justify-between">
            <BlockMenu onAddBlock={addBlock} />
          </div>

          {blocks.length === 0 ? (
            <div className="rounded-lg border-2 border-dashed border-gray-300 p-8 text-center">
              <p className="text-sm text-gray-500">
                No blocks yet. Click the + button to add content.
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {blocks.map((block, index) => (
                <BlockItem
                  key={block.id}
                  block={block}
                  isSelected={selectedBlockId === block.id}
                  isDragging={draggedBlockId === block.id}
                  isFirst={index === 0}
                  isLast={index === blocks.length - 1}
                  onSelect={() => setSelectedBlockId(block.id)}
                  onDelete={() => deleteBlock(block.id)}
                  onMoveUp={() => moveBlock(block.id, "up")}
                  onMoveDown={() => moveBlock(block.id, "down")}
                  onDragStart={() => handleDragStart(block.id)}
                  onDragOver={(e) => handleDragOver(e, block.id)}
                  onDragEnd={handleDragEnd}
                />
              ))}
            </div>
          )}
        </div>

        {/* Block Editor */}
        {selectedBlock && (
          <div
            className={`overflow-y-auto rounded-lg border border-gray-200 bg-white p-4 lg:sticky lg:top-4 lg:max-h-[600px] lg:self-start ${showPreview ? "w-full lg:w-80" : "w-full lg:flex-1"}`}
          >
            <h3 className="mb-4 text-sm font-medium text-gray-900">
              Edit {selectedBlock.type}
            </h3>
            <BlockEditor
              block={selectedBlock}
              onChange={updateBlock}
              clubId={clubId}
            />
          </div>
        )}

        {/* Live Preview */}
        {showPreview && (
          <div className="w-full lg:flex-1">
            <div className="lg:sticky lg:top-4">
              <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
                <div className="border-b border-gray-200 bg-gray-50 px-4 py-2">
                  <p className="text-xs font-medium text-gray-600">
                    Live Preview
                  </p>
                </div>
                <div className="h-[400px] lg:h-[600px]">
                  <EmailPreview
                    blocks={blocks}
                    clubName={clubName}
                    brandColor={brandColor}
                    socialLinks={socialLinks}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function EmailPreview({
  blocks,
  clubName,
  brandColor,
  socialLinks,
}: {
  blocks: EmailBlock[];
  clubName: string;
  brandColor: string;
  socialLinks?: Record<string, string> | null;
}) {
  const [html, setHtml] = useState<string>("");

  useEffect(() => {
    // Include test unsubscribe URL in preview
    const baseUrl =
      typeof window !== "undefined"
        ? window.location.origin
        : "http://localhost:3000";
    const testUnsubscribeUrl = `${baseUrl}/unsubscribe?token=test`;

    generateEmailHTML(
      blocks,
      clubName,
      brandColor,
      testUnsubscribeUrl,
      socialLinks ?? null,
    )
      .then(setHtml)
      .catch((err) => console.error("Failed to generate email preview:", err));
  }, [blocks, clubName, brandColor, socialLinks]);

  if (!html) {
    return (
      <div className="flex h-full items-center justify-center text-gray-500">
        Generating preview...
      </div>
    );
  }

  return (
    <iframe
      srcDoc={html}
      className="h-full w-full border-0"
      title="Email Preview"
      sandbox="allow-same-origin"
    />
  );
}

function createDefaultBlock(type: EmailBlockType): EmailBlock {
  const id = `block-${Date.now()}`;

  switch (type) {
    case "heading":
      return { id, type: "heading", content: "Heading", level: 1 };
    case "richtext":
      return {
        id,
        type: "richtext",
        content: "<p>Enter your rich text here...</p>",
      };
    case "button":
      return {
        id,
        type: "button",
        text: "Click Here",
        url: "https://",
        align: "center",
      };
    case "image":
      return { id, type: "image", url: "", alt: "Image" };
    case "divider":
      return { id, type: "divider" };
    case "spacer":
      return { id, type: "spacer", height: 20 };
  }
}

function BlockMenu({
  onAddBlock,
}: {
  onAddBlock: (type: EmailBlockType) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const blockTypes: {
    type: EmailBlockType;
    label: string;
    icon: React.ReactNode;
  }[] = [
    {
      type: "heading",
      label: "Heading",
      icon: <Heading1 className="h-4 w-4" />,
    },
    {
      type: "richtext",
      label: "Rich Text",
      icon: <Type className="h-4 w-4" />,
    },
    { type: "button", label: "Button", icon: <Link className="h-4 w-4" /> },
    { type: "image", label: "Image", icon: <Image className="h-4 w-4" /> },
    { type: "divider", label: "Divider", icon: <Minus className="h-4 w-4" /> },
    { type: "spacer", label: "Spacer", icon: <div className="h-4 w-4" /> },
  ];

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 rounded-md bg-[#b1d135] px-3 py-1.5 text-sm font-medium text-gray-900 hover:bg-[#a0c030]"
      >
        <Plus className="h-4 w-4" />
        Add Block
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 z-20 mt-2 w-48 rounded-md border border-gray-200 bg-white shadow-lg">
            {blockTypes.map((bt) => (
              <button
                type="button"
                key={bt.type}
                onClick={() => {
                  onAddBlock(bt.type);
                  setIsOpen(false);
                }}
                className="flex w-full items-center gap-3 px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
              >
                {bt.icon}
                {bt.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function BlockItem({
  block,
  isSelected,
  isDragging,
  isFirst,
  isLast,
  onSelect,
  onDelete,
  onMoveUp,
  onMoveDown,
  onDragStart,
  onDragOver,
  onDragEnd,
}: {
  block: EmailBlock;
  isSelected: boolean;
  isDragging: boolean;
  isFirst: boolean;
  isLast: boolean;
  onSelect: () => void;
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onDragStart: () => void;
  onDragOver: (e: React.DragEvent) => void;
  onDragEnd: () => void;
}) {
  const blockRef = useRef<HTMLDivElement>(null);

  const handleDragStart = (e: React.DragEvent) => {
    // Set the drag image to the entire block
    if (blockRef.current) {
      e.dataTransfer.setDragImage(blockRef.current, 20, 20);
    }
    onDragStart();
  };

  const getBlockPreview = () => {
    switch (block.type) {
      case "heading":
        return block.content || "Heading";
      case "richtext":
        return "Rich Text Content";
      case "button":
        return `Button: ${block.text}`;
      case "image":
        return `Image: ${block.alt}`;
      case "divider":
        return "Divider";
      case "spacer":
        return `Spacer (${block.height}px)`;
    }
  };

  return (
    <div
      ref={blockRef}
      onDragOver={onDragOver}
      onClick={onSelect}
      className={`flex items-center gap-2 rounded-lg border p-3 transition ${
        isDragging
          ? "opacity-50"
          : isSelected
            ? "border-[#b1d135] bg-[#b1d135]/5"
            : "border-gray-200 bg-white hover:border-gray-300"
      }`}
    >
      {/* Drag Handle */}
      <div
        draggable
        onDragStart={handleDragStart}
        onDragEnd={onDragEnd}
        className="cursor-grab text-gray-400 hover:text-gray-600 active:cursor-grabbing"
        onClick={(e) => e.stopPropagation()}
      >
        <GripVertical className="h-5 w-5" />
      </div>

      <div className="flex flex-col gap-1">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onMoveUp();
          }}
          disabled={isFirst}
          className="text-gray-400 hover:text-gray-600 disabled:opacity-30"
        >
          <ChevronUp className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onMoveDown();
          }}
          disabled={isLast}
          className="text-gray-400 hover:text-gray-600 disabled:opacity-30"
        >
          <ChevronDown className="h-4 w-4" />
        </button>
      </div>

      <div className="flex-1">
        <div className="text-xs font-medium text-gray-500 uppercase">
          {block.type}
        </div>
        <div className="truncate text-sm text-gray-900">
          {getBlockPreview()}
        </div>
      </div>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        className="text-red-500 hover:text-red-700"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
}

function BlockEditor({
  block,
  onChange,
  clubId,
}: {
  block: EmailBlock;
  onChange: (id: string, updates: Partial<EmailBlock>) => void;
  clubId?: string;
}) {
  const [showMediaBrowser, setShowMediaBrowser] = useState(false);

  switch (block.type) {
    case "heading":
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Level
            </label>
            <select
              value={block.level}
              onChange={(e) =>
                onChange(block.id, {
                  level: parseInt(e.target.value) as 1 | 2 | 3,
                })
              }
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-[#b1d135] focus:ring-1 focus:ring-[#b1d135] focus:outline-none"
            >
              <option value="1">H1</option>
              <option value="2">H2</option>
              <option value="3">H3</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Content
            </label>
            <input
              type="text"
              value={block.content}
              onChange={(e) => onChange(block.id, { content: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-[#b1d135] focus:ring-1 focus:ring-[#b1d135] focus:outline-none"
            />
          </div>
        </div>
      );

    case "richtext":
      return (
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Rich Text Content
          </label>
          <RichTextEditor
            content={block.content}
            onChange={(html) => onChange(block.id, { content: html })}
          />
        </div>
      );

    case "button":
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Button Text
            </label>
            <input
              type="text"
              value={block.text}
              onChange={(e) => onChange(block.id, { text: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-[#b1d135] focus:ring-1 focus:ring-[#b1d135] focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              URL
            </label>
            <input
              type="url"
              value={block.url}
              onChange={(e) => onChange(block.id, { url: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-[#b1d135] focus:ring-1 focus:ring-[#b1d135] focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Alignment
            </label>
            <select
              value={block.align}
              onChange={(e) =>
                onChange(block.id, {
                  align: e.target.value as "left" | "center" | "right",
                })
              }
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-[#b1d135] focus:ring-1 focus:ring-[#b1d135] focus:outline-none"
            >
              <option value="left">Left</option>
              <option value="center">Center</option>
              <option value="right">Right</option>
            </select>
          </div>
        </div>
      );

    case "image":
      return (
        <div className="space-y-4">
          {showMediaBrowser ? (
            <div className="h-[400px] overflow-hidden rounded-lg border border-gray-200">
              <MediaBrowser
                clubId={clubId}
                onSelect={(media) => {
                  onChange(block.id, { url: media.url, alt: media.alt });
                  setShowMediaBrowser(false);
                }}
                onClose={() => setShowMediaBrowser(false)}
                allowUpload={true}
                mimeTypeFilter="image"
              />
            </div>
          ) : (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Image URL
                </label>
                <div className="mt-1 flex gap-2">
                  <input
                    type="url"
                    value={block.url}
                    onChange={(e) =>
                      onChange(block.id, { url: e.target.value })
                    }
                    placeholder="https://"
                    className="block flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-[#b1d135] focus:ring-1 focus:ring-[#b1d135] focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowMediaBrowser(true)}
                    className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Browse
                  </button>
                </div>
                <div className="mt-2">
                  <MediaUploadButton
                    clubId={clubId}
                    onUpload={(media) => {
                      onChange(block.id, { url: media.url, alt: media.alt });
                    }}
                    accept="image/*"
                  />
                </div>
              </div>
              {block.url && (
                <div className="rounded-lg border border-gray-200 p-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={block.url}
                    alt={block.alt}
                    className="max-h-40 w-full rounded object-contain"
                  />
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Alt Text
                </label>
                <input
                  type="text"
                  value={block.alt}
                  onChange={(e) => onChange(block.id, { alt: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-[#b1d135] focus:ring-1 focus:ring-[#b1d135] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Width (optional)
                </label>
                <input
                  type="number"
                  value={block.width ?? ""}
                  onChange={(e) =>
                    onChange(block.id, {
                      width: e.target.value
                        ? parseInt(e.target.value)
                        : undefined,
                    })
                  }
                  placeholder="Auto"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-[#b1d135] focus:ring-1 focus:ring-[#b1d135] focus:outline-none"
                />
              </div>
            </>
          )}
        </div>
      );

    case "spacer":
      return (
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Height (px)
          </label>
          <input
            type="number"
            value={block.height}
            onChange={(e) =>
              onChange(block.id, { height: parseInt(e.target.value) || 20 })
            }
            min="10"
            max="200"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-[#b1d135] focus:ring-1 focus:ring-[#b1d135] focus:outline-none"
          />
        </div>
      );

    case "divider":
      return (
        <div className="text-sm text-gray-500">
          No settings available for divider blocks.
        </div>
      );
  }
}
