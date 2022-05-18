import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IContact, IContacts } from "types";

export const AppApi = createApi({
  reducerPath: "AppApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://bkbnchallenge.herokuapp.com" }),
  endpoints: (builder) => ({
    getContacts: builder.query<IContacts, { page?: number }>({
      query: ({ page = 1 }) => `/contacts?page=${page}`,
    }),
    getContact: builder.query<IContact, { id: string }>({
      query: ({ id }) => `/contacts/${id}`,
    }),
  }),
});

export const { useGetContactsQuery, useGetContactQuery } = AppApi;
