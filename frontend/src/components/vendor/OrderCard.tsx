import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Truck, MessageSquare, Star, ShieldAlert } from "lucide-react"; // Import ShieldAlert

export interface Order {
    _id: string;
    supplierId: {
        _id: string;
        name: string;
    };
    productId: {
        _id: string;
        name: string;
        images: string[];
    };
    quantity: number;
    totalPrice: number;
    status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
    createdAt: string;
}

// MODIFIED: Add a new callback prop for the complaint button
interface OrderCardProps {
    order: Order;
    onFileComplaint: (order: Order) => void;
}

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric'
    });
};

const StatusBadge = ({ status }: { status: Order['status'] }) => {
    const statusStyles = {
        Pending: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
        Processing: "bg-blue-500/10 text-blue-600 border-blue-500/20",
        Shipped: "bg-indigo-500/10 text-indigo-600 border-indigo-500/20",
        Delivered: "bg-green-500/10 text-green-600 border-green-500/20",
        Cancelled: "bg-red-500/10 text-red-600 border-red-500/20",
    };
    return <Badge className={statusStyles[status]}>{status}</Badge>;
};


export const OrderCard = ({ order, onFileComplaint }: OrderCardProps) => {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-base font-medium">
                    Order from: {order.supplierId.name}
                </CardTitle>
                <StatusBadge status={order.status} />
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
                        <p className="text-sm text-muted-foreground">
                            Quantity: {order.quantity} kg
                        </p>
                        <p className="text-sm text-muted-foreground">
                            Order Date: {formatDate(order.createdAt)}
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-lg font-bold">₹{order.totalPrice.toFixed(2)}</p>
                    </div>
                </div>
                <div className="border-t mt-4 pt-4 flex justify-end items-center space-x-2">
                    <Button variant="outline" size="sm">
                        <Truck className="w-4 h-4 mr-2" />
                        Track Order
                    </Button>
                    <Button variant="outline" size="sm">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Contact Supplier
                    </Button>
                    {order.status === 'Delivered' && (
                        <Button variant="default" size="sm">
                            <Star className="w-4 h-4 mr-2" />
                            Leave a Review
                        </Button>
                    )}
                    {/* NEW BUTTON */}
                    <Button 
                        variant="destructive" 
                        size="sm" 
                        onClick={() => onFileComplaint(order)}
                    >
                        <ShieldAlert className="w-4 h-4 mr-2" />
                        File Complaint
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};