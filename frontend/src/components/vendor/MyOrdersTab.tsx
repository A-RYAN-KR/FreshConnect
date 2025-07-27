import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Package } from "lucide-react";
import { getMyOrders } from '@/services/orderService';
import { Order, OrderCard } from './OrderCard';
import { ReviewDialog } from './ReviewDialog'; // Assuming path is correct
// UPDATE: Import the new ComplaintDialog component
import { ComplaintDialog } from './ComplaintDialog'; // Assuming path is correct

// State shape for the review dialog
interface ReviewState {
    open: boolean;
    productId: string | null;
    productName: string | null;
}

// UPDATE: New state shape for the complaint dialog
interface ComplaintState {
    open: boolean;
    order: Order | null;
}

export const MyOrdersTab = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // State for managing the review dialog
    const [reviewState, setReviewState] = useState<ReviewState>({
        open: false,
        productId: null,
        productName: null,
    });

    // UPDATE: New state for managing the complaint dialog
    const [complaintState, setComplaintState] = useState<ComplaintState>({
        open: false,
        order: null,
    });

    const fetchOrders = async () => {
        try {
            setIsLoading(true);
            const data = await getMyOrders();
            if (data.success) {
                setOrders(data.orders);
            } else {
                throw new Error(data.message || "Failed to fetch orders.");
            }
        } catch (err: any) {
            setError(err.message || 'An error occurred while fetching your orders.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []); // Runs once on component mount

    // --- Handlers for Review Dialog ---
    const handleOpenReviewDialog = (productId: string, productName: string) => {
        setReviewState({ open: true, productId, productName });
    };
    const handleCloseReviewDialog = () => {
        setReviewState({ open: false, productId: null, productName: null });
    };
    const onReviewSubmitted = () => {
        fetchOrders(); // Re-fetch orders to reflect any changes
    };

    // --- UPDATE: Handlers for Complaint Dialog ---
    const handleOpenComplaintDialog = (order: Order) => {
        setComplaintState({ open: true, order: order });
    };
    const handleCloseComplaintDialog = () => {
        setComplaintState({ open: false, order: null });
    };
    const onComplaintSubmitted = () => {
        fetchOrders(); // Re-fetch orders to reflect any changes
    };

    if (isLoading) {
        return <p>Loading your orders...</p>;
    }

    if (error) {
        return <p className="text-destructive">{error}</p>;
    }

    return (
        // Wrap in a React Fragment to accommodate multiple dialogs
        <>
            <div className="space-y-4">
                <h2 className="text-xl font-semibold">My Recent Orders</h2>
                {orders.length > 0 ? (
                    <div className="grid gap-4">
                        {orders.map((order) => (
                            <OrderCard
                                key={order._id}
                                order={order}
                                onReviewClick={handleOpenReviewDialog}
                                // UPDATE: Pass the new handler to OrderCard
                                onComplaintClick={handleOpenComplaintDialog}
                            />
                        ))}
                    </div>
                ) : (
                    <Card>
                        <CardContent className="p-6 text-center">
                            <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                            <h3 className="text-lg font-medium mb-2">No Recent Orders</h3>
                            <p className="text-muted-foreground">
                                Your order history will appear here once you start ordering.
                            </p>
                        </CardContent>
                    </Card>
                )}
            </div>

            {/* Render Review Dialog Conditionally */}
            {reviewState.productId && reviewState.productName && (
                <ReviewDialog
                    open={reviewState.open}
                    onOpenChange={handleCloseReviewDialog}
                    productId={reviewState.productId}
                    productName={reviewState.productName}
                    onReviewSubmitted={onReviewSubmitted}
                />
            )}

            {/* UPDATE: Render Complaint Dialog Conditionally */}
            {complaintState.order && (
                <ComplaintDialog
                    open={complaintState.open}
                    onOpenChange={handleCloseComplaintDialog}
                    order={complaintState.order}
                    onComplaintSubmitted={onComplaintSubmitted}
                />
            )}
        </>
    );
};