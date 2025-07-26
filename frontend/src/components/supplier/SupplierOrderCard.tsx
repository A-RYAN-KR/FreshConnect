// src/components/supplier/SupplierOrderCard.tsx

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Order } from "@/components/vendor/OrderCard"; // Re-use the Order type
import { updateOrderStatus } from "@/services/orderService";
import { useState } from "react";
import { format, isValid, parseISO } from 'date-fns';

export interface SupplierOrder {
    _id: string;
    vendorId: { // This is the populated object for the SUPPLIER
        _id: string;
        firstName: string;
        lastName: string;
    };
    productId: {
        _id: string;
        name: string;
        images: string[];
    };
    quantity: number;
    totalPrice: number;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    orderDate: string;
}

interface SupplierOrderCardProps {
    order: SupplierOrder; // Use the new, correct type
    onStatusChange: (updatedOrder: SupplierOrder) => void;
}

const formatDate = (dateString: string | undefined): string => {
    if (!dateString) {
        return "No date provided";
    }

    // parseISO is excellent at handling the format MongoDB uses (ISO 8601)
    const date = parseISO(dateString);

    if (!isValid(date)) {
        return "Invalid Date";
    }

    // 'PPP' is a handy format string for "MMM d, yyyy" (e.g., Jul 26, 2025)
    return format(date, 'PPP');
};

const StatusBadge: React.FC<{ status: SupplierOrder['status'] }> = ({ status }) => {
    const statusStyles = {
        Pending: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
        Processing: "bg-blue-500/10 text-blue-600 border-blue-500/20",
        Shipped: "bg-indigo-500/10 text-indigo-600 border-indigo-500/20",
        Delivered: "bg-green-500/10 text-green-600 border-green-500/20",
        Cancelled: "bg-red-500/10 text-red-600 border-red-500/20",
    };
    return <Badge className={statusStyles[status]}>{status}</Badge>;
};

export const SupplierOrderCard = ({ order, onStatusChange }: SupplierOrderCardProps) => {
    const [isUpdating, setIsUpdating] = useState(false);

    const handleStatusUpdate = async (newStatus: string) => {
        setIsUpdating(true);
        try {
            const data = await updateOrderStatus(order._id, newStatus);
            if (data.success) {
                onStatusChange(data.order);
            }
        } catch (error) {
            console.error("Failed to update status", error);
            // Optionally show an error toast to the user
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-base font-medium">
                    Order By: {order.vendorId.firstName} {order.vendorId.lastName}
                </CardTitle>
                <Badge variant="outline">{formatDate(order.orderDate)}</Badge>
            </CardHeader>
            <CardContent>
                <div className="flex items-center gap-4">
                    <img
                        src={order.productId.images?.[0] || 'https://via.placeholder.com/100'}
                        alt={order.productId.name}
                        className="w-20 h-20 object-cover rounded-md border"
                    />
                    <div className="flex-1 space-y-1">
                        <p className="text-lg font-semibold">{order.productId.name}</p>
                        <p className="text-sm text-muted-foreground">Quantity: {order.quantity} kg</p>
                        <p className="font-semibold">Total: ₹{order.totalPrice.toFixed(2)}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                        <StatusBadge status={order.status} />
                        <Select onValueChange={handleStatusUpdate} defaultValue={order.status} disabled={isUpdating}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Update Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="processing">Processing</SelectItem>
                                <SelectItem value="shipped">Shipped</SelectItem>
                                <SelectItem value="delivered">Delivered</SelectItem>
                                <SelectItem value="cancelled">Cancel Order</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};