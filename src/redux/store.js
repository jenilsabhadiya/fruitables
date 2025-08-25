import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./slice/counter.slice";
import productsSlice from "./slice/products.slice";

export const store = configureStore({
  reducer: {
    count: counterSlice,
    product: productsSlice,
  },
});
