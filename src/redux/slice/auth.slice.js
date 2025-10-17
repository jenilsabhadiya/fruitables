import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../utlis/axiosInterceptors";
import { setalert } from "./alert.slice";

const initialState = {
  isLongin: false,
  auth: {},
  error: null,
};

export const RegisterUser = createAsyncThunk(
  "auth/RegisterUser",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/users/registration`, data);

      console.log(response, data, response.data.data[0]);

      if (response.data.success) {
        dispatch(setalert({ text: response.data.message, variant: "success" }));

        return response.data.data;
      }
    } catch (error) {
      console.log(error);
      dispatch(
        setalert({ text: error.response.data.message, variant: "error" })
      );
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/users/login`, data);

      console.log(response, data, response.data.data[0]);

      if (response.data.success) {
        dispatch(setalert({ text: response.data.message, variant: "success" }));
        return response.data.data;
      }
    } catch (error) {
      console.log(error);
      dispatch(
        setalert({ text: error.response.data.message, variant: "error" })
      );
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/users/verifyOtp`, data);

      console.log(response, data, response.data.data[0]);

      if (response.data.success) {
        dispatch(setalert({ text: response.data.message, variant: "success" }));

        return response.data.data;
      }
    } catch (error) {
      console.log(error);
      dispatch(
        setalert({ text: error.response.data.message, variant: "error" })
      );
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_id, { dispatch, rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/users/logout`, { _id });

      if (response.data.success) {
        dispatch(setalert({ text: response.data.message, variant: "success" }));

        return response.data.data;
      }
    } catch (error) {
      console.log(error);
      dispatch(
        setalert({ text: error.response.data.message, variant: "error" })
      );
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const chackAuth = createAsyncThunk("auth/chackAuth", async () => {
  // const response = await axiosInstance.post(`/users/chackAuth`, {});

  // if (response.data.success) {
  //   return response.data.data;
  // }

  // console.log("response", response.data.data);
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(RegisterUser.pending, (state) => {
      state.isLongin = true;
      state.auth = {};
      state.error = null;
    });
    builder.addCase(RegisterUser.fulfilled, (state, action) => {
      state.isLongin = false;
      state.auth = action.payload[0];
      state.error = null;
    });
    builder.addCase(RegisterUser.rejected, (state, action) => {
      state.isLongin = false;
      state.auth = {};
      state.error = action.payload;
    });
    builder.addCase(loginUser.pending, (state) => {
      state.isLongin = true;
      state.auth = {};
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLongin = false;
      state.auth = action.payload;
      state.error = null;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLongin = false;
      state.auth = {};
      state.error = action.payload;
    });
    builder.addCase(verifyOtp.pending, (state) => {
      state.isLongin = true;
      state.auth = {};
      state.error = null;
    });
    builder.addCase(verifyOtp.fulfilled, (state, action) => {
      state.isLongin = false;
      state.auth = action.payload;
      state.error = null;
    });
    builder.addCase(verifyOtp.rejected, (state, action) => {
      state.isLongin = false;
      state.auth = {};
      state.error = action.payload;
    });
    builder.addCase(logout.pending, (state) => {
      state.isLongin = true;
      state.auth = {};
      state.error = null;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.isLongin = false;
      state.auth = action.payload;
      state.error = null;
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.isLongin = false;
      state.auth = {};
      state.error = action.payload;
    });

    builder.addCase(chackAuth.fulfilled, (state, action) => {
      state.auth = action.payload;
      state.isVarifind = true;
    });
  },
});

export default authSlice.reducer;
