import React from "react";

export const Footer = () => {
  return (
    <div className="bg-gray-800 text-white py-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        {/* Left Column - Brand Info */}
        <div className="space-y-4 mb-6 md:mb-0">
          <h2 className="text-3xl font-semibold">TechWorld</h2>
          <p className="text-sm text-gray-400">
            Stay up to date with the latest tech gadgets and devices. Your
            source for innovative electronics.
          </p>
        </div>

        {/* Right Column - Quick Links */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Quick Links</h3>
          <ul className="text-sm text-gray-400 space-y-2">
            <li>
              <a href="/" className="hover:text-gray-200 transition">
                Home
              </a>
            </li>
            <li>
              <a href="/shop" className="hover:text-gray-200 transition">
                Shop
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-200 transition">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-200 transition">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center mt-8 text-sm text-gray-400">
        <p>&copy; 2024 TechWorld. All Rights Reserved.</p>
      </div>
    </div>
  );
};
