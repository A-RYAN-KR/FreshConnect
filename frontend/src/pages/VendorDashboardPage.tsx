import VendorDashboard from "@/components/VendorDashboard";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function VendorDashboardPage() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/auth/login'); // Redirect to login after logout
    };

    // The onBack prop is now a logout button
    return <VendorDashboard onBack={handleLogout} />;
}