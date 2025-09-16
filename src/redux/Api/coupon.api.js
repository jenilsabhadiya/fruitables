import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../constant/url";

export const couponApi = createApi({
  reducerPath: "couponApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ["Coupon"],
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
      invalidatesTags: ["Coupon"],
    }),
    deletecoupon: build.mutation({
      query: (id) => ({
        url: `/coupon/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Coupon"],
    }),
    updatecoupon: build.mutation({
      query: ({ id, ...data }) => ({
        url: `/coupon/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Coupon"],
    }),
  }),
});

export const {
  useGetAllcouponQuery,
  useAddcouponMutation,
  useDeletecouponMutation,
  useUpdatecouponMutation,
} = couponApi;
