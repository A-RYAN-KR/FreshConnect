import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Send, CornerDownLeft } from 'lucide-react';
import { useSocket } from '@/context/SocketContext';
import { useAuth } from '@/context/AuthContext';
import axios from 'axios'; // You'll need a chat service, but for brevity, using axios directly

// Define types for clarity
interface Message { _id: string; sender: { _id: string; name: string }; content: string; createdAt: string; conversationId: string; }
interface Conversation { _id: string; participants: any[]; }

interface ChatWindowProps {
    recipientId: string;
    recipientName: string;
    onClose: () => void;
}

export const ChatWindow = ({ recipientId, recipientName, onClose }: ChatWindowProps) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [conversation, setConversation] = useState<Conversation | null>(null);
    const socket = useSocket();
    const { user } = useAuth();
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => { scrollToBottom(); }, [messages]);

    // 1. Fetch or create conversation and load history
    useEffect(() => {
        if (!recipientId || !user) return;

        const getConversation = async () => {
            try {
                // Get/Create Conversation
                const token = localStorage.getItem('token');
                const config = { headers: { Authorization: `Bearer ${token}` } };
                const { data: convData } = await axios.post('/api/chat', { recipientId }, config);
                setConversation(convData);

                // Join socket room
                if (socket && convData._id) {
                    socket.emit('join_room', convData._id);
                }

                // Fetch Message History
                const { data: msgData } = await axios.get(`/api/chat/${convData._id}/messages`, config);
                setMessages(msgData);

            } catch (error) {
                console.error("Failed to initialize chat:", error);
            }
        };

        getConversation();
    }, [recipientId, socket, user]);


    // 2. Listen for incoming messages
    useEffect(() => {
        if (!socket) return;

        const handleReceiveMessage = (newMessage: Message) => {
            if (newMessage.conversationId === conversation?._id) {
                setMessages(prev => [...prev, newMessage]);
            }
        };

        socket.on('receive_message', handleReceiveMessage);
        return () => { socket.off('receive_message', handleReceiveMessage); };
    }, [socket, conversation]);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (newMessage.trim() === '' || !socket || !conversation || !user) return;

        socket.emit('send_message', {
            conversationId: conversation._id,
            senderId: user._id,
            content: newMessage,
        });

        setNewMessage('');
    };

    return (
        <div className="fixed bottom-4 right-4 w-80 z-50">
            <Card className="flex flex-col h-[450px]">
                <CardHeader className="flex flex-row items-center justify-between p-4 border-b">
                    <CardTitle className="text-base font-semibold">{recipientName}</CardTitle>
                    <Button variant="ghost" size="icon" onClick={onClose}><X className="w-4 h-4" /></Button>
                </CardHeader>
                <CardContent className="flex-1 p-4 space-y-4 overflow-y-auto">
                    {messages.map((msg) => (
                        <div key={msg._id} className={`flex ${msg.sender._id === user?._id ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-xs px-3 py-2 rounded-lg ${msg.sender._id === user?._id ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                                <p className="text-sm">{msg.content}</p>
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </CardContent>
                <CardFooter className="p-2 border-t">
                    <form onSubmit={handleSendMessage} className="flex w-full items-center space-x-2">
                        <Input
                            placeholder="Type a message..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                        />
                        <Button type="submit" size="icon">
                            <Send className="w-4 h-4" />
                        </Button>
                    </form>
                </CardFooter>
            </Card>
        </div>
    );
};