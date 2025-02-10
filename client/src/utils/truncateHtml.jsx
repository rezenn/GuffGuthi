// utils/truncateHtml.js
export const truncateHtml = (html, maxLength) => {
  if (html.length <= maxLength) return html;

  // Truncate the HTML content
  let truncated = html.substr(0, maxLength);

  // Ensure the truncation doesn't break HTML tags
  const lastTagIndex = truncated.lastIndexOf("<");
  if (lastTagIndex > truncated.lastIndexOf(">")) {
    truncated = truncated.substr(0, lastTagIndex);
  }

  // Add ellipsis
  return `${truncated}...`;
};
