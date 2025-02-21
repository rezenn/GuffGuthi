import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import GroupPost from "./groupPost";
import api from "../../api";

// Mock API response
jest.mock("../../api", () => ({
  get: jest.fn(),
}));

describe("GroupPost Component", () => {
  beforeEach(() => {
    localStorage.setItem("email", "test@example.com");
    localStorage.setItem("token", "mockToken");
  });

  afterEach(() => {
    localStorage.clear();
    jest.clearAllMocks(); // Clears previous mock calls
  });

  test("fetches and displays posts correctly", async () => {
    const mockPosts = [
      {
        id: 1,
        group_post_title: "Test Post",
        group_post_desc: "This is a test post.",
        img: "/test-image.jpg",
        likes: 10,
        comments: 5,
      },
    ];

    // Mock API calls (ensure user data is fetched first)
    global.fetch = jest.fn((url) =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve(
            url.includes("/user/")
              ? { user_name: "Test User", profilepic: "/profile.jpg" } // Mock user data
              : mockPosts // Mock group posts
          ),
      })
    );

    api.get.mockResolvedValueOnce({ data: mockPosts });

    render(
      <MemoryRouter>
        <GroupPost />
      </MemoryRouter>
    );

    // Ensure API was called
    await waitFor(() => expect(api.get).toHaveBeenCalledTimes(1));

    // Expect post data to be displayed
    expect(screen.getByText("Test Post")).toBeInTheDocument();
    expect(screen.getByText("This is a test post.")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  test("displays error message when API call fails", async () => {
    api.get.mockRejectedValueOnce(new Error("Failed to fetch posts"));

    render(
      <MemoryRouter>
        <GroupPost />
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(screen.getByText(/failed to fetch posts/i)).toBeInTheDocument()
    );
  });
});
