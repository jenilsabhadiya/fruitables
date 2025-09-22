import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../constant/url";

export const couponApi = createApi({
  reducerPath: "couponApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (build) => ({
    getAllcoupon: build.query({
      query: () => "/coupon/list-coupon",
      providesTags: ["Coupon"],
    }),
    addcoupon: build.mutation({
      query: (data) => ({
        url: `/coupon/add-coupon`,
        method: "POST",
        body: data,
      }),
      // https://redux-toolkit.js.org/rtk-query/usage/manual-cache-updates
      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        const tempId = crypto.randomUUID();
        const tempImg = { url: URL.createObjectURL(data.get("coupon_image")) };
        const patchResult = dispatch(
          couponApi.util.updateQueryData("getAllcoupon", undefined, (draft) => {
            draft?.data?.push({
              _id: tempId,
              coupon: data.get("coupon"),
              percentage: data.get("percentage"),
              expiry: data.get("expiry"),
              stock: data.get("stock"),
              coupon_image: tempImg,
            });
          })
        );
        try {
          const { data } = await queryFulfilled;
          console.log(data);

          couponApi.util.updateQueryData("getAllcoupon", undefined, (draft) => {
            const index = draft?.data?.findIndex((v) => v._id === tempId);

            draft.data[index] = { data };
          });
        } catch {
          patchResult.undo();
        }
      },
    }),
    deletecoupon: build.mutation({
      query: (id) => ({
        url: `/coupon/delete-coupon/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          couponApi.util.updateQueryData("getAllcoupon", undefined, (draft) => {
            const index = draft?.data.findIndex((v) => v._id === id);

            draft?.data.splice(index, 1);
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
      query: ({ _id, body }) => ({
        url: `/coupon/update-coupon/${_id}`,
        method: "PATCH",
        body: body,
      }),
      // invalidatesTags: ["Coupon"],
      async onQueryStarted({ _id, body }, { dispatch, queryFulfilled }) {
        const tempImg = body.get("coupon_image")
          ? { url: URL.createObjectURL(body.get("coupon_image")) }
          : null;

        const newStatus = !body.get("active");

        const patchResult = dispatch(
          couponApi.util.updateQueryData("getAllcoupon", undefined, (draft) => {
            const index = draft?.data.findIndex((v) => v._id === _id);

            if (index !== -1) {
              const updateData = {
                coupon: body.get("coupon"),
                percentage: body.get("percentage"),
                expiry: body.get("expiry"),
                stock: body.get("stock"),
                active: newStatus,
              };

              if (tempImg) {
                updateData.coupon_image = tempImg;
              }

              console.log("updateData", updateData, index, tempImg);

              draft.data[index] = { ...draft.data[index], ...updateData };

              draft.data[index].active = newStatus;
            }
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    statusCoupon: build.mutation({
      query: ({ _id, active }) => ({
        url: `/coupon/update-coupon/${_id}`,
        method: "PATCH",
        body: { active },
      }),
      async onQueryStarted({ _id, active }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          couponApi.util.updateQueryData("getAllcoupon", undefined, (draft) => {
            const index = draft?.data.findIndex((v) => v._id === _id);

            if (index !== -1) {
              draft.data[index].active = active;
            }
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
  useStatusCouponMutation,
} = couponApi;
