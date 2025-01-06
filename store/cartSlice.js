import { createSlice } from "@reduxjs/toolkit";

const isBrowser = typeof window !== "undefined";

// hydration error
const initialState = isBrowser
  ? JSON.parse(localStorage.getItem("cart")) || {
      items: [],
      totalQuantity: 0,
      totalPrice: 0,
    }
  : {
      items: [],
      totalQuantity: 0,
      totalPrice: 0,
    };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload.id);

      if (item) {
        item.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }

      state.totalQuantity += action.payload.quantity;
      state.totalPrice += action.payload.price * action.payload.quantity;
    },
    removeFromCart: (state, action) => {
      const itemIndex = state.items.findIndex(
        (i) => i.id === action.payload.id
      );

      if (itemIndex !== -1) {
        const item = state.items[itemIndex];
        state.totalPrice -= item.price * item.quantity;
        state.totalQuantity -= item.quantity;
        state.items.splice(itemIndex, 1);
      }
    },
    updateCart: (state, action) => {
      const { id, quantity } = action.payload;

      const item = state.items.find((i) => i.id === id);

      if (item && quantity > 0) {
        state.totalQuantity += quantity - item.quantity;
        state.totalPrice += (quantity - item.quantity) * item.price;
        item.quantity = quantity;
      }
    },
  },
});

export const { addToCart, removeFromCart, updateCart } = cartSlice.actions;

export default cartSlice.reducer;
