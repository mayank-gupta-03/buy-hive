export type Sort = "newest" | "oldest" | "asc" | "desc";

export type SearchParams = {
  search?: string;
  category?: string;
  sort?: Sort;
  limit?: number;
};
