import { useQuery } from "@tanstack/react-query";
import type { Category, Product, StoreInfo } from "../backend.d";
import { useActor } from "./useActor";

export function useGetStoreInfo() {
  const { actor, isFetching } = useActor();
  return useQuery<StoreInfo>({
    queryKey: ["storeInfo"],
    queryFn: async () => {
      if (!actor) return { name: "", address: "", phone: "", hours: "" };
      return actor.getStoreInfo();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetCategories() {
  const { actor, isFetching } = useActor();
  return useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getCategories();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetProducts() {
  const { actor, isFetching } = useActor();
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getProducts();
    },
    enabled: !!actor && !isFetching,
  });
}
