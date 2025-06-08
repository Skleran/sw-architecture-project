import { protectedApiRequest } from ".";

export interface Following {
  username: string;
}

export interface CreateFollowing {
  followingId: number;
  userId: number;
}

export const followApi = {
  getFollowingsById: (id: number): Promise<Following[]> =>
    protectedApiRequest<Following[]>(`/users/${id}/followers`),

  create: (followingData: CreateFollowing): Promise<void> =>
    protectedApiRequest<void>(
      `/users/${followingData.userId}/follow/${followingData.followingId}`,
      {
        method: "POST",
      }
    ),
};
