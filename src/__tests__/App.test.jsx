import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "../App.jsx";

vi.mock("../hooks/useAppBootstrap.js", () => ({
  useAppBootstrap: () => ({
    embedded: {},
    isReady: false,
    isInitializing: false,
    layout: null,
    token: null,
    verifiedData: null,
    verifyStatus: "idle",
    error: null,
    bootstrap: vi.fn().mockResolvedValue(undefined),
  }),
}));

describe("App", () => {
  it("renders header and status bar", () => {
    render(<App />);
    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByText("Waiting for Parent")).toBeInTheDocument();
  });

  it("renders the main content area", () => {
    render(<App />);
    expect(screen.getByRole("main")).toBeInTheDocument();
  });
});
