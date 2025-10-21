import ProductList from "@/components/ProductList";
import Image from "next/image";
import React from "react";

interface Props {
  searchParams: Promise<{ category: string }>;
}

const HomePage = async ({ searchParams }: Props) => {
  const category = (await searchParams).category;
  console.log(await searchParams);
  return (
    <div>
      <div className="relative aspect-[3/1] mb-16">
        <Image src={"/featured.png"} alt="Featured product" fill />
      </div>

      <ProductList category={category} activePage="home" />
    </div>
  );
};

export default HomePage;
