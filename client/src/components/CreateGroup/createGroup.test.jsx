import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Creategroup from "./Creategroup";

// Mock fetch to prevent actual API calls
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({}),
  })
);

describe("Creategroup Component", () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test("renders Create Group form correctly", () => {
    render(
      <MemoryRouter>
        <Creategroup />
      </MemoryRouter>
    );

    expect(
      screen.getByRole("heading", { name: /Create Group/i })
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/Group Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Topic/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
  });

  test("allows user to fill in the form", () => {
    render(
      <MemoryRouter>
        <Creategroup />
      </MemoryRouter>
    );

    // Fill in the group name
    const groupNameInput = screen.getByLabelText("Group Name:");
    fireEvent.change(groupNameInput, { target: { value: "Test Group" } });
    expect(groupNameInput.value).toBe("Test Group");

    // Fill in the topic
    const topicInput = screen.getByLabelText("Topic:");
    fireEvent.change(topicInput, { target: { value: "Technology" } });
    expect(topicInput.value).toBe("Technology");

    // Fill in the description
    const descInput = screen.getByLabelText("Description:");
    fireEvent.change(descInput, { target: { value: "This is a test group." } });
    expect(descInput.value).toBe("This is a test group.");
  });
});
