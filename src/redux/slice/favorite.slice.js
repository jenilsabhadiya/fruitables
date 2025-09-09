import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../constant/url";

const initialState = {
  favorites: {
    userId: "abcd",
    items: [],
  },
  error: null,
};

export const getFavorites = createAsyncThunk(
  "favorite/getFavorites",
  async (userId) => {
    try {
      const response = await axios.get(`${BASE_URL}/favorite?userId=${userId}`);
      return response.data[0];
    } catch (error) {
      console.log(error);
    }
  }
);

export const saveFavorite = createAsyncThunk(
  "favorite/saveFavorite",
  async ({ userId, item }) => {
    try {
      const response = await axios.get(`${BASE_URL}/favorite?userId=${userId}`);
      const userData = response.data[0];

      if (userData) {
        const fData = userData.products_Id.includes(item.id);
        console.log(fData);

        if (!fData) {
          const updatedList = [...userData.products_Id, item.id];
          const patchResponse = await axios.patch(
            `${BASE_URL}/favorite/${userData.id}`,
            { products_Id: updatedList }
          );
          return patchResponse.data;
        } else {
          return userData;
        }
      } else {
        const postResponse = await axios.post(`${BASE_URL}/favorite`, {
          userId,
          products_Id: [item.id],
        });

        return postResponse.data;
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export const removeFavorite = createAsyncThunk(
  "favorite/removeFavorite",
  async ({ userId, item }) => {
    try {
      const response = await axios.get(`${BASE_URL}/favorite?userId=${userId}`);
      const userData = response.data[0];

      const index = userData.products_Id.findIndex((i) => i === item.id);
      console.log(index);

      userData.products_Id.splice(index, 1);

      const response1 = await axios.patch(
        `${BASE_URL}/favorite/${userData.id}`,
        { products_Id: userData.products_Id }
      );

      return response1.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getFavorites.fulfilled, (state, action) => {
      state.favorites.items = action.payload.products_Id;
    });
    builder.addCase(saveFavorite.fulfilled, (state, action) => {
      state.favorites.items = action.payload.products_Id;
    });
    builder.addCase(removeFavorite.fulfilled, (state, action) => {
      state.favorites.items = action.payload.products_Id;
    });
  },
});

export default favoriteSlice.reducer;
