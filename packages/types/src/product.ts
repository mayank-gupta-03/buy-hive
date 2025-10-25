import type {
  Product as DBProduct,
  Category as DBCategory,
} from "@repo/product-db";

export type StripeProductType = {
  id: string;
  name: string;
  price: number;
};

export type Product = DBProduct;

export type ProductList = Product[];

export type Category = DBCategory;

export type CategoryList = Category[];
