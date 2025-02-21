import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, useParams } from "react-router-dom";
import GroupFeedPage from "./GroupFeedPage";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(),
}));

global.alert = jest.fn();

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve({
        group_name: "Test Group",
        group_cover: "test-cover.jpg",
        group_logo: "test-logo.jpg",
        topic: "Test Topic",
        group_desc: "This is a test group description.",
      }),
  })
);

test("renders GroupFeedPage and displays group data", async () => {
  useParams.mockReturnValue({ groupId: "123" });

  render(
    <MemoryRouter>
      <GroupFeedPage />
    </MemoryRouter>
  );

  expect(screen.getByText("Loading...")).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.getByText("Test Group")).toBeInTheDocument();
    expect(screen.getByText("Test Topic")).toBeInTheDocument();
    expect(
      screen.getByText("This is a test group description.")
    ).toBeInTheDocument();
  });

  const createPostButton = screen.getByText("Create Post");
  expect(createPostButton).toBeInTheDocument();

  fireEvent.click(createPostButton);
});

test("displays an error message if group data fetch fails", async () => {
  useParams.mockReturnValue({ groupId: "123" });

  console.error = jest.fn();

  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: false,
      json: () => Promise.resolve({ error: "Failed to fetch group data" }),
    })
  );

  render(
    <MemoryRouter>
      <GroupFeedPage />
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(console.error).toHaveBeenCalledWith(
      "Error fetching group data:",
      "Failed to fetch group data"
    );
  });
});
