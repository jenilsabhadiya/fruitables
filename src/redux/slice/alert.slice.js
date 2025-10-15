import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  text: "",
  variant: null,
};

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    setalert: (state, action) => {
      state.text = action.payload.text;
      state.variant = action.payload.variant;
    },
    resetalert: (state) => {
      state.text = "";
      state.variant = null;
    },
  },
});

export const { setalert, resetalert } = alertSlice.actions;
export default alertSlice.reducer;
