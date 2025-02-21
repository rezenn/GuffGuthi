import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import EditProfile from "./EditProfile";
import axios from "axios";

// Mocking axios and localStorage
jest.mock("axios");
global.localStorage = {
  getItem: jest.fn(() => "test@example.com"), // Mock email
  setItem: jest.fn(),
};

describe("EditProfile Component", () => {
  test("displays loading message while fetching user data", async () => {
    axios.get.mockResolvedValueOnce({ data: {} });

    render(
      <MemoryRouter>
        <EditProfile />
      </MemoryRouter>
    );

    // Check if loading message is displayed initially
    expect(screen.getByText("Loading user data...")).toBeInTheDocument();

    // Wait for the user data to load
    await waitFor(() => screen.queryByText("Loading user data..."), {
      timeout: 2000,
    });

    // Ensure the loading message disappears after data is fetched
    expect(screen.queryByText("Loading user data...")).not.toBeInTheDocument();
  });

  test("displays user data after fetch", async () => {
    const mockUserData = {
      user_name: "Test User",
      bio: "This is a bio.",
      occupation: "Software Engineer",
      location: "San Francisco",
      profilepic: "/profile.jpg",
      coverpic: "/cover.jpg",
    };

    axios.get.mockResolvedValueOnce({ data: mockUserData });

    render(
      <MemoryRouter>
        <EditProfile />
      </MemoryRouter>
    );

    await waitFor(() => screen.getByDisplayValue("Test User"));
    expect(screen.getByDisplayValue("Test User")).toBeInTheDocument();
    expect(screen.getByDisplayValue("This is a bio.")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Software Engineer")).toBeInTheDocument();
    expect(screen.getByDisplayValue("San Francisco")).toBeInTheDocument();
  });

  test("allows the user to select a profile image", () => {
    const file = new File(["image"], "profile.jpg", { type: "image/jpeg" });

    render(
      <MemoryRouter>
        <EditProfile />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Change profile/i), {
      target: { files: [file] },
    });

    expect(screen.getByAltText("User Profile")).toHaveAttribute(
      "src",
      expect.stringContaining("profile.jpg")
    );
  });

  test("allows the user to select a cover image", () => {
    const file = new File(["image"], "cover.jpg", { type: "image/jpeg" });

    render(
      <MemoryRouter>
        <EditProfile />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Change cover/i), {
      target: { files: [file] },
    });

    expect(screen.getByAltText("cover image")).toHaveAttribute(
      "src",
      expect.stringContaining("cover.jpg")
    );
  });

  test("submits the form with updated profile data", async () => {
    const mockUserData = {
      user_name: "Test User",
      bio: "This is a bio.",
      occupation: "Software Engineer",
      location: "San Francisco",
      profilepic: "/profile.jpg",
      coverpic: "/cover.jpg",
    };

    axios.get.mockResolvedValueOnce({ data: mockUserData });
    axios.put.mockResolvedValueOnce({ data: { message: "Profile updated!" } });

    render(
      <MemoryRouter>
        <EditProfile />
      </MemoryRouter>
    );

    await waitFor(() => screen.getByDisplayValue("Test User"));

    fireEvent.change(screen.getByLabelText(/Username/i), {
      target: { value: "Updated User" },
    });
    fireEvent.change(screen.getByLabelText(/Bio/i), {
      target: { value: "Updated Bio" },
    });
    fireEvent.change(screen.getByLabelText(/Occupation/i), {
      target: { value: "Product Manager" },
    });
    fireEvent.change(screen.getByLabelText(/Location/i), {
      target: { value: "Los Angeles" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Update profile/i }));

    await waitFor(() => screen.getByText("User profile updated!"));
    expect(axios.put).toHaveBeenCalledTimes(1);
    expect(axios.put).toHaveBeenCalledWith(
      expect.stringContaining("/user/test@example.com")
    );
  });

  test("shows error message if profile update fails", async () => {
    const mockUserData = {
      user_name: "Test User",
      bio: "This is a bio.",
      occupation: "Software Engineer",
      location: "San Francisco",
      profilepic: "/profile.jpg",
      coverpic: "/cover.jpg",
    };

    axios.get.mockResolvedValueOnce({ data: mockUserData });
    axios.put.mockRejectedValueOnce(new Error("Failed to update profile"));

    render(
      <MemoryRouter>
        <EditProfile />
      </MemoryRouter>
    );

    await waitFor(() => screen.getByDisplayValue("Test User"));

    fireEvent.click(screen.getByRole("button", { name: /Update profile/i }));

    await waitFor(() =>
      screen.getByText("Failed to update profile. Please try again.")
    );
    expect(
      screen.getByText("Failed to update profile. Please try again.")
    ).toBeInTheDocument();
  });

  test("disables the update button while loading", async () => {
    const mockUserData = {
      user_name: "Test User",
      bio: "This is a bio.",
      occupation: "Software Engineer",
      location: "San Francisco",
      profilepic: "/profile.jpg",
      coverpic: "/cover.jpg",
    };

    axios.get.mockResolvedValueOnce({ data: mockUserData });

    render(
      <MemoryRouter>
        <EditProfile />
      </MemoryRouter>
    );

    await waitFor(() => screen.getByDisplayValue("Test User"));

    fireEvent.change(screen.getByLabelText(/Username/i), {
      target: { value: "Updated User" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Update profile/i }));
    expect(screen.getByRole("button", { name: /Updating.../i })).toBeDisabled();
  });
});
