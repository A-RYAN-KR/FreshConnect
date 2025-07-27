import { useState, useRef, ChangeEvent } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription, DialogClose } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useToast } from "@/components/ui/use-toast";
import { ImagePlus, X, AlertCircle } from 'lucide-react';
import { submitComplaint } from '@/services/complaintService';
import { Order } from './OrderCard';

interface ComplaintDialogProps {
    order: Order;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onComplaintSubmitted: () => void;
}

const COMPLAINT_REASONS = [
    'Product is rotten',
    'Received wrong item',
    'Damaged packaging',
    'Item missing',
    'Other'
];

export const ComplaintDialog = ({ order, open, onOpenChange, onComplaintSubmitted }: ComplaintDialogProps) => {
    const [reason, setReason] = useState('');
    const [comment, setComment] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { toast } = useToast();

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
            setError(null); // Clear previous errors
        }
    };

    const removeImage = () => {
        setImage(null);
        setImagePreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleSubmit = async () => {
        if (!reason) {
            toast({ title: "Reason Required", description: "Please select a reason for your complaint.", variant: "destructive" });
            return;
        }
        if (reason === 'Product is rotten' && !image) {
            toast({ title: "Image Required", description: "Please upload an image for a 'rotten product' complaint.", variant: "destructive" });
            return;
        }

        setIsSubmitting(true);
        setError(null);

        const formData = new FormData();
        formData.append('orderId', order._id);
        formData.append('productId', order.productId._id);
        formData.append('supplierId', order.supplierId._id);
        formData.append('reason', reason);
        formData.append('comment', comment);
        if (image) {
            formData.append('complaintImage', image);
        }

        const result = await submitComplaint(formData);
        setIsSubmitting(false);

        if (result.success) {
            toast({ title: "Complaint Filed", description: "Your complaint has been submitted for review." });
            onOpenChange(false);
            onComplaintSubmitted();
        } else {
            setError(result.message); // Show specific error from backend (e.g., AI verification failed)
            toast({ title: "Submission Failed", description: result.message, variant: "destructive" });
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>File a Complaint for {order.productId.name}</DialogTitle>
                    <DialogDescription>Please provide details about the issue with your order.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-6 py-4">
                    <div>
                        <Label className="font-medium mb-3 block">Reason for Complaint</Label>
                        <RadioGroup value={reason} onValueChange={setReason}>
                            {COMPLAINT_REASONS.map((r) => (
                                <div key={r} className="flex items-center space-x-2">
                                    <RadioGroupItem value={r} id={r} />
                                    <Label htmlFor={r} className="font-normal">{r}</Label>
                                </div>
                            ))}
                        </RadioGroup>
                    </div>

                    {reason === 'Product is rotten' && (
                        <div className="flex flex-col gap-2 p-4 border border-dashed rounded-lg">
                            <Label className="font-medium">Upload Image of Rotten Product</Label>
                            <p className="text-sm text-muted-foreground">Our AI will verify the image to process your complaint faster.</p>
                            <Button variant="outline" size="sm" className="w-fit" onClick={() => fileInputRef.current?.click()}>
                                <ImagePlus className="mr-2 h-4 w-4" /> Upload Image
                            </Button>
                            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageChange} />
                            {imagePreview && (
                                <div className="relative h-24 w-24 mt-2">
                                    <img src={imagePreview} alt="Complaint preview" className="h-full w-full rounded object-cover" />
                                    <button onClick={removeImage} className="absolute -top-1.5 -right-1.5 rounded-full bg-gray-700 p-0.5 text-white hover:bg-destructive">
                                        <X size={12} />
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    <div>
                        <Label htmlFor="comment" className="font-medium">Additional Comments (optional)</Label>
                        <Textarea id="comment" placeholder="Provide more details here..." value={comment} onChange={(e) => setComment(e.target.value)} className="mt-2" />
                    </div>

                    {error && (
                        <div className="flex items-start gap-3 rounded-md border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
                            <AlertCircle className="h-5 w-5 flex-shrink-0" />
                            <p>{error}</p>
                        </div>
                    )}
                </div>
                <DialogFooter>
                    <DialogClose asChild><Button type="button" variant="secondary">Cancel</Button></DialogClose>
                    <Button type="submit" onClick={handleSubmit} disabled={isSubmitting || !reason}>
                        {isSubmitting ? 'Submitting...' : 'File Complaint'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};