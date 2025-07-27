import { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription, DialogClose } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from "@/components/ui/use-toast";
import { StarRating } from '../StarRating';
import { ImagePlus, X } from 'lucide-react';
// CORRECT: Import the real service function
import { submitReview } from '@/services/reviewService';

interface ReviewDialogProps {
    productId: string;
    productName: string;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onReviewSubmitted: () => void;
}

export const ReviewDialog = ({ productId, productName, open, onOpenChange, onReviewSubmitted }: ReviewDialogProps) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [images, setImages] = useState<File[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { toast } = useToast();

    // --- REMOVED THE submitReviewMock FUNCTION FROM THIS FILE ---

    const resetState = () => {
        setRating(0);
        setComment('');
        setImages([]);
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setImages(prev => [...prev, ...Array.from(event.target.files!)].slice(0, 5));
        }
    };

    const removeImage = (indexToRemove: number) => {
        setImages(prev => prev.filter((_, i) => i !== indexToRemove));
    };

    const handleSubmit = async () => {
        if (rating === 0) {
            toast({ title: "Rating Required", description: "Please select a star rating.", variant: "destructive" });
            return;
        }

        setIsSubmitting(true);
        const formData = new FormData();
        formData.append('rating', String(rating));
        formData.append('comment', comment);
        // Ensure your backend middleware (e.g., multer/cloudinary) is set up to handle 'reviewImages'
        images.forEach(image => formData.append('reviewImages', image));

        // CORRECT: Calling the imported service function
        const result = await submitReview(productId, formData);

        setIsSubmitting(false);

        if (result.success) {
            toast({ title: "Review Submitted!", description: "Thank you for your feedback." });
            onOpenChange(false);
            onReviewSubmitted();
            resetState();
        } else {
            toast({ title: "Submission Failed", description: result.message, variant: "destructive" });
        }
    };

    // ... The rest of the JSX for the component remains the same ...
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Write a review for {productName}</DialogTitle>
                    <DialogDescription>Share your thoughts with other customers.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="flex flex-col items-center gap-2">
                        <label className="text-sm font-medium">Your Rating</label>
                        <StarRating rating={rating} setRating={setRating} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="comment" className="text-sm font-medium">Your Comment</label>
                        <Textarea id="comment" placeholder="What did you like or dislike?" value={comment} onChange={(e) => setComment(e.target.value)} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium">Add Photos (optional)</label>
                        <div className="flex items-center gap-4">
                            <Button variant="outline" size="sm" className="w-fit" onClick={() => fileInputRef.current?.click()}>
                                <ImagePlus className="mr-2 h-4 w-4" /> Upload
                            </Button>
                            {images.length > 0 && <span className="text-sm text-muted-foreground">{images.length}/5 images selected</span>}
                        </div>
                        <input type="file" ref={fileInputRef} className="hidden" multiple accept="image/*" onChange={handleImageChange} />
                        <div className="mt-2 flex flex-wrap gap-2">
                            {images.map((file, index) => (
                                <div key={index} className="relative h-20 w-20">
                                    <img src={URL.createObjectURL(file)} alt="review preview" className="h-full w-full rounded object-cover" />
                                    <button onClick={() => removeImage(index)} className="absolute -top-1.5 -right-1.5 rounded-full bg-gray-700 p-0.5 text-white hover:bg-destructive">
                                        <X size={12} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild><Button type="button" variant="secondary">Cancel</Button></DialogClose>
                    <Button type="submit" onClick={handleSubmit} disabled={isSubmitting || rating === 0}>
                        {isSubmitting ? 'Submitting...' : 'Submit Review'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};