"use client";

import { GripVertical, Heading1, Image, Link, Minus, Plus, Trash2, Type } from "lucide-react";
import { useState } from "react";
import type { EmailBlock, EmailBlockType } from "./types";

interface EmailEditorProps {
  blocks: EmailBlock[];
  onChange: (blocks: EmailBlock[]) => void;
}

export function EmailEditor({ blocks, onChange }: EmailEditorProps) {
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);

  const addBlock = (type: EmailBlockType) => {
    const newBlock: EmailBlock = createDefaultBlock(type);
    onChange([...blocks, newBlock]);
    setSelectedBlockId(newBlock.id);
  };

  const updateBlock = (id: string, updates: Partial<EmailBlock>) => {
    onChange(
      blocks.map((block) =>
        block.id === id ? ({ ...block, ...updates } as EmailBlock) : block
      )
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

  const selectedBlock = blocks.find((b) => b.id === selectedBlockId);

  return (
    <div className="flex gap-6">
      {/* Block List */}
      <div className="flex-1 space-y-2">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-700">Email Content</h3>
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
                isFirst={index === 0}
                isLast={index === blocks.length - 1}
                onSelect={() => setSelectedBlockId(block.id)}
                onDelete={() => deleteBlock(block.id)}
                onMoveUp={() => moveBlock(block.id, "up")}
                onMoveDown={() => moveBlock(block.id, "down")}
              />
            ))}
          </div>
        )}
      </div>

      {/* Block Editor */}
      {selectedBlock && (
        <div className="w-80 rounded-lg border border-gray-200 bg-white p-4">
          <h3 className="mb-4 text-sm font-medium text-gray-900">
            Edit {selectedBlock.type}
          </h3>
          <BlockEditor block={selectedBlock} onChange={updateBlock} />
        </div>
      )}
    </div>
  );
}

function createDefaultBlock(type: EmailBlockType): EmailBlock {
  const id = `block-${Date.now()}`;

  switch (type) {
    case "heading":
      return { id, type: "heading", content: "Heading", level: 1 };
    case "text":
      return { id, type: "text", content: "Enter your text here..." };
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

function BlockMenu({ onAddBlock }: { onAddBlock: (type: EmailBlockType) => void }) {
  const [isOpen, setIsOpen] = useState(false);

  const blockTypes: { type: EmailBlockType; label: string; icon: React.ReactNode }[] = [
    { type: "heading", label: "Heading", icon: <Heading1 className="h-4 w-4" /> },
    { type: "text", label: "Text", icon: <Type className="h-4 w-4" /> },
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
  isFirst,
  isLast,
  onSelect,
  onDelete,
  onMoveUp,
  onMoveDown,
}: {
  block: EmailBlock;
  isSelected: boolean;
  isFirst: boolean;
  isLast: boolean;
  onSelect: () => void;
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
}) {
  const getBlockPreview = () => {
    switch (block.type) {
      case "heading":
        return block.content || "Heading";
      case "text":
        return block.content || "Text";
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
      onClick={onSelect}
      className={`flex items-center gap-2 rounded-lg border p-3 cursor-pointer transition ${
        isSelected
          ? "border-[#b1d135] bg-[#b1d135]/5"
          : "border-gray-200 bg-white hover:border-gray-300"
      }`}
    >
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
          <GripVertical className="h-4 w-4" />
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
          <GripVertical className="h-4 w-4" />
        </button>
      </div>

      <div className="flex-1">
        <div className="text-xs font-medium text-gray-500 uppercase">
          {block.type}
        </div>
        <div className="text-sm text-gray-900 truncate">{getBlockPreview()}</div>
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
}: {
  block: EmailBlock;
  onChange: (id: string, updates: Partial<EmailBlock>) => void;
}) {
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
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-[#b1d135] focus:outline-none focus:ring-1 focus:ring-[#b1d135]"
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
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-[#b1d135] focus:outline-none focus:ring-1 focus:ring-[#b1d135]"
            />
          </div>
        </div>
      );

    case "text":
      return (
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Content
          </label>
          <textarea
            value={block.content}
            onChange={(e) => onChange(block.id, { content: e.target.value })}
            rows={6}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-[#b1d135] focus:outline-none focus:ring-1 focus:ring-[#b1d135]"
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
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-[#b1d135] focus:outline-none focus:ring-1 focus:ring-[#b1d135]"
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
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-[#b1d135] focus:outline-none focus:ring-1 focus:ring-[#b1d135]"
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
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-[#b1d135] focus:outline-none focus:ring-1 focus:ring-[#b1d135]"
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
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Image URL
            </label>
            <input
              type="url"
              value={block.url}
              onChange={(e) => onChange(block.id, { url: e.target.value })}
              placeholder="https://"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-[#b1d135] focus:outline-none focus:ring-1 focus:ring-[#b1d135]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Alt Text
            </label>
            <input
              type="text"
              value={block.alt}
              onChange={(e) => onChange(block.id, { alt: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-[#b1d135] focus:outline-none focus:ring-1 focus:ring-[#b1d135]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Width (optional)
            </label>
            <input
              type="number"
              value={block.width || ""}
              onChange={(e) =>
                onChange(block.id, {
                  width: e.target.value ? parseInt(e.target.value) : undefined,
                })
              }
              placeholder="Auto"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-[#b1d135] focus:outline-none focus:ring-1 focus:ring-[#b1d135]"
            />
          </div>
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
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-[#b1d135] focus:outline-none focus:ring-1 focus:ring-[#b1d135]"
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
