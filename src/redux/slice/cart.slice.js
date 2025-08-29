import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLongin: false,
  cart: [],
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    Addtocart: (state, action) => {
      const index = state.cart.findIndex((v) => v.id === action.payload.id);

      if (index === -1) {
        state.cart.push(action.payload);
      } else {
        state.cart[index].qty += action.payload.qty;
      }
    },
    incrementQut: (state, action) => {
      const index = state.cart.findIndex((v) => v.id === action.payload);
      if (state.cart[index].qty < 10) {
        state.cart[index].qty++;
      }
    },
    decrementQut: (state, action) => {
      const index = state.cart.findIndex((v) => v.id === action.payload);
      if (state.cart[index].qty > 1) {
        state.cart[index].qty--;
      }
    },
    countQut: (state, action) => {
      const index = state.cart.findIndex((v) => v.id === action.payload.id);
      state.cart[index].qty = action.payload.qty;
    },
    removeQut: (state, action) => {
      const index = state.cart.findIndex((v) => v.id === action.payload);
      state.cart.splice(index, 1);
    },
  },
});

export const { Addtocart, incrementQut, decrementQut, countQut, removeQut } =
  cartSlice.actions;
export default cartSlice.reducer;
