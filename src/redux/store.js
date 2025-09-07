import counterSlice from "./slice/counter.slice";
import productsSlice from "./slice/products.slice";
import categarySlice from "./slice/categary.slice";
import subCategarySlice from "./slice/subCategary.slice";
import tastimonialSlice from "./slice/Tastimonial.slice";
import cartSlice from "./slice/cart.slice";
import cart1Slice from "./slice/cart1.slice";
import favoriteSlice from "./slice/favorite.slice";
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
  cart1: cart1Slice,
  favorite: favoriteSlice,
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
