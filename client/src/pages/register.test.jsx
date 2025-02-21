import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Register from "./Register";

// Mock the fetch API
global.fetch = jest.fn();

describe("Register Component", () => {
  test("renders register page and handles form submission", () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    // Check if the form and inputs are rendered
    expect(screen.getByText("Create your free Account")).toBeInTheDocument();

    const usernameInput = screen.getByPlaceholderText("Username");
    expect(usernameInput).toBeInTheDocument();

    const emailInput = screen.getByPlaceholderText("Email Address");
    expect(emailInput).toBeInTheDocument();

    const passwordInput = screen.getByPlaceholderText("Password");
    expect(passwordInput).toBeInTheDocument();

    const createAccountButton = screen.getByText("Create Account");
    expect(createAccountButton).toBeInTheDocument();

    // Simulate user input
    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    // Verify that the input values are updated
    expect(usernameInput.value).toBe("testuser");
    expect(emailInput.value).toBe("test@example.com");
    expect(passwordInput.value).toBe("password123");

    // Simulate form submission
    fireEvent.click(createAccountButton);
  });

  test("toggles password visibility", () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    // Check that the password input type is initially "password"
    const passwordInput = screen.getByPlaceholderText("Password");
    expect(passwordInput.type).toBe("password");

    // Simulate a click on the toggle button
    const toggleButton = screen.getByRole("button", {
      name: /toggle password visibility/i, // Use the aria-label
    });
    fireEvent.click(toggleButton);

    // Verify that the password input type changes to "text"
    expect(passwordInput.type).toBe("text");

    // Simulate another click to toggle back
    fireEvent.click(toggleButton);

    // Verify that the password input type changes back to "password"
    expect(passwordInput.type).toBe("password");
  });

  test("handles form submission successfully", async () => {
    // Mock a successful fetch response
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ jwtToken: "mockToken" }),
    });

    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    // Simulate user input
    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByPlaceholderText("Email Address"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });

    // Simulate form submission
    fireEvent.click(screen.getByText("Create Account"));

    // Wait for the fetch call to be made
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        "http://localhost:8000/auth/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: "testuser",
            email: "test@example.com",
            password: "password123",
          }),
        }
      );
    });
  });

  test("handles form submission error", async () => {
    // Mock a failed fetch response
    fetch.mockRejectedValueOnce(new Error("Failed to fetch"));

    // Mock console.error
    console.error = jest.fn();

    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    // Simulate user input
    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByPlaceholderText("Email Address"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });

    // Simulate form submission
    fireEvent.click(screen.getByText("Create Account"));

    // Wait for the error to be logged
    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith("Failed to fetch");
    });
  });
});
