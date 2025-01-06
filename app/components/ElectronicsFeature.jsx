import React from "react";

export const ElectronicsFeature = () => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center">
      {/* Section 1 */}
      <div className="relative w-[90%] lg:w-[80%] h-[500px] overflow-hidden rounded-lg shadow-xl group">
        <div
          className="absolute inset-0 bg-cover bg-center transform scale-105 group-hover:scale-100 transition-all duration-500"
          style={{ backgroundImage: "url('/headphone.jpg')" }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-80 group-hover:opacity-60 transition-opacity duration-500"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-8">
          <h1 className="text-5xl font-extrabold mb-4 leading-tight group-hover:tracking-wide transition-all duration-500">
            Experience Audio Like Never Before
          </h1>
          <p className="text-lg text-gray-300 mb-6 max-w-2xl">
            Dive into an immersive sound experience with cutting-edge headphones
            that redefine clarity and comfort.
          </p>
          <button className="px-8 py-3 bg-white text-black font-semibold rounded-lg shadow-lg hover:bg-black hover:text-white transition-all duration-300">
            Explore Headphones
          </button>
        </div>
      </div>

      {/* Section 2 */}
      <div className="relative w-[90%] lg:w-[80%] h-[500px] mt-16 overflow-hidden rounded-lg shadow-xl group flex items-center justify-end mb-16">
        <div
          className="absolute inset-0 bg-cover bg-center transform scale-105 group-hover:scale-100 transition-all duration-500"
          style={{ backgroundImage: "url('/smartwatch.jpg')" }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-l from-black via-transparent to-black opacity-80 group-hover:opacity-60 transition-opacity duration-500"></div>
        <div className="relative z-10 p-8 lg:p-16 max-w-lg text-left">
          <h1 className="text-5xl font-extrabold mb-4 leading-tight text-white group-hover:tracking-wide transition-all duration-500">
            Stylish Connectivity
          </h1>
          <p className="text-lg text-gray-300 mb-6">
            Keep your life on track with smartwatches designed for modern
            living.
          </p>
          <button className="px-8 py-3 bg-white text-black font-semibold rounded-lg shadow-lg hover:bg-black hover:text-white transition-all duration-300">
            Explore Smartwatches
          </button>
        </div>
      </div>

    
    </div>
  );
};
