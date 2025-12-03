import { render, screen } from "@testing-library/react";
import App from "./App";

// Mock the DashboardFeatureBlock component to avoid API calls
jest.mock("./Components/feature/DashboardFeatureBlock", () => {
  return function MockDashboardFeatureBlock() {
    return <div data-testid="dashboard-feature-block">Dashboard</div>;
  };
});

test("renders the App component", () => {
  render(<App />);
  const appElement = screen.getByTestId("dashboard-feature-block");
  expect(appElement).toBeInTheDocument();
});

test("renders DashboardFeatureBlock component", () => {
  const { container } = render(<App />);
  expect(container.querySelector(".App")).toBeInTheDocument();
});
