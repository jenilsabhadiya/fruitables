import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../../constant/url";
import axios from "axios";

const initialState = {
  isLongin: false,
  auth: {},
  error: null,
};

export const RegisterUser = createAsyncThunk(
  "auth/RegisterUser",
  async (data) => {
    const response = await axios.post(`${BASE_URL}/users/registration`, data, {
      withCredentials: true,
    });

    console.log(response, data, response.data.data[0]);

    if (response.data.success) {
      return response.data.data;
    }
  }
);

export const loginUser = createAsyncThunk("auth/loginUser", async (data) => {
  const response = await axios.post(`${BASE_URL}/users/login`, data, {
    withCredentials: true,
  });

  console.log(response, data, response.data.data[0]);

  if (response.data.success) {
    return response.data.data;
  }
});

export const verifyOtp = createAsyncThunk("auth/verifyOtp", async (data) => {
  const response = await axios.post(`${BASE_URL}/users/verifyOtp`, data, {
    withCredentials: true,
  });

  console.log(response, data, response.data.data[0]);

  if (response.data.success) {
    return response.data.data;
  }
});

export const logout = createAsyncThunk("auth/logout", async (_id) => {
  const response = await axios.post(`${BASE_URL}/users/logout`, { _id });

  if (response.data.success) {
    return response.data.data;
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(RegisterUser.fulfilled, (state, action) => {
      state.auth = action.payload[0];
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.auth = action.payload;
      state.isLongin = true;
    });
    builder.addCase(verifyOtp.fulfilled, (state, action) => {
      state.auth = action.payload;
      state.isLongin = true;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.auth = action.payload;
      state.isLongin = false;
    });
  },
});

export default authSlice.reducer;
