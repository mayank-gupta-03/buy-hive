import { ReactNode } from "react";

export type Category = {
  name: string;
  icon: ReactNode;
  slug: string;
};

export type CategoryList = Category[];
