// import { useState, useEffect } from "react";
// import { authService, AuthResponse, LoginCredentials } from "../lib/auth";

// export const useAuth = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const checkAuth = () => {
//       const authenticated =
//         authService.isAuthenticated() && !authService.isTokenExpired();
//       setIsAuthenticated(authenticated);
//       setIsLoading(false);
//     };

//     checkAuth();
//   }, []);

//   const login = async (
//     credentials: LoginCredentials
//   ): Promise<AuthResponse> => {
//     try {
//       const authData = await authService.login(credentials);
//       setIsAuthenticated(true);
//       return authData;
//     } catch (error) {
//       throw error;
//     }
//   };

//   const logout = () => {
//     authService.logout();
//     setIsAuthenticated(false);
//   };

//   const register = async (userData: any): Promise<AuthResponse> => {
//     try {
//       const authData = await authService.register(userData);
//       setIsAuthenticated(true);
//       return authData;
//     } catch (error) {
//       throw error;
//     }
//   };

//   return {
//     isAuthenticated,
//     isLoading,
//     login,
//     logout,
//     register,
//   };
// };
