// src/components/supplier/AddProductDialog.tsx

import { useState } from 'react';
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
import { createProduct } from '@/services/productService';
import { Product } from './ProductCard';

interface AddProductDialogProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    onProductAdded: (newProduct: Product) => void;
}

export const AddProductDialog = ({ isOpen, onOpenChange, onProductAdded }: AddProductDialogProps) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [stockQuantity, setStockQuantity] = useState('');
    const [category, setCategory] = useState('');
    const [images, setImages] = useState<FileList | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const resetForm = () => {
        setName('');
        setDescription('');
        setPrice('');
        setStockQuantity('');
        setCategory('');
        setImages(null);
        setError(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !price || !stockQuantity || !category || !images || images.length === 0) {
            setError("Please fill all fields and upload at least one image.");
            return;
        }

        setIsSubmitting(true);
        setError(null);

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('stockQuantity', stockQuantity);
        formData.append('category', category);
        for (let i = 0; i < images.length; i++) {
            formData.append('images', images[i]);
        }

        try {
            // The createProduct service now returns the new product object on success
            const newProductData = await createProduct(formData);

            // Pass the newly created product to the parent component
            onProductAdded(newProductData);

            onOpenChange(false); // Close the dialog
            resetForm();
        } catch (err: any) {
            // Set error message from the backend response
            setError(err.response?.data?.message || 'Failed to create product. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[480px]">
                <DialogHeader>
                    <DialogTitle>Add New Product</DialogTitle>
                    <DialogDescription>
                        Enter the details for your new product. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">Name</Label>
                            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" placeholder="e.g. Organic Tomatoes" />
                        </div>
                        <div className="grid grid-cols-4 items-start gap-4">
                            <Label htmlFor="description" className="text-right pt-2">Description</Label>
                            <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="col-span-3" placeholder="Describe your product..." />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="category" className="text-right">Category</Label>
                            <Input id="category" value={category} onChange={(e) => setCategory(e.target.value)} className="col-span-3" placeholder="e.g. Fruits & Vegetables" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="price" className="text-right">Price (₹)</Label>
                            <Input id="price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="col-span-3" placeholder="e.g. 50" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="stockQuantity" className="text-right">Stock (units)</Label>
                            <Input id="stockQuantity" type="number" value={stockQuantity} onChange={(e) => setStockQuantity(e.target.value)} className="col-span-3" placeholder="e.g. 100" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="images" className="text-right">Images</Label>
                            <Input id="images" type="file" multiple onChange={(e) => setImages(e.target.files)} className="col-span-3" />
                        </div>
                    </div>
                    {error && <p className="text-sm text-destructive text-center mb-4">{error}</p>}
                    <DialogFooter>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Saving...' : 'Save Product'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};