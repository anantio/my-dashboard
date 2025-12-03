import React, { useState, useEffect } from "react";
import { ALL_CATEGORY_LIST_API } from "../constants";

const CategoryList = ({ setFilterChange }) => {
  const [allCategory, setAllCategory] = useState([]);

  const fetchAllCategoryList = async () => {
    const response = await fetch(ALL_CATEGORY_LIST_API);
    const data = await response.json();
    setAllCategory(data);
  };

  useEffect(() => {
    fetchAllCategoryList();
  }, []);

  const handleFilterChange = (e) => {
    setFilterChange(e.target.value);
  };

  console.log(allCategory);
  return (
    <div className="p-2 m-2 border border-gray-400 ">
      <select onChange={(e) => handleFilterChange(e)}>
        <option value={0}>Filter </option>
        {allCategory.map((c, index) => (
          <option key={index} value={c}>
            {c}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryList;
