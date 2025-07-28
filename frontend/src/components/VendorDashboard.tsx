// src/components/VendorDashboard.tsx

import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  ShoppingCart,
  Filter,
  ArrowLeft,
  BarChart3,
  ChefHat,
} from "lucide-react";

import { getAllSuppliers } from "@/services/supplierService";
import { Supplier, SupplierCard } from "./vendor/SupplierCard";
import { OrderDialog } from "./vendor/OrderDialog";
import { getAllProducts } from "@/services/productService"; // Import product service
import { ProductCard } from "./vendor/ProductCard"; // Import ProductCard component
import { MyOrdersTab } from './vendor/MyOrdersTab';
import { ChatWindow } from './chat/ChatWindow';
import { Link } from "react-router-dom";

// --- Interfaces ---
interface SupplierInfo {
  _id: string;
  firstName: string;
  lastName: string;
  trustScore?: number;
  avatar?: string;
}

interface Product {
  _id: string;
  name: string;
  description: string;
  price?: number;
  images: string[];
  supplierId?: SupplierInfo;
}

interface VendorDashboardProps {
  onBack: () => void;
}

const VendorDashboard = ({ onBack }: VendorDashboardProps) => {
  const { t } = useTranslation();

  // --- Supplier State ---
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // --- Order Dialog State ---
  const [isOrderDialogOpen, setIsOrderDialogOpen] = useState(false);
  const [supplierToOrderFrom, setSupplierToOrderFrom] =
    useState<Supplier | null>(null);

  // --- Product State ---
  const [products, setProducts] = useState<Product[]>([]);
  const [productLoading, setProductLoading] = useState(true);
  const [productError, setProductError] = useState<string | null>(null);

  // --- Chat State ---
  const [activeChat, setActiveChat] = useState<{ id: string; name: string } | null>(null);

  // --- Data Fetching ---
  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        setIsLoading(true);
        const data = await getAllSuppliers();
        setSuppliers(data.suppliers || []);
      } catch (err) {
        setError(t("vendor_dashboard.errorFetching"));
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSuppliers();
  }, [t]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setProductLoading(true);
        const data = await getAllProducts(); // Assuming getAllProducts returns { success: true, products: [...] }
        setProducts(data.products || []);
      } catch (err) {
        setProductError("Failed to fetch products. Please try again later.");
        console.error(err);
      } finally {
        setProductLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // --- Event Handlers ---
  const handleOrderNowClick = (supplier: Supplier) => {
    setSupplierToOrderFrom(supplier);
    setIsOrderDialogOpen(true);
  };

  const handleOrderPlaced = (order: unknown) => {
    // Logic after an order is placed, like showing a toast.
    console.log("Order placed successfully!", order);
  };

  const handleStartChat = (supplier: Supplier) => {
    setActiveChat({ id: supplier._id, name: supplier.name });
  };

  const handleCloseChat = () => {
    setActiveChat(null);
  };

  return (
    <>
      <OrderDialog
        supplier={supplierToOrderFrom}
        isOpen={isOrderDialogOpen}
        onOpenChange={setIsOrderDialogOpen}
        onOrderPlaced={handleOrderPlaced}
      />

      {/* Conditionally render the floating ChatWindow */}
      {activeChat && (
        <ChatWindow
          recipientId={activeChat.id}
          recipientName={activeChat.name}
          onClose={handleCloseChat}
        />
      )}

      <div className="min-h-screen bg-background">
        <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="icon" asChild>
                  <Link to="/">
                    <ArrowLeft className="w-5 h-5" />
                  </Link>
                </Button>
                <div className="flex items-center space-x-2">
                  <div className="bg-gradient-to-br from-amber-500 to-orange-500 p-2.5 rounded-xl shadow-md">
                    <ChefHat className="h-6 w-6 text-white" />
                  </div>
                  <h1 className="text-xl font-bold text-foreground">
                    {t("vendor_dashboard.title")}
                  </h1>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="outline" size="icon">
                  <ShoppingCart className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-6">
          <div className="grid lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    {t("vendor_dashboard.quickStats.title")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      {t("vendor_dashboard.quickStats.orders")}
                    </span>
                    <span className="font-semibold">23</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      {t("vendor_dashboard.quickStats.savings")}
                    </span>
                    <span className="font-semibold text-secondary">₹4,250</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      {t("vendor_dashboard.quickStats.favorites")}
                    </span>
                    <span className="font-semibold">5</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    {t("vendor_dashboard.filters")}
                  </CardTitle>
                </CardHeader>
                <CardContent>{/* Filter content can go here */}</CardContent>
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
                        <Input
                          placeholder={t("vendor_dashboard.searchPlaceholder")}
                          className="pl-10"
                        />
                      </div>
                      <Button variant="outline">
                        <Filter className="w-4 h-4 mr-2" />
                        {t("vendor_dashboard.filter")}
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Tabs defaultValue="suppliers" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="suppliers">Browse Suppliers</TabsTrigger>
                    <TabsTrigger value="products">Browse Products</TabsTrigger>
                    <TabsTrigger value="orders">My Orders</TabsTrigger>
                  </TabsList>

                  <TabsContent value="suppliers" className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h2 className="text-xl font-semibold">
                        {t("vendor_dashboard.availableSuppliers")}
                      </h2>
                      <Button variant="outline" size="sm">
                        <BarChart3 className="w-4 h-4 mr-2" />
                        {t("vendor_dashboard.compare")}
                      </Button>
                    </div>
                    {isLoading && <p>{t("vendor_dashboard.loading")}</p>}
                    {error && <p className="text-destructive">{error}</p>}
                    {!isLoading && !error && (
                      <div className="grid gap-4">
                        {suppliers.length > 0 ? (
                          suppliers.map((supplier) => (
                            <SupplierCard
                              key={supplier._id}
                              supplier={supplier}
                              onOrderNow={handleOrderNowClick}
                              onChatClick={() => handleStartChat(supplier)}
                            />
                          ))
                        ) : (
                          <Card>
                            <CardContent className="p-6 text-center text-muted-foreground">
                              {t("vendor_dashboard.noSuppliers")}
                            </CardContent>
                          </Card>
                        )}
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="products" className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h2 className="text-xl font-semibold">Available Products</h2>
                    </div>
                    {productLoading && <p>Loading products...</p>}
                    {productError && <p className="text-destructive">{productError}</p>}
                    {!productLoading && !productError && (
                      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
                        {products.length > 0 ? (
                          products.map((product) => (
                            <ProductCard key={product._id} product={product} />
                          ))
                        ) : (
                          <Card>
                            <CardContent className="p-6 text-center text-muted-foreground">
                              No products found.
                            </CardContent>
                          </Card>
                        )}
                      </div>
                    )}
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