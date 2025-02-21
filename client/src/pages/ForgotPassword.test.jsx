import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ForgotPassword from "./ForgotPassword";
import { toast } from "react-toastify";

// Mocking fetch and toast
global.fetch = jest.fn();
jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
  ToastContainer: () => <div />,
}));

test("renders forgot password page with form fields", () => {
  render(
    <MemoryRouter>
      <ForgotPassword />
    </MemoryRouter>
  );

  // Check if email input, password fields, and submit button are rendered
  expect(screen.getByPlaceholderText("Your Email Address")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Confirm Password")).toBeInTheDocument();
  expect(screen.getByText("Change Password")).toBeInTheDocument();
});

test("toggles password visibility", () => {
  render(
    <MemoryRouter>
      <ForgotPassword />
    </MemoryRouter>
  );

  // Password input visibility toggle check
  const passwordInput = screen.getByPlaceholderText("Password");
  expect(passwordInput.type).toBe("password");

  // Get the toggle button for the password field
  const togglePasswordButton = screen.getAllByLabelText(
    /toggle password visibility/i
  )[0];
  fireEvent.click(togglePasswordButton);
  expect(passwordInput.type).toBe("text");

  fireEvent.click(togglePasswordButton);
  expect(passwordInput.type).toBe("password");

  // Confirm confirmPassword field's toggle works similarly
  const confirmPasswordInput = screen.getByPlaceholderText("Confirm Password");
  expect(confirmPasswordInput.type).toBe("password");

  const toggleConfirmPasswordButton = screen.getAllByLabelText(
    /toggle password visibility/i
  )[1];
  fireEvent.click(toggleConfirmPasswordButton);
  expect(confirmPasswordInput.type).toBe("text");

  fireEvent.click(toggleConfirmPasswordButton);
  expect(confirmPasswordInput.type).toBe("password");
});

test("handles form submission with matching passwords", async () => {
  // Mock a successful fetch response
  fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => ({ message: "Password reset successful!" }),
  });

  render(
    <MemoryRouter>
      <ForgotPassword />
    </MemoryRouter>
  );

  // Fill in the form fields
  fireEvent.change(screen.getByPlaceholderText("Your Email Address"), {
    target: { value: "test@example.com" },
  });
  fireEvent.change(screen.getByPlaceholderText("Password"), {
    target: { value: "newpassword123" },
  });
  fireEvent.change(screen.getByPlaceholderText("Confirm Password"), {
    target: { value: "newpassword123" },
  });

  // Submit the form
  fireEvent.click(screen.getByText("Change Password"));

  // Wait for the fetch call to be made
  await waitFor(() => {
    expect(fetch).toHaveBeenCalledWith(
      "http://localhost:8000/auth/forgotPassword",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "test@example.com",
          newPassword: "newpassword123",
        }),
      }
    );
  });

  // Verify the success toast message
  await waitFor(() => {
    expect(toast.success).toHaveBeenCalledWith("Password reset successful!");
  });
});

test("handles form submission with non-matching passwords", () => {
  render(
    <MemoryRouter>
      <ForgotPassword />
    </MemoryRouter>
  );

  // Fill in the form fields with non-matching passwords
  fireEvent.change(screen.getByPlaceholderText("Your Email Address"), {
    target: { value: "test@example.com" },
  });
  fireEvent.change(screen.getByPlaceholderText("Password"), {
    target: { value: "newpassword123" },
  });
  fireEvent.change(screen.getByPlaceholderText("Confirm Password"), {
    target: { value: "differentpassword" },
  });

  // Submit the form
  fireEvent.click(screen.getByText("Change Password"));

  // Verify the error toast message
  expect(toast.error).toHaveBeenCalledWith("Passwords do not match.");
});

test("handles form submission with network failure", async () => {
  // Mock a network failure
  fetch.mockRejectedValueOnce(new Error("Network error"));

  render(
    <MemoryRouter>
      <ForgotPassword />
    </MemoryRouter>
  );

  // Fill in the form fields
  fireEvent.change(screen.getByPlaceholderText("Your Email Address"), {
    target: { value: "test@example.com" },
  });
  fireEvent.change(screen.getByPlaceholderText("Password"), {
    target: { value: "newpassword123" },
  });
  fireEvent.change(screen.getByPlaceholderText("Confirm Password"), {
    target: { value: "newpassword123" },
  });

  // Submit the form
  fireEvent.click(screen.getByText("Change Password"));

  // Wait for the error toast message
  await waitFor(() => {
    expect(toast.error).toHaveBeenCalledWith(
      "An error occurred. Please try again."
    );
  });
});
