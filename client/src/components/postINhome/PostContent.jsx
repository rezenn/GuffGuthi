import React, { useState } from "react";
import DOMPurify from "dompurify";
import { truncateHtml } from "../../utils/truncateHtml"; // Import the truncation utility

function PostContent({ htmlContent }) {
  const [isTruncated, setIsTruncated] = useState(true);
  const maxLength = 1000;

  const sanitizedHtml = DOMPurify.sanitize(htmlContent);
  const truncatedHtml = truncateHtml(sanitizedHtml, maxLength);

  const toggleTruncate = () => {
    setIsTruncated(!isTruncated);
  };

  return (
    <div className="post-content">
      <div
        dangerouslySetInnerHTML={{
          __html: isTruncated ? truncatedHtml : sanitizedHtml,
        }}
      />
      {sanitizedHtml.length > maxLength && (
        <button onClick={toggleTruncate} className="read-more-button">
          {isTruncated ? "Read More" : "Show Less"}
        </button>
      )}
    </div>
  );
}

export default PostContent;
