// src/components/vendor/MyOrdersTab.tsx

import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Package } from "lucide-react";
import { getMyOrders } from '@/services/orderService';
import { Order, OrderCard } from './OrderCard';

export const MyOrdersTab = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
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

        fetchOrders();
    }, []); // Runs once on component mount

    if (isLoading) {
        return <p>Loading your orders...</p>;
    }

    if (error) {
        return <p className="text-destructive">{error}</p>;
    }

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold">My Recent Orders</h2>
            {orders.length > 0 ? (
                <div className="grid gap-4">
                    {orders.map((order) => (
                        <OrderCard key={order._id} order={order} />
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