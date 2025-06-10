import { protectedApiRequest } from ".";
import { ReactionType } from "./reactions";

export interface Article {
  id: number;
  title: string;
  content: string;
  category: string;
  authorId: number;
  authorName: string;
  reactions: ReactionType[];
  coverImage?: string | null;
}

export interface CreateArticle {
  title: string;
  content: string;
  authorId: number;
  categoryId: number;
}

export interface UpdateArticle {
  title: string;
  content: string;
  categoryId: number;
  articleId: number;
}

export const articleApi = {
  getByAuthor: (authorId: number): Promise<Article[]> =>
    protectedApiRequest<Article[]>(`/users/${authorId}/articles`),

  getById: (id: number): Promise<Article> =>
    protectedApiRequest<Article>(`/articles/article/${id}`),

  create: (articleData: CreateArticle): Promise<Article> => {
    // console.log("Sending article data:", articleData);

    return protectedApiRequest<Article>("/articles/saveArticle", {
      method: "POST",
      body: JSON.stringify(articleData),
    });
  },

  getAll: (): Promise<Article[]> =>
    protectedApiRequest<Article[]>("/articles/getAll"),

  getByCategory: (category: string): Promise<Article[]> =>
    protectedApiRequest<Article[]>(`/articles/category/name/${category}`),

  update: (articleData: UpdateArticle): Promise<Article> => {
    return protectedApiRequest<Article>(
      `/articles/${articleData.articleId}/update`,
      {
        method: "PUT",
        body: JSON.stringify(articleData),
      }
    );
  },
};
