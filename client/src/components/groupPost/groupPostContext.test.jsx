import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import GroupPostContent from "./groupPostContext";

describe("GroupPostContent Component", () => {
  const longText = "<p>" + "A".repeat(2000) + "</p>";
  const shortText = "<p>Short text</p>";

  test("renders truncated content when text is too long", () => {
    render(<GroupPostContent htmlContent={longText} />);
    expect(screen.getByText("Read More")).toBeInTheDocument();
  });

  test("expands content when 'Read More' is clicked", () => {
    render(<GroupPostContent htmlContent={longText} />);
    const button = screen.getByText("Read More");
    fireEvent.click(button);
    expect(screen.getByText("Show Less")).toBeInTheDocument();
  });

  test("renders full content when text is short", () => {
    render(<GroupPostContent htmlContent={shortText} />);
    expect(screen.getByText("Short text")).toBeInTheDocument();
    expect(screen.queryByText("Read More")).not.toBeInTheDocument();
  });
});
