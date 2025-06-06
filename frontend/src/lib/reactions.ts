import { protectedApiRequest } from ".";

export type ReactionType =
  | "SAD"
  | "LIKE"
  | "DISLIKE"
  | "LOVE"
  | "FUNNY"
  | "SUPPORT";

export interface Reaction {
  id: number;
  reactionType: ReactionType;
  user: {
    userId: number;
    userName: string;
  };
}

export interface CreateReaction {
  type: ReactionType;
  userId: number;
  articleId: number;
}

export const reactionApi = {
  getByArticle: (id: number): Promise<Reaction[]> =>
    protectedApiRequest<Reaction[]>(`/reactions/article/${id}`),

  create: (reactionData: CreateReaction): Promise<Reaction> =>
    protectedApiRequest<Reaction>(
      `/reactions/${reactionData.type}/add/${reactionData.userId}/${reactionData.articleId}`,
      {
        method: "POST",
      }
    ),
};
