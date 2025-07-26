import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  Plus,
  Package,
  TrendingUp,
  Star,
  Truck,
  Users,
  BarChart3,
  Clock,
  Edit,
  Eye,
  AlertTriangle,
} from "lucide-react";

interface SupplierDashboardProps {
  onBack: () => void;
}

const SupplierDashboard = ({ onBack }: SupplierDashboardProps) => {
  const myProducts = [
    {
      id: 1,
      name: "Fresh Tomatoes",
      category: "Vegetables",
      price: "₹32/kg",
      stock: "500 kg",
      status: "In Stock",
      orders: 23,
      rating: 4.8,
      lastUpdated: "2 hours ago",
    },
    {
      id: 2,
      name: "Basmati Rice Premium",
      category: "Grains",
      price: "₹80/kg",
      stock: "200 kg",
      status: "Low Stock",
      orders: 15,
      rating: 4.9,
      lastUpdated: "1 day ago",
    },
    {
      id: 3,
      name: "Refined Sunflower Oil",
      category: "Oils",
      price: "₹140/L",
      stock: "0 L",
      status: "Out of Stock",
      orders: 8,
      rating: 4.6,
      lastUpdated: "3 days ago",
    },
  ];

  const activeOrders = [
    {
      id: 1,
      vendor: "Ravi's Food Cart",
      items: "Fresh Tomatoes (50kg), Onions (25kg)",
      amount: "₹2,400",
      status: "Preparing",
      deliveryTime: "2-4 PM Today",
      trustScore: 87,
    },
    {
      id: 2,
      vendor: "Street Food Junction",
      items: "Basmati Rice (100kg)",
      amount: "₹8,000",
      status: "Ready for Pickup",
      deliveryTime: "10 AM - 12 PM",
      trustScore: 92,
    },
  ];

  const groupOrderBids = [
    {
      id: 1,
      product: "Premium Basmati Rice",
      quantity: "500kg",
      currentBestBid: "₹65/kg",
      myBid: "₹63/kg",
      status: "Leading",
      timeLeft: "2 hours",
      vendors: 12,
    },
    {
      id: 2,
      product: "Fresh Onions",
      quantity: "300kg",
      currentBestBid: "₹28/kg",
      myBid: "₹30/kg",
      status: "Behind",
      timeLeft: "45 minutes",
      vendors: 8,
    },
  ];

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
                  Supplier Dashboard
                </h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge
                variant="outline"
                className="bg-secondary/10 text-secondary border-secondary/20"
              >
                Trust Score: 94%
              </Badge>
              <Button variant="supplier">
                <Plus className="w-4 h-4 mr-2" />
                Add Product
              </Button>
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
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                  <p className="text-2xl font-bold text-primary">₹45,280</p>
                  <p className="text-xs text-secondary">+12% from last month</p>
                </div>
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Orders</p>
                  <p className="text-2xl font-bold">23</p>
                  <p className="text-xs text-secondary">2 pending delivery</p>
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
                    Products Listed
                  </p>
                  <p className="text-2xl font-bold">12</p>
                  <p className="text-xs text-destructive">3 out of stock</p>
                </div>
                <BarChart3 className="w-8 h-8 text-trust" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Rating</p>
                  <p className="text-2xl font-bold">4.8</p>
                  <p className="text-xs text-secondary">Based on 156 reviews</p>
                </div>
                <Star className="w-8 h-8 text-primary fill-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="products" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="products">My Products</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="bids">Group Order Bids</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Product Inventory</h2>
              <div className="flex space-x-2">
                <Button variant="outline">
                  <Eye className="w-4 h-4 mr-2" />
                  Preview Store
                </Button>
                <Button variant="supplier">
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Product
                </Button>
              </div>
            </div>

            <div className="grid gap-4">
              {myProducts.map((product) => (
                <Card
                  key={product.id}
                  className="hover:shadow-[var(--shadow-soft)] transition-all duration-300"
                >
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold">
                            {product.name}
                          </h3>
                          <Badge variant="outline">{product.category}</Badge>
                          <Badge
                            className={
                              product.status === "In Stock"
                                ? "bg-secondary/10 text-secondary border-secondary/20"
                                : product.status === "Low Stock"
                                ? "bg-primary/10 text-primary border-primary/20"
                                : "bg-destructive/10 text-destructive border-destructive/20"
                            }
                          >
                            {product.status}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">
                              Price:
                            </span>
                            <div className="font-semibold text-primary">
                              {product.price}
                            </div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">
                              Stock:
                            </span>
                            <div className="font-medium">{product.stock}</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">
                              Orders:
                            </span>
                            <div className="font-medium">{product.orders}</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">
                              Rating:
                            </span>
                            <div className="flex items-center space-x-1">
                              <Star className="w-3 h-3 fill-primary text-primary" />
                              <span className="font-medium">
                                {product.rating}
                              </span>
                            </div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">
                              Updated:
                            </span>
                            <div className="font-medium">
                              {product.lastUpdated}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex space-x-2 ml-4">
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        {product.status === "Out of Stock" && (
                          <Button variant="supplier" size="sm">
                            <Package className="w-4 h-4 mr-1" />
                            Restock
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Active Orders</h2>
              <Badge className="bg-secondary/10 text-secondary border-secondary/20">
                {activeOrders.length} active orders
              </Badge>
            </div>

            <div className="grid gap-4">
              {activeOrders.map((order) => (
                <Card
                  key={order.id}
                  className="hover:shadow-[var(--shadow-soft)] transition-all duration-300"
                >
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold">
                            {order.vendor}
                          </h3>
                          <Badge className="bg-trust/10 text-trust border-trust/20">
                            Trust: {order.trustScore}%
                          </Badge>
                          <Badge
                            className={
                              order.status === "Preparing"
                                ? "bg-primary/10 text-primary border-primary/20"
                                : "bg-secondary/10 text-secondary border-secondary/20"
                            }
                          >
                            {order.status}
                          </Badge>
                        </div>

                        <p className="text-muted-foreground mb-3">
                          {order.items}
                        </p>

                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">
                              Amount:
                            </span>
                            <div className="font-semibold text-primary">
                              {order.amount}
                            </div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">
                              Delivery:
                            </span>
                            <div className="font-medium">
                              {order.deliveryTime}
                            </div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">
                              Status:
                            </span>
                            <div className="font-medium">{order.status}</div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col space-y-2 ml-4">
                        <Button variant="supplier" size="sm">
                          <Truck className="w-4 h-4 mr-1" />
                          Update Status
                        </Button>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="bids" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Group Order Bidding</h2>
              <Badge className="bg-primary/10 text-primary border-primary/20">
                {groupOrderBids.length} active bids
              </Badge>
            </div>

            <div className="grid gap-4">
              {groupOrderBids.map((bid) => (
                <Card
                  key={bid.id}
                  className="hover:shadow-[var(--shadow-soft)] transition-all duration-300"
                >
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold mb-1">
                          {bid.product}
                        </h3>
                        <p className="text-muted-foreground">
                          Quantity: {bid.quantity} • {bid.vendors} vendors
                          participating
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge
                          className={
                            bid.status === "Leading"
                              ? "bg-secondary/10 text-secondary border-secondary/20"
                              : "bg-destructive/10 text-destructive border-destructive/20"
                          }
                        >
                          {bid.status}
                        </Badge>
                        <Badge className="bg-primary/10 text-primary border-primary/20">
                          <Clock className="w-3 h-3 mr-1" />
                          {bid.timeLeft}
                        </Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-sm mb-4">
                      <div>
                        <span className="text-muted-foreground">Best Bid:</span>
                        <div className="font-semibold text-primary">
                          {bid.currentBestBid}
                        </div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">My Bid:</span>
                        <div className="font-semibold">{bid.myBid}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Status:</span>
                        <div
                          className={`font-medium ${
                            bid.status === "Leading"
                              ? "text-secondary"
                              : "text-destructive"
                          }`}
                        >
                          {bid.status}
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Input
                        placeholder="Enter new bid amount"
                        className="flex-1"
                      />
                      <Button variant="supplier">Update Bid</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <h2 className="text-2xl font-semibold">Analytics Dashboard</h2>

            <Card>
              <CardContent className="p-6 text-center">
                <BarChart3 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-medium mb-2">
                  Analytics Coming Soon
                </h3>
                <p className="text-muted-foreground mb-6">
                  Track your performance, revenue trends, and customer insights
                  with our comprehensive analytics dashboard.
                </p>
                <Button variant="supplier">Get Notified When Ready</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SupplierDashboard;
