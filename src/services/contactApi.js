import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const contactApi = createApi({
  reducerPath: "contactApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL + "/contacts",
  }),
  tagTypes: ["Contacts"],
  endpoints: (builder) => ({
    getAllContacts: builder.query({
      query: () => "/",
      providesTags: ["Contacts"],
    }),
    getContactById: builder.query({
      query: (id) => `/${id}`,
    }),
    addContact: builder.mutation({
      query: (contactData) => ({
        url: "/",
        method: "POST",
        body: contactData,
      }),
      invalidatesTags: ["Contacts"],
    }),
  }),
});

export const {
  useGetAllContactsQuery,
  useGetContactByIdQuery,
  useAddContactMutation,
} = contactApi;
