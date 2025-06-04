export const API_BASE_URL = "http://localhost:8082/api";

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export const apiRequest = async <T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  // If it's DELETE, don't parse JSON
  if (options?.method === "DELETE") {
    return undefined as T;
  }

  return response.json();
};
