import React, { useEffect } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import "./HtmlEditor.css"; // Import your custom CSS

function HtmlEditor({ value, onChange }) {
  const { quill, quillRef } = useQuill();

  // Set initial value when the Quill editor initializes
  useEffect(() => {
    if (quill && value) {
      quill.clipboard.dangerouslyPasteHTML(value);
    }
  }, [quill]);

  // Handle content changes in the editor
  useEffect(() => {
    if (quill) {
      const handler = () => {
        const html = quill.root.innerHTML; // Get the HTML content
        if (onChange) {
          onChange(html);
        }
      };

      quill.on("text-change", handler);

      // Cleanup the event listener when the component unmounts
      return () => {
        quill.off("text-change", handler);
      };
    }
  }, [quill, onChange]);

  return (
    <div className="Editor">
      <div ref={quillRef} style={{ width: "100%", height: 300 }} />
    </div>
  );
}

export default HtmlEditor;
