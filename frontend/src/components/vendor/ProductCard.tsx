// src/components/vendor/ProductCard.tsx

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

// Product and Supplier interface
export interface Product {
  _id: string;
  name: string;
  description?: string;
  price?: number;
  images: string[];
  supplierId?: {
    _id: string;
    firstName: string;
    lastName: string;
    trustScore?: number;
    rating?: number;
    reviewCount?: number;
    avatar?: string;
  };
}

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const supplier = product.supplierId;
  const supplierName = supplier ? `${supplier.firstName} ${supplier.lastName}` : "Unknown Supplier";

  return (
    <Card className="hover:shadow-md transition-shadow duration-300">
      <CardContent className="p-4 flex space-x-4">
        {/* Left: Product Image */}
        <div className="w-24 h-24 rounded-md overflow-hidden flex-shrink-0">
          <img
            src={product.images?.[0] || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right: Product and Supplier Info */}
        <div className="flex flex-col justify-between w-full">
          <div>
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-semibold">{product.name}</h3>
              {supplier?.trustScore !== undefined && (
                <Badge className="bg-green-100 text-green-800 border-green-200">
                  Trust: {supplier.trustScore}%
                </Badge>
              )}
            </div>

            <p className="text-muted-foreground text-sm mb-1 line-clamp-2">
              {product.description || "No description available."}
            </p>

            <div className="text-sm font-medium text-primary mb-2">
              ₹{product.price ?? "N/A"}/kg
            </div>

            <div className="flex items-center space-x-3 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 fill-primary text-primary" />
                <span className="font-medium">{supplier?.rating ?? "4.2"}</span>
              </div>
              <span>•</span>
              <span>{supplierName}</span>
            </div>
          </div>

          {/* Optional actions */}
          <div className="mt-3">
            <Button variant="vendor" size="sm">
              View Product
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
