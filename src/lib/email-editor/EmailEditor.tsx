"use client";

import { ChevronDown, ChevronUp, Eye, GripVertical, Heading1, Image, Link, Minus, Plus, Trash2, Type } from "lucide-react";
import { useRef, useState } from "react";
import { RichTextEditor } from "./RichTextEditor";
import type { EmailBlock, EmailBlockType } from "./types";

interface EmailEditorProps {
  blocks: EmailBlock[];
  onChange: (blocks: EmailBlock[]) => void;
  clubName?: string;
}

export function EmailEditor({ blocks, onChange, clubName = "Your Club" }: EmailEditorProps) {
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

      <div className="flex gap-6">
        {/* Block List */}
        <div className={`space-y-2 ${showPreview ? 'flex-1' : selectedBlock ? 'flex-1' : 'w-full'}`}>
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
          <div className={`rounded-lg border border-gray-200 bg-white p-4 sticky top-4 self-start max-h-[600px] overflow-y-auto ${showPreview ? 'w-80' : 'flex-1'}`}>
            <h3 className="mb-4 text-sm font-medium text-gray-900">
              Edit {selectedBlock.type}
            </h3>
            <BlockEditor block={selectedBlock} onChange={updateBlock} />
          </div>
        )}

        {/* Live Preview */}
        {showPreview && (
          <div className="flex-1">
            <div className="sticky top-4">
              <div className="rounded-lg border border-gray-200 bg-white overflow-hidden">
                <div className="bg-gray-50 border-b border-gray-200 px-4 py-2">
                  <p className="text-xs font-medium text-gray-600">Live Preview</p>
                </div>
                <div className="p-6 max-h-[600px] overflow-y-auto">
                  <EmailPreview 
                    blocks={blocks} 
                    clubName={clubName}
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
}: { 
  blocks: EmailBlock[];
  clubName: string;
}) {
  return (
    <div style={{ 
      fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
      backgroundColor: '#ffffff',
      maxWidth: '600px',
      margin: '0 auto'
    }}>
      {blocks.map((block) => (
        <div key={block.id} style={{ marginBottom: '16px' }}>
          {renderPreviewBlock(block)}
        </div>
      ))}
      
      {/* Footer Preview */}
      <div style={{ 
        borderTop: '1px solid #e6ebf1', 
        marginTop: '32px',
        paddingTop: '20px'
      }}>
        <p style={{ 
          fontSize: '12px', 
          lineHeight: '1.5', 
          color: '#8898aa',
          marginBottom: '8px'
        }}>
          This content is created by {clubName} and is not reviewed or endorsed by the Central Student Association.
        </p>
        <p style={{ 
          fontSize: '12px', 
          lineHeight: '1.5', 
          color: '#8898aa',
          marginBottom: '8px'
        }}>
          University of Guelph, 50 Stone Road East, Guelph, ON N1G 2W1
        </p>
        <p style={{ 
          fontSize: '12px', 
          lineHeight: '1.5', 
          color: '#8898aa',
          marginBottom: '8px'
        }}>
          <span style={{ color: '#b1d135', textDecoration: 'underline' }}>Unsubscribe</span>
        </p>
      </div>
    </div>
  );
}

function renderPreviewBlock(block: EmailBlock) {
  switch (block.type) {
    case "heading":
      const headingStyle = {
        1: { fontSize: '32px', lineHeight: '1.3', fontWeight: '700', color: '#484848', marginBottom: '16px' },
        2: { fontSize: '24px', lineHeight: '1.3', fontWeight: '700', color: '#484848', marginBottom: '16px' },
        3: { fontSize: '20px', lineHeight: '1.3', fontWeight: '700', color: '#484848', marginBottom: '16px' },
      };
      const HeadingTag = `h${block.level}` as 'h1' | 'h2' | 'h3';
      return (
        <HeadingTag style={headingStyle[block.level]}>
          {block.content || 'Heading'}
        </HeadingTag>
      );

    case "richtext":
      return (
        <div 
          style={{ 
            fontSize: '16px', 
            lineHeight: '1.5', 
            color: '#484848',
            marginBottom: '16px'
          }}
        >
          <style>{`
            .richtext-preview p {
              margin-bottom: 1em;
            }
            .richtext-preview p:last-child {
              margin-bottom: 0;
            }
            .richtext-preview ul,
            .richtext-preview ol {
              padding-left: 1.5em;
              margin-bottom: 1em;
            }
            .richtext-preview ul {
              list-style-type: disc;
            }
            .richtext-preview ol {
              list-style-type: decimal;
            }
            .richtext-preview li {
              margin-bottom: 0.25em;
            }
            .richtext-preview strong {
              font-weight: 700;
            }
            .richtext-preview em {
              font-style: italic;
            }
            .richtext-preview u {
              text-decoration: underline;
            }
            .richtext-preview a {
              color: #3b82f6;
              text-decoration: underline;
            }
            .richtext-preview br {
              display: block;
              content: "";
              margin-top: 0.5em;
            }
          `}</style>
          <div 
            className="richtext-preview"
            dangerouslySetInnerHTML={{ __html: block.content || '<p>Enter your rich text here...</p>' }}
          />
        </div>
      );

    case "button":
      const buttonAlign = {
        left: 'flex-start',
        center: 'center',
        right: 'flex-end',
      };
      return (
        <div style={{ display: 'flex', justifyContent: buttonAlign[block.align] }}>
          <a
            href={block.url}
            style={{
              backgroundColor: '#b1d135',
              borderRadius: '5px',
              color: '#000',
              fontSize: '16px',
              fontWeight: 'bold',
              textDecoration: 'none',
              textAlign: 'center',
              display: 'inline-block',
              padding: '12px 24px',
            }}
          >
            {block.text || 'Button'}
          </a>
        </div>
      );

    case "image":
      if (!block.url) {
        return (
          <div style={{
            border: '2px dashed #e6ebf1',
            borderRadius: '4px',
            padding: '32px',
            textAlign: 'center',
            color: '#8898aa',
            fontSize: '14px'
          }}>
            No image URL provided
          </div>
        );
      }
      return (
        <img
          src={block.url}
          alt={block.alt}
          width={block.width}
          style={{ maxWidth: '100%', height: 'auto' }}
        />
      );

    case "divider":
      return (
        <hr style={{ 
          borderColor: '#e6ebf1',
          borderWidth: '1px 0 0 0',
          margin: '20px 0' 
        }} />
      );

    case "spacer":
      return <div style={{ height: block.height }} />;

    default:
      return null;
  }
}

function createDefaultBlock(type: EmailBlockType): EmailBlock {
  const id = `block-${Date.now()}`;

  switch (type) {
    case "heading":
      return { id, type: "heading", content: "Heading", level: 1 };
    case "richtext":
      return { id, type: "richtext", content: "<p>Enter your rich text here...</p>" };
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
    { type: "richtext", label: "Rich Text", icon: <Type className="h-4 w-4" /> },
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
        className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600"
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

    case "richtext":
      return (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
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
