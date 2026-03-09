import { useQuery } from "@tanstack/react-query";
import { Category, type MenuItem, type ShopInfo } from "../backend";
import { useActor } from "./useActor";

export function useGetMenu() {
  const { actor, isFetching } = useActor();
  return useQuery<MenuItem[]>({
    queryKey: ["menu"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMenu();
    },
    enabled: !!actor && !isFetching,
    staleTime: 1000 * 60 * 5,
  });
}

export function useGetMenuByCategory(category: Category) {
  const { actor, isFetching } = useActor();
  return useQuery<MenuItem[]>({
    queryKey: ["menu", category],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMenuByCategory(category);
    },
    enabled: !!actor && !isFetching,
    staleTime: 1000 * 60 * 5,
  });
}

export function useGetShopInfo() {
  const { actor, isFetching } = useActor();
  return useQuery<ShopInfo>({
    queryKey: ["shopInfo"],
    queryFn: async () => {
      if (!actor) {
        return {
          name: "ALI Coffee Shop",
          address: "123 Brew Street, Coffee District",
          phone: "+1 (555) 123-4567",
          hours: "Mon–Fri: 7am–9pm | Sat–Sun: 8am–10pm",
        };
      }
      return actor.getShopInfo();
    },
    enabled: !isFetching,
    staleTime: 1000 * 60 * 10,
  });
}

export { Category };
