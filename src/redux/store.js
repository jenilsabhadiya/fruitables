import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./slice/counter.slice";
import productsSlice from "./slice/products.slice";
import categarySlice from "./slice/categary.slice";
import subCategarySlice from "./slice/subCategary.slice";

export const store = configureStore({
  reducer: {
    count: counterSlice,
    product: productsSlice,
    categary: categarySlice,
    subCategary: subCategarySlice,
  },
});
