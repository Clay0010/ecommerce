"use client";
import { Merriweather } from "next/font/google";
import "./globals.css";
import { Navbar } from "./components/Navbar";
import { usePathname } from "next/navigation";
import { store } from "@/store/store";
import { Provider } from "react-redux";

const merriweather = Merriweather({
  variable: "--font-merriweather",
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"], // Adjust based on the weights you want
});

export default function RootLayout({ children }) {
  const pathname = usePathname();

  // Paths where the navbar should hide
  const hideNavbarPaths = ["/login", "/register"];

  // Determine if the current path is one of the pages where the navbar should be hidden
  const shouldHideNavbar = hideNavbarPaths.includes(pathname);

  return (
    <html lang="en">
      <body className={`${merriweather.variable} antialiased`}>
        <Provider store={store}>
          {/* Conditionally render Navbar */}
          {!shouldHideNavbar && <Navbar />}
          {children}
        </Provider>
      </body>
    </html>
  );
}
