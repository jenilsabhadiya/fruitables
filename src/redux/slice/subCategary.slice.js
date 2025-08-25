import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLongin: false,
  subCategary: [],
  error: null,
};

export const getAllData = createAsyncThunk(
  "subCategary/getAllData",
  async () => {
    const response = await fetch("http://localhost:3000/subCategary");
    const data = await response.json();

    return data;
  }
);

export const addsubCategary = createAsyncThunk(
  "subCategary/addsubCategary",
  async (data) => {
    try {
      const response = await fetch("http://localhost:3000/subCategary", {
        method: "POST",
        body: JSON.stringify({
          ...data,
          sub_categary_image: data.sub_categary_image.name,
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

export const deletesubCategary = createAsyncThunk(
  "subCategary/deletesubCategary",
  async (id) => {
    try {
      await fetch("http://localhost:3000/subCategary/" + id, {
        method: "DELETE",
      });

      return id;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updatesubCategary = createAsyncThunk(
  "subCategary/updatesubCategary",
  async (data) => {
    try {
      const response = await fetch(
        "http://localhost:3000/subCategary/" + data.id,
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
  "subCategary/updateStatus",
  async (data) => {
    try {
      const response = await fetch(
        "http://localhost:3000/subCategary/" + data.id,
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

const subCategarySlice = createSlice({
  name: "subCategary",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getAllData.fulfilled, (state, action) => {
      state.subCategary.push(...action.payload);
    });
    builder.addCase(addsubCategary.fulfilled, (state, action) => {
      state.subCategary.push(action.payload);
    });
    builder.addCase(deletesubCategary.fulfilled, (state, action) => {
      state.subCategary = state.subCategary.filter(
        (v) => v.id !== action.payload
      );
    });
    builder.addCase(updatesubCategary.fulfilled, (state, action) => {
      const index = state.subCategary.findIndex(
        (v) => v.id === action.payload.id
      );
      const copyData = [...state.subCategary];
      copyData[index] = action.payload;
      state.subCategary = copyData;
    });

    builder.addCase(updateStatus.fulfilled, (state, action) => {
      const index = state.subCategary.findIndex(
        (v) => v.id === action.payload.id
      );
      const copyData = [...state.subCategary];
      copyData[index] = action.payload;
      state.subCategary = copyData;
    });
  },
});

export default subCategarySlice.reducer;
