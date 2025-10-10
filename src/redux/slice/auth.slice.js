import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../utlis/axiosInterceptors";

const initialState = {
  isLongin: false,
  auth: {},
  error: null,
};

export const RegisterUser = createAsyncThunk(
  "auth/RegisterUser",
  async (data) => {
    const response = await axiosInstance.post(`/users/registration`, data);

    console.log(response, data, response.data.data[0]);

    if (response.data.success) {
      return response.data.data;
    }
  }
);

export const loginUser = createAsyncThunk("auth/loginUser", async (data) => {
  const response = await axiosInstance.post(`/users/login`, data);

  console.log(response, data, response.data.data[0]);

  if (response.data.success) {
    return response.data.data;
  }
});

export const verifyOtp = createAsyncThunk("auth/verifyOtp", async (data) => {
  const response = await axiosInstance.post(`/users/verifyOtp`, data);

  console.log(response, data, response.data.data[0]);

  if (response.data.success) {
    return response.data.data;
  }
});

export const logout = createAsyncThunk("auth/logout", async (_id) => {
  const response = await axiosInstance.post(`/users/logout`, { _id });

  if (response.data.success) {
    return response.data.data;
  }
});

export const chackAuth = createAsyncThunk("auth/chackAuth", async () => {
  const response = await axiosInstance.post(`/users/chackAuth`, {});

  if (response.data.success) {
    return response.data.data;
  }

  // console.log("response", response.data.data);
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
      state.isVarifind = true;
    });
    builder.addCase(verifyOtp.fulfilled, (state, action) => {
      state.auth = action.payload;
      state.isVarifind = true;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.auth = action.payload;
      state.isVarifind = false;
    });
    builder.addCase(chackAuth.fulfilled, (state, action) => {
      state.auth = action.payload;
      state.isVarifind = true;
    });
  },
});

export default authSlice.reducer;
