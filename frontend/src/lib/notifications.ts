import { protectedApiRequest } from ".";
import { ReactionType } from "./reactions";

export interface Notification {
  id: number;
  message: string;
  type: ReactionType;
  userId: number;
  articleId: number;
  read: boolean;
}

export const notificationApi = {
  getNotificationsApi: (id: number): Promise<Notification[]> =>
    protectedApiRequest<Notification[]>(`/notifications/all/${id}`),

  // create: ()
};
