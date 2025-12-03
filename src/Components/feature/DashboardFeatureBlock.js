import React, { useState, useEffect, use } from "react";
import { ALL_PRODUCTS, SORT_PRODUCT_BY_TITLE } from "../constants";
import ProductCard from "../shared/ProductCard";
import CategoryList from "../shared/CategoryList";

const DashboardFeatureBlock = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [displayProducts, setDispayProducts] = useState(allProducts ?? []);
  const [searchText, setSearchText] = useState("");
  const [sortBy, setSortBy] = useState(0);
  const [orderBy, setOrderBy] = useState(0);
  const [category, setCategory] = useState(0);

  const fetchAllProducts = async () => {
    const response = await fetch(ALL_PRODUCTS);
    const data = await response.json();
    setAllProducts(data.products);
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      try {
        let url = ALL_PRODUCTS;

        if (category !== 0 && category !== "0") {
          url = `https://dummyjson.com/products/category/${category}`;
        }

        if (
          sortBy !== 0 &&
          sortBy !== "0" &&
          orderBy !== 0 &&
          orderBy !== "0"
        ) {
          const separator = url.includes("?") ? "&" : "?";
          url = `${url}${separator}sortBy=${sortBy}&order=${orderBy}`;
        }

        const response = await fetch(url);
        const data = await response.json();
        const products = data.products || data;

        if (searchText) {
          const filtered = products.filter((product) =>
            product.title?.toLowerCase().includes(searchText.toLowerCase())
          );
          setDispayProducts(filtered);
        } else {
          setDispayProducts(products);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    const timeoutId = setTimeout(() => {
      fetchFilteredProducts();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchText, sortBy, orderBy, category]);

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleOrderChange = (e) => {
    setOrderBy(e.target.value);
  };

  return (
    <div>
      <div className="flex justify-center">
        <input
          type="text"
          placeholder="Search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className=" w-60 border border-black p-2 m-2 rounded-md"
        />
        <div className="p-2 m-2 ml-5">
          <span>Sort: </span>
          <select onChange={(e) => handleSortChange(e)}>
            <option value="0">Sort By</option>
            <option value="title">Title</option>
            <option value="price">Price</option>
            <option value="rating">Rating</option>
          </select>
          <select onChange={(e) => handleOrderChange(e)}>
            <option value="0">Order</option>
            <option value="asc">Asc</option>
            <option value="desc">Desc</option>
          </select>
        </div>
        <CategoryList setFilterChange={setCategory} />
      </div>
      <ProductCard props={displayProducts} />
    </div>
  );
};

export default DashboardFeatureBlock;
