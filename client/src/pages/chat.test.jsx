import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Chat from "../pages/Chat";
import { MemoryRouter } from "react-router-dom";
import { act } from "react-dom/test-utils";

import io from "socket.io-client";

// Mock socket.io-client
jest.mock("socket.io-client");

describe("Chat Component", () => {
  let mockSocket;

  beforeEach(() => {
    mockSocket = {
      emit: jest.fn(),
      on: jest.fn(),
      disconnect: jest.fn(),
    };
    io.mockReturnValue(mockSocket);
    localStorage.setItem("userName", "testuser");
    window.history.pushState({}, "Test", "/chat?room=testroom");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders Chat component correctly", async () => {
    render(
      <MemoryRouter>
        <Chat />
      </MemoryRouter>
    );

    // Ensure component is rendered
    await waitFor(() => {
      expect(screen.getByText("Users in Room")).toBeInTheDocument();
    });

    // Ensure the input field is present
    await waitFor(() => {
      expect(
        screen.getByPlaceholderText("Type your message ...")
      ).toBeInTheDocument();
    });
  });
  test("connects to socket.io and joins the room", async () => {
    render(
      <MemoryRouter>
        <Chat />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(mockSocket.emit).toHaveBeenCalledWith(
        "join",
        { name: "testuser", room: "testroom" },
        expect.any(Function)
      );
    });
  });

  test("updates messages when a new message arrives", async () => {
    render(
      <MemoryRouter>
        <Chat />
      </MemoryRouter>
    );

    // Find the message handler function
    const messageHandler = mockSocket.on.mock.calls.find(
      ([event]) => event === "message"
    )?.[1];

    act(() => {
      messageHandler({ user: "testuser", text: "Hello!" });
    });

    await waitFor(() => {
      expect(screen.getByText("Hello!")).toBeInTheDocument();
    });
  });
  test("disconnects socket when component unmounts", async () => {
    const { unmount } = render(
      <MemoryRouter>
        <Chat />
      </MemoryRouter>
    );

    unmount();

    await waitFor(() => {
      expect(mockSocket.disconnect).toHaveBeenCalled();
    });
  });
});
