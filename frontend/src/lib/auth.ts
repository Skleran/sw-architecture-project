import { CreateUser } from "./users";

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}

export const TOKEN_KEY = "auth_token";

export const authService = {
  setToken: (token: string): void => {
    if (typeof window !== "undefined") {
      localStorage.setItem(TOKEN_KEY, token);
    }
  },

  getToken: (): string | null => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(TOKEN_KEY);
    }
    return null;
  },

  removeToken: (): void => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(TOKEN_KEY);
    }
  },

  isAuthenticated: (): boolean => {
    return !!authService.getToken();
  },

  isTokenExpired: (): boolean => {
    const token = authService.getToken();
    if (!token) return true;

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const currentTime = Date.now() / 1000;
      return payload.exp < currentTime;
    } catch {
      return true;
    }
  },

  logout: (): void => {
    authService.removeToken();
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
  },

  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await fetch(
      "http://ec2-3-70-132-193.eu-central-1.compute.amazonaws.com:8080/api/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      }
    );

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const authData: AuthResponse = await response.json();
    authService.setToken(authData.token);
    return authData;
  },

  register: async (userData: CreateUser): Promise<AuthResponse> => {
    const response = await fetch(
      "http://ec2-3-70-132-193.eu-central-1.compute.amazonaws.com:8080/api/auth/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    );

    if (!response.ok) {
      throw new Error("Registration failed");
    }

    const authData: AuthResponse = await response.json();
    authService.setToken(authData.token);
    return authData;
  },
};
