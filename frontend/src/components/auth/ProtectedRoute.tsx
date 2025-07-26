import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

interface ProtectedRouteProps {
    allowedRoles: ('vendor' | 'supplier')[];
}

export const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
    const { isAuthenticated, user, isLoading } = useAuth();

    if (isLoading) {
        // Optional: Show a loading spinner while checking auth status
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        // If not authenticated, redirect to the login page
        return <Navigate to="/auth/login" replace />;
    }

    // If authenticated, check if the user's role is allowed for this route
    if (user && allowedRoles.includes(user.userType)) {
        return <Outlet />; // Render the child route (e.g., the dashboard)
    } else {
        // If role is not allowed, redirect to a "not authorized" page or home
        // For simplicity, we redirect to login here, but a dedicated page is better.
        console.warn(`Access denied for role: ${user?.userType}`);
        return <Navigate to="/auth/login" replace />;
    }
};