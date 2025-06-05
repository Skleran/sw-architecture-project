import { protectedApiRequest } from ".";

export interface Comment {
  id: number;
  content: string;
  userName: string;
}

export interface CreateComment {
  userId: number;
  articleId: number;
  content: string;
}

export const commentApi = {
  getByArticle: (id: number): Promise<Comment[]> =>
    protectedApiRequest<Comment[]>(`/comments/article/${id}`),

  create: (commentData: CreateComment): Promise<Comment> =>
    protectedApiRequest<Comment>(
      `/comments/${commentData.articleId}/add/${commentData.userId}`,
      {
        method: "POST",
        body: JSON.stringify({ content: commentData.content }),
      }
    ),
};
