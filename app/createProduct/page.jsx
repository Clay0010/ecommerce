"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const page = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [accessToken, setAccessToken] = useState("");
  const [message, setMessage] = useState("");
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const token = Cookies.get("access_token");
    if (token) {
      setAccessToken(token);
    }
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (accessToken) {
      try {
        const response = await axios.post(
          `${apiUrl}/products`,
          {
            name,
            description,
            price: parseFloat(price),
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.status === 200) {
          setMessage("Product Added Successfully !!");

          setTimeout(() => {
            setMessage("");
          }, 3000);
        }
      } catch (error) {
        console.error(
          "Error posting product:",
          error.response?.data || error.message
        );
      }
    } else {
      console.log("No access token found");
    }
  };

  return (
    <div className="w-full h-[80vh] flex justify-center items-center border">
      <form
        className="w-[50vw] h-[75%] flex flex-col items-center justify-center rounded-xl shadow-xl"
        onSubmit={handleFormSubmit}
      >
        <h1 className="font-bold text-2xl uppercase mb-5">Add New Product</h1>
        {message && <p className="text-sm text-green-500">{message}</p>}

        <div className="flex flex-col w-[90%]">
          <span className="w-full p-6 flex justify-between items-center">
            <label>Name: </label>
            <input
              type="text"
              placeholder="Product Name"
              className="p-2 border rounded-lg shadow-xs w-[70%] outline-none"
              onChange={(e) => setName(e.target.value)}
            />
          </span>
          <span className="w-full p-6 flex justify-between items-center">
            <label>Description: </label>
            <input
              type="text"
              placeholder="Product Description"
              className="p-2 border rounded-lg shadow-xs w-[70%] outline-none"
              onChange={(e) => setDescription(e.target.value)}
            />
          </span>
          <span className="w-full p-6 flex justify-between items-center">
            <label>Price: </label>
            <input
              type="number"
              placeholder="Product Price"
              className="p-2 border rounded-lg shadow-xs w-[70%] outline-none"
              onChange={(e) => setPrice(e.target.value)}
            />
          </span>
        </div>
        <button className="p-2 border rounded-lg shadow-sm w-32 mt-5 hover:text-white hover:bg-black">
          Submit
        </button>
      </form>
    </div>
  );
};

export default page;
