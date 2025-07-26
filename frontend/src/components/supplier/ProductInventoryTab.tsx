// src/components/supplier/ProductInventoryTab.tsx

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Eye, Plus } from "lucide-react";
import { getAllProducts } from '@/services/productService';
import { Product, ProductCard } from './ProductCard';
import { AddProductDialog } from './AddProductDialog';
import { EditProductDialog } from './EditProductDialog';

export const ProductInventoryTab = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // State for managing modals
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setIsLoading(true);
                const responseData = await getAllProducts();

                // ✅ FIX: Access the .products array from the response object
                if (responseData && responseData.products) {
                    setProducts(responseData.products);
                } else {
                    // Handle case where the structure is not as expected
                    setProducts([]);
                }

            } catch (err) {
                setError('Failed to fetch products. Please try again later.');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleProductAdded = (newProduct: Product) => {
        setProducts(prevProducts => [newProduct, ...prevProducts]);
    };

    const handleEditClick = (product: Product) => {
        setSelectedProduct(product);
        setIsEditDialogOpen(true);
    };

    const handleProductUpdated = (updatedProduct: Product) => {
        setProducts(prevProducts =>
            prevProducts.map(p => p._id === updatedProduct._id ? updatedProduct : p)
        );
    };

    return (
        <div className="space-y-6">
            {/* --- Modals --- */}
            <AddProductDialog
                isOpen={isAddDialogOpen}
                onOpenChange={setIsAddDialogOpen}
                onProductAdded={handleProductAdded}
            />
            <EditProductDialog
                product={selectedProduct}
                isOpen={isEditDialogOpen}
                onOpenChange={setIsEditDialogOpen}
                onProductUpdated={handleProductUpdated}
            />

            {/* --- Header and Buttons --- */}
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Product Inventory</h2>
                <div className="flex space-x-2">
                    <Button variant="outline"><Eye className="w-4 h-4 mr-2" />Preview Store</Button>
                    <Button className="bg-green-600 hover:bg-green-700" onClick={() => setIsAddDialogOpen(true)}>
                        <Plus className="w-4 h-4 mr-2" />
                        Add New Product
                    </Button>
                </div>
            </div>

            {/* --- Product List --- */}
            {isLoading && <p>Loading products...</p>}
            {error && <p className="text-destructive">{error}</p>}
            {!isLoading && !error && (
                <div className="grid gap-4">
                    {products.length > 0 ? (
                        products.map((product) => (
                            <ProductCard
                                key={product._id}
                                product={product}
                                onEdit={handleEditClick} // ✅ Pass the handler to the card
                            />
                        ))
                    ) : (
                        <p>You haven't added any products yet.</p>
                    )}
                </div>
            )}
        </div>
    );
};