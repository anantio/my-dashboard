import React from "react";

const ProductCard = ({ props }) => {
  return (
    <div className="flex flex-row p-2 m-2 flex-wrap overflow-auto">
      {props.map((item) => (
        <div className="w-80 h-80 border border-black rounded-md m-3">
          <span key={item.id}>{item.title}</span>
        </div>
      ))}
    </div>
  );
};

export default ProductCard;
