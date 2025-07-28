import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductInventoryTab } from "./supplier/ProductInventoryTab";
import { SupplierOrdersTab } from "./supplier/SupplierOrdersTab";
import { ArrowLeft, TrendingUp, Package, Star, BarChart3, AlertCircle, MessageSquare, ChefHat } from "lucide-react";
import {
  getSupplierDashboardData,
  SupplierStats,
  SupplierAnalyticsData,
  SupplierKpis
} from "@/services/supplierServices";
import { Link } from "react-router-dom";
import AnalyticsTab from "./vendor/AnalyticsTab";

interface SupplierDashboardProps {
  onBack: () => void;
}

const SupplierDashboard = ({ onBack }: SupplierDashboardProps) => {
  const { t } = useTranslation();

  /// +++ CREATE STATE FOR EACH PIECE OF DATA +++
  const [stats, setStats] = useState<SupplierStats | null>(null);
  const [analytics, setAnalytics] = useState<SupplierAnalyticsData | null>(null);
  const [kpis, setKpis] = useState<SupplierKpis | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setIsLoading(true);
        // +++ CALL THE NEW UNIFIED SERVICE FUNCTION +++
        const data = await getSupplierDashboardData();

        // +++ SET ALL THE STATE AT ONCE +++
        setStats(data.stats);
        setAnalytics(data.analytics);
        setKpis(data.kpis);
        setError(null);

      } catch (err) {
        setError("Failed to load dashboard data. Please try again later.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllData();
  }, []);

  // Helper to format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(value);
  }

  // A component to render the stats cards, handling loading and error states
  const StatsOverview = () => {
    if (isLoading) {
      return <p className="text-center col-span-1 md:col-span-4">{t("supplier_dashboard.loading_stats")}</p>;
    }

    if (error || !stats) {
      return (
        <Card className="col-span-1 md:col-span-4 bg-destructive/10">
          <CardContent className="p-6 flex items-center justify-center text-destructive">
            <AlertCircle className="w-6 h-6 mr-4" />
            <p>{error || "An unexpected error occurred."}</p>
          </CardContent>
        </Card>
      );
    }

    return (
      <>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{t("supplier_dashboard.stats.totalRevenue")}</p>
                <p className="text-2xl font-bold text-primary">{formatCurrency(stats.totalRevenue)}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{t("supplier_dashboard.stats.activeOrders")}</p>
                <p className="text-2xl font-bold">{stats.activeOrders}</p>
              </div>
              <Package className="w-8 h-8 text-secondary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{t("supplier_dashboard.stats.productsListed")}</p>
                <p className="text-2xl font-bold">{stats.productsListed}</p>
              </div>
              <BarChart3 className="w-8 h-8 text-trust" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{t("supplier_dashboard.stats.avgRating")}</p>
                {/* Display N/A if rating is 0, assuming 0 means no ratings yet */}
                <p className="text-2xl font-bold">{stats.averageRating > 0 ? stats.averageRating.toFixed(1) : 'N/A'}</p>
              </div>
              <Star className="w-8 h-8 text-primary fill-primary" />
            </div>
          </CardContent>
        </Card>
      </>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
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
                <h1 className="text-xl font-bold text-foreground">{t("supplier_dashboard.title")}</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="bg-secondary/10 text-secondary border-secondary/20">
                {t("supplier_dashboard.trustScore")}: {stats ? `${stats.trustScore}%` : '...'}
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatsOverview />
        </div>

        {/* Main Content */}
        <Tabs defaultValue="products" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="products">{t("supplier_dashboard.tabs.products")}</TabsTrigger>
            <TabsTrigger value="orders">{t("supplier_dashboard.tabs.orders")}</TabsTrigger>
            <TabsTrigger value="bids">{t("supplier_dashboard.tabs.bids")}</TabsTrigger>
            <TabsTrigger value="analytics">{t("supplier_dashboard.tabs.analytics")}</TabsTrigger>
          </TabsList>
          <TabsContent value="products"><ProductInventoryTab /></TabsContent>
          <TabsContent value="orders"><SupplierOrdersTab /></TabsContent>
          <TabsContent value="bids" className="text-center p-8"><p>{t("supplier_dashboard.tabs.bidsComing")}</p></TabsContent>
          <TabsContent value="analytics">
            {!isLoading && analytics && kpis ? (
              <AnalyticsTab analytics={analytics} kpis={kpis} />
            ) : (
              // Show a loading or error message specific to this tab
              <div className="text-center p-16">
                {isLoading ? t("supplier_dashboard.loading_analytics") : "Analytics data could not be loaded."}
              </div>
            )}
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