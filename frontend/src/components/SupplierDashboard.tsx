// src/components/SupplierDashboard.tsx

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductInventoryTab } from "./supplier/ProductInventoryTab"; // <-- Import the new component
import {
  ArrowLeft,
  Plus,
  Package,
  TrendingUp,
  Star,
  BarChart3,
} from "lucide-react";
import { SupplierOrdersTab } from "./supplier/SupplierOrdersTab";

interface SupplierDashboardProps {
  onBack: () => void;
}

const SupplierDashboard = ({ onBack }: SupplierDashboardProps) => {
  // All product-related state and logic has been moved out!

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" onClick={onBack}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg"></div>
                <h1 className="text-xl font-bold text-foreground">Supplier Dashboard</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="bg-secondary/10 text-secondary border-secondary/20">
                Trust Score: 94%
              </Badge>
              {/* The "Add Product" button is now inside the ProductInventoryTab */}
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Stats Overview (Can also be refactored into its own component) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                  <p className="text-2xl font-bold text-primary">₹45,280</p>
                </div>
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          {/* ... other stat cards ... */}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="products" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="products">My Products</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="bids">Group Order Bids</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* This is now super clean! */}
          <TabsContent value="products">
            <ProductInventoryTab />
          </TabsContent>

          <TabsContent value="orders">
            <SupplierOrdersTab />
          </TabsContent>

          <TabsContent value="bids" className="text-center p-8">
            <p>Bids section coming soon.</p>
          </TabsContent>

          <TabsContent value="analytics" className="text-center p-8">
            <p>Analytics section coming soon.</p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SupplierDashboard;