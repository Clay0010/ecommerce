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
  const [showRePassword, setShowRePassword] = useState(false);
  const [rePassword, setRePassword] = useState("");
  const [showError, setShowError] = useState({ error: false, message: "" });
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();
  const passwordRef = useRef(null);
  const emailRef = useRef(null);

  useEffect(() => {
    if (emailRef.current) {
      emailRef.current.focus();
    }
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (password !== rePassword) {
      setPassword("");
      setRePassword("");
      setShowError({ error: true, message: "Passwords don't match" });

      if (passwordRef.current) {
        passwordRef.current.focus();
      }
    }
    if (password === rePassword) {
      try {
        const response = await axios.post(`${apiUrl}/auth/register`, {
          email,
          password,
        });

        if (response.status === 200) {
          console.log("register successful");
          console.log(response.data);
          router.push("/login");
        }
      } catch (error) {
        setShowError({
          error: true,
          message:
            "something went wrong, please double-check your credentials and try again",
        });
        setEmail("");
        setPassword("");
        setRePassword("");
        if (emailRef.current) {
          emailRef.current.focus();
        }
      }
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleShowRePassword = () => {
    setShowRePassword(!showRePassword);
  };

  return (
    <div className="flex w-[100vw] h-[100vh] items-center justify-center bg-gray-100">
      <form
        className="flex flex-col items-center justify-center w-[50vw] h-[80vh] bg-white rounded-xl shadow-lg"
        onSubmit={handleFormSubmit}
      >
        <h1 className="text-3xl font-bold uppercase p-5">Register</h1>
        <input
          type="email"
          placeholder="Email"
          className="border outline-none p-3 w-80 rounded-lg m-2"
          ref={emailRef}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <div className="border w-80 rounded-lg m-2 p-3 outline-none flex justify-between">
          <input
            type={showPassword ? "text" : "password"}
            ref={passwordRef} // Attach ref to the password input
            value={password}
            placeholder="Password"
            className="outline-none"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={handleShowPassword}
            className="font-light text-gray-400"
            type="button"
            tabIndex={-1}
          >
            {showPassword ? (
              <LuEye title="show password" />
            ) : (
              <LuEyeOff title="hide password" />
            )}
          </button>
        </div>
        {/* ----- */}
        <div className="border w-80 rounded-lg m-2 p-3 outline-none flex justify-between">
          <input
            type={showRePassword ? "text" : "password"}
            placeholder="re-enter password"
            className="outline-none"
            value={rePassword}
            onChange={(e) => setRePassword(e.target.value)}
          />
          <button
            onClick={handleShowRePassword}
            className="font-light text-gray-400"
            type="button"
            tabIndex="-1"
          >
            {showRePassword ? (
              <LuEye title="show password" />
            ) : (
              <LuEyeOff title="hide password" />
            )}
          </button>
        </div>

        {showError && (
          <p className="text-red-600 p-2 text-sm mt-3">{showError.message}</p>
        )}

        <button
          type="submit"
          className="border p-2 w-32 m-2 mt-6 rounded-lg duration-300 ease-in-out hover:bg-black hover:text-white"
        >
          Submit
        </button>
        <span className="flex p-2 w-[75%] gap-2 justify-center items-center pt-7">
          <p className="text-sm font-light">Already have an account ?</p>
          <Link href="/login" className="text-sm font-semibold">
            Login
          </Link>
        </span>
      </form>
    </div>
  );
};

export default page;
