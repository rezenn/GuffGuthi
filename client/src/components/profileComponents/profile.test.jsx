import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Profile from "./Profile";

// Mocking the `fetch` function
global.fetch = jest.fn();

describe("Profile Component", () => {
  test("renders loading state while fetching data", () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        user_name: "John Doe",
        bio: "Software Developer",
        occupation: "Developer",
        location: "New York",
        profilepic: "/images/johndoe.jpg",
        coverpic: "/images/johndoe-cover.jpg",
      }),
    });

    render(
      <MemoryRouter>
        <Profile />
      </MemoryRouter>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("renders error state when data fetch fails", async () => {
    fetch.mockRejectedValueOnce(new Error("Failed to fetch user info"));

    render(
      <MemoryRouter>
        <Profile />
      </MemoryRouter>
    );

    await waitFor(() =>
      screen.getByText("Failed to fetch user data. Please try again.")
    );
    expect(
      screen.getByText("Failed to fetch user data. Please try again.")
    ).toBeInTheDocument();
  });

  test("displays user data correctly after successful fetch", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        user_name: "John Doe",
        bio: "Software Developer",
        occupation: "Developer",
        location: "New York",
        profilepic: "/images/johndoe.jpg",
        coverpic: "/images/johndoe-cover.jpg",
      }),
    });

    render(
      <MemoryRouter>
        <Profile />
      </MemoryRouter>
    );

    await waitFor(() => screen.getByText("John Doe"));
    expect(screen.getByText("Software Developer")).toBeInTheDocument();
    expect(screen.getByText("Developer")).toBeInTheDocument();
    expect(screen.getByText("New York")).toBeInTheDocument();
    expect(screen.getByAltText("Profile")).toHaveAttribute(
      "src",
      "/images/johndoe.jpg"
    );
  });

  test("navigates to the EditProfile page when 'Edit Profile' button is clicked", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        user_name: "John Doe",
        bio: "Software Developer",
        occupation: "Developer",
        location: "New York",
        profilepic: "/images/johndoe.jpg",
        coverpic: "/images/johndoe-cover.jpg",
      }),
    });

    const { container } = render(
      <MemoryRouter initialEntries={["/profile"]}>
        <Profile />
      </MemoryRouter>
    );

    const editButton = screen.getByText("Edit Profile");

    fireEvent.click(editButton);

    // Check if the navigation to EditProfile happens
    expect(container.location.pathname).toBe("/EditProfile");
  });

  test("displays default profile image when no profile image is available", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        user_name: "John Doe",
        bio: "Software Developer",
        occupation: "Developer",
        location: "New York",
        profilepic: "",
        coverpic: "/images/johndoe-cover.jpg",
      }),
    });

    render(
      <MemoryRouter>
        <Profile />
      </MemoryRouter>
    );

    await waitFor(() => screen.getByText("John Doe"));
    expect(screen.getByAltText("Profile")).toHaveAttribute(
      "src",
      "./src/assets/profile.jpg"
    );
  });
});
