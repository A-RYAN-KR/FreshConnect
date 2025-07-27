// src/components/chat/MessagePanel.tsx
import { useState, useEffect, useRef } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, MessageSquare } from 'lucide-react';
import { useSocket } from '@/context/SocketContext';
import { useAuth } from '@/context/AuthContext';
import { getMessages, Message, Conversation } from '../../services/chatService';
import { AvatarPlaceholder } from './AvatarPlaceholder';
import { format } from 'date-fns';

interface MessagePanelProps {
    conversation: Conversation | null;
}

export const MessagePanel = ({ conversation }: MessagePanelProps) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const socket = useSocket();
    const { user } = useAuth();
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const recipient = conversation?.participants.find(p => p._id !== user?._id);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
    }, [messages]);

    useEffect(() => {
        if (conversation?._id && socket) {
            // Join the room for real-time updates
            socket.emit('join_room', conversation._id);

            // Fetch message history
            getMessages(conversation._id).then(setMessages);
        }
    }, [conversation?._id, socket]);

    useEffect(() => {
        if (!socket) return;
        const handleReceiveMessage = (newMessage: Message) => {
            if (newMessage.conversationId === conversation?._id) {
                setMessages(prev => [...prev, newMessage]);
            }
        };
        socket.on('receive_message', handleReceiveMessage);
        return () => { socket.off('receive_message', handleReceiveMessage); };
    }, [socket, conversation?._id]);

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

    if (!conversation || !recipient) {
        return (
            <div className="flex flex-col items-center justify-center h-full bg-muted/20">
                <MessageSquare className="w-24 h-24 text-muted-foreground/30" />
                <p className="mt-4 text-lg text-muted-foreground">Select a chat to start messaging</p>
            </div>
        );
    }

    return (
        <div className="bg-muted/20 flex flex-col h-full">
            <header className="flex items-center p-4 border-b border-border bg-card">
                <AvatarPlaceholder name={recipient.name} />
                <h2 className="ml-4 text-lg font-semibold">{recipient.name}</h2>
            </header>
            <main className="flex-1 p-6 overflow-y-auto space-y-4">
                {messages.map((msg) => (
                    <div key={msg._id} className={`flex items-end gap-2 ${msg.sender._id === user?._id ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-md px-4 py-2 rounded-lg shadow-sm ${msg.sender._id === user?._id ? 'bg-primary text-primary-foreground rounded-br-none' : 'bg-card text-card-foreground rounded-bl-none'}`}>
                            <p className="text-sm">{msg.content}</p>
                            <p className={`text-xs mt-1 ${msg.sender._id === user?._id ? 'text-primary-foreground/70' : 'text-muted-foreground'} text-right`}>
                                {format(new Date(msg.createdAt), 'p')}
                            </p>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </main>
            <footer className="p-4 border-t border-border bg-card">
                <form onSubmit={handleSendMessage} className="flex items-center space-x-4">
                    <Input
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="flex-1"
                    />
                    <Button type="submit" size="icon" className="rounded-full">
                        <Send className="w-5 h-5" />
                    </Button>
                </form>
            </footer>
        </div>
    );
};