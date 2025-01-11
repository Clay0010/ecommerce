"use client";
import React from "react";
import ProtectedRoute from "../components/ProtectedRoute";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import ApiClient from "../utils/apiClient";

const page = () => {
  const [userData, setUserData] = useState({});
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      const profileResponse = await ApiClient.get("/auth/me");
      setUserData(profileResponse.data.result);
      const orderResponse = await ApiClient.get("/orders");
      console.log(orderResponse.data.result.orders);
      setOrders(orderResponse.data.result.orders);
    };

    fetchProfile();
  }, []);

  return (
    <ProtectedRoute>
      <div className="flex flex-col items-center">
        <div className="flex flex-col justify-center gap-2 items-center mt-10 w-[90vw]">
          <img
            src="/userProfileImage.jpg"
            alt="user's image"
            className="w-28 h-28 rounded-lg"
          />
          <h1 className="text-2xl font-bold">{userData.email}</h1>
          <hr className="text-gray w-full mt-5 w-1/3" />
        </div>
        <div className="mt-5">
          <h1 className="text-lg font-medium uppercase text-center">
            your orders
          </h1>
          <div className="w-[70vw] mt-5">
            {orders.map((order) => {
              return (
                <div
                  key={order.id}
                  className="flex flex-col items-center gap-3 border"
                >
                  <div className="flex gap-5">
                    <p>{order.code}</p>
                    <p>{order.status}</p>
                    <p>${order.total_price}</p>
                  </div>
                  {/* drop down arroe to show details ? */}
                  <div className="flex flex-col gap-5">
                    {order.lines.map((line, index) => {
                      return (
                        <div key={index} className="flex items-center gap-2">
                          <img
                            src="/watch.jpg"
                            alt="product image"
                            className="w-20 h-20 object-cover rounded"
                          />
                          <h1>{line.product.name}</h1>
                          <p>{line.price}</p>
                          <p>{line.quantity}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default page;
