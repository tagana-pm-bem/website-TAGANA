"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { TextStyle } from "@tiptap/extension-text-style";
import { Extension } from "@tiptap/core";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Heading3,
  Link as LinkIcon,
  Unlink,
  Type,
  Space,
  ChevronDown,
} from "lucide-react";
import { useState, useCallback } from "react";

// Extension untuk Font Size
const FontSize = Extension.create({
  name: "fontSize",
  addOptions() {
    return {
      types: ["textStyle"],
    };
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            default: null,
            parseHTML: (element) => element.style.fontSize.replace(/['"]+/g, ""),
            renderHTML: (attributes) => {
              if (!attributes.fontSize) {
                return {};
              }
              return {
                style: `font-size: ${attributes.fontSize}`,
              };
            },
          },
        },
      },
    ];
  },
  addCommands() {
    return {
      setFontSize:
        (fontSize: string) =>
        ({ chain }) => {
          return chain().setMark("textStyle", { fontSize }).run();
        },
      unsetFontSize:
        () =>
        ({ chain }) => {
          return chain().setMark("textStyle", { fontSize: null }).removeEmptyTextStyle().run();
        },
    };
  },
});

// Extension untuk Line Height
const LineHeight = Extension.create({
  name: "lineHeight",
  addOptions() {
    return {
      types: ["paragraph", "heading"],
    };
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          lineHeight: {
            default: null,
            parseHTML: (element) => element.style.lineHeight,
            renderHTML: (attributes) => {
              if (!attributes.lineHeight) {
                return {};
              }
              return {
                style: `line-height: ${attributes.lineHeight}`,
              };
            },
          },
        },
      },
    ];
  },
  addCommands() {
    return {
      setLineHeight:
        (lineHeight: string) =>
        ({ commands }) => {
          return this.options.types.every((type: string) =>
            commands.updateAttributes(type, { lineHeight })
          );
        },
      unsetLineHeight:
        () =>
        ({ commands }) => {
          return this.options.types.every((type: string) =>
            commands.resetAttributes(type, "lineHeight")
          );
        },
    };
  },
});

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
}

