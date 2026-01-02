import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface SidebarItem {
  id: string;
  label: string;
  icon: string;
  route: string;
}

export const sidebarApi = createApi({
  reducerPath: "sidebarApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  endpoints: (builder) => ({
    getSidebarItems: builder.query<SidebarItem[], void>({
      query: () => "sidebar-items",
    }),
    createBook: builder.query<SidebarItem[], void>({
      query: () => "create",
    }),
  }),
});

export const { useGetSidebarItemsQuery } = sidebarApi;
