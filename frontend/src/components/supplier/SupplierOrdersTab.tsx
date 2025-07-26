// src/components/supplier/SupplierOrdersTab.tsx

import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Package } from "lucide-react";
import { getSupplierOrders } from '@/services/orderService';
import { Order } from '@/components/vendor/OrderCard';
import { SupplierOrder, SupplierOrderCard } from './SupplierOrderCard'; 

export const SupplierOrdersTab = () => {
    const [orders, setOrders] = useState<SupplierOrder[]>([]); 
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setIsLoading(true);
                const data = await getSupplierOrders();
                setOrders(data.orders || []);
            } catch (err: any) {
                setError(err.message || 'An error occurred while fetching your orders.');
            } finally {
                setIsLoading(false);
            }
        };
        fetchOrders();
    }, []);

    const handleStatusChange = (updatedOrder: SupplierOrder) => {
        setOrders(prevOrders =>
            prevOrders.map(o => o._id === updatedOrder._id ? updatedOrder : o)
        );
    };

    if (isLoading) return <p>Loading incoming orders...</p>;
    if (error) return <p className="text-destructive">{error}</p>;

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold">Incoming Orders</h2>
            {orders.length > 0 ? (
                <div className="grid gap-4">
                    {orders.map((order) => (
                        <SupplierOrderCard key={order._id} order={order} onStatusChange={handleStatusChange} />
                    ))}
                </div>
            ) : (
                <Card>
                    <CardContent className="p-6 text-center">
                        <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-medium mb-2">No Incoming Orders</h3>
                        <p className="text-muted-foreground">New orders from vendors will appear here.</p>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};