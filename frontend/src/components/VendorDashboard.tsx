// src/components/VendorDashboard.tsx

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Search,
  ShoppingCart,
  Users,
  Package,
  Clock,
  Filter,
  ArrowLeft,
  BarChart3
} from "lucide-react";

// Import modular components and services
import { getAllSuppliers } from "@/services/supplierService";
import { Supplier, SupplierCard } from "./vendor/SupplierCard";
import { OrderDialog } from "./vendor/OrderDialog";
import { MyOrdersTab } from './vendor/MyOrdersTab';

interface VendorDashboardProps {
  onBack: () => void;
}

// Mock data for other tabs that aren't implemented yet
const groupOrders = [
  { id: 1, product: "Premium Basmati Rice", organizer: "Ravi's Food Cart", currentMembers: 8, maxMembers: 12, pricePerKg: "₹65", normalPrice: "₹80", savings: "₹15/kg", deadline: "2 hours left", progress: 67 },
  { id: 2, product: "Fresh Tomatoes", organizer: "Street Food Junction", currentMembers: 15, maxMembers: 20, pricePerKg: "₹25", normalPrice: "₹32", savings: "₹7/kg", deadline: "45 minutes left", progress: 75 }
];

const VendorDashboard = ({ onBack }: VendorDashboardProps) => {
  // --- State Management ---
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // State for the order dialog now holds the entire supplier object
  const [isOrderDialogOpen, setIsOrderDialogOpen] = useState(false);
  const [supplierToOrderFrom, setSupplierToOrderFrom] = useState<Supplier | null>(null);

  // --- Data Fetching ---
  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        setIsLoading(true);
        const data = await getAllSuppliers();
        // Assuming the API response is { success: true, suppliers: [...] }
        setSuppliers(data.suppliers || []);
      } catch (err) {
        setError("Failed to fetch suppliers. Please try again later.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSuppliers();
  }, []); // Empty dependency array ensures this runs only once on mount

  // --- Event Handlers ---
  const handleOrderNowClick = (supplier: Supplier) => {
    setSupplierToOrderFrom(supplier);
    setIsOrderDialogOpen(true);
  };

  const handleOrderPlaced = (order: any) => {
    console.log("Order placed successfully!", order);
    // Here you can add a success toast notification (e.g., using Sonner)
    // and/or refetch the data for the "My Orders" tab.
  };

  return (
    <>
      {/* The Order Dialog is now passed the full supplier object */}
      <OrderDialog
        supplier={supplierToOrderFrom}
        isOpen={isOrderDialogOpen}
        onOpenChange={setIsOrderDialogOpen}
        onOrderPlaced={handleOrderPlaced}
      />

      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="icon" onClick={onBack}><ArrowLeft className="w-5 h-5" /></Button>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg"></div>
                  <h1 className="text-xl font-bold text-foreground">Vendor Dashboard</h1>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">Trust Score: 87%</Badge>
                <Button variant="outline" size="icon"><ShoppingCart className="w-5 h-5" /></Button>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-6">
          <div className="grid lg:grid-cols-4 gap-6">
            {/* Sidebar (can be extracted to its own component) */}
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader><CardTitle className="text-lg">Quick Stats</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center"><span className="text-sm text-muted-foreground">Orders This Month</span><span className="font-semibold">23</span></div>
                  <div className="flex justify-between items-center"><span className="text-sm text-muted-foreground">Total Savings</span><span className="font-semibold text-secondary">₹4,250</span></div>
                  <div className="flex justify-between items-center"><span className="text-sm text-muted-foreground">Favorite Suppliers</span><span className="font-semibold">5</span></div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle className="text-lg">Filters</CardTitle></CardHeader>
                <CardContent>
                  {/* Filter UI can be implemented here */}
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="space-y-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex space-x-4">
                      <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <Input placeholder="Search for suppliers, products..." className="pl-10" />
                      </div>
                      <Button variant="outline"><Filter className="w-4 h-4 mr-2" />Filter</Button>
                    </div>
                  </CardContent>
                </Card>

                <Tabs defaultValue="suppliers" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="suppliers">Browse Suppliers</TabsTrigger>
                    <TabsTrigger value="groups">Group Orders</TabsTrigger>
                    <TabsTrigger value="orders">My Orders</TabsTrigger>
                  </TabsList>

                  <TabsContent value="suppliers" className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h2 className="text-xl font-semibold">Available Suppliers</h2>
                      <Button variant="outline" size="sm"><BarChart3 className="w-4 h-4 mr-2" />Compare Selected</Button>
                    </div>
                    {isLoading && <p>Loading suppliers...</p>}
                    {error && <p className="text-destructive">{error}</p>}
                    {!isLoading && !error && (
                      <div className="grid gap-4">
                        {suppliers.length > 0 ? (
                          suppliers.map((supplier) => (
                            <SupplierCard
                              key={supplier._id}
                              supplier={supplier}
                              onOrderNow={handleOrderNowClick}
                            />
                          ))
                        ) : (
                          <Card><CardContent className="p-6 text-center text-muted-foreground">No suppliers found.</CardContent></Card>
                        )}
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="groups" className="space-y-4">
                    {/* UI for Group Orders tab */}
                  </TabsContent>

                  <TabsContent value="orders" className="space-y-4">
                    <MyOrdersTab />
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VendorDashboard;