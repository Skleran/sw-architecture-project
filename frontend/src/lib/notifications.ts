import { protectedApiRequest } from ".";
import { ReactionType } from "./reactions";

export interface Notification {
  notificationId: number;
  message: string;
  type: ReactionType;
  userId: number;
  articleId: number;
  read: boolean;
}

export interface CreateNotification {
  message: string;
  type: ReactionType | null;
  userId: number;
  articleId: number | null;
}

export const notificationApi = {
  getNotificationsApi: (userId: number): Promise<Notification[]> =>
    protectedApiRequest<Notification[]>(`/notifications/all/${userId}`),

  create: (notificationData: CreateNotification): Promise<void> =>
    protectedApiRequest<void>("/notifications/create", {
      method: "POST",
      body: JSON.stringify(notificationData),
    }),

  read: (notificationId: number): Promise<void> =>
    protectedApiRequest<void>(`/notifications/read/${notificationId}`, {
      method: "POST",
    }),
};
