"use client";
import React, { useRef, useMemo } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

interface QuillEditorProps {
  value: string;
  onChange: (content: string) => void;
}

const QuillEditor: React.FC<QuillEditorProps> = ({ value, onChange }) => {
  const quillRef = useRef<ReactQuill | null>(null);

  const handleEditorChange = (content: string) => {
    onChange(content);
  };

  const imageHandler = () => {
    const editor = quillRef.current?.getEditor();
    if (!editor) return;

    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];
      if (file && /^image\//.test(file.type)) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "prakash-media");

        try {
          const res = await fetch("https://api.cloudinary.com/v1_1/du1bbws62/image/upload", {
            method: "POST",
            body: formData,
          });

          if (!res.ok) {
            throw new Error("Image upload failed");
          }

          const data = await res.json();
          const url = data.secure_url;
          editor.insertEmbed(editor.getSelection()?.index || 0, "image", url);
        } catch (error) {
          console.error("Error uploading image:", error);
        }
      }
    };
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ["bold", "italic", "underline", "strike"],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          ["image", "link"],
          [
            {
              color: [
                "#000000",
                "#e60000",
                "#ff9900",
                "#ffff00",
                "#008a00",
                "#0066cc",
                "#9933ff",
                "#ffffff",
                "#facccc",
                "#ffebcc",
                "#ffffcc",
                "#cce8cc",
                "#cce0f5",
                "#ebd6ff",
                "#bbbbbb",
                "#f06666",
                "#ffc266",
                "#ffff66",
                "#66b966",
                "#66a3e0",
                "#c285ff",
                "#888888",
                "#a10000",
                "#b26b00",
                "#b2b200",
                "#006100",
                "#0047b2",
                "#6b24b2",
                "#444444",
                "#5c0000",
                "#663d00",
                "#666600",
                "#003700",
                "#002966",
                "#3d1466",
              ],
            },
          ],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    }),
    []
  );

  return (
    <div>
      <ReactQuill
        theme="snow"
        value={value}
        formats={formats}
        modules={modules}
        ref={quillRef}
        onChange={handleEditorChange}
        style={{ height: "auto" }}
      />
    </div>
  );
};

export default QuillEditor;
