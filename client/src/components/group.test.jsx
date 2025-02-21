import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Routes, Route, useNavigate } from "react-router-dom";
import Group from "./Group";

// Mock fetch to simulate API responses
global.fetch = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("Group Component", () => {
  test("renders Group component correctly", async () => {
    // Mock fetch to return some sample group data
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [
        { group_id: 1, group_name: "Group 1", group_logo: "group1_logo.png" },
        { group_id: 2, group_name: "Group 2", group_logo: "group2_logo.png" },
      ],
    });

    render(
      <MemoryRouter>
        <Group />
      </MemoryRouter>
    );

    // Check if the groups title is displayed
    expect(screen.getByText("Groups")).toBeInTheDocument();

    // Wait for the groups to be rendered
    await waitFor(() => screen.getByText("Group 1"));
    await waitFor(() => screen.getByText("Group 2"));

    // Check if group buttons are rendered
    expect(screen.getByText("Group 1")).toBeInTheDocument();
    expect(screen.getByText("Group 2")).toBeInTheDocument();
  });

  test("displays 'No groups found' when there are no groups", async () => {
    // Mock fetch to return an empty array
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    });

    render(
      <MemoryRouter>
        <Group />
      </MemoryRouter>
    );

    // Check if 'No groups found' message is displayed
    await waitFor(() => screen.getByText("No groups found"));
  });

  test("navigates to group feed when a group is clicked", async () => {
    // Mock fetch to return sample group data
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [
        { group_id: 1, group_name: "Group 1", group_logo: "group1_logo.png" },
      ],
    });

    // Mock the useNavigate hook to return a jest function
    const mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);

    render(
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<Group />} />
          <Route path="/groupFeed/:groupId" element={<div>Group Feed</div>} />
        </Routes>
      </MemoryRouter>
    );

    // Wait for the groups to be rendered
    await waitFor(() => screen.getByText("Group 1"));

    // Get the button that simulates clicking a group
    const groupButton = screen.getByText("Group 1");

    // Fire the click event on the group button
    fireEvent.click(groupButton);

    // Ensure the navigation function is called with the correct path
    expect(mockNavigate).toHaveBeenCalledWith("/groupFeed/1");
  });
});
