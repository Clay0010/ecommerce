"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const ProtectedRoute = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("access_token"); // Check if user is authenticated
    if (!token) {
      router.push("/login"); // Redirect to login page if no token found
    }
  }, [router]);

  // If token is not found, render nothing until the redirect happens
  return <>{children}</>;
};

export default ProtectedRoute;
