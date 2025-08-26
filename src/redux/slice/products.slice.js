import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLongin: false,
  products: [],
  error: null,
};

export const getAllProductsData = createAsyncThunk(
  "products/getAllProductsData",
  async () => {
    const response = await fetch("http://localhost:3000/products");
    const data = await response.json();

    return data;
  }
);

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (data) => {
    try {
      const response = await fetch("http://localhost:3000/products", {
        method: "POST",
        body: JSON.stringify({
          ...data,
          products_image: data.products_image.name,
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

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id) => {
    try {
      await fetch("http://localhost:3000/products/" + id, {
        method: "DELETE",
      });

      return id;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (data) => {
    try {
      const response = await fetch(
        "http://localhost:3000/products/" + data.id,
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
  "products/updateStatus",
  async (data) => {
    const response = await fetch("http://localhost:3000/products/" + data.id, {
      method: "PUT",
      body: JSON.stringify({ ...data, status: !data.status }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const rData = await response.json();

    return rData;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getAllProductsData.fulfilled, (state, action) => {
      state.products = action.payload;
    });
    builder.addCase(addProduct.fulfilled, (state, action) => {
      state.products.push(action.payload);
    });
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.products = state.products.filter((v) => v.id !== action.payload);
    });
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      const index = state.products.findIndex((v) => v.id === action.payload.id);
      const copyData = [...state.products];
      copyData[index] = action.payload;
      state.products = copyData;
    });

    builder.addCase(updateStatus.fulfilled, (state, action) => {
      const index = state.products.findIndex((v) => v.id === action.payload.id);
      const copyData = [...state.products];
      copyData[index] = action.payload;
      state.products = copyData;
    });
  },
});

export default productsSlice.reducer;
