import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Guthiyar from "./Guthiyar";
import userEvent from "@testing-library/user-event";

global.fetch = jest.fn();

describe("Guthiyar Component", () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test("renders loading state and fetches users", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [
        {
          user_id: 1,
          user_name: "John Doe",
          occupation: "Software Engineer",
          location: "New York",
          profilepic: "/uploads/john.jpg",
        },
      ],
    });

    render(
      <MemoryRouter>
        <Guthiyar />
      </MemoryRouter>
    );

    expect(screen.getByText(/no users found/i)).toBeInTheDocument();

    await waitFor(() => screen.getByText("John Doe"));
    expect(screen.getByText("Software Engineer")).toBeInTheDocument();
    expect(screen.getByText("New York")).toBeInTheDocument();
  });

  test("handles API error gracefully", async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: "Failed to fetch" }),
    });

    render(
      <MemoryRouter>
        <Guthiyar />
      </MemoryRouter>
    );

    await waitFor(() => screen.getByText(/no users found/i));
    expect(screen.getByText(/no users found/i)).toBeInTheDocument();
  });
});
