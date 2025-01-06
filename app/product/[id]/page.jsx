"use client";
import React, { useState, useEffect } from "react";
import ApiClient from "@/app/utils/apiClient";
import ImageGallery from "@/app/components/ImageGallery";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/store/cartSlice";

const Page = ({ params }) => {
  const { id } = React.use(params);

  //   const cartData = useSelector((state) => state.cart.items);
  //   const { totalPrice, totalQuantity } = useSelector((state) => state.cart);
  //   console.log(cartData);
  //   console.log("total price:", totalPrice);
  //   console.log("total Quantity:", totalQuantity);
  const [message, setMessage] = useState("");
  const [productsData, setProductData] = useState({});
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        try {
          const response = await ApiClient.get(`/products/${id}`);
          //   console.log(response.data.result);
          setProductData(response.data.result);
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchProduct();
  }, [id]);

  const images = [
    "/phone.jpg",
    "/watch.jpg",
    "/laptop.jpg",
    "/smartwatch.jpg",
    "/watch2.jpg",
    "/laptop.jpg",
    "/smartwatch.jpg",
    "/watch2.jpg",
  ];

  const handleChange = (e) => {
    const inputValue = parseInt(e.target.value, 10);
    if (inputValue > 0) {
      setQuantity(inputValue);
    } else {
      setQuantity(1); // Reset to 1 if 0 or negative
    }
  };

  const handleAddToCart = () => {
    if (!productsData.id) {
      console.error("Product data is not loaded.");
      return;
    }

    dispatch(
      addToCart({
        id: productsData.id,
        name: productsData.name,
        price: productsData.price,
        quantity,
      })
    );

    console.log(`${quantity} items have been added`);

    setMessage(
      `${quantity} ${quantity === 1 ? "Item" : "Items"} 
        Have Been Added To Your Cart`
    );

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  const handleMinusQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="flex w-full h-[90vh] gap-6 mt-8 overflow-x-hidden">
      <div className="flex-[6] ml-4">
        <ImageGallery images={images} />
      </div>
      <div className="flex-[4] ml-5 mr-4">
        <div className="mt-6 p-1">
          <h1 className="text-3xl font-bold">{productsData.name}</h1>
          <p className="text-xl pt-1 font-light mt-6">${productsData.price}</p>
          <p className="text-sm mt-6">{productsData.description}</p>
          <div className="p-1 mt-5">
            <label htmlFor="quantity" className="mr-2 text-sm font-medium">
              Quantity:
            </label>
            <span>
              <button
                onClick={handleMinusQuantity}
                className="border w-8 h-8 rounded-lg text-lg mx-1 text-center"
              >
                -
              </button>

              <input
                type="number"
                name="quantity"
                min={1}
                readOnly
                className="border rounded-lg p-1 focus:outline-none w-20 pl-3 text-center h-8"
                onChange={handleChange}
                value={quantity}
              />
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="border w-8 h-8 rounded-lg text-lg mx-1 text-center"
              >
                +
              </button>
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            className="border uppercase p-2 w-full bg-black text-white hover:text-black hover:bg-white rounded shadow-sm ease-in-out duration-300 mt-5"
          >
            Add To Cart
          </button>

          <p
            className={`text-green-500 mt-3 text-center p-2 text-md ${
              message !== "" && "border border-green-500"
            }`}
          >
            {message}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
