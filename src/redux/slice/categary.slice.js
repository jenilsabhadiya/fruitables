import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLongin: false,
  categary: [],
  error: null,
};

export const getAllData = createAsyncThunk("categary/getAllData", async () => {
  const response = await fetch("http://localhost:3000/categary");
  const data = await response.json();

  return data;
});

export const addCategary = createAsyncThunk(
  "categary/addCategary",
  async (data) => {
    try {
      const response = await fetch("http://localhost:3000/categary", {
        method: "POST",
        body: JSON.stringify({
          ...data,
          categary_image: data.categary_image.name,
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

export const deleteCategary = createAsyncThunk(
  "categary/deleteCategary",
  async (id) => {
    try {
      await fetch("http://localhost:3000/categary/" + id, {
        method: "DELETE",
      });

      return id;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateCategary = createAsyncThunk(
  "categary/updateCategary",
  async (data) => {
    try {
      const response = await fetch(
        "http://localhost:3000/categary/" + data.id,
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

export const updateStatus = createAsyncThunk(
  "categary/updateStatus",
  async (data) => {
    try {
      const response = await fetch(
        "http://localhost:3000/categary/" + data.id,
        {
          method: "PUT",
          body: JSON.stringify({ ...data, status: !data.status }),
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

const categarySlice = createSlice({
  name: "categary",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getAllData.fulfilled, (state, action) => {
      state.categary = action.payload;
    });
    builder.addCase(addCategary.fulfilled, (state, action) => {
      state.categary.push(action.payload);
    });
    builder.addCase(deleteCategary.fulfilled, (state, action) => {
      state.categary = state.categary.filter((v) => v.id !== action.payload);
    });
    builder.addCase(updateCategary.fulfilled, (state, action) => {
      const index = state.categary.findIndex((v) => v.id === action.payload.id);
      const copyData = [...state.categary];
      copyData[index] = action.payload;
      state.categary = copyData;
    });

    builder.addCase(updateStatus.fulfilled, (state, action) => {
      const index = state.categary.findIndex((v) => v.id === action.payload.id);
      const copyData = [...state.categary];
      copyData[index] = action.payload;
      state.categary = copyData;
    });
  },
});

export default categarySlice.reducer;
