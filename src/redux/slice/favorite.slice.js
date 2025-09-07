import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { BASE_URL } from "../../constant/url";

const initialState = {
  isLogin: false,
  favorites: {
    userId: "abcd",
    items: [],
  },
  error: null,
};

export const saveFavorite = createAsyncThunk(
  "favorite/saveFavorite",
  async ({ userId, item }) => {
    try {
      const response = await axios.post(`${BASE_URL}/favorite`, {
        userId,
        products_Id: [item.id],
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

// export const saveFavorite = createAsyncThunk(
//   "favorite/saveFavorite",
//   async ({ userId, item }) => {
//     try {
//       const getResponse = await axios.get(
//         `${BASE_URL}/favorite?userId=${userId}`
//       );
//       const userFavorites = getResponse.data[0];

//       if (userFavorites) {
//         const alreadyExists = userFavorites.products_Id.includes(item.id);
//         if (!alreadyExists) {
//           const updatedList = [...userFavorites.products_Id, item.id];

//           const patchResponse = await axios.patch(
//             `${BASE_URL}/favorite/${userFavorites.id}`,
//             {
//               products_Id: updatedList,
//             }
//           );

//           return patchResponse.data;
//         } else {
//           return userFavorites;
//         }
//       } else {
//         const postResponse = await axios.post(`${BASE_URL}/favorite`, {
//           userId,
//           products_Id: [item.id],
//         });

//         return postResponse.data;
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   }
// );

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      const index = state.favorites.items.findIndex(
        (v) => v.id === action.payload.item.id
      );
      if (index === -1) {
        state.favorites.items.push(action.payload.item);
      }
    },
    removeFavorite: (state, action) => {
      const index = state.favorites.items.findIndex(
        (v) => v.id === action.payload
      );
      if (index !== -1) {
        state.favorites.items.splice(index, 1);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(saveFavorite.fulfilled, (state, action) => {
      state.favorites.items.push(action.payload);
    });
  },
});

export const { addFavorite, removeFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;
