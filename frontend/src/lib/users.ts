import { protectedApiRequest } from ".";

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
  getAll: (): Promise<User[]> => protectedApiRequest<User[]>("/users/getAll"),

  create: (userData: CreateUser): Promise<User> =>
    protectedApiRequest<User>("/users/create", {
      method: "POST",
      body: JSON.stringify(userData),
    }),

  delete: (id: number): Promise<void> =>
    protectedApiRequest<void>(`/users/delete/${id}`, {
      method: "DELETE",
    }),

  getByName: (userName: string): Promise<User> =>
    protectedApiRequest<User>(`/users/getByName/${userName}`),
};
