import { protectedApiRequest } from ".";

export interface Article {
  id: number;
  title: string;
  content: string;
  category: string;
}

export const articleApi = {
  getByAuthor: (authorId: number): Promise<Article[]> =>
    protectedApiRequest<Article[]>(`/users/${authorId}/articles`),

  getById: (id: number): Promise<Article> =>
    protectedApiRequest<Article>(`/articles/article/${id}`),
};
