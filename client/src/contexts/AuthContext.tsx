import type { UserInfo } from "../types/types";
import { useUser } from "../hooks/useUser";
import { createContext, useState } from "react";
import { useToast } from "@/hooks/useToast";

type AuthContextType = {
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<UserInfo>;
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
    const { setUsername, setKey, setId } = useUser();
    const { toastError } = useToast();
    const apiUrl = import.meta.env.VITE_API_URL;

    const login = async (email: string, password: string) => {
        const userInfo = await getUserInfo(email, password);
        if (!userInfo) return;
        if (userInfo.error) return userInfo;

        setKey(userInfo.key);
        setUsername(userInfo.username);
        setId(userInfo.id);
        setIsAuthenticated(true);

        localStorage.setItem("isAuthenticated", JSON.stringify(true));

        location.href = "/home";
        return userInfo;
    };

    const getUserInfo = async (
        email: string,
        password: string
    ): Promise<UserInfo | undefined> => {
        try {
            const resp = await fetch(`${apiUrl}/auth/login/`, {
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
        } catch (error) {
            console.log(error);
            toastError("Hubo un error inesperado.");
            Error("Hubo un error inesperado.");
        }
    };

    const signIn = async (
        username: string,
        password: string,
        email: string
    ) => {
        try {
            return await fetch(`${apiUrl}/auth`, {
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
        } catch (error) {
            console.log(error);
            toastError("Hubo un error inesperado.");
        }
    };

    const logout = () => {
        setIsAuthenticated(false);
        setKey("");
        setUsername("");
        localStorage.removeItem("key");
        localStorage.removeItem("username");
        localStorage.removeItem("userId");
        localStorage.setItem("isAuthenticated", JSON.stringify(false));
        location.href = "/signin";
    };

    return (
        <AuthContext.Provider
            value={{ isAuthenticated, login, logout, signIn }}
        >
            {children}
        </AuthContext.Provider>
    );
}
