import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "@/app/store";

export const baseApi = createApi({
  reducerPath: "easyApplyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,

    // send header
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.clientToken;
      if (token) {  headers.set("Authorization", `Bearer ${token}`);}
      return headers;
    },
  }),

  tagTypes: ["Client"],
  endpoints: () => ({}),
});