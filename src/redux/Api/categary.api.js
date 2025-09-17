import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../constant/url";

export const categaryApi = createApi({
  reducerPath: "categaryApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ["Products"],
  endpoints: (build) => ({
    getAllcategary: build.query({
      query: () => "/categary",
      providesTags: ["Products"],
    }),
    addcategary: build.mutation({
      query: (data) => ({
        url: `/categary`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Products"],
    }),
    deletecategary: build.mutation({
      query: (id) => ({
        url: `/categary/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),
    updatecategary: build.mutation({
      query: ({ id, ...data }) => ({
        url: `/categary/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Products"],
    }),
    statuscategary: build.mutation({
      query: ({ id, ...data }) => ({
        url: `/categary/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Products"],
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
