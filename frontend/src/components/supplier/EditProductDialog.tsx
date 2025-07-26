// src/components/supplier/EditProductDialog.tsx

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
import { updateProduct } from '@/services/productService';
import { Product } from './ProductCard';

interface EditProductDialogProps {
    product: Product | null; // Product to edit, or null if not open
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    onProductUpdated: (updatedProduct: Product) => void;
}

export const EditProductDialog = ({ product, isOpen, onOpenChange, onProductUpdated }: EditProductDialogProps) => {
    // State for each form field
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [stockQuantity, setStockQuantity] = useState('');
    const [category, setCategory] = useState('');
    // We don't handle editing images in this version for simplicity, but you could add it

    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // When the product prop changes (i.e., when the dialog is opened for a new product),
    // populate the form fields with that product's data.
    useEffect(() => {
        if (product) {
            setName(product.name);
            setDescription(product.description || ''); // Handle possible undefined description
            setPrice(String(product.price));
            setStockQuantity(String(product.stockQuantity));
            setCategory(product.category);
        }
    }, [product]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!product) return;

        setIsSubmitting(true);
        setError(null);

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('stockQuantity', stockQuantity);
        formData.append('category', category);

        try {
            const responseData = await updateProduct(product._id, formData);

            // ✅ THE FIX: Check if the response is valid and contains the product, then pass *only the product* up.
            if (responseData && responseData.product) {
                onProductUpdated(responseData.product); // Pass the nested product object
            }

            onOpenChange(false); // Close the dialog
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to update product.');
        } finally {
            setIsSubmitting(false);
        }
    };
    
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[480px]">
                <DialogHeader>
                    <DialogTitle>Edit Product: {product?.name}</DialogTitle>
                    <DialogDescription>
                        Update the details for your product. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        {/* Form fields are identical to AddProductDialog */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">Name</Label>
                            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-start gap-4">
                            <Label htmlFor="description" className="text-right pt-2">Description</Label>
                            <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="category" className="text-right">Category</Label>
                            <Input id="category" value={category} onChange={(e) => setCategory(e.target.value)} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="price" className="text-right">Price (₹)</Label>
                            <Input id="price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="stockQuantity" className="text-right">Stock (units)</Label>
                            <Input id="stockQuantity" type="number" value={stockQuantity} onChange={(e) => setStockQuantity(e.target.value)} className="col-span-3" />
                        </div>
                    </div>
                    {error && <p className="text-sm text-destructive text-center mb-4">{error}</p>}
                    <DialogFooter>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Saving...' : 'Save Changes'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};