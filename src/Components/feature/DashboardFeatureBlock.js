import React, { useState, useEffect, use } from "react";
import { ALL_PRODUCTS, SORT_PRODUCT_BY_TITLE } from "../constants";
import ProductCard from "../shared/ProductCard";

const DashboardFeatureBlock = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [displayProducts, setDispayProducts] = useState(allProducts ?? []);
  const [searchText, setSearchText] = useState("");
  const [sortBy, setSortBy] = useState(0);
  const [orderBy, setOrderBy] = useState(0);

  const fetchAllProducts = async () => {
    const response = await fetch(ALL_PRODUCTS);
    const data = await response.json();
    setAllProducts(data.products);
  };

  const sortProducts = async () => {
    if (sortBy != 0 && orderBy != 0) {
      const response = await fetch(
        `https://dummyjson.com/products?sortBy=${sortBy}&order=${orderBy}`
      );
      const data = await response.json();
      setDispayProducts(data.products);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchText) {
        const filtered = allProducts.filter((product) =>
          product.title?.toLowerCase().includes(searchText.toLowerCase())
        );
        setDispayProducts(filtered);
      } else {
        setDispayProducts(allProducts);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchText, allProducts]);

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleOrderChange = (e) => {
    setOrderBy(e.target.value);
  };

  useEffect(() => {
    sortProducts();
  }, [sortBy, orderBy]);

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
      </div>
      <ProductCard props={displayProducts} />
    </div>
  );
};

export default DashboardFeatureBlock;
