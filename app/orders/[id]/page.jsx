"use client";
import React, { useEffect, useState } from "react";
import ApiClient from "@/app/utils/apiClient";
import { FaArrowLeftLong } from "react-icons/fa6";
import Link from "next/link";

const OrdersPage = ({ params }) => {
  const { id } = React.use(params);
  const [orderDetails, setOrderDetails] = useState({});
  const fetchOrder = async () => {
    const response = await ApiClient.get(`/orders/${id}`);
    console.log(response.data.result);
    setOrderDetails(response.data.result);
  };
  useEffect(() => {
    if (id) fetchOrder();
  }, [id]);

  const handleCancelOrder = async (id) => {
    const response = await ApiClient.put(`/orders/${id}/cancel`);
    console.log(response);
    fetchOrder();
  };

  return (
    <div className="w-[80vw] h-auto m-auto mt-14 rounded-lg shadow-lg p-10">
      <Link
        className="flex gap-2 items-center hover:cursor-pointer w-40"
        href={"/profile"}
      >
        <FaArrowLeftLong size={18} />
        <p className="text-sm uppercase hover:underline">All Orders</p>
      </Link>
      <h1 className="text-center text-xl font-bold pb-5">
        Order NO. {orderDetails.code}
      </h1>
      <span className="flex justify-center gap-4 w-full items-center pb-3">
        <p>Order Status: </p>
        <p
          className={`${
            orderDetails.status === "cancelled"
              ? "text-red-500 border-red-500"
              : "text-green-500 border-green-500"
          } p-1 rounded text-sm border`}
        >
          {orderDetails.status}
        </p>
      </span>
      <hr className="w-1/3 m-auto mb-10" />
      <div className="flex flex-col gap-5">
        {orderDetails &&
          orderDetails?.lines?.map((line, index) => {
            return (
              <div
                key={index}
                className="flex items-center gap-2 justify-between shadow-md rounded-sm mx-20 p-4"
              >
                <span className="flex items-start gap-4">
                  <img
                    src="/watch.jpg"
                    alt="product image"
                    className="w-20 h-20 object-cover rounded"
                  />
                  <span>
                    <h1 className="text-xl">{line.product.name}</h1>
                    <p className="text-[10px] text-gray-500">
                      product code: {line.product.code}
                    </p>
                  </span>
                </span>
                <span className="flex flex-col justify-center items-end">
                  <p>${line.price}</p>
                  <p className="text-xs text-gray-500">qty:{line.quantity}</p>
                </span>
              </div>
            );
          })}
        <h1 className="text-center text-xl font-bold mt-3">
          Total: ${orderDetails.total_price}
        </h1>
        {orderDetails.status === "new" && (
          <div className="flex gap-4 items-center justify-center mt-5">
            <h1 className="text-sm text-gray-400">Cancel Order ?</h1>
            <button
              className="text-sm text-red-500 border-red-500 p-1 border rounded-lg w-20 hover:text-white hover:border-white hover:bg-red-500 duration-300 transition-all ease-out"
              type="button"
              onClick={() => handleCancelOrder(orderDetails.id)}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
