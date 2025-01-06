import React from "react";

export const HeroSection = () => {
  return (
    <div
      className="w-full h-[75vh] bg-cover bg-center relative"
      style={{ backgroundImage: "url(/watch.jpg)" }}
    >
      <span className="absolute top-1/4 pl-8">
        <h1 className="text-5xl font-extrabold">POWER UP YOUR LIFE.</h1>
        <p className="pt-3 text-lg">
          Shop the latest gadgets at unbeatable prices. Fast delivery,
        </p>
        <p className="text-lg">
          Top quality, and the best in tech—just for you!
        </p>
      </span>
    </div>
  );
};
