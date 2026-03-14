import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface StoreInfo {
    hours: string;
    name: string;
    address: string;
    phone: string;
}
export type Category = string;
export interface Product {
    id: bigint;
    inStock: boolean;
    name: string;
    unit: string;
    category: Category;
    price: number;
}
export interface backendInterface {
    addCategory(category: Category): Promise<void>;
    addProduct(name: string, price: number, category: Category, unit: string, inStock: boolean): Promise<void>;
    deleteCategory(category: Category): Promise<void>;
    deleteProduct(id: bigint): Promise<void>;
    getCategories(): Promise<Array<Category>>;
    getProducts(): Promise<Array<Product>>;
    getStoreInfo(): Promise<StoreInfo>;
    updateProduct(id: bigint, name: string, price: number, category: Category, unit: string, inStock: boolean): Promise<void>;
}
