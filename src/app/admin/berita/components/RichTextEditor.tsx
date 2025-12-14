"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Heading from "@tiptap/extension-heading";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Heading3,
} from "lucide-react";

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
}

export default function RichTextEditor({ content, onChange }: RichTextEditorProps) {
  const baseBtn =
    "h-9 w-9 flex items-center justify-center rounded-lg border border-transparent text-gray-600 transition hover:bg-gray-100";
  const activeBtn =
    "border-blue-500 bg-blue-50 text-blue-600 ring-1 ring-blue-300";

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Image,
      Heading.configure({
        levels: [1, 2, 3],
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        linkOnPaste: true,
      }),
    ],
    content: content,
    immediatelyRender: false, 
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "min-h-[200px] p-4 focus:outline-none text-sm text-gray-800 prose prose-sm max-w-none",
      },
    },
  });

  if (!editor) return null;

  return (
    <div className="w-full rounded-xl border border-gray-300 shadow-sm bg-white overflow-hidden">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 border-b border-gray-200 p-2 bg-blue-50">
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`${baseBtn} ${editor.isActive("heading", { level: 1 }) ? activeBtn : ""}`}
          title="Heading 1"
        >
          <Heading1 size={16} />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`${baseBtn} ${editor.isActive("heading", { level: 2 }) ? activeBtn : ""}`}
          title="Heading 2"
        >
          <Heading2 size={16} />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`${baseBtn} ${editor.isActive("heading", { level: 3 }) ? activeBtn : ""}`}
          title="Heading 3"
        >
          <Heading3 size={16} />
        </button>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`${baseBtn} ${editor.isActive("bold") ? activeBtn : ""}`}
          title="Bold"
        >
          <Bold size={16} />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`${baseBtn} ${editor.isActive("italic") ? activeBtn : ""}`}
          title="Italic"
        >
          <Italic size={16} />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`${baseBtn} ${editor.isActive("underline") ? activeBtn : ""}`}
          title="Underline"
        >
          <UnderlineIcon size={16} />
        </button>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`${baseBtn} ${editor.isActive("bulletList") ? activeBtn : ""}`}
          title="Bullet List"
        >
          <List size={16} />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`${baseBtn} ${editor.isActive("orderedList") ? activeBtn : ""}`}
          title="Numbered List"
        >
          <ListOrdered size={16} />
        </button>
      </div>

      <EditorContent editor={editor} />
    </div>
  );
}