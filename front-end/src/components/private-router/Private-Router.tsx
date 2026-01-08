import { Navigate } from "react-router-dom";
import { useUserStore } from "../../../stores/user"
import type { ReactNode } from "react";

interface PrivateRouteProps {
    children: ReactNode;
}

export function PrivateRoute({ children }: PrivateRouteProps) {
    const { user, loanding } = useUserStore();

    if (loanding) return null;

    return user ? <>{children}</> : <Navigate to="/login" replace />;
}