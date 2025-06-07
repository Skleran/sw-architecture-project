import { protectedApiRequest } from ".";

export interface CreateCategory {
  categoryName: string;
  description: string;
}

export interface Category {
  id: number;
  name: string;
}

export const categoryApi = {
  getAll: (): Promise<Category[]> =>
    protectedApiRequest<Category[]>("/categories/list"),

  create: (categoryData: CreateCategory): Promise<void> =>
    protectedApiRequest<void>("/categories/create", {
      method: "POST",
      body: JSON.stringify({ categoryData }),
    }),
};
