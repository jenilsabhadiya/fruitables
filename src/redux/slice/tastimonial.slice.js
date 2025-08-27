import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLongin: false,
  tastimonial: [],
  error: null,
};

export const getAllData = createAsyncThunk(
  "tastimonial/getAllData",
  async () => {
    const response = await fetch("http://localhost:3000/tastimonial");
    const data = await response.json();

    return data;
  }
);

export const addTastimonial = createAsyncThunk(
  "tastimonial/addTastimonial",
  async (data) => {
    try {
      const response = await fetch("http://localhost:3000/tastimonial", {
        method: "POST",
        body: JSON.stringify({
          ...data,
          tastimonial_image: data.tastimonial_image.name,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const rdata = await response.json();

      return rdata;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteTastimonial = createAsyncThunk(
  "tastimonial/deleteTastimonial",
  async (id) => {
    try {
      await fetch("http://localhost:3000/tastimonial/" + id, {
        method: "DELETE",
      });

      return id;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateTastimonial = createAsyncThunk(
  "tastimonial/updateTastimonial",
  async (data) => {
    try {
      const response = await fetch(
        "http://localhost:3000/tastimonial/" + data.id,
        {
          method: "PUT",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const rData = await response.json();
      return rData;
    } catch (error) {
      console.log(error);
    }
  }
);

const tastimonialSlice = createSlice({
  name: "tastimonial",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getAllData.fulfilled, (state, action) => {
      state.tastimonial = action.payload;
    });
    builder.addCase(addTastimonial.fulfilled, (state, action) => {
      state.tastimonial.push(action.payload);
    });
    builder.addCase(deleteTastimonial.fulfilled, (state, action) => {
      state.tastimonial = state.tastimonial.filter(
        (v) => v.id !== action.payload
      );
    });
    builder.addCase(updateTastimonial.fulfilled, (state, action) => {
      const index = state.tastimonial.findIndex(
        (v) => v.id === action.payload.id
      );
      const copyData = [...state.tastimonial];
      copyData[index] = action.payload;
      state.tastimonial = copyData;
    });
  },
});

export default tastimonialSlice.reducer;
