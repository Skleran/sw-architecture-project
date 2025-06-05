export const API_BASE_URL = "http://localhost:8082/api";

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

import { authService } from "./auth";

export const apiRequest = async <T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> => {
  if (authService.isTokenExpired()) {
    authService.logout();
    throw new Error("Your session is expired, please login again");
  }

  const token = authService.getToken();

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options?.headers,
    },
    ...options,
  });

  if (response.status === 401) {
    authService.logout();
    throw new Error("Your session is expired, please login again");
  }

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  // If it's DELETE, don't parse JSON
  if (options?.method === "DELETE") {
    return undefined as T;
  }

  return response.json();
};

export const protectedApiRequest = async <T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> => {
  if (!authService.isAuthenticated()) {
    authService.logout();
    throw new Error("Authentication required");
  }

  return apiRequest<T>(endpoint, options);
};
