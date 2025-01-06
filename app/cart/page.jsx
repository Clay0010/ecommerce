"use client";
import React, { useEffect, useState } from "react";
import ProtectedRoute from "../components/ProtectedRoute";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, updateCart } from "@/store/cartSlice";
import { CiSquareRemove } from "react-icons/ci";

const CartPage = () => {
  const cartDetails = useSelector((state) => state.cart.items);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  console.log(cartDetails);
  console.log(totalPrice);

  const dispatch = useDispatch();

  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Ensure hydration before rendering
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return null; // Avoid rendering mismatched content
  }

  const handleMinusQuantity = (item) => {
    if (item.quantity > 1) {
      dispatch(updateCart({ id: item.id, quantity: item.quantity - 1 }));
    }
  };

  const handlePlusQuantity = (item) => {
    dispatch(updateCart({ id: item.id, quantity: item.quantity + 1 }));
  };

  const handleDeleteItem = (item) => {
    dispatch(
      removeFromCart({
        id: item.id,
      })
    );
  };
  return (
    <ProtectedRoute>
      <div className="max-w-full border h-[90vh]">
        <h1 className="text-center text-xl font-light mt-6 p-3 mb-5">
          Your Cart
        </h1>
        <div className="w-full flex justify-center flex-col items-center">
          {cartDetails.length > 0 ? (
            cartDetails.map((item) => (
              <div key={item.id} className="mb-8">
                <hr className="mb-5" />
                <div className="w-[75vw] flex gap-20 h-36">
                  <img
                    src="/laptop.jpg"
                    alt="product image"
                    className="h-full w-30 rounded-md"
                  />

                  <div className="w-full">
                    <span className="flex justify-between">
                      <p className="text-xl font-medium uppercase">
                        {item.name}
                      </p>
                      <button onClick={() => handleDeleteItem(item)}>
                        <CiSquareRemove
                          size={28}
                          className="text-red-500"
                          title="remove item"
                        />
                      </button>
                    </span>
                    <p className="text-lg font-light mt-5">
                      ${item.price * item.quantity}
                    </p>

                    {/* quantity section  */}
                    <div className="p-1 mt-5">
                      <label
                        htmlFor="quantity"
                        className="mr-2 text-sm font-medium"
                      >
                        Quantity:
                      </label>
                      <span>
                        <button
                          onClick={() => handleMinusQuantity(item)}
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
                          value={item.quantity}
                        />
                        <button
                          onClick={() => handlePlusQuantity(item)}
                          className="border w-8 h-8 rounded-lg text-lg mx-1 text-center"
                        >
                          +
                        </button>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>Your cart is empty.</p>
          )}
          {cartDetails.length >= 1 && (
            <div className="border-t-2 w-[75vw] pt-5 mb-10">
              <div className="flex justify-between gap-48 w-1/2">
                <h1 className="uppercase text-xl font-bold">Subtotal</h1>
                <p className="text-xl font-bold">${totalPrice}</p>
              </div>
              <div className="text-xs mt-2 w-1/2">
                Taxes and shipping calculated at checkout. By proceeding with
                your order, you accept our Shipping & Returns policies.
              </div>

              <button className="border border-black rounded-md uppercase p-2 text-sm mt-3 w-1/2 hover:text-white hover:bg-black ease-in-out duration-300 transition-all">
                Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default CartPage;
