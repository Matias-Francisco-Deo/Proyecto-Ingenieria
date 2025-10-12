import type { UserInfo } from "../types/types";
import { useUser } from "../hooks/useUser";
import { createContext, useState } from "react";
import { useToast } from "@/hooks/useToast";

type AuthContextType = {
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<UserInfo>;
    logout: () => void;
    signIn: (
        name: string,
        password: string,
        email: string
    ) => Promise<SignInResponse>;
};

type SignInResponse = {
    error?: string;
    message?: string;
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

    const login = async (
        email: string,
        password: string
    ): Promise<UserInfo> => {
        const userInfo = await getUserInfo(email, password);

        if (!userInfo) {
            toastError("Usuario no encontrado.");
            throw new Error("Usuario no encontrado.");
        }

        if ("error" in userInfo && userInfo.error) {
            toastError(userInfo.error);
            throw new Error(userInfo.error);
        }

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
    ): Promise<UserInfo> => {
        try {
            const resp = await fetch(`${apiUrl}/auth/login/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (!resp.ok) {
                throw new Error("Credenciales incorrectas");
            }

            const data: UserInfo = await resp.json();
            return data;
        } catch (error) {
            console.error(error);
            toastError("Hubo un error inesperado.");
            throw new Error("Hubo un error inesperado.");
        }
    };

    const signIn = async (
        name: string,
        password: string,
        email: string
    ): Promise<SignInResponse> => {
        try {
            const resp = await fetch(`${apiUrl}/auth`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, password, email }),
            });

            // Intentamos convertir la respuesta a JSON, incluso si el status es 400/500
            const data: SignInResponse = await resp.json();

            if (!resp.ok) {
                // Si hay error HTTP, devolvemos el error del backend o un mensaje genérico
                return { error: data.error || "Error al registrarse" };
            }

            return data;
        } catch (error) {
            console.error(error);
            toastError("Hubo un error inesperado.");
            return { error: "Hubo un error inesperado" };
        }
    };

    const logout = () => {
        setIsAuthenticated(false);
        setKey("");
        setUsername("");
        localStorage.removeItem("key");
        localStorage.removeItem("name");
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
