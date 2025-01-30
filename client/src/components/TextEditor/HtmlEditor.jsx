import React, { useEffect } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import "./HtmlEditor.css"; // Import your custom CSS

function HtmlEditor({ value, onChange }) {
  const { quill, quillRef } = useQuill({
    modules: {
      toolbar: [
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ header: [1, 2, 3, false] }],
        ["link"],
        [{ color: [] }, { background: [] }],
        ["clean"],
      ],
    },
  });
  useEffect(() => {
    if (quill) {
      const handlePaste = (event) => {
        const clipboardData = event.clipboardData || window.clipboardData;
        const items = clipboardData.items;

        for (let i = 0; i < items.length; i++) {
          if (
            items[i].type.indexOf("image") !== -1 ||
            items[i].type.indexOf("video") !== -1
          ) {
            event.preventDefault();
            alert("Image and video pasting is not allowed.");
            return;
          }
        }
      };

      quill.root.addEventListener("paste", handlePaste);

      return () => {
        quill.root.removeEventListener("paste", handlePaste);
      };
    }
  }, [quill]);
  useEffect(() => {
    if (quill) {
      quill.on("text-change", () => {
        const links = quill.root.querySelectorAll("a");
        links.forEach((link) => {
          link.setAttribute("target", "_blank"); // Open links in a new tab
          link.setAttribute("rel", "noopener noreferrer"); // Security best practice
        });
      });
    }
  }, [quill]);

  useEffect(() => {
    if (quill) {
      const handler = () => {
        const html = quill.root.innerHTML;
        if (onChange) {
          onChange(html);
        }
      };

      quill.on("text-change", handler);

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
