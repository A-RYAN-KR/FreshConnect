// src/components/supplier/ProductCard.tsx

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Package, Star } from "lucide-react";

// Define the shape of a product based on your schema
export interface Product {
    _id: string;
    name: string;
    description?: string; // Add description as optional
    category: string;
    price: number;
    stockQuantity: number;
    images: string[];
    updatedAt: string;
}

interface ProductCardProps {
    product: Product;
    onEdit: (product: Product) => void; // ✅ Add a callback prop for editing
}

// A helper function to format dates nicely
const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return "just now";
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
};

const ProductStatus = ({ stock }: { stock: number }) => {
    if (stock === 0) {
        return <Badge className="bg-destructive/10 text-destructive border-destructive/20">Out of Stock</Badge>;
    }
    if (stock < 20) { // Example threshold for low stock
        return <Badge className="bg-primary/10 text-primary border-primary/20">Low Stock</Badge>;
    }
    return <Badge className="bg-secondary/10 text-secondary border-secondary/20">In Stock</Badge>;
};

export const ProductCard = ({ product, onEdit }: ProductCardProps) => {
    return (
        <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-4 flex">
                {/* Product Image */}
                <div className="w-24 h-24 mr-4 flex-shrink-0">
                    <img
                        src={product.images?.[0] || 'https://via.placeholder.com/150'}
                        alt={product.name}
                        className="w-full h-full object-cover rounded-md bg-muted"
                    />
                </div>

                {/* Product Details */}
                <div className="flex-grow flex justify-between items-start">
                    <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-semibold">{product.name}</h3>
                            <Badge variant="outline">{product.category}</Badge>
                            <ProductStatus stock={product.stockQuantity} />
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-2 text-sm">
                            <div>
                                <span className="text-muted-foreground">Price:</span>
                                <div className="font-semibold text-primary">₹{product.price}/kg</div>
                            </div>
                            <div>
                                <span className="text-muted-foreground">Stock:</span>
                                <div className="font-medium">{product.stockQuantity} kg</div>
                            </div>
                            {/* NOTE: Orders and Rating are not in the new schema. Add them back if your API provides them. */}
                            {/* <div>...Orders...</div> */}
                            {/* <div>...Rating...</div> */}
                            <div>
                                <span className="text-muted-foreground">Updated:</span>
                                <div className="font-medium">{formatRelativeTime(product.updatedAt)}</div>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-2 ml-4">
                        <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => onEdit(product)}>
                            <Edit className="w-4 h-4" />
                        </Button>
                        {product.stockQuantity === 0 && (
                            <Button size="sm" className="h-8 bg-green-600 hover:bg-green-700">
                                <Package className="w-4 h-4 mr-2" />
                                Restock
                            </Button>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};