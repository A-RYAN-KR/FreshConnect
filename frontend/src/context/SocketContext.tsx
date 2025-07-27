import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import io, { Socket } from 'socket.io-client';
import { useAuth } from './AuthContext'; // Assuming you have an AuthContext that provides user info

const SocketContext = createContext<Socket | null>(null);

export const useSocket = () => {
    return useContext(SocketContext);
};

interface SocketProviderProps {
    children: ReactNode;
}

export const SocketProvider = ({ children }: SocketProviderProps) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const { user } = useAuth(); // Get the logged-in user

    useEffect(() => {
        if (user?._id) {
            const newSocket = io(`https://freshconnect-kuwy.onrender.com`, {
                query: { userId: user._id }, // Pass userId for authentication on the backend
            });
            setSocket(newSocket);

            return () => {
                newSocket.close();
            };
        } else {
            // If user logs out, disconnect the socket
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [user]);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};