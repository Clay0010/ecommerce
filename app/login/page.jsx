"use client";
import React from "react";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { LuEyeOff } from "react-icons/lu";
import { LuEye } from "react-icons/lu";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
const page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showError, setShowError] = useState({ error: false, message: "" });
  const router = useRouter();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const emailRef = useRef(null);

  useEffect(() => {
    if (emailRef.current) {
      emailRef.current.focus();
    }
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, {
        email,
        password,
      });

      if (response.status === 200) {
        console.log(response);

        console.log("login successful");
        Cookies.set("access_token", response.data.result.access_token, {
          path: "",
          expires: 1,
        });
        Cookies.set("refresh_token", response.data.result.refresh_token, {
          path: "",
          expires: 7,
        });
        router.push("/");
      }
    } catch (error) {
      console.log(error);
      setShowError({
        error: true,
        message: "something went wrong, please try again",
      });
      setEmail("");
      setPassword("");
      if (emailRef.current) {
        emailRef.current.focus();
      }
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="flex w-[100vw] h-[100vh] items-center justify-center bg-gray-100">
      <form
        className="flex flex-col items-center justify-center w-[50vw] h-[80vh] bg-white rounded-xl shadow-lg"
        onSubmit={handleFormSubmit}
      >
        <h1 className="text-3xl font-bold uppercase p-5">Login</h1>
        <input
          type="email"
          ref={emailRef}
          placeholder="Email"
          className="border outline-none p-3 w-80 rounded-lg m-2"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <div className="border w-80 rounded-lg m-2 p-3 outline-none flex justify-between">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="outline-none"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={handleShowPassword}
            className="font-light text-gray-400"
            type="button"
            tabIndex="-1"
          >
            {showPassword ? (
              <LuEye title="show password" />
            ) : (
              <LuEyeOff title="hide password" />
            )}
          </button>
        </div>
        {showError && (
          <p className="text-sm text-red-600 p-2 mt-3">{showError.message}</p>
        )}
        <button
          type="submit"
          className="border p-2 w-32 m-2 mt-4 rounded-lg duration-300 ease-in-out hover:bg-black hover:text-white"
        >
          Submit
        </button>
        <span className="flex p-2 w-[75%] gap-2 justify-center items-center pt-7">
          <p className="text-sm font-light">Don't have an account yet ?</p>
          <Link href="/register" className="text-sm font-semibold">
            Register
          </Link>
        </span>
      </form>
    </div>
  );
};

export default page;
