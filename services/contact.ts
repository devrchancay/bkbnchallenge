import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IContact } from "types";

export const AppApi = createApi({
  reducerPath: "AppApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://bkbnchallenge.herokuapp.com" }),
  endpoints: (builder) => ({
    getContacts: builder.query<IContact, { page?: number }>({
      query: ({ page = 1 }) => `/contacts?page=${page}`,
    }),
  }),
});

export const { useGetContactsQuery } = AppApi;
