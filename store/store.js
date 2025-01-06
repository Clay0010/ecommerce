import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

store.subscribe(() => {
  const state = store.getState().cart;
  localStorage.setItem("cart", JSON.stringify(state));
});