import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import DashboardFeatureBlock from "../Components/feature/DashboardFeatureBlock";

// Mock the child components
jest.mock("../Components/shared/ProductCard", () => {
  return function MockProductCard({ props }) {
    return <div data-testid="product-card">{props.length} products</div>;
  };
});

jest.mock("../Components/shared/CategoryList", () => {
  return function MockCategoryList({ setFilterChange }) {
    return <div data-testid="category-list">Category List</div>;
  };
});

// Mock fetch
global.fetch = jest.fn();

describe("DashboardFeatureBlock", () => {
  const mockProducts = {
    products: [
      { id: 1, title: "iPhone 12", price: 999, rating: 4.5 },
      { id: 2, title: "Samsung Galaxy", price: 799, rating: 4.3 },
      { id: 3, title: "Google Pixel", price: 699, rating: 4.4 },
    ],
  };

  beforeEach(() => {
    fetch.mockClear();
    fetch.mockResolvedValue({
      json: async () => mockProducts,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders search input and filter controls", () => {
    render(<DashboardFeatureBlock />);

    // Check if search input is rendered
    expect(screen.getByPlaceholderText("Search")).toBeInTheDocument();

    // Check if sort controls are rendered
    expect(screen.getByText("Sort:")).toBeInTheDocument();
    expect(screen.getByText("Sort By")).toBeInTheDocument();
    expect(screen.getByText("Order")).toBeInTheDocument();

    // Check if child components are rendered
    expect(screen.getByTestId("category-list")).toBeInTheDocument();
  });

  test("fetches and displays products on component mount", async () => {
    render(<DashboardFeatureBlock />);

    // Verify fetch was called with the correct URL
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith("https://dummyjson.com/products");
    });

    // Verify products are displayed
    await waitFor(() => {
      expect(screen.getByTestId("product-card")).toHaveTextContent(
        "3 products"
      );
    });
  });
});
