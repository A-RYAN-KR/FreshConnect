// src/components/chat/AvatarPlaceholder.tsx
import { User as UserIcon } from 'lucide-react';

interface AvatarPlaceholderProps {
    name: string;
    className?: string;
}

export const AvatarPlaceholder = ({ name, className }: AvatarPlaceholderProps) => {
    const initial = name ? name.charAt(0).toUpperCase() : '?';

    return (
        <div className={`flex items-center justify-center w-11 h-11 rounded-full bg-muted text-muted-foreground ${className}`}>
            <span className="text-lg font-semibold">{initial}</span>
        </div>
    );
};