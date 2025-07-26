import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import * as authService from '@/services/authService'; // We'll use the service functions

// Define the shape of the user and the context
interface User {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    userType: 'vendor' | 'supplier';
    // Add any other user properties you need
}

interface AuthContextType {
    isAuthenticated: boolean;
    user: User | null;
    token: string | null;
    login: (credentials: authService.LoginCredentials) => Promise<void>;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
    const [isLoading, setIsLoading] = useState(true);

    // Effect to verify token on initial app load
    useEffect(() => {
        const verifyUser = async () => {
            if (token) {
                try {
                    // You should have a getMe service that verifies the token and returns the user
                    const userData = await authService.getMe(token);
                    setUser(userData.data);
                } catch (error) {
                    console.error('Token verification failed', error);
                    localStorage.removeItem('token');
                    setToken(null);
                    setUser(null);
                }
            }
            setIsLoading(false);
        };

        verifyUser();
    }, [token]);

    const login = async (credentials: authService.LoginCredentials) => {
        const data = await authService.login(credentials);
        localStorage.setItem('token', data.token);
        setToken(data.token);
        setUser(data.user);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated: !!user, user, token, login, logout, isLoading }}>
            {!isLoading && children}
        </AuthContext.Provider>
    );
};

// Custom hook to easily use the auth context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};