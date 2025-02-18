// import { render, screen, fireEvent, waitFor } from "@testing-library/react";
// import Login from "../pages/Login";
// import { BrowserRouter as Router } from "react-router-dom";

// // Mocking the toast notifications and useNavigate
// jest.mock("react-toastify", () => ({
//   toast: {
//     success: jest.fn(),
//     error: jest.fn(),
//   },
//   ToastContainer: () => <div></div>,
// }));

// jest.mock("react-router-dom", () => ({
//   useNavigate: jest.fn(),
//   Link: ({ children }) => <a>{children}</a>,
// }));

// describe("Login Component", () => {
//   test("renders the login form", () => {
//     render(
//       <Router>
//         <Login setAuth={() => {}} />
//       </Router>
//     );
//     expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
//     expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
//     expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
//   });

//   test("disables login button when loading", () => {
//     render(
//       <Router>
//         <Login setAuth={() => {}} />
//       </Router>
//     );
//     fireEvent.click(screen.getByRole("button", { name: /login/i }));
//     expect(screen.getByRole("button", { name: /logging in.../i })).toBeDisabled();
//   });

//   test("email and password input update state correctly", () => {
//     render(
//       <Router>
//         <Login setAuth={() => {}} />
//       </Router>
//     );
//     const emailInput = screen.getByLabelText(/email/i);
//     const passwordInput = screen.getByLabelText(/password/i);

//     fireEvent.change(emailInput, { target: { value: "test@example.com" } });
//     fireEvent.change(passwordInput, { target: { value: "password123" } });

//     expect(emailInput.value).toBe("test@example.com");
//     expect(passwordInput.value).toBe("password123");
//   });

//   test("toggles password visibility", () => {
//     render(
//       <Router>
//         <Login setAuth={() => {}} />
//       </Router>
//     );
//     const passwordInput = screen.getByLabelText(/password/i);
//     const toggleButton = screen.getByRole("button");

//     // Initially password is hidden
//     expect(passwordInput.type).toBe("password");

//     // Click the toggle button to show password
//     fireEvent.click(toggleButton);
//     expect(passwordInput.type).toBe("text");

//     // Click the toggle button to hide password again
//     fireEvent.click(toggleButton);
//     expect(passwordInput.type).toBe("password");
//   });

//   test("displays error message on failed login", async () => {
//     // Mock the fetch to simulate a failed login
//     global.fetch = jest.fn().mockResolvedValue({
//       json: () => ({ error: "Invalid credentials" }),
//     });

//     render(
//       <Router>
//         <Login setAuth={() => {}} />
//       </Router>
//     );

//     fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "wrong@example.com" } });
//     fireEvent.change(screen.getByLabelText(/password/i), { target: { value: "wrongpassword" } });
//     fireEvent.click(screen.getByRole("button", { name: /login/i }));

//     await waitFor(() => {
//       expect(screen.getByText("Invalid credentials")).toBeInTheDocument();
//     });
//   });

//   test("redirects to home on successful login", async () => {
//     // Mock the fetch to simulate a successful login
//     global.fetch = jest.fn().mockResolvedValue({
//       json: () => ({ jwtToken: "fake-token", user_id: 1 }),
//     });

//     const mockNavigate = jest.fn();
//     jest.mock("react-router-dom", () => ({
//       useNavigate: () => mockNavigate,
//     }));

//     render(
//       <Router>
//         <Login setAuth={() => {}} />
//       </Router>
//     );

//     fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "test@example.com" } });
//     fireEvent.change(screen.getByLabelText(/password/i), { target: { value: "password123" } });
//     fireEvent.click(screen.getByRole("button", { name: /login/i }));

//     await waitFor(() => {
//       expect(mockNavigate).toHaveBeenCalledWith("/home");
//     });
//   });
// });
