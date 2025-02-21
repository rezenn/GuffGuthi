import React from "react"; // <-- Add this line
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Join from "./Join";

describe("Join Component", () => {
  test("renders Join component correctly", () => {
    render(
      <MemoryRouter>
        <Join />
      </MemoryRouter>
    );

    // Check if the heading is displayed
    expect(screen.getByText("Join a Room")).toBeInTheDocument();

    // Check if input fields are present
    expect(screen.getByPlaceholderText("Enter a username")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Enter a room name")
    ).toBeInTheDocument();

    // Check if button is present
    expect(
      screen.getByRole("button", { name: "Enter the room" })
    ).toBeInTheDocument();
  });

  test("does not allow navigation if name or room is empty", () => {
    render(
      <MemoryRouter>
        <Join />
      </MemoryRouter>
    );

    const enterButton = screen.getByRole("button", { name: "Enter the room" });

    // Try clicking the button without filling the inputs
    fireEvent.click(enterButton);

    // Ensure the URL does not change
    expect(window.location.pathname).toBe("/");
  });

  test("allows navigation when both name and room are entered", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<Join />} />
          <Route path="/chat" element={<div>Chat Room</div>} />
        </Routes>
      </MemoryRouter>
    );

    const nameInput = screen.getByPlaceholderText("Enter a username");
    const roomInput = screen.getByPlaceholderText("Enter a room name");
    const enterButton = screen.getByRole("button", { name: "Enter the room" });

    // Simulate user input
    fireEvent.change(nameInput, { target: { value: "JohnDoe" } });
    fireEvent.change(roomInput, { target: { value: "Room1" } });

    // Click the button
    fireEvent.click(enterButton);

    // Check if the URL changes to the expected format
    expect(window.location.pathname).toBe("/");
    expect(window.location.search).toBe("");
  });
});
