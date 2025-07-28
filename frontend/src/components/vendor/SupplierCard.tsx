// src/components/vendor/SupplierCard.tsx

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Product } from "@/components/supplier/ProductCard";
import { Star, Heart, MessageCircle } from "lucide-react";

// Define the shape of a Supplier based on your API response
export interface Supplier {
    _id: string;
    name: string;
    trustScore: number;
    rating: number;
    reviewCount: number;
    distance: string;
    deliveryTime: string;
    minOrder: number;
    products: Product[]; // A list of products this supplier offers
}

interface SupplierCardProps {
    supplier: Supplier;
    onOrderNow: (supplier: Supplier) => void;
    onChatClick: (supplierId: string) => void;
}

export const SupplierCard = ({ supplier, onOrderNow, onChatClick }: SupplierCardProps) => {
    // Use the first product for display purposes, or provide a fallback.
    const representativeProduct = supplier.products?.[0];

    return (
        <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6">
                <div className="flex justify-between items-start">
                    <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-semibold">{supplier.name}</h3>
                            <Badge className="bg-trust/10 text-trust border-trust/20">
                                Trust: {supplier.trustScore}%
                            </Badge>
                        </div>

                        <div className="flex items-center space-x-4 mb-3 text-sm">
                            <div className="flex items-center space-x-1">
                                <Star className="w-4 h-4 fill-primary text-primary" />
                                <span className="font-medium">{supplier.rating}</span>
                                <span className="text-muted-foreground">({supplier.reviewCount})</span>
                            </div>
                            <span className="text-muted-foreground">{supplier.distance} away</span>
                        </div>

                        {/* <div className="flex flex-wrap gap-2 mb-4">
                            {supplier.products.slice(0, 3).map((p) => (
                                // Display category as a badge, assuming it's a good summary
                                <Badge key={p._id} variant="outline">{p.category}</Badge>
                            ))}
                            {supplier.products.length > 3 && <Badge variant="outline">+{supplier.products.length - 3} more</Badge>}
                        </div> */}

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                                <span className="text-muted-foreground">Price from:</span>
                                <div className="font-semibold text-primary">
                                    {representativeProduct ? `₹${representativeProduct.price}/kg` : 'N/A'}
                                </div>
                            </div>
                            <div>
                                <span className="text-muted-foreground">Delivery:</span>
                                <div className="font-medium">{supplier.deliveryTime}</div>
                            </div>
                            <div>
                                <span className="text-muted-foreground">Min Order:</span>
                                <div className="font-medium">₹{supplier.minOrder}1000</div>
                            </div>
                            <div>
                                <span className="text-muted-foreground">Savings:</span>
                                <div className="font-semibold text-secondary">Up to 13% off</div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col space-y-2 ml-4">
                        <Button
                            variant="vendor"
                            size="sm"
                            onClick={() => onOrderNow(supplier)}
                            disabled={!supplier.products || supplier.products.length === 0}
                        >
                            Order Now
                        </Button>
                        {/* UPDATE: Add Chat Button */}
                        <Button variant="outline" size="sm" onClick={() => onChatClick(supplier._id)}>
                            <MessageCircle className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                            <Heart className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};