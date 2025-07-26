import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Order } from './OrderCard';
import { ShieldAlert, Send } from 'lucide-react';

// Define the structure of the data this form will submit
export interface ComplaintPayload {
    orderId: string;
    complaintType: string;
    details: string;
    image?: File;
}

interface ComplaintDialogProps {
    order: Order | null;
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    onSubmit: (payload: ComplaintPayload) => void;
}

const complaintTypes = ["Product Damaged", "Late Delivery", "Incorrect Item", "Professionality Complaint", "Other"];

export const ComplaintDialog = ({ order, isOpen, onOpenChange, onSubmit }: ComplaintDialogProps) => {
    // Internal state for the form
    const [complaintType, setComplaintType] = useState<string | null>(null);
    const [details, setDetails] = useState("");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Reset form when the dialog is opened for a new order
    useEffect(() => {
        if (isOpen) {
            setComplaintType(null);
            setDetails("");
            setImageFile(null);
            setImagePreview(null);
            setError(null);
            setIsSubmitting(false);
        }
    }, [isOpen]);
    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            // Create a preview URL
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Basic validation
        if (!complaintType) {
            setError("Please select a reason for your complaint.");
            return;
        }
        if (!details.trim()) {
            setError("Please provide details about your complaint.");
            return;
        }
        setError(null);
        setIsSubmitting(true);

        const payload: ComplaintPayload = {
            orderId: order!._id,
            complaintType,
            details,
            image: imageFile || undefined,
        };

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        onSubmit(payload); // Pass the data up to the parent
        onOpenChange(false); // Close the dialog
        setIsSubmitting(false);
    };

    if (!order) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-xl">
                        <ShieldAlert className="w-6 h-6 text-destructive" />
                        File a Complaint
                    </DialogTitle>
                    <DialogDescription>
                        For order of "{order.productId.name}" from {order.supplierId.name}.
                        Please provide the details below.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                    <div>
                        <Label>Reason for Complaint</Label>
                        <div className="flex flex-wrap gap-2 pt-2">
                            {complaintTypes.map((type) => (
                                <Button
                                    key={type}
                                    type="button"
                                    variant={complaintType === type ? 'destructive' : 'outline'}
                                    size="sm"
                                    onClick={() => setComplaintType(type)}
                                >
                                    {type}
                                </Button>
                            ))}
                        </div>
                    </div>
                    
                    <div>
                        <Label htmlFor="details">Please provide more details</Label>
                        <Textarea
                            id="details"
                            value={details}
                            onChange={(e) => setDetails(e.target.value)}
                            placeholder="Describe the issue in detail..."
                            className="mt-2"
                        />
                    </div>
                    
                    <div>
                        <Label htmlFor="image">Upload an Image (Optional)</Label>
                        <div className="mt-2 flex items-center gap-4">
                            <Input id="image" type="file" accept="image/*" onChange={handleFileChange} className="flex-1" />
                            {imagePreview && (
                                <img src={imagePreview} alt="Preview" className="w-16 h-16 object-cover rounded-md border" />
                            )}
                        </div>
                    </div>
                    
                    {error && <p className="text-sm text-destructive text-center">{error}</p>}

                    <DialogFooter>
                        <Button type="submit" variant="destructive" size="lg" disabled={isSubmitting}>
                            <Send className="w-4 h-4 mr-2" />
                            {isSubmitting ? 'Submitting...' : 'Submit Complaint'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};
