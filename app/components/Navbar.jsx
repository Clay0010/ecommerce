"use client";
import React from "react";
import Link from "next/link";
import { CiShoppingCart } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { CiLogin } from "react-icons/ci";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";

export const Navbar = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [isHydrated, setIsHydrated] = useState(false);

  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  useEffect(() => {
    // Get the access token only after the component mounts on the client side
    const token = Cookies.get("access_token");
    setAccessToken(token);
    // Ensure the client is hydrated
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    // Avoid rendering mismatched HTML during SSR
    return null;
  }
  return (
    <div className="border p-4 flex items-center px-20">
      {/* Left Section */}
      <div className="flex gap-7 flex-grow">
        <Link href="/shop">Shop</Link>
        <Link href="#">New Arrival</Link>
        <Link href="#">On Sale</Link>
        <Link href="#">Brands</Link>
      </div>

      {/* Center Section */}
      <div className="flex-shrink-0 text-2xl font-bold">
        <Link href="/">TechWorld</Link>
      </div>

      {/* Right Section */}
      <div className="flex gap-4 flex-grow items-center justify-end">
        <input
          type="text"
          placeholder="Search"
          className="border p-2 w-64 rounded-md"
        />
        <Link href="/cart" className="relative">
          <CiShoppingCart
            size={24}
            className="hover:cursor-pointer"
            title="cart"
          />
          {totalQuantity > 0 && (
            <span
              className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
              title={`${totalQuantity} items in cart`}
            >
              {totalQuantity}
            </span>
          )}
        </Link>
        {accessToken && (
          <Link href="/profile">
            <CiUser
              size={24}
              className="hover:cursor-pointer"
              title="profile"
            />
          </Link>
        )}

        {accessToken && (
          <Link href="/createProduct">
            <IoIosAddCircleOutline
              size={24}
              title="add product"
              className="hover:corsur-pointer"
            />
          </Link>
        )}

        {!accessToken && (
          <Link href="/login">
            <CiLogin
              size={24}
              title="login/register"
              className="hover:corsur-pointer"
            />
          </Link>
        )}
      </div>
    </div>
  );
};
