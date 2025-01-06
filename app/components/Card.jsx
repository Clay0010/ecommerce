import React from "react";

export const Card = () => {
  return (
    <div className="flex justify-center gap-5 mt-5">
      {["watch2.jpg", "phone.jpg", "laptop.jpg"].map((image, index) => {
        const titles = ["WATCHES", "PHONES", "LAPTOPS"];
        const descriptions = [
          "Explore Our Watches",
          "Explore Our Phones",
          "Explore Our Laptops",
        ];

        return (
          <div
            key={index}
            style={{ backgroundImage: `url(/${image})` }}
            className="w-[430px] h-[550px] bg-cover bg-center relative flex flex-col items-center justify-between transition-transform duration-300 transform scale-95 hover:scale-100"
          >
            <div className="absolute inset-0 bg-black opacity-25"></div>
            <span className="mt-10 text-center z-10">
              <h1 className="text-4xl font-extrabold text-white">
                {titles[index]}
              </h1>
              <p className="text-white text-sm">{descriptions[index]}</p>
            </span>
            <button className="mb-10 bg-white p-2 z-10 rounded ease-in-out duration-200 hover:bg-black hover:text-white">
              Shop Now
            </button>
          </div>
        );
      })}
    </div>
  );
};
