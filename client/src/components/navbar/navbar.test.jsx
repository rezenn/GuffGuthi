import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./Navbar";

// Mock the localStorage to test behavior for logged-in users
beforeEach(() => {
  // Mock localStorage data for testing
  localStorage.setItem("email", "user@example.com");
  localStorage.setItem("token", "fake-jwt-token");
});

afterEach(() => {
  jest.clearAllMocks();
});

test("renders Navbar and navigates correctly", async () => {
  render(
    <Router>
      <Navbar activePage="home" setActivePage={() => {}} setAuth={() => {}} />
    </Router>
  );

  // Use waitFor to wait for the logo image to appear
  await waitFor(() => {
    const logoElement = screen.getByAltText("Logo");
    expect(logoElement).toBeInTheDocument();
  });

  // Check if the profile image renders or the default one is shown
  const profileImg = screen.getByAltText("profile");
  expect(profileImg).toBeInTheDocument();

  // Check if the username is rendered correctly
  const userName = screen.getByText(/Hello,/i);
  expect(userName).toBeInTheDocument();

  // Ensure the 'Home' button is rendered and active
  const homeButton = screen.getByText(/Home/i);
  expect(homeButton).toHaveClass("active");

  // Click the 'Post' button and verify navigation
  const postButton = screen.getByText(/Post/i);
  fireEvent.click(postButton);

  // You would need to verify that navigation occurs to the correct page
  // Simulate and test navigation by checking URL change (you can mock `useNavigate` if necessary)
  await waitFor(() => {
    expect(window.location.pathname).toBe("/createPost"); // Adjust according to your routing logic
  });

  // Test search functionality
  const searchInput = screen.getByPlaceholderText(/Search.../i);
  fireEvent.change(searchInput, { target: { value: "Test query" } });

  const searchButton = screen.getByAltText("search Icon");
  fireEvent.click(searchButton);

  // Wait for search results to load (you might need to mock API calls here)
  await waitFor(() => {
    // Assume the response is a list of search results or some API result.
    expect(screen.getByText(/Search Results/i)).toBeInTheDocument(); // Change as per your UI feedback
  });

  // Check if error message is rendered if API fails
  localStorage.removeItem("token"); // Simulate missing token
  render(
    <Router>
      <Navbar activePage="home" setActivePage={() => {}} setAuth={() => {}} />
    </Router>
  );
  await waitFor(() => {
    expect(screen.getByText(/Failed to fetch user data/i)).toBeInTheDocument(); // Modify based on actual error text
  });
});
