import { useState } from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
    rating: number;
    setRating: (rating: number) => void;
    size?: number;
    className?: string;
    disabled?: boolean;
}

export const StarRating = ({ rating, setRating, size = 24, className, disabled = false }: StarRatingProps) => {
    const [hover, setHover] = useState(0);

    return (
        <div className={cn("flex space-x-1", className, { 'cursor-not-allowed': disabled })}>
            {[...Array(5)].map((_, index) => {
                const ratingValue = index + 1;
                return (
                    <button
                        type="button"
                        key={index}
                        className="focus:outline-none"
                        disabled={disabled}
                        onClick={() => !disabled && setRating(ratingValue)}
                        onMouseEnter={() => !disabled && setHover(ratingValue)}
                        onMouseLeave={() => !disabled && setHover(0)}
                    >
                        <Star
                            size={size}
                            className={cn(
                                "transition-colors",
                                { 'cursor-pointer': !disabled },
                                ratingValue <= (hover || rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                            )}
                        />
                    </button>
                );
            })}
        </div>
    );
};