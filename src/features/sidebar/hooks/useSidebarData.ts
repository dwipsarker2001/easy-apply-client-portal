import { useGetSidebarItemsQuery } from "../services/sidebarApi";

export const useSidebarData = () => {
  const { data, isLoading, error } = useGetSidebarItemsQuery();
  return { items: data || [], isLoading, error };
};
