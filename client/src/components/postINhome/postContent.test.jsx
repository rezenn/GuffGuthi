import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import PostContent from "./PostContent";
import DOMPurify from "dompurify";

// Mocking DOMPurify to prevent actual sanitization in test
jest.mock("dompurify", () => ({
  sanitize: jest.fn((input) => input), // Simply returns input as sanitized for testing purposes
}));

describe("PostContent Component", () => {
  it("renders sanitized content", () => {
    const content = "<script>alert('test');</script><p>This is a post.</p>";
    render(<PostContent htmlContent={content} />);

    // Verify that sanitized content is rendered
    expect(screen.getByText("This is a post.")).toBeInTheDocument();
    expect(screen.queryByText("alert('test');")).not.toBeInTheDocument(); // The malicious script should be removed
  });
});
