import { Card, CardContent } from "@/components/ui/card";
import { Package } from "lucide-react";
import { OrderCard, Order } from "./OrderCard";

// MODIFIED: Add the new callback to the props interface
interface MyOrdersTabProps {
  onFileComplaint: (order: Order) => void;
}

export const MyOrdersTab = ({ onFileComplaint }: MyOrdersTabProps) => {
  // hardcoded mock orders
  const orders: Order[] = [
    {
      _id: "mock1",
      supplierId: { _id: "s1", name: "Ravi's Food Supplies" },
      productId: {
        _id: "p1",
        name: "Basmati Rice",
        images: ["https://via.placeholder.com/100"]
      },
      quantity: 25,
      totalPrice: 1625,
      status: "Delivered",
      createdAt: new Date().toISOString(),
    },
    {
      _id: "mock2",
      supplierId: { _id: "s2", name: "Fresh Tomato Hub" },
      productId: {
        _id: "p2",
        name: "Tomatoes",
        images: []
      },
      quantity: 40,
      totalPrice: 1000,
      status: "Processing",
      createdAt: new Date().toISOString(),
    }
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">My Recent Orders</h2>
      {orders.length > 0 ? (
        <div className="grid gap-4">
          {orders.map((order) => (
            <OrderCard 
              key={order._id} 
              order={order} 
              onFileComplaint={onFileComplaint} // Pass the handler down
            />
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-6 text-center">
            <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No Recent Orders</h3>
            <p className="text-muted-foreground">
              Your order history will appear here once you start ordering from suppliers.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};