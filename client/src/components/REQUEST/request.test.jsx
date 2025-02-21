import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Request from "./Request";
import axios from "axios";

jest.mock("axios");

const mockPosts = [
  {
    id: 1,
    title: "Test Post 1",
    description: "<p>This is a <b>test</b> post</p>",
    start_date: "2025-02-22T10:00:00Z",
    end_date: "2025-02-22T12:00:00Z",
    location: "Location 1",
  },
  {
    id: 2,
    title: "Test Post 2",
    description: "<p>This is another <b>test</b> post</p>",
    start_date: "2025-02-23T14:00:00Z",
    end_date: "2025-02-23T16:00:00Z",
    location: "Location 2",
  },
];

describe("Request Component", () => {
  test("renders Request component and fetches posts correctly", async () => {
    axios.get.mockResolvedValueOnce({ data: mockPosts });

    render(
      <MemoryRouter>
        <Request />
      </MemoryRouter>
    );

    expect(screen.getByText("Requests")).toBeInTheDocument();
    expect(screen.getByText("Create Request")).toBeInTheDocument();

    await waitFor(() => screen.getByText("Test Post 1"));
    await waitFor(() => screen.getByText("Test Post 2"));

    expect(screen.getByText("Test Post 1")).toBeInTheDocument();
    expect(screen.getByText("Test Post 2")).toBeInTheDocument();
  });

  test("shows loading state while fetching posts", () => {
    axios.get.mockImplementationOnce(() => new Promise(() => {}));

    render(
      <MemoryRouter>
        <Request />
      </MemoryRouter>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("displays error message if fetch fails", async () => {
    axios.get.mockRejectedValueOnce(new Error("Failed to load requests"));

    render(
      <MemoryRouter>
        <Request />
      </MemoryRouter>
    );

    await waitFor(() => screen.getByText("Failed to load requests"));

    expect(screen.getByText("Failed to load requests")).toBeInTheDocument();
  });
});
