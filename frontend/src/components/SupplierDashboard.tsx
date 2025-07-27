// src/components/SupplierDashboard.tsx

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductInventoryTab } from "./supplier/ProductInventoryTab";
<<<<<<< Updated upstream
import { ArrowLeft, TrendingUp, Package, Star, BarChart3 } from "lucide-react";
import { SupplierOrdersTab } from "./supplier/SupplierOrdersTab";
import { useTranslation } from "react-i18next";
=======
import {
  ArrowLeft,
  Plus,
  Package,
  TrendingUp,
  Star,
  BarChart3,
  MessageSquare
} from "lucide-react";
import { SupplierOrdersTab } from "./supplier/SupplierOrdersTab";
import { Link } from "react-router-dom";
>>>>>>> Stashed changes

interface SupplierDashboardProps {
  onBack: () => void;
}

const SupplierDashboard = ({ onBack }: SupplierDashboardProps) => {
  const { t } = useTranslation();

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
                <h1 className="text-xl font-bold text-foreground">
                  {t("supplier_dashboard.title")}
                </h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge
                variant="outline"
                className="bg-secondary/10 text-secondary border-secondary/20"
              >
                {t("supplier_dashboard.trustScore")}: 94%
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    {t("supplier_dashboard.stats.totalRevenue")}
                  </p>
                  <p className="text-2xl font-bold text-primary">₹45,280</p>
                </div>
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    {t("supplier_dashboard.stats.activeOrders")}
                  </p>
                  <p className="text-2xl font-bold">23</p>
                </div>
                <Package className="w-8 h-8 text-secondary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    {t("supplier_dashboard.stats.productsListed")}
                  </p>
                  <p className="text-2xl font-bold">12</p>
                </div>
                <BarChart3 className="w-8 h-8 text-trust" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    {t("supplier_dashboard.stats.avgRating")}
                  </p>
                  <p className="text-2xl font-bold">4.8</p>
                </div>
                <Star className="w-8 h-8 text-primary fill-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="products" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="products">
              {t("supplier_dashboard.tabs.products")}
            </TabsTrigger>
            <TabsTrigger value="orders">
              {t("supplier_dashboard.tabs.orders")}
            </TabsTrigger>
            <TabsTrigger value="bids">
              {t("supplier_dashboard.tabs.bids")}
            </TabsTrigger>
            <TabsTrigger value="analytics">
              {t("supplier_dashboard.tabs.analytics")}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="products">
            <ProductInventoryTab />
          </TabsContent>

          <TabsContent value="orders">
            <SupplierOrdersTab />
          </TabsContent>

          <TabsContent value="bids" className="text-center p-8">
            <p>{t("supplier_dashboard.tabs.bidsComing")}</p>
          </TabsContent>

          <TabsContent value="analytics" className="text-center p-8">
            <p>{t("supplier_dashboard.tabs.analyticsComing")}</p>
          </TabsContent>
        </Tabs>
      </div>
      {/* UPDATE: Add Floating Chat Icon */}
      <Link to="/supplier/chat">
        <Button size="icon" className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50">
          <MessageSquare className="h-7 w-7" />
        </Button>
      </Link>
    </div>
  );
};

export default SupplierDashboard;
