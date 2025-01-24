import React, { useEffect } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import "./HtmlEditor.css";

function HtmlEditor({ value, onChange }) {
  const { quill, quillRef } = useQuill();

  // Set initial value when the Quill editor initializes
  useEffect(() => {
    if (quill && value) {
      quill.clipboard.dangerouslyPasteHTML(value);
    }
  }, [quill, value]);

  // Handle content changes in the editor
  useEffect(() => {
    if (quill) {
      quill.on("text-change", () => {
        const html = quill.root.innerHTML; // Get the HTML content
        if (onChange) {
          onChange(html);
        }
      });
    }
  }, [quill, onChange]);

  return (
    <div className="Editor">
      <div ref={quillRef} style={{ width: 930, height: 300 }} />
    </div>
  );
}

export default HtmlEditor;
