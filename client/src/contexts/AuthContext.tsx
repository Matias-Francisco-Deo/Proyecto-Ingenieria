// CREAR CONTEXTO AUTH
import type { SignInError, UserInfo } from "../types/types";
import { useUser } from "../hooks/useUser";
import { createContext, useState } from "react";

type AuthContextType = {
  isAuthenticated: boolean;
  // setIsAuthenticated: unknown;
  login: (email: string, password: string) => Promise<SignInError | null>;
  logout: () => void;
  signIn: (
    username: string,
    password: string,
    email: string
  ) => Promise<Response>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return JSON.parse(localStorage.getItem("isAuthenticated") || "false");
  });
  const { setUsername, setKey } = useUser();

  const login = async (email: string, password: string) => {
    // llamada a db
    const userInfo = await getUserInfo(email, password);

    if (!userInfo) return { error: "Credenciales incorrectas." };

    setKey(userInfo.key);
    setUsername(userInfo.username);
    setIsAuthenticated(true);

    localStorage.setItem("isAuthenticated", JSON.stringify(true));

    location.href = "/home";
    return null;
  };

  const getUserInfo = async (
    email: string,
    password: string
  ): Promise<UserInfo> => {
    const resp = await fetch(`http://localhost:8080/auth/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    return resp.json();
  };

  const signIn = async (username: string, password: string, email: string) => {
    return await fetch("http://localhost:8080/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: username,
        password,
        email,
      }),
    });
  };

  const logout = () => {
    setIsAuthenticated(false);
    setKey("");
    setUsername("");
    localStorage.setItem("isAuthenticated", JSON.stringify(false));
    location.href = "/signin";
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}
