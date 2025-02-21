import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Login from "./Login";
import { toast } from "react-toastify";

// Mock the fetch API
global.fetch = jest.fn();

// Mock the toast notifications
jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
  ToastContainer: () => <div />,
}));

describe("Login Component", () => {
  test("renders login page and handles form submission", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    // Check if the form and inputs are rendered
    expect(screen.getByText("Login to your Account")).toBeInTheDocument();

    const emailInput = screen.getByPlaceholderText("Your Email Address");
    expect(emailInput).toBeInTheDocument();

    const passwordInput = screen.getByPlaceholderText("Password");
    expect(passwordInput).toBeInTheDocument();

    const loginButton = screen.getByText("Login");
    expect(loginButton).toBeInTheDocument();

    // Simulate user input
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    // Verify that the input values are updated
    expect(emailInput.value).toBe("test@example.com");
    expect(passwordInput.value).toBe("password123");

    // Simulate form submission
    fireEvent.click(loginButton);
  });

  test("toggles password visibility", () => {
    render(
      <MemoryRouter>
        <Login />
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
  test("renders login page", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    expect(screen.getByText("Login")).toBeInTheDocument();

    const emailInput = screen.getByPlaceholderText("Your Email Address");
    expect(emailInput).toBeInTheDocument();

    const passwordInput = screen.getByPlaceholderText("Password");
    expect(passwordInput).toBeInTheDocument();

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    expect(emailInput.value).toBe("test@example.com");
    expect(passwordInput.value).toBe("password123");

    const loginButton = screen.getByText("Login");
    expect(loginButton).toBeInTheDocument();
  });
  test("renders login page", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    expect(screen.getByText("Login")).toBeInTheDocument();

    const emailInput = screen.getByPlaceholderText("Your Email Address");
    expect(emailInput).toBeInTheDocument();

    const passwordInput = screen.getByPlaceholderText("Password");
    expect(passwordInput).toBeInTheDocument();

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    expect(emailInput.value).toBe("test@example.com");
    expect(passwordInput.value).toBe("password123");

    const loginButton = screen.getByText("Login");
    expect(loginButton).toBeInTheDocument();
  });
  // test("handles successful login", async () => {
  //   // Mock a successful fetch response
  //   fetch.mockResolvedValueOnce({
  //     ok: true,
  //     json: async () => ({ jwtToken: "mockToken", user_id: 1 }),
  //   });

  //   render(
  //     <MemoryRouter>
  //       <Login />
  //     </MemoryRouter>
  //   );

  //   // Simulate user input
  //   fireEvent.change(screen.getByPlaceholderText("Your Email Address"), {
  //     target: { value: "test@example.com" },
  //   });
  //   fireEvent.change(screen.getByPlaceholderText("Password"), {
  //     target: { value: "password123" },
  //   });

  //   // Simulate form submission
  //   fireEvent.click(screen.getByText("Login"));

  //   // Wait for the fetch call to be made
  //   await waitFor(() => {
  //     expect(fetch).toHaveBeenCalledWith("http://localhost:8000/auth/login", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         email: "test@example.com",
  //         password: "password123",
  //       }),
  //     });
  //   });

  //   // Verify the toast success message
  //   await waitFor(() => {
  //     expect(toast.success).toHaveBeenCalledWith("Logged in Successfully");
  //   });
  // });
});
