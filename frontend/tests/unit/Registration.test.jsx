import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Register from "../../src/components/Register";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";

global.URL.createObjectURL = jest.fn(() => "mock-url");
global.URL.revokeObjectURL = jest.fn();

describe("Register Component", () => {

  beforeEach(() => {
    global.fetch = jest.fn();
  });

  test("renders form inputs", () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText("Enter your email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter your username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter your password")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Confirm your password")).toBeInTheDocument();
  });

  test("submits form successfully", async () => {

    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => ({ id: "123" })
    });

    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Enter your email"), {
      target: { value: "test@gmail.com" }
    });

    fireEvent.change(screen.getByPlaceholderText("Enter your username"), {
      target: { value: "testuser" }
    });

    fireEvent.change(screen.getByPlaceholderText("Enter your password"), {
      target: { value: "123456789" }
    });

    fireEvent.change(screen.getByPlaceholderText("Confirm your password"), {
      target: { value: "123456789" }
    });

    const file = new File(["avatar"], "avatar.png", { type: "image/png" });

    const uploadInput = document.querySelector("#uploadFile");

    fireEvent.change(uploadInput, {
      target: { files: [file] }
    });

    fireEvent.click(screen.getByRole("button", { name: "Register now" }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });
  });

});