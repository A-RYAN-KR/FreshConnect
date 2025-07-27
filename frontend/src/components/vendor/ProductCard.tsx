// src/components/vendor/ProductCard.tsx

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Star, MessageCircle, ShoppingCart, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { fetchProductReviews, fetchProductReviewCount } from "../../services/reviewService";

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

interface Review {
  _id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

interface ProductCardProps {
  product: Product;
}


export const ProductCard = ({ product }: ProductCardProps) => {
  const [reviewsOpen, setReviewsOpen] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewCount, setReviewCount] = useState<number | null>(null);
  const [loadingReviews, setLoadingReviews] = useState(false);
  const [reviewsLoaded, setReviewsLoaded] = useState(false);
  
  const supplier = product.supplierId;
  const supplierName = supplier ? `${supplier.firstName} ${supplier.lastName}` : "Unknown Supplier";

  // Fetch review count on component mount
  useEffect(() => {
    const loadReviewCount = async () => {
      const count = await fetchProductReviewCount(product._id);
      setReviewCount(count);
    };
    
    loadReviewCount();
  }, [product._id]);

  // Fetch full reviews when dialog opens
  const handleReviewsOpen = async () => {
    setReviewsOpen(true);
    
    // Only fetch full reviews if not already loaded
    if (!reviewsLoaded) {
      setLoadingReviews(true);
      try {
        const fetchedReviews = await fetchProductReviews(product._id);
        setReviews(fetchedReviews);
        setReviewsLoaded(true);
        // Update count in case it changed
        setReviewCount(fetchedReviews.length);
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
        setReviews([]);
      } finally {
        setLoadingReviews(false);
      }
    }
  };

  const handleOrderClick = () => {
    // Non-functional for now - you can add actual order logic here
    alert("Order functionality will be implemented soon!");
  };

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
              <div className="flex items-center space-x-2">
                {supplier?.trustScore !== undefined && (
                  <Badge className="bg-green-100 text-green-800 border-green-200">
                    Trust: {supplier.trustScore}%
                  </Badge>
                )}
                
                {/* Reviews Dialog Trigger */}
                <Dialog open={reviewsOpen} onOpenChange={setReviewsOpen}>
                  <DialogTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="flex items-center space-x-1 p-1 h-8"
                      onClick={handleReviewsOpen}
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span className="text-xs">
                        ({reviewCount !== null ? reviewCount : '...'})
                      </span>
                    </Button>
                  </DialogTrigger>
                  
                  <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
                    <DialogHeader>
                      <DialogTitle className="flex items-center justify-between">
                        <span>Customer Reviews - {product.name}</span>
                      </DialogTitle>
                    </DialogHeader>
                    
                    <div className="flex-1 overflow-y-auto">
                      {loadingReviews ? (
                        <div className="flex items-center justify-center py-8">
                          <Loader2 className="w-6 h-6 animate-spin mr-2" />
                          <span>Loading reviews...</span>
                        </div>
                      ) : (
                        <div className="space-y-4 pr-2">
                          {reviews.map((review) => (
                            <div key={review._id} className="border-b border-gray-100 pb-4 last:border-b-0">
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-medium">{review.userName}</span>
                                <div className="flex items-center space-x-1">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`w-4 h-4 ${
                                        i < review.rating
                                          ? "fill-yellow-400 text-yellow-400"
                                          : "fill-gray-200 text-gray-200"
                                      }`}
                                    />
                                  ))}
                                </div>
                              </div>
                              <p className="text-muted-foreground mb-2">{review.comment}</p>
                              <p className="text-sm text-muted-foreground">
                                {new Date(review.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                          ))}
                          
                          {reviews.length === 0 && !loadingReviews && (
                            <p className="text-center text-muted-foreground py-8">
                              No reviews yet for this product.
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
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

          {/* Action buttons */}
          <div className="mt-3 flex space-x-2">
            <Button variant="vendor" size="sm">
              View Product
            </Button>
            
            <Button 
              variant="default" 
              size="sm" 
              onClick={handleOrderClick}
              className="bg-orange-500 hover:bg-orange-600 text-white"
            >
              <ShoppingCart className="w-4 h-4 mr-1" />
              Order
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};