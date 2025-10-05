"use client";

import { CATEGORIES } from "@/mock/category.data";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

const Categories = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const selectedCategory = searchParams.get("category");

  const handleCategoryChange = (value: string | null) => {
    const params = new URLSearchParams(searchParams);
    params.set("category", value || "all");
    console.log(params.toString());
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 justify-between gap-2 bg-gray-100 p-2 rounded-lg mb-4 text-sm">
      {CATEGORIES.map((category) => (
        <div
          className={`flex items-center gap-2 justify-center cursor-pointer px-2 py-1 rounded-md ${category.slug === selectedCategory ? "bg-white" : "text-gray-500"}`}
          key={category.slug}
          onClick={() => handleCategoryChange(category.slug)}
        >
          {category.icon}
          {category.name}
        </div>
      ))}
    </div>
  );
};

export default Categories;
