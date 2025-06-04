import { apiRequest } from ".";

export interface User {
  userId: number;
  username: string;
  email: string;
  role: string;
}

export interface CreateUser {
  username: string;
  email: string;
  password: string;
  role: string;
}

export const userApi = {
  getAll: (): Promise<User[]> => apiRequest<User[]>("/users/getAll"),

  create: (userData: CreateUser): Promise<User> =>
    apiRequest<User>("/users/create", {
      method: "POST",
      body: JSON.stringify(userData),
    }),

  delete: (id: number): Promise<void> =>
    apiRequest<void>(`/users/delete/${id}`, {
      method: "DELETE",
    }),
};
