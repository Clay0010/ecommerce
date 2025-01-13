"use client";
import React from "react";
import ProtectedRoute from "../components/ProtectedRoute";
import { useState, useEffect } from "react";
import ApiClient from "../utils/apiClient";
import { useRouter } from "next/navigation";
import { MdDeleteOutline } from "react-icons/md";

const page = () => {
  const [userData, setUserData] = useState({});
  const [orders, setOrders] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      const profileResponse = await ApiClient.get("/auth/me");
      setUserData(profileResponse.data.result);
      const orderResponse = await ApiClient.get("/orders");
      const sortedOrders = orderResponse.data.result.orders.sort((a, b) => {
        if (a.status === "new" && b.status === "cancelled") return -1;
        if (a.status === "cancelled" && b.status === "new") return 1;
        return 0;
      });

      setOrders(sortedOrders);
    };

    fetchProfile();
  }, []);

  // const handleDeleteOrder = (id) => {
  //   setOrders((prevOrders) =>
  //     prevOrders.filter((ord) => {
  //       return ord.id !== id;
  //     })
  //   );
  //   console.log(`Order ${id} deleted`);
  // };

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
          <hr className="text-gray w-72 mt-5" />
        </div>
        <div className="mt-5">
          <h1 className="text-lg font-medium uppercase text-center mb-6">
            your orders
          </h1>
          <div className="w-[70vw] mt-5">
            {orders.map((order) => {
              return (
                <div
                  key={order.id}
                  className="flex flex-col items-center gap-3 hover:cursor-pointer"
                  onClick={() => router.push(`orders/${order.id}`)}
                >
                  <div className="flex items-center justify-between gap-5  shadow-md rounded-lg p-5 w-full mb-3">
                    <div className="flex gap-5 items-center">
                      <img
                        src="/watch2.jpg"
                        alt="order placeholder image"
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <span>
                        <p>Order NO. : {order.code}</p>

                        <span className="flex items-center mt-2">
                          <p>Order Status: </p>
                          <p
                            className={`${
                              order.status === "cancelled"
                                ? "text-red-500 border-red-500"
                                : "text-green-500 border-green-500"
                            } ml-3 border p-1 rounded text-sm`}
                          >
                            {order.status}
                          </p>
                        </span>
                      </span>
                    </div>
                    <span
                      className="flex flex-col gap-3 items-end p-2 hover:cursor-default"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {/* {order.status === "cancelled" && (
                        <MdDeleteOutline
                          size={22}
                          className="text-red-500 hover:cursor-pointer"
                          onClick={() => handleDeleteOrder(order.id)}
                          title="Delete Order"
                        />
                      )} */}
                      <p>Total Price: ${order.total_price}</p>
                    </span>
                  </div>
                  {/* drop down arroe to show details ? */}
                  {/* <div className="flex flex-col gap-5">
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
                  </div> */}
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
