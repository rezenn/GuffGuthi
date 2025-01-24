import React from "react";
import DOMPurify from "dompurify";

function PostContent({ htmlContent }) {
  const sanitizedHtml = DOMPurify.sanitize(htmlContent);

  return (
    <div
      className="post-content"
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
  );
}

export default PostContent;
