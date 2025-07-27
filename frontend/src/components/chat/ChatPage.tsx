// src/components/chat/ChatPage.tsx
import { useState, useEffect } from 'react';
import { ConversationList } from './ConversationList';
import { MessagePanel } from './MessagePanel';
import { getConversations, Conversation } from '../../services/chatService';

export const ChatPage = () => {
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchConversations = async () => {
            try {
                setIsLoading(true);
                const data = await getConversations();
                setConversations(data);
            } catch (error) {
                console.error("Failed to fetch conversations", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchConversations();
    }, []);

    const selectedConversation = conversations.find(c => c._id === selectedConversationId) || null;

    return (
        <div className="flex h-screen w-full antialiased text-foreground bg-card">
            <div className="w-1/3 max-w-sm flex-shrink-0">
                <ConversationList
                    conversations={conversations}
                    selectedConversationId={selectedConversationId}
                    onSelectConversation={setSelectedConversationId}
                />
            </div>
            <div className="flex-1">
                <MessagePanel conversation={selectedConversation} />
            </div>
        </div>
    );
};