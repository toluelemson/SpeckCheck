import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { login as performLogin } from "../../services/client";
import jwtDecode from "jwt-decode";

interface User {
    email: string;
    id?: string;
    roles?: string[];
    jti?: string;
}

interface AuthContextType {
    user: User | null;
    login: (usernameAndPassword: { email: string; password: string }) => Promise<any>;
    logOut: () => void;
    isUserAuthenticated: () => boolean;
    setUserFromToken: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

interface DecodedToken {
    sub: string;
    jti: string;
    scopes: string[];
    exp?: number;
}


export const decodeJWT = (): User | null => {
    const token = localStorage.getItem("access_token");
    if (!token) return null;
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    const setUserFromToken = () => {
        const token = localStorage.getItem("access_token");

        if (token) {
            try {
                const decodedToken = jwtDecode(token) as DecodedToken;
                setUser({
                    email: decodedToken.sub,
                    id: decodedToken.jti,
                    roles: decodedToken.scopes,
                });
            } catch (error) {
                console.error("Error decoding the token:", error);
            }
        }
    };

    useEffect(() => {
        setUserFromToken();
    }, []);

    const login = async (usernameAndPassword: { email: string; password: string }) => {
        const res = await performLogin(usernameAndPassword);
        const token = res?.data?.access_token;

        if (token) {
            localStorage.setItem("access_token", token);
            setUserFromToken();
        } else {
            console.error("Invalid response format");
        }

        return res;
    };

    const logOut = () => {
        localStorage.removeItem("access_token");
        setUser(null);
    };

    const isUserAuthenticated = (): boolean => {
        const token = localStorage.getItem("access_token");

        if (!token) return false;

        try {
            const decodedToken = jwtDecode(token) as DecodedToken;
            if (!decodedToken.exp || Date.now() > decodedToken.exp * 1000) {
                localStorage.removeItem("access_token");
                return false;
            }
            return true;
        } catch (error) {
            console.error("Error decoding the token:", error);
            return false;
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                logOut,
                isUserAuthenticated,
                setUserFromToken,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    return context;
};

export default AuthProvider;