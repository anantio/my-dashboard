import React from "react";

const ProductCard = ({ props }) => {
  return (
    <div className="flex flex-row p-2 m-2 flex-wrap overflow-auto">
      {props.map((item) => (
        <div
          key={item.id}
          className="w-80 h-full border border-black rounded-md m-3"
        >
          <div className="object-cover">
            <img src={item.images[0]} />
            <span className="flex justify-center bg-gray-200 font-bold">
              {item.title}
            </span>{" "}
            <span className="flex justify-center bg-gray-200" key={item.id}>
              Price : {item.price}
            </span>{" "}
            <span className="flex justify-center bg-gray-200" key={item.id}>
              Rating : {item.rating}
            </span>{" "}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCard;
