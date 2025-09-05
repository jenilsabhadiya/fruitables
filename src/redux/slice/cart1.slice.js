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

  let userData = response.data[0];

  if (response.data.length === 0) {
    const uData = { ...data, cart: [data.cart] };
    const res = await axios.post(`${BASE_URL}/cart`, uData);

    return res.data;
  } else {
    const index = userData?.cart?.findIndex((v) => v.id === data.cart.id);
    console.log(index);

    if (index === -1 || index === undefined) {
      if (!userData?.cart) {
        userData.cart = {
          userId: userData.userId,
          cart: [data.cart],
        };
      } else {
        userData.cart.push(data.cart);
      }
    } else {
      let sumQty = userData.cart[index].qty + data.cart.qty;
      if (sumQty <= 10) {
        userData.cart[index].qty += data.cart.qty;
      }
    }

    const response = await axios.put(
      `${BASE_URL}/cart/${userData.id}`,
      userData
    );

    return response.data;
  }
});

export const getCart = createAsyncThunk("cart1/getCart", async (id) => {
  const response = await axios(`${BASE_URL}/cart?userId=${id}`);
  // console.log(response.data);

  return response.data[0];
});

export const incrementQut1 = createAsyncThunk(
  "cart1/incrementQut1",
  async (id) => {
    const response = await axios(`${BASE_URL}/cart?userId=abcd`);
    console.log(response.data);

    let userData = response.data[0];

    const index = userData.cart.findIndex((v) => v.id === id);
    if (index !== -1 && userData.cart[index].qty < 10) {
      userData.cart[index].qty++;
    }

    const response1 = await axios.put(
      `${BASE_URL}/cart/${userData.id}`,
      userData
    );

    return response1.data;
  }
);

export const decrementQut1 = createAsyncThunk(
  "cart1/decrementQut1",
  async (id) => {
    const response = await axios(`${BASE_URL}/cart?userId=abcd`);
    console.log(response.data);

    let userData = response.data[0];

    const index = userData.cart.findIndex((v) => v.id === id);
    if (userData.cart[index].qty > 1) {
      userData.cart[index].qty--;
    }

    const response1 = await axios.put(
      `${BASE_URL}/cart/${userData.id}`,
      userData
    );

    return response1.data;
  }
);

export const countQut1 = createAsyncThunk("cart1/countQut1", async (id) => {
  const response = await axios(`${BASE_URL}/cart?userId=abcd`);
  console.log(response.data);

  let userData = response.data[0];
  const index = userData.cart.findIndex((v) => v.id === id.id);
  userData.cart[index].qty = id.qty;

  const response1 = await axios.put(
    `${BASE_URL}/cart/${userData.id}`,
    userData
  );
  return response1.data;
});

export const removeQut1 = createAsyncThunk("cart1/removeQut1", async (id) => {
  const response = await axios(`${BASE_URL}/cart?userId=abcd`);
  console.log(response.data);

  let userData = response.data[0];
  const index = userData?.cart?.findIndex((v) => v.id === id);
  userData?.cart?.splice(index, 1);

  const response1 = await axios.put(
    `${BASE_URL}/cart/${userData.id}`,
    userData
  );
  return response1.data;
});

const cart1Slice = createSlice({
  name: "cart1",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(Addtocart1.fulfilled, (state, action) => {
      state.cart = action.payload;
    });
    builder.addCase(getCart.fulfilled, (state, action) => {
      state.cart = action.payload;
    });
    builder.addCase(incrementQut1.fulfilled, (state, action) => {
      state.cart = action.payload;
    });
    builder.addCase(decrementQut1.fulfilled, (state, action) => {
      state.cart = action.payload;
    });
    builder.addCase(countQut1.fulfilled, (state, action) => {
      state.cart = action.payload;
    });
    builder.addCase(removeQut1.fulfilled, (state, action) => {
      state.cart = action.payload;
    });
  },
});

export default cart1Slice.reducer;
