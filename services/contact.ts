import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IContact, IContacts } from "types";

export const AppApi = createApi({
  reducerPath: "AppApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://bkbnchallenge.herokuapp.com" }),
  tagTypes: ["Contacts", "Contact"],
  endpoints: (builder) => ({
    getContacts: builder.query<IContacts, { page?: number }>({
      query: ({ page = 1 }) => `/contacts?page=${page}`,
      providesTags: ["Contacts"],
    }),
    getContact: builder.query<IContact, { id: string }>({
      query: ({ id }) => `/contacts/${id}`,
      providesTags: ["Contact"],
    }),
    updateContact: builder.mutation<
      IContact,
      Partial<IContact> & Pick<IContact, "id">
    >({
      query: ({ id, ...patch }) => ({
        url: `/contacts/${id}`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: ["Contacts", "Contact"],
    }),
    deleteContact: builder.mutation<IContact, { id: string }>({
      query: ({ id }) => ({
        url: `/contacts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Contacts", "Contact"],
    }),
    addContact: builder.mutation<IContact, Partial<IContact>>({
      query: ({ ...contact }) => ({
        url: "/contacts",
        method: "POST",
        body: contact,
      }),
    }),
  }),
});

export const {
  useGetContactsQuery,
  useGetContactQuery,
  useUpdateContactMutation,
  useDeleteContactMutation,
  useAddContactMutation,
} = AppApi;
