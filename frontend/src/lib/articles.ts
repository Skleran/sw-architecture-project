import { apiRequest } from ".";

export interface Article {
  id: number;
  title: string;
  content: string;
  category: string;
}

export const articleApi = {
  getByAuthor: (authorId: number): Promise<Article[]> =>
    apiRequest<Article[]>(`/users/${authorId}/articles`),

  getById: (id: number): Promise<Article> =>
    apiRequest<Article>(`/articles/article/${id}`),
};
