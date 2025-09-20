import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../constant/url";

export const categaryApi = createApi({
  reducerPath: "categaryApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (build) => ({
    getAllcategary: build.query({
      query: () => "/categary",
    }),
    addcategary: build.mutation({
      query: (data) => ({
        url: `/categary`,
        method: "POST",
        body: data,
      }),
      // https://redux-toolkit.js.org/rtk-query/usage/manual-cache-updates
      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        const tempId = crypto.randomUUID();
        const patchResult = dispatch(
          categaryApi.util.updateQueryData(
            "getAllcategary",
            undefined,
            (draft) => {
              draft.push({ id: tempId, ...data });
            }
          )
        );
        try {
          const { data } = await queryFulfilled;
          console.log(data);

          categaryApi.util.updateQueryData(
            "getAllcategary",
            undefined,
            (draft) => {
              const index = draft.findIndex((v) => v.id === tempId);

              draft[index] = { data };
            }
          );
        } catch {
          patchResult.undo();
        }
      },
    }),
    deletecategary: build.mutation({
      query: (id) => ({
        url: `/categary/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          categaryApi.util.updateQueryData(
            "getAllcategary",
            undefined,
            (draft) => {
              const index = draft.findIndex((v) => v.id === id);

              draft.splice(index, 1);
            }
          )
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    updatecategary: build.mutation({
      query: ({ id, ...data }) => ({
        url: `/categary/${id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted({ id, ...data }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          categaryApi.util.updateQueryData(
            "getAllcategary",
            undefined,
            (draft) => {
              const index = draft.findIndex((v) => v.id === id);

              draft[index] = { ...draft[index], ...data };
            }
          )
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    statuscategary: build.mutation({
      query: ({ id, ...data }) => ({
        url: `/categary/${id}`,
        method: "PATCH",
        body: data,
      }),
      // async onQueryStarted({ id, ...data }, { dispatch, queryFulfilled }) {
      //   const patchResult = dispatch(
      //     categaryApi.util.updateQueryData(
      //       "getAllcategary",
      //       undefined,
      //       (draft) => {
      //         const index = draft.findIndex((v) => v.id === id);

      //         draft[index] = { ...draft[index], ...data };
      //       }
      //     )
      //   );
      //   try {
      //     await queryFulfilled;
      //   } catch {
      //     patchResult.undo();
      //   }
      // },
    }),
  }),
});

export const {
  useGetAllcategaryQuery,
  useAddcategaryMutation,
  useDeletecategaryMutation,
  useUpdatecategaryMutation,
  useStatuscategaryMutation,
} = categaryApi;
