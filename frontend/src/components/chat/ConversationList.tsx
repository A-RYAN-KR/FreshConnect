// src/components/chat/ConversationList.tsx
import { Conversation } from '../../services/chatService';
import { useAuth } from '@/context/AuthContext'; // Assuming you have this
import { AvatarPlaceholder } from './AvatarPlaceholder';
import { formatDistanceToNow } from 'date-fns';

interface ConversationListProps {
    conversations: Conversation[];
    selectedConversationId: string | null;
    onSelectConversation: (conversationId: string) => void;
}

export const ConversationList = ({ conversations, selectedConversationId, onSelectConversation }: ConversationListProps) => {
    const { user } = useAuth();

    return (
        <div className="bg-card border-r border-border flex flex-col">
            <header className="p-4 border-b border-border">
                <h2 className="text-xl font-bold">Chats</h2>
            </header>
            <div className="flex-1 overflow-y-auto">
                {conversations.map((conv) => {
                    // Find the other participant
                    const recipient = conv.participants.find(p => p._id !== user?._id);
                    if (!recipient) return null;

                    const isSelected = conv._id === selectedConversationId;

                    return (
                        <div
                            key={conv._id}
                            onClick={() => onSelectConversation(conv._id)}
                            className={`flex items-center p-3 cursor-pointer transition-colors ${isSelected ? 'bg-primary/10' : 'hover:bg-muted/50'}`}
                        >
                            <AvatarPlaceholder name={recipient.name} />
                            <div className="ml-4 flex-1">
                                <div className="flex justify-between items-center">
                                    <h3 className="font-semibold">{recipient.name}</h3>
                                    <p className="text-xs text-muted-foreground">
                                        {formatDistanceToNow(new Date(conv.updatedAt), { addSuffix: true })}
                                    </p>
                                </div>
                                <p className="text-sm text-muted-foreground truncate">
                                    {conv.lastMessage ? conv.lastMessage.content : "No messages yet"}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};