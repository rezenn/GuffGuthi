import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Post from "./Post";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";

// Mocking the API call
jest.mock("axios");

describe("Post Component", () => {
  it("displays loading message while fetching user data", async () => {
    axios.get.mockResolvedValueOnce({
      data: [
        { post_id: 1, post_title: "Test Post", post_desc: "This is a post." },
      ],
    });

    render(
      <MemoryRouter>
        <Post />
      </MemoryRouter>
    );

    // Ensure the loading message is shown initially
    expect(screen.getByText("Loading...")).toBeInTheDocument();

    // Wait for the posts to load
    await waitFor(() => screen.getByText("Test Post"));

    // Ensure the loading message is no longer visible after data is fetched
    expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
  });

  it("displays posts after fetching", async () => {
    axios.get.mockResolvedValueOnce({
      data: [
        { post_id: 1, post_title: "Test Post", post_desc: "This is a post." },
      ],
    });

    render(
      <MemoryRouter>
        <Post />
      </MemoryRouter>
    );

    // Wait for the post to be rendered
    await waitFor(() => screen.getByText("Test Post"));

    // Verify the post title is displayed
    expect(screen.getByText("Test Post")).toBeInTheDocument();
  });

  it("displays error message if fetching posts fails", async () => {
    axios.get.mockRejectedValueOnce(new Error("Failed to fetch posts"));

    render(
      <MemoryRouter>
        <Post />
      </MemoryRouter>
    );

    // Wait for the error message
    await waitFor(() =>
      screen.getByText("Failed to fetch posts. Please try again.")
    );

    // Verify that the error message is displayed
    expect(
      screen.getByText("Failed to fetch posts. Please try again.")
    ).toBeInTheDocument();
  });
});
