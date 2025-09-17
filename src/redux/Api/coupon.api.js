import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../constant/url";

export const couponApi = createApi({
  reducerPath: "couponApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (build) => ({
    getAllcoupon: build.query({
      query: () => "/coupon",
      providesTags: ["Coupon"],
    }),
    addcoupon: build.mutation({
      query: (data) => ({
        url: `/coupon`,
        method: "POST",
        body: data,
      }),

      // https://redux-toolkit.js.org/rtk-query/usage/manual-cache-updates
      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        const tempId = crypto.randomUUID();
        const patchResult = dispatch(
          couponApi.util.updateQueryData("getAllcoupon", undefined, (draft) => {
            draft.push({ id: tempId, ...data });
          })
        );
        try {
          const { data } = await queryFulfilled;
          console.log(data);

          couponApi.util.updateQueryData("getAllcoupon", undefined, (draft) => {
            const index = draft.findIndex((v) => v.id === tempId);

            draft[index] = { data };
          });
        } catch {
          patchResult.undo();
        }
      },
    }),
    deletecoupon: build.mutation({
      query: (id) => ({
        url: `/coupon/${id}`,
        method: "DELETE",
      }),
      // invalidatesTags: ["Coupon"],
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          couponApi.util.updateQueryData("getAllcoupon", undefined, (draft) => {
            const index = draft.findIndex((v) => v.id === id);

            draft.splice(index, 1);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    updatecoupon: build.mutation({
      query: ({ id, ...data }) => ({
        url: `/coupon/${id}`,
        method: "PATCH",
        body: data,
      }),
      // invalidatesTags: ["Coupon"],
      async onQueryStarted({ id, ...data }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          couponApi.util.updateQueryData("getAllcoupon", undefined, (draft) => {
            const index = draft.findIndex((v) => v.id === id);

            draft[index] = { ...draft[index], ...data };
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useGetAllcouponQuery,
  useAddcouponMutation,
  useDeletecouponMutation,
  useUpdatecouponMutation,
} = couponApi;
