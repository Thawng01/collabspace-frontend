import React, {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";
import type { User } from "../types";

interface AuthContextType {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    login: (token: string) => void;
    logout: () => void;
    isAuthenticated: boolean;
    token: string | null;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkLogged = () => {
            const res = localStorage.getItem("collabspace_token");
            if (res) {
                const value = JSON.parse(res);
                setToken(value);
            }

            setLoading(false);
        };

        checkLogged();
    }, []);

    const login = (token: string) => {
        localStorage.setItem("collabspace_token", JSON.stringify(token));
        setToken(token);
    };

    const logout = () => {
        localStorage.removeItem("collabspace_token");
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                login,
                logout,
                isAuthenticated: !!token,
                token,
                loading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
