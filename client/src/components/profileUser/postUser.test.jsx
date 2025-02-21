import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import axios from "axios";
import PostUser from "./postUser";

// Mocking the axios.get request
jest.mock("axios");

describe("PostUser Component", () => {
  test("shows loading spinner while fetching posts", () => {
    // Mock the axios.get call to resolve after some time (to simulate fetching)
    axios.get.mockResolvedValueOnce({ data: [] });

    render(
      <MemoryRouter initialEntries={["/user/1"]}>
        <Routes>
          <Route path="/user/:userId" element={<PostUser />} />
        </Routes>
      </MemoryRouter>
    );

    // Check if the loading spinner appears
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("displays posts after successful fetch", async () => {
    // Mock the axios.get call to return some posts
    const mockPosts = [
      {
        post_id: 1,
        post_title: "First Post",
        img: "/images/post1.jpg",
        post_desc: "This is the first post.",
      },
      {
        post_id: 2,
        post_title: "Second Post",
        img: "/images/post2.jpg",
        post_desc: "This is the second post.",
      },
    ];

    axios.get.mockResolvedValueOnce({ data: mockPosts });

    render(
      <MemoryRouter initialEntries={["/user/1"]}>
        <Routes>
          <Route path="/user/:userId" element={<PostUser />} />
        </Routes>
      </MemoryRouter>
    );

    // Wait for the posts to be loaded and check if titles appear
    await waitFor(() => screen.getByText("First Post"));
    expect(screen.getByText("First Post")).toBeInTheDocument();
    expect(screen.getByText("Second Post")).toBeInTheDocument();
  });

  test("displays 'No posts available' when there are no posts", async () => {
    // Mock the axios.get call to return an empty array
    axios.get.mockResolvedValueOnce({ data: [] });

    render(
      <MemoryRouter initialEntries={["/user/1"]}>
        <Routes>
          <Route path="/user/:userId" element={<PostUser />} />
        </Routes>
      </MemoryRouter>
    );

    // Wait for the fetch to complete
    await waitFor(() => screen.getByText("No posts available."));
    expect(screen.getByText("No posts available.")).toBeInTheDocument();
  });

  test("shows error message when fetching posts fails", async () => {
    // Mock the axios.get call to throw an error
    axios.get.mockRejectedValueOnce(new Error("Failed to fetch"));

    render(
      <MemoryRouter initialEntries={["/user/1"]}>
        <Routes>
          <Route path="/user/:userId" element={<PostUser />} />
        </Routes>
      </MemoryRouter>
    );

    // Wait for the error message to appear
    await waitFor(() =>
      screen.getByText("Failed to load posts. Please try again later.")
    );
    expect(
      screen.getByText("Failed to load posts. Please try again later.")
    ).toBeInTheDocument();
  });
});
