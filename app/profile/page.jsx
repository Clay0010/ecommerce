"use client";
import React from "react";
import ProtectedRoute from "../components/ProtectedRoute";
import axios from "axios";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";

const page = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [accessToken, setAccessToken] = useState("");
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const token = Cookies.get("access_token");
    if (token) {
      console.log(token);
      setAccessToken(token);
    }
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      if (accessToken) {
        try {
          const response = await axios.get(`${apiUrl}/auth/me`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });

          if (response.status === 200) {
            console.log(response.data.result);
            setUserData(response.data.result);
          }
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchProfile();
  }, [accessToken]);

  return (
    <ProtectedRoute>
      <div className="flex justify-center items-center">
        <h1 className="font-bold text-xl">{userData.email}</h1>
        
      </div>
    </ProtectedRoute>
  );
};

export default page;
