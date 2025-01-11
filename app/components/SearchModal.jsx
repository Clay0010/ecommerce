import React from "react";
import { useRouter } from "next/navigation";

export const SearchModal = ({
  onClickOutside,
  searchResult,
  setShowSearchModal,
  setSearchQuery,
}) => {
  const router = useRouter();

  const openProductPage = (id) => {
    router.push(`/product/${id}`);
    setShowSearchModal(false);
    setSearchQuery("");
  };
  return (
    <div
      className="border p-3 w-96 bg-white absolute top-full right-0 z-20 rounded border-black"
      tabIndex={-1} // Make the modal focusable
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          onClickOutside();
        }
      }}
    >
      <p className="uppercase text-xs pb-1 border-b-[1px]">
        search result
      </p>

      {searchResult.length > 0 ? (
        searchResult.map((product) => {
          return (
            <div
              className="flex gap-4 mt-2 hover:cursor-pointer border-b-[1px] pb-2 items-center"
              key={product.id}
              onClick={() => openProductPage(product.id)}
            >
              <img
                src="/headphone.jpg"
                alt="product image"
                className="w-16 h-16 object-cover bg-center"
              />
              <span>
                <p className="text-sm pb-1 font-light">{product.name}</p>
                <p className="text-sm font-semibold">${product.price}</p>
              </span>
            </div>
          );
        })
      ) : (
        <h1 className="text-sm mt-2">No Products Found</h1>
      )}
    </div>
  );
};
