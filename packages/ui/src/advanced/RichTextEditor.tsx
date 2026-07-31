import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { cn } from "@aurora-ui/utils";
import { BoldIcon, ItalicIcon, ListIcon, ListOrderedIcon, CodeIcon } from "@aurora-ui/icons";
import { Button } from "../primitives/Button/Button";

export interface RichTextEditorProps {
  content?: string;
  onChange?: (html: string) => void;
  className?: string;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  content = "<p>Aurora Rich Text Editor. Styled perfectly with Aurora tokens.</p>",
  onChange,
  className,
}) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className={cn("border border-[var(--aurora-border-base)] rounded-[var(--aurora-radius-xl)] bg-[var(--aurora-bg-surface)] overflow-hidden", className)}>
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1.5 p-2 border-b border-[var(--aurora-border-subtle)] bg-[var(--aurora-bg-surface-hover)]">
        <Button
          type="button"
          size="sm"
          variant={editor.isActive("bold") ? "solid" : "ghost"}
          onClick={() => editor.chain().focus().toggleBold().run()}
          className="h-8 w-8 p-0"
        >
          <BoldIcon size={14} />
        </Button>
        <Button
          type="button"
          size="sm"
          variant={editor.isActive("italic") ? "solid" : "ghost"}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className="h-8 w-8 p-0"
        >
          <ItalicIcon size={14} />
        </Button>
        <Button
          type="button"
          size="sm"
          variant={editor.isActive("bulletList") ? "solid" : "ghost"}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className="h-8 w-8 p-0"
        >
          <ListIcon size={14} />
        </Button>
        <Button
          type="button"
          size="sm"
          variant={editor.isActive("orderedList") ? "solid" : "ghost"}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className="h-8 w-8 p-0"
        >
          <ListOrderedIcon size={14} />
        </Button>
        <Button
          type="button"
          size="sm"
          variant={editor.isActive("codeBlock") ? "solid" : "ghost"}
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className="h-8 w-8 p-0"
        >
          <CodeIcon size={14} />
        </Button>
      </div>

      {/* Content Area */}
      <div className="p-4 min-h-[160px] text-[var(--aurora-fg-base)] text-sm prose max-w-none focus:outline-none">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};
export default RichTextEditor;