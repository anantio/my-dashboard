import React from "react";
import { render, screen } from "@testing-library/react";
import ErrorBoundary from "../Components/shared/ErrorBoundary";
import "@testing-library/jest-dom";

// Component that throws an error
const ThrowError = () => {
  throw new Error("Test error");
};

// Component that works normally
const WorkingComponent = () => <div>Working Component</div>;

describe("ErrorBoundary", () => {
  // Suppress console.error for these tests
  const originalError = console.error;
  beforeAll(() => {
    console.error = jest.fn();
  });

  afterAll(() => {
    console.error = originalError;
  });

  test("renders children when there is no error", () => {
    render(
      <ErrorBoundary>
        <WorkingComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText("Working Component")).toBeInTheDocument();
  });

  test("renders error fallback UI when child component throws", () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(screen.getByText(/Oops! Something went wrong/i)).toBeInTheDocument();
    expect(screen.getByText(/Try Again/i)).toBeInTheDocument();
  });

  test("shows error details in development mode", () => {
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = "development";

    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(screen.getByText(/Error Details/i)).toBeInTheDocument();

    process.env.NODE_ENV = originalEnv;
  });
});
