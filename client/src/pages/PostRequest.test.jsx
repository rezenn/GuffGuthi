import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import PostRequest from "./PostRequest";
import axios from "axios";

// Mock axios POST request
jest.mock("axios");

describe("PostRequest Component", () => {
  test("renders form fields", () => {
    render(
      <Router>
        <PostRequest />
      </Router>
    );

    // Check if form fields are rendered
    expect(screen.getByLabelText(/Title:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/From:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/To:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Location:/i)).toBeInTheDocument();
  });

  test("submits form successfully", async () => {
    axios.post.mockResolvedValueOnce({});

    render(
      <Router>
        <PostRequest />
      </Router>
    );

    // Simulate filling the form
    fireEvent.change(screen.getByLabelText(/Title:/i), {
      target: { value: "Community Event" },
    });
    fireEvent.change(screen.getByLabelText(/From:/i), {
      target: { value: "2025-02-20" },
    });
    fireEvent.change(screen.getByLabelText(/To:/i), {
      target: { value: "2025-02-21" },
    });
    fireEvent.change(screen.getByLabelText(/Location:/i), {
      target: { value: "Community Center" },
    });

    // Submit form
    fireEvent.click(screen.getByText(/Post Request/i));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledTimes(1); // Check that axios.post was called
    });
  });
});
