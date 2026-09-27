import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import logger from "../logger.js";

describe("logger", () => {
  beforeEach(() => {
    vi.spyOn(console, "log").mockImplementation(() => {});
    vi.spyOn(console, "warn").mockImplementation(() => {});
    vi.spyOn(console, "error").mockImplementation(() => {});
    vi.spyOn(console, "info").mockImplementation(() => {});
    vi.spyOn(console, "debug").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("prefixes log with [Embedded-App]", () => {
    logger.log("hello");
    expect(console.log).toHaveBeenCalledWith("[Embedded-App]", "hello");
  });

  it("prefixes warn with [Embedded-App]", () => {
    logger.warn("warning");
    expect(console.warn).toHaveBeenCalledWith("[Embedded-App]", "warning");
  });

  it("prefixes error with [Embedded-App]", () => {
    logger.error("error");
    expect(console.error).toHaveBeenCalledWith("[Embedded-App]", "error");
  });

  it("prefixes info with [Embedded-App]", () => {
    logger.info("info");
    expect(console.info).toHaveBeenCalledWith("[Embedded-App]", "info");
  });

  it("prefixes debug with [Embedded-App]", () => {
    logger.debug("debug");
    expect(console.debug).toHaveBeenCalledWith("[Embedded-App]", "debug");
  });

  it("formats objects as JSON string in log", () => {
    logger.log({ foo: 1 });
    expect(console.log).toHaveBeenCalledWith(
      "[Embedded-App]",
      expect.stringContaining('"foo": 1'),
    );
  });

  it("strips %c and style args from first arg when present", () => {
    logger.log("%cStyled%cMore", "color:red", "color:blue", "message");
    expect(console.log).toHaveBeenCalledWith(
      "[Embedded-App]",
      "StyledMore",
      "message",
    );
  });
});
