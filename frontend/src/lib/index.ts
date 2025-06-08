export const API_BASE_URL = "https://api.erdemkoyuncu.com/api";

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

  // For DELETE or responses with no body
  if (
    options?.method === "DELETE" ||
    response.status === 204 ||
    response.headers.get("Content-Length") === "0"
  ) {
    return undefined as T;
  }

  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    try {
      return await response.json();
    } catch (e) {
      console.warn("Response is not valid JSON", e);
      return undefined as T;
    }
  }

  return undefined as T;
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