export default function RichTextEditor({ content, onChange }: RichTextEditorProps) {
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [showFontSize, setShowFontSize] = useState(false);
  const [showLineHeight, setShowLineHeight] = useState(false);

  const baseBtn =
    "h-9 w-9 flex items-center justify-center rounded-lg border border-transparent text-gray-600 transition hover:bg-gray-100";
  const activeBtn =
    "border-blue-500 bg-blue-50 text-blue-600 ring-1 ring-blue-300";

  const fontSizes = [
    { label: "Kecil", value: "12px" },
    { label: "Normal", value: "14px" },
    { label: "Sedang", value: "16px" },
    { label: "Besar", value: "18px" },
    { label: "Sangat Besar", value: "24px" },
  ];

  const lineHeights = [
    { label: "Rapat", value: "1.2" },
    { label: "Normal", value: "1.5" },
    { label: "Longgar", value: "1.8" },
    { label: "Sangat Longgar", value: "2.0" },
  ];

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
      Underline,
      Image,
      TextStyle,
      FontSize,
      LineHeight,
      Link.configure({
        openOnClick: false,
        autolink: true,
        linkOnPaste: true,
        HTMLAttributes: {
          class: "text-blue-600 underline hover:text-blue-800 cursor-pointer",
        },
      }),
    ],
    content: content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "min-h-[200px] p-4 focus:outline-none text-sm text-gray-800 prose prose-sm max-w-none [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:mb-4 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mb-3 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:mb-2",
      },
    },
  });

  const setLink = useCallback(() => {
    if (!editor) return;

    // Cek apakah ada teks yang dipilih
    const { from, to } = editor.state.selection;
    if (from === to) {
      alert("Pilih teks terlebih dahulu untuk dijadikan link!");
      return;
    }

    // Ambil URL yang sudah ada jika sedang edit link
    const previousUrl = editor.getAttributes("link").href || "";
    setLinkUrl(previousUrl);
    setShowLinkInput(true);
  }, [editor]);

  const handleSetLink = useCallback(() => {
    if (!editor) return;

    // Cancelled
    if (linkUrl === null || linkUrl.trim() === "") {
      setShowLinkInput(false);
      return;
    }

    // Validasi URL sederhana
    let url = linkUrl.trim();
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      url = "https://" + url;
    }

    // Set link
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();

    // Reset
    setLinkUrl("");
    setShowLinkInput(false);
  }, [editor, linkUrl]);

  const removeLink = useCallback(() => {
    if (!editor) return;
    editor.chain().focus().unsetLink().run();
  }, [editor]);

  if (!editor) return null;

  return (
    <div className="w-full rounded-xl border border-gray-300 shadow-sm bg-white overflow-hidden">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 border-b border-gray-200 p-2 bg-blue-50">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`${baseBtn} ${editor.isActive("heading", { level: 1 }) ? activeBtn : ""}`}
          title="Heading 1"
        >
          <Heading1 size={16} />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`${baseBtn} ${editor.isActive("heading", { level: 2 }) ? activeBtn : ""}`}
          title="Heading 2"
        >
          <Heading2 size={16} />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`${baseBtn} ${editor.isActive("heading", { level: 3 }) ? activeBtn : ""}`}
          title="Heading 3"
        >
          <Heading3 size={16} />
        </button>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`${baseBtn} ${editor.isActive("bold") ? activeBtn : ""}`}
          title="Bold"
        >
          <Bold size={16} />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`${baseBtn} ${editor.isActive("italic") ? activeBtn : ""}`}
          title="Italic"
        >
          <Italic size={16} />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`${baseBtn} ${editor.isActive("underline") ? activeBtn : ""}`}
          title="Underline"
        >
          <UnderlineIcon size={16} />
        </button>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        {/* Dropdown Ukuran Font */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowFontSize(!showFontSize)}
            className={`${baseBtn} w-auto px-2 gap-1`}
            title="Ukuran Font"
          >
            <Type size={16} />
            <ChevronDown size={12} />
          </button>
          {showFontSize && (
            <div className="absolute top-full left-0 mt-1 bg-white shadow-lg rounded-lg p-2 z-20 border border-gray-200 min-w-[140px]">
              {fontSizes.map((size) => (
                <button
                  key={size.value}
                  type="button"
                  onClick={() => {
                    editor.chain().focus().setFontSize(size.value).run();
                    setShowFontSize(false);
                  }}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-blue-50 rounded transition"
                >
                  {size.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Dropdown Spasi Baris */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowLineHeight(!showLineHeight)}
            className={`${baseBtn} w-auto px-2 gap-1`}
            title="Spasi Baris"
          >
            <Space size={16} />
            <ChevronDown size={12} />
          </button>
          {showLineHeight && (
            <div className="absolute top-full left-0 mt-1 bg-white shadow-lg rounded-lg p-2 z-20 border border-gray-200 min-w-[160px]">
              {lineHeights.map((height) => (
                <button
                  key={height.value}
                  type="button"
                  onClick={() => {
                    editor.chain().focus().setLineHeight(height.value).run();
                    setShowLineHeight(false);
                  }}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-blue-50 rounded transition"
                >
                  {height.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`${baseBtn} ${editor.isActive("bulletList") ? activeBtn : ""}`}
          title="Bullet List"
        >
          <List size={16} />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`${baseBtn} ${editor.isActive("orderedList") ? activeBtn : ""}`}
          title="Numbered List"
        >
          <ListOrdered size={16} />
        </button>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        {/* Tombol Insert Link */}
        <button
          type="button"
          onClick={setLink}
          className={`${baseBtn} ${editor.isActive("link") ? activeBtn : ""}`}
          title="Insert Link"
        >
          <LinkIcon size={16} />
        </button>

        {/* Tombol Remove Link */}
        {editor.isActive("link") && (
          <button
            type="button"
            onClick={removeLink}
            className={`${baseBtn} text-red-600 hover:bg-red-50`}
            title="Remove Link"
          >
            <Unlink size={16} />
          </button>
        )}
      </div>

      {/* Modal Input Link */}
      {showLinkInput && (
        <div className="border-b border-gray-200 p-3 bg-gray-50 flex items-center gap-2">
          <input
            type="text"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            placeholder="https://example.com"
            className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSetLink();
              }
              if (e.key === "Escape") {
                setShowLinkInput(false);
                setLinkUrl("");
              }
            }}
            autoFocus
          />
          <button
            type="button"
            onClick={handleSetLink}
            className="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition"
          >
            Simpan
          </button>
          <button
            type="button"
            onClick={() => {
              setShowLinkInput(false);
              setLinkUrl("");
            }}
            className="px-4 py-2 bg-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-400 transition"
          >
            Batal
          </button>
        </div>
      )}

      <EditorContent editor={editor} />
    </div>
  );
}