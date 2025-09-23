import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../constant/url";

export const categaryApi = createApi({
  reducerPath: "categaryApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (build) => ({
    getAllcategary: build.query({
      query: () => "/category/list-category",
      providesTags: ["categary"],
    }),
    addcategary: build.mutation({
      query: (formData) => ({
        url: `/category/add-category`,
        method: "POST",
        body: formData,
      }),

      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        const tempId = crypto.randomUUID();
        const tempImg = { url: URL.createObjectURL(data.get("cat_img")) };
        const patchResult = dispatch(
          categaryApi.util.updateQueryData(
            "getAllcategary",
            undefined,
            (draft) => {
              draft?.data?.push({
                _id: tempId,
                name: data.get("name"),
                description: data.get("description"),
                cat_img: tempImg,
              });
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
              const index = draft?.data.findIndex((v) => v._id === tempId);
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
        url: `/category/delete-category/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          categaryApi.util.updateQueryData(
            "getAllcategary",
            undefined,
            (draft) => {
              const index = draft?.data.findIndex((v) => v._id === id);

              draft?.data.splice(index, 1);
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
      query: ({ _id, body }) => ({
        url: `/category/update-category/${_id}`,
        method: "PUT",
        body: body,
      }),
      async onQueryStarted({ _id, body }, { dispatch, queryFulfilled }) {
        const tempImg = body.get("cat_img")
          ? { url: URL.createObjectURL(body.get("cat_img")) }
          : null;

        const patchResult = dispatch(
          categaryApi.util.updateQueryData(
            "getAllcategary",
            undefined,
            (draft) => {
              const index = draft?.data.findIndex((v) => v._id === _id);

              if (index !== -1) {
                const updateData = {
                  name: body.get("name"),
                  description: body.get("description"),
                  active: body.get("active") === "true" ? true : false,
                };

                if (tempImg) {
                  updateData.cat_img = tempImg;
                }

                console.log("updateData", updateData, index, tempImg);

                draft.data[index] = { ...draft.data[index], ...updateData };
              }
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
    statusCategory: build.mutation({
      query: ({ _id, active }) => ({
        url: `/category/update-category/${_id}`,
        method: "PUT",
        body: { active },
      }),
      async onQueryStarted({ _id, active }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          categaryApi.util.updateQueryData(
            "getAllcategary",
            undefined,
            (draft) => {
              const index = draft?.data.findIndex((v) => v._id === _id);

              if (index !== -1) {
                draft.data[index].active = active;
              }
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
  }),
});

export const {
  useGetAllcategaryQuery,
  useAddcategaryMutation,
  useDeletecategaryMutation,
  useUpdatecategaryMutation,
  useStatusCategoryMutation,
} = categaryApi;
