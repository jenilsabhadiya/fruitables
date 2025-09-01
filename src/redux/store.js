// import { configureStore } from "@reduxjs/toolkit";
// import counterSlice from "./slice/counter.slice";
// import productsSlice from "./slice/products.slice";
// import categarySlice from "./slice/categary.slice";
// import subCategarySlice from "./slice/subCategary.slice";
// import tastimonialSlice from "./slice/Tastimonial.slice";
// import cartSlice from "./slice/cart.slice";
// import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

// const cartPersistConfig = {
//   key: "cart",
//   storage,
// };

// const persistedCartReducer = persistReducer(cartPersistConfig, cartSlice);

// export const store = configureStore({
//   reducer: {
//     count: counterSlice,
//     product: productsSlice,
//     categary: categarySlice,
//     subCategary: subCategarySlice,
//     tastimonial: tastimonialSlice,
//     cart: persistedCartReducer,
//   },
// });

// export const persistor = persistStore(store);

import counterSlice from "./slice/counter.slice";
import productsSlice from "./slice/products.slice";
import categarySlice from "./slice/categary.slice";
import subCategarySlice from "./slice/subCategary.slice";
import tastimonialSlice from "./slice/Tastimonial.slice";
import cartSlice from "./slice/cart.slice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { combineReducers, configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  count: counterSlice,
  product: productsSlice,
  categary: categarySlice,
  subCategary: subCategarySlice,
  tastimonial: tastimonialSlice,
  cart: cartSlice,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const CStore = () => {
  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
  let persistor = persistStore(store);
  return { store, persistor };
};

export default CStore;
