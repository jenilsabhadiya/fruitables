import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLongin: false,
  cart: {},
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    Addtocart: (state, action) => {
      console.log(action);

      const index = state?.cart?.cart?.findIndex(
        (v) => v.id === action.payload.cart.id
      );

      console.log(index);

      if (index === -1 || index === undefined) {
        if (!state.cart?.cart) {
          state.cart = {
            userId: action.payload.userId,
            cart: [action.payload.cart],
          };
        } else {
          state.cart.cart.push(action.payload.cart);
        }
      } else {
        let sumQty = state.cart.cart[index].qty + action.payload.cart.qty;
        if (sumQty <= 10) {
          state.cart.cart[index].qty += action.payload.cart.qty;
        } else {
          alert("Minimum 10 items allows");
        }
      }
    },
    incrementQut: (state, action) => {
      const index = state.cart.cart.findIndex(
        (item) => item.id === action.payload
      );
      if (index !== -1 && state.cart.cart[index].qty < 10) {
        state.cart.cart[index].qty++;
      }
    },
    decrementQut: (state, action) => {
      const index = state.cart.cart.findIndex((v) => v.id === action.payload);
      if (state.cart.cart[index].qty > 1) {
        state.cart.cart[index].qty--;
      }
    },
    countQut: (state, action) => {
      const index = state.cart.cart.findIndex(
        (v) => v.id === action.payload.id
      );
      state.cart.cart[index].qty = action.payload.qty;
    },
    removeQut: (state, action) => {
      const index = state.cart?.cart?.findIndex((v) => v.id === action.payload);
      state.cart?.cart?.splice(index, 1);
    },
  },
});

export const { Addtocart, incrementQut, decrementQut, countQut, removeQut } =
  cartSlice.actions;
export default cartSlice.reducer;
