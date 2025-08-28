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
      console.log(action);

      const index = state.cart.findIndex((v) => v.id === action.payload.id);
      console.log(index);

      if (index === -1) {
        state.cart.push(action.payload);
      } else {
        state.cart[index].qty = action.payload.qty;
      }
    },
    incrementQut: (state, action) => {},
    decrementQut: (state, action) => {},
    removeQut: (state, action) => {},
  },
});

export const { Addtocart, incrementQut, decrementQut, removeQut } =
  cartSlice.actions;
export default cartSlice.reducer;
