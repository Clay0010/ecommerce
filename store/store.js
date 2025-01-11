import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import searchReducer from "./searchSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    search: searchReducer,
  },
});

store.subscribe(() => {
  const state = store.getState().cart;
  localStorage.setItem("cart", JSON.stringify(state));
});
