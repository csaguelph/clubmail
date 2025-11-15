"use client";

import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Bold, Italic, Link2, List, ListOrdered, Redo, Underline as UnderlineIcon, Undo } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
}

export function RichTextEditor({ content, onChange }: RichTextEditorProps) {
  const [, setUpdateTrigger] = useState(0);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [linkTarget, setLinkTarget] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        // Preserve multiple line breaks
        hardBreak: {
          keepMarks: true,
        },
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-600 underline',
        },
      }),
    ],
    content,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "prose prose-sm max-w-none focus:outline-none min-h-[150px] px-3 py-2",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
      setUpdateTrigger((prev) => prev + 1);
    },
    onSelectionUpdate: () => {
      setUpdateTrigger((prev) => prev + 1);
    },
    onTransaction: () => {
      setUpdateTrigger((prev) => prev + 1);
    },
  });

  const setLink = useCallback(() => {
    if (!editor) return;

  const linkAttrs = editor.getAttributes('link') as Record<string, unknown> | undefined;
  const previousUrl = (linkAttrs?.href as string) ?? '';
  const previousTarget = (linkAttrs?.target as string) === '_blank';

  setLinkUrl(previousUrl);
    // Default to true for new links, preserve existing value for editing
    setLinkTarget(previousUrl ? previousTarget : true);
    setShowLinkModal(true);
  }, [editor]);

  const applyLink = useCallback(() => {
    if (!editor) return;

    // empty
    if (linkUrl === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      setShowLinkModal(false);
      return;
    }

    // update link
    editor
      .chain()
      .focus()
      .extendMarkRange('link')
      .setLink({ 
        href: linkUrl,
        target: linkTarget ? '_blank' : null,
      })
      .run();
    
    setShowLinkModal(false);
  }, [editor, linkUrl, linkTarget]);

  // Update editor content when prop changes (for loading existing content)
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className="border border-gray-300 rounded-md overflow-hidden">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-1 p-2 border-b border-gray-200 bg-gray-50">
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive("bold")}
          title="Bold"
        >
          <Bold className="h-4 w-4" />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive("italic")}
          title="Italic"
        >
          <Italic className="h-4 w-4" />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          isActive={editor.isActive("underline")}
          title="Underline"
        >
          <UnderlineIcon className="h-4 w-4" />
        </ToolbarButton>

        <div className="w-px bg-gray-300 mx-1" />

        <ToolbarButton
          onClick={setLink}
          isActive={editor.isActive("link")}
          title="Add Link"
        >
          <Link2 className="h-4 w-4" />
        </ToolbarButton>

        <div className="w-px bg-gray-300 mx-1" />

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive("bulletList")}
          title="Bullet List"
        >
          <List className="h-4 w-4" />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive("orderedList")}
          title="Numbered List"
        >
          <ListOrdered className="h-4 w-4" />
        </ToolbarButton>

        <div className="w-px bg-gray-300 mx-1" />

        <ToolbarButton
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          title="Undo"
        >
          <Undo className="h-4 w-4" />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          title="Redo"
        >
          <Redo className="h-4 w-4" />
        </ToolbarButton>
      </div>

      {/* Editor Content */}
      <EditorContent editor={editor} />

      {/* Link Modal */}
      <Dialog open={showLinkModal} onClose={() => setShowLinkModal(false)} className="relative z-50">
        {/* Backdrop */}
        <div className="fixed inset-0 bg-black/50" aria-hidden="true" />

        {/* Full-screen container to center the panel */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-6 shadow-lg">
            <DialogTitle className="mb-4 text-lg font-semibold text-gray-900">
              Add/Edit Link
            </DialogTitle>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="link-url" className="block text-sm font-medium text-gray-700 mb-1">
                  URL
                </label>
                <input
                  id="link-url"
                  type="url"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-[#b1d135] focus:outline-none focus:ring-1 focus:ring-[#b1d135]"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      applyLink();
                    } else if (e.key === 'Escape') {
                      setShowLinkModal(false);
                    }
                  }}
                />
              </div>

              <div className="flex items-center">
                <input
                  id="link-target"
                  type="checkbox"
                  checked={linkTarget}
                  onChange={(e) => setLinkTarget(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-[#b1d135] focus:ring-[#b1d135]"
                />
                <label htmlFor="link-target" className="ml-2 text-sm text-gray-700">
                  Open in new tab
                </label>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowLinkModal(false)}
                className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={applyLink}
                className="rounded-md bg-[#b1d135] px-4 py-2 text-sm font-medium text-gray-900 hover:bg-[#a0c030]"
              >
                Apply
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
}

function ToolbarButton({
  onClick,
  isActive = false,
  disabled = false,
  title,
  children,
}: {
  onClick: () => void;
  isActive?: boolean;
  disabled?: boolean;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`p-1.5 rounded transition ${
        isActive
          ? "bg-[#b1d135] text-gray-900"
          : "bg-white text-gray-700 hover:bg-gray-100"
      } ${disabled ? "opacity-30 cursor-not-allowed" : ""}`}
    >
      {children}
    </button>
  );
}
