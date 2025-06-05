import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { authService } from "../lib/auth";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      if (!authService.isAuthenticated() || authService.isTokenExpired()) {
        router.push("/login");
      } else {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (isLoading) {
    return <div>Loading...</div>; // add loading component maybe?
  }

  return <>{children}</>;
};
