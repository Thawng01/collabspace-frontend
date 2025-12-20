// components/ProtectedRoute.jsx
import type { ReactNode } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Navigate } from "react-router";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    const { token, loading } = useAuth();

    if (loading) {
        return <p>Loading...</p>;
    }

    return token ? children : <Navigate to="/landing" replace />;
};

export default ProtectedRoute;
