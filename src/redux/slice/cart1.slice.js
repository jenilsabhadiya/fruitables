import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../../constant/url";
import axios from "axios";

const initialState = {
  isLogin: false,
  cart: {},
  error: null,
};

export const Addtocart1 = createAsyncThunk("cart1/Addtocart1", async (data) => {
  const response = await axios(`${BASE_URL}/cart?userId=${data.userId}`);
  if (response.data.length === 0) {
    const uData = { ...data, cart: [data.cart] };
    const res = await axios.post(`${BASE_URL}/cart`, uData);
    return res.data;
  }
});

export const getAllData = createAsyncThunk("cart1/getAllData", async () => {
  const response = await axios.get(`${BASE_URL}/cart`);
  //   console.log(response.data);

  return response.data;
});

const cart1Slice = createSlice({
  name: "cart1",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(Addtocart1.fulfilled, (state, action) => {
      state.cart = action.payload;
    });
    builder.addCase(getAllData.fulfilled, (state, action) => {
      state.loading = false;

      const userId = "abcd";
      const userCart = action.payload.find((c) => c.userId === userId);
      //   console.log(userCart);

      state.cart = userCart;
    });
  },
});

export default cart1Slice.reducer;
