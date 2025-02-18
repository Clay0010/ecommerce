"use client";
import React from "react";
import { useSelector } from "react-redux";
import Link from "next/link";

const SearchPage = () => {
  const searchResult = useSelector((state) => state.search.results);
  console.log("search result , search page", searchResult);

  const content = searchResult.map((product) => {
    return (
      <div
        className="w-96 h-96 text-white rounded-lg shadow-lg duration-500 ease-in-out hover:shadow-xl hover:cursor-pointer p-5 relative flex justify-center items-end group overflow-hidden"
        key={product.id}
      >
        <div
          className="absolute inset-0 bg-cover bg-center transform scale-105 group-hover:scale-100 transition-all duration-500"
          style={{ backgroundImage: "url('/watch2.jpg')" }}
        ></div>
        <div className="absolute inset-0 bg-black bg-opacity-15 duration-500 ease-in-out rounded-lg group-hover:bg-opacity-0"></div>
        <div className="z-10 relative w-full  p-2 group">
          {/* Background Image - Opacity (default visible, fade on hover) */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-700 ease-in-out rounded-lg z-[-1]"></div>

          <div>
            {/* Product Name */}
            <h1 className="text-2xl font-semibold tracking-tight group-hover:tracking-wide duration-500 ease-in-out">
              {product.name}
            </h1>

            {/* Product Description */}
            <p className="text-sm mt-1 max-w-xs overflow-hidden text-ellipsis whitespace-nowrap">
              {product.description}
            </p>
          </div>

          <div className="flex gap-4 items-center m-1">
            {/* Product Price */}
            <p className="text-xl font-semibold mt-1">{product.price}$</p>

            {/* Add to Cart Button */}
            <Link href={`/product/${product.id}`}>
              <button className="p-2 text-xs bg-white rounded-lg text-black mt-2 hover:bg-black hover:text-white hover:scale-105 transition-all duration-300 ease-in-out">
                View Details
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="p-10">
      <h1 className="text-3xl text-center font-bold mb-10">Search Result</h1>
      <div className="flex flex-wrap justify-center gap-5">{content}</div>
    </div>
  );
};

export default SearchPage;
