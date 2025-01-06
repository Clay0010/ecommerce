"use client";
import { useState } from "react";
import "../globals.css";

const ImageGallery = ({ images }) => {
  const [activeImage, setActiveImage] = useState(images[0]);
  const [fade, setFade] = useState(false);

  const handleImageChange = (image) => {
    setFade(true); // Trigger fade out
    setTimeout(() => {
      setActiveImage(image); // Change the active image after fade out
      setFade(false); // Trigger fade in
    }, 100); // Duration of fade-out in milliseconds
  };

  return (
    <div className="flex w-full h-[90vh]">
      {/* Small Images on the Left */}
      <div className="flex flex-col gap-2 p-1 w-1/5 overflow-y-auto max-h-full scrollbar-hidden">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Thumbnail ${index}`}
            className={`cursor-pointer rounded-md transition-all ease-in-out duration-200 h-24 w-full object-cover ${
              activeImage === image
                ? "border-2 border-black"
                : "opacity-65 hover:opacity-100"
            }`}
            onClick={() => handleImageChange(image)}
          />
        ))}
      </div>

      {/* Active Image on the Right */}
      <div className="flex-1 flex justify-center items-center rounded-lg relative ml-4">
        <img
          src={activeImage}
          alt="Active"
          className={`max-h-full max-w-full rounded-md shadow-md object-cover transition-opacity duration-300 ${
            fade ? "opacity-0" : "opacity-100"
          }`}
        />
      </div>
    </div>
  );
};

export default ImageGallery;
