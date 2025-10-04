import ProductList from "@/components/ProductList";
import React from "react";

interface Props {
  searchParams: Promise<{ category: string }>;
}

const Products = async ({ searchParams }: Props) => {
  const category = (await searchParams).category;

  return (
    <div>
      <ProductList category={category} activePage="products" />
    </div>
  );
};

export default Products;
