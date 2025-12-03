import React, { useState, useEffect } from "react";
import { ALL_PRODUCTS } from "../constants";
import ProductCard from "../shared/ProductCard";

const DashboardFeatureBlock = () => {
  const [allProducts, setAllProducts] = useState([]);

  const fetchAllProducts = async () => {
    const response = await fetch(ALL_PRODUCTS);
    const data = await response.json();
    setAllProducts(data.products);
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);
  console.log(allProducts);
  return (
    <div>
      <ProductCard props={allProducts} />
    </div>
  );
};

export default DashboardFeatureBlock;
