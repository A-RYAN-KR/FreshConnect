// src/components/vendor/OrderDialog.tsx

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { createOrder } from '@/services/orderService';
import { Product } from '@/components/supplier/ProductCard';
import { Supplier } from './SupplierCard';
import { ShoppingCart } from 'lucide-react'; // Import an icon

interface OrderDialogProps {
    supplier: Supplier | null;
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    onOrderPlaced: (order: any) => void;
}

export const OrderDialog = ({ supplier, isOpen, onOpenChange, onOrderPlaced }: OrderDialogProps) => {
    // --- State and Effect hooks remain the same ---
    const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const selectedProduct = supplier?.products.find(p => p._id === selectedProductId) || null;
    const totalPrice = selectedProduct ? (selectedProduct.price * quantity).toFixed(2) : '0.00';

    useEffect(() => {
        if (supplier && supplier.products.length > 0) {
            setSelectedProductId(supplier.products[0]._id);
            setQuantity(1);
            setError(null);
        }
    }, [supplier]);

    // --- Submit handler remains the same ---
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedProductId) {
            setError('Please select a product to order.');
            return;
        }
        setError(null);
        setIsSubmitting(true);
        try {
            const payload = { productId: selectedProductId, quantity };
            const newOrderData = await createOrder(payload);
            onOrderPlaced(newOrderData.order);
            onOpenChange(false);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to place order.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!supplier) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-xl">Order from {supplier.name}</DialogTitle>
                    <DialogDescription>
                        Select a product and specify the quantity to place your order.
                    </DialogDescription>
                </DialogHeader>

                {/* Product Image Preview */}
                {selectedProduct && (
                    <div className="my-4 flex justify-center">
                        <img
                            src={selectedProduct.images?.[0] || 'https://via.placeholder.com/150'}
                            alt={selectedProduct.name}
                            className="w-32 h-32 object-cover rounded-lg border"
                        />
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Main input section with horizontal layout */}
                    <div className="flex items-end gap-4">
                        <div className="flex-1 space-y-2">
                            <Label htmlFor="product">Product</Label>
                            <Select onValueChange={setSelectedProductId} value={selectedProductId || ''}>
                                <SelectTrigger id="product">
                                    <SelectValue placeholder="Select a product" />
                                </SelectTrigger>
                                <SelectContent>
                                    {supplier.products.map((product: Product) => (
                                        <SelectItem key={product._id} value={product._id}>
                                            {product.name} - ₹{product.price}/kg
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="w-28 space-y-2">
                            <Label htmlFor="quantity">Quantity (kg)</Label>
                            <Input
                                id="quantity"
                                type="number"
                                value={quantity}
                                onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                                disabled={!selectedProduct}
                            />
                        </div>
                    </div>

                    {error && <p className="text-sm text-destructive text-center">{error}</p>}

                    {/* Footer with total price and confirm button */}
                    <DialogFooter className="flex-col-reverse sm:flex-row sm:justify-between sm:items-center w-full">
                        <div className="text-left">
                            <span className="text-muted-foreground">Total Price:</span>
                            <p className="text-2xl font-bold text-primary">₹{totalPrice}</p>
                        </div>
                        <Button type="submit" size="lg" disabled={isSubmitting || !selectedProduct}>
                            <ShoppingCart className="w-4 h-4 mr-2" />
                            {isSubmitting ? 'Placing Order...' : 'Confirm Order'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};