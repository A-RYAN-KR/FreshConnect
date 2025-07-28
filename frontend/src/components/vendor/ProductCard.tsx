// src/components/vendor/ProductCard.tsx

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Star, MessageCircle, ShoppingCart, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { fetchProductReviews, fetchProductReviewCount } from "../../services/reviewService";
import { createOrder } from "../../services/orderService";
import { toast } from "sonner";

// Product and Supplier interface
export interface Product {
  _id: string;
  name: string;
  description?: string;
  price?: number;
  images: string[];
  stockQuantity?: number; // Added stockQuantity based on controller logic
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
  // State for reviews
  const [reviewsOpen, setReviewsOpen] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewCount, setReviewCount] = useState<number | null>(null);
  const [loadingReviews, setLoadingReviews] = useState(false);
  const [reviewsLoaded, setReviewsLoaded] = useState(false);

  // State for ordering
  const [isOrderDialogOpen, setIsOrderDialogOpen] = useState(false);
  const [orderQuantity, setOrderQuantity] = useState(1);
  const [isSubmittingOrder, setIsSubmittingOrder] = useState(false);

  const supplier = product.supplierId;
  const supplierName = supplier ? `${supplier.firstName} ${supplier.lastName}` : "Unknown Supplier";
  const calculatedTotalPrice = (product.price ?? 0) * orderQuantity;

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

    if (!reviewsLoaded) {
      setLoadingReviews(true);
      try {
        const fetchedReviews = await fetchProductReviews(product._id);
        setReviews(fetchedReviews);
        setReviewsLoaded(true);
        setReviewCount(fetchedReviews.length);
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
        setReviews([]);
      } finally {
        setLoadingReviews(false);
      }
    }
  };

  // Handle order submission
  const handleConfirmOrder = async () => {
    if (!product._id || orderQuantity <= 0) {
      // For a better UX, consider using a toast notification library like sonner or react-hot-toast
      toast.error("Invalid quantity. Please enter a number greater than 0.");
      return;
    }

    setIsSubmittingOrder(true);
    try {
      const payload = {
        productId: product._id,
        quantity: orderQuantity,
      };
      const newOrder = await createOrder(payload);
      toast.success(`Order placed successfully! Order ID: ${newOrder.order._id}`);
      setIsOrderDialogOpen(false); // Close dialog on success
      setOrderQuantity(1); // Reset quantity for next time
    } catch (error: any) {
      console.error("Failed to create order:", error);
      const errorMessage = error.response?.data?.message || "An unknown error occurred while placing the order.";
      toast.error(`Error: ${errorMessage}`);
    } finally {
      setIsSubmittingOrder(false);
    }
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

                {/* Reviews Dialog */}
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
                      <DialogTitle>Customer Reviews - {product.name}</DialogTitle>
                    </DialogHeader>
                    <div className="flex-1 overflow-y-auto pr-2">
                      {loadingReviews ? (
                        <div className="flex items-center justify-center py-8">
                          <Loader2 className="w-6 h-6 animate-spin mr-2" />
                          <span>Loading reviews...</span>
                        </div>
                      ) : reviews.length > 0 ? (
                        <div className="space-y-4">
                          {reviews.map((review) => (
                            <div key={review._id} className="border-b border-gray-100 pb-4 last:border-b-0">
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-medium">{review.userName}</span>
                                <div className="flex items-center space-x-1">
                                  {[...Array(5)].map((_, i) => (
                                    <Star key={i} className={`w-4 h-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"}`} />
                                  ))}
                                </div>
                              </div>
                              <p className="text-muted-foreground mb-2">{review.comment}</p>
                              <p className="text-sm text-muted-foreground">{new Date(review.createdAt).toLocaleDateString()}</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-center text-muted-foreground py-8">No reviews yet for this product.</p>
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

            {/* Order Dialog Trigger */}
            <Dialog open={isOrderDialogOpen} onOpenChange={setIsOrderDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="default"
                  size="sm"
                  className="bg-orange-500 hover:bg-orange-600 text-white"
                >
                  <ShoppingCart className="w-4 h-4 mr-1" />
                  Order
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Place an Order</DialogTitle>
                  <DialogDescription>
                    Confirm the quantity for <strong>{product.name}</strong>.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-6 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="quantity" className="text-right">
                      Quantity (kg)
                    </Label>
                    <Input
                      id="quantity"
                      type="number"
                      value={orderQuantity}
                      onChange={(e) => setOrderQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="col-span-3"
                      min="1"
                    />
                  </div>
                  <div className="flex justify-between items-center text-lg font-semibold mt-2">
                    <span>Total Price:</span>
                    <span>₹{calculatedTotalPrice.toFixed(2)}</span>
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    type="button"
                    onClick={handleConfirmOrder}
                    disabled={isSubmittingOrder || !product.price}
                  >
                    {isSubmittingOrder && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isSubmittingOrder ? "Placing Order..." : "Confirm Order"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};