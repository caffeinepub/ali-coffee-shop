import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface MenuItem {
    id: bigint;
    name: string;
    description: string;
    category: Category;
    price: number;
}
export interface ShopInfo {
    hours: string;
    name: string;
    address: string;
    phone: string;
}
export enum Category {
    dessert = "dessert",
    food = "food",
    coffee = "coffee"
}
export interface backendInterface {
    getMenu(): Promise<Array<MenuItem>>;
    getMenuByCategory(category: Category): Promise<Array<MenuItem>>;
    getMenuItem(id: bigint): Promise<MenuItem>;
    getShopInfo(): Promise<ShopInfo>;
}
