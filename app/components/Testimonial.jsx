import React from "react";

export const Testimonial = () => {
  return (
    <div className="w-full py-16 bg-gray-100">
      <h2 className="text-3xl font-bold text-center mb-8">
        What Our Customers Say
      </h2>
      <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-8">
        <div className="w-[300px] bg-white shadow-lg p-6 rounded-lg">
          <p className="text-gray-600 text-sm italic">
            "Absolutely love my new laptop! The performance is outstanding and
            the design is sleek. Highly recommend!"
          </p>
          <h3 className="mt-4 font-bold text-gray-800 text-right">- Jane D.</h3>
        </div>
        <div className="w-[300px] bg-white shadow-lg p-6 rounded-lg">
          <p className="text-gray-600 text-sm italic">
            "Great shopping experience! The customer service was amazing and the
            product exceeded my expectations."
          </p>
          <h3 className="mt-4 font-bold text-gray-800 text-right">- Alex R.</h3>
        </div>
        <div className="w-[300px] bg-white shadow-lg p-6 rounded-lg">
          <p className="text-gray-600 text-sm italic">
            "These gadgets have transformed how I work and play. I can’t imagine
            life without them!"
          </p>
          <h3 className="mt-4 font-bold text-gray-800 text-right">
            - Chris P.
          </h3>
        </div>
      </div>
    </div>
  );
};
