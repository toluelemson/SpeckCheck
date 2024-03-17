import React, { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface ProtectedRouteProps {
    children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { isUserAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isUserAuthenticated()) {
            navigate("/");
        }
    }, [isUserAuthenticated, navigate]);

    return isUserAuthenticated() ? <>{children}</> : null;
}

export default ProtectedRoute;
