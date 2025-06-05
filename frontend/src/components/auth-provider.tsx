"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { authService } from "@/lib/auth";

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: any) => Promise<any>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const publicRoutes = ["/login", "/signup", "/"];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = () => {
      const authenticated =
        authService.isAuthenticated() && !authService.isTokenExpired();
      setIsAuthenticated(authenticated);
      setIsLoading(false);

      if (!authenticated && !publicRoutes.includes(pathname)) {
        router.push("/login");
      }
    };

    checkAuth();
  }, [pathname, router]);

  const login = async (credentials: any) => {
    try {
      const authData = await authService.login(credentials);
      setIsAuthenticated(true);
      return authData;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    authService.logout();
    setIsAuthenticated(false);
    router.push("/login");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!isAuthenticated && !publicRoutes.includes(pathname)) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
