import React from "react";
import Categories from "./Categories";
import ProductCard from "./ProductCard";
import Link from "next/link";
import Filter from "./Filter";
import { PRODUCTS } from "@/mock/product.data";

interface Props {
  category: string;
  activePage: "home" | "products";
}

const ProductList = ({ category, activePage }: Props) => {
  return (
    <div className="w-full">
      <Categories />
      {activePage === "products" && <Filter />}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-12">
        {PRODUCTS.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {activePage === "home" && (
        <Link
          href={category ? `/products/?category=${category}` : "/products"}
          className="flex justify-end mt-4 underline text-sm text-gray-500"
        >
          View all products
        </Link>
      )}
    </div>
  );
};

export default ProductList;
