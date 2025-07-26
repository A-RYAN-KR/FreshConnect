import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Search, 
  Star, 
  ShoppingCart, 
  Users, 
  TrendingDown, 
  Package, 
  Clock, 
  Filter,
  ArrowLeft,
  Heart,
  BarChart3
} from "lucide-react";

interface VendorDashboardProps {
  onBack: () => void;
}

const VendorDashboard = ({ onBack }: VendorDashboardProps) => {
  const mockSuppliers = [
    {
      id: 1,
      name: "Fresh Valley Supplies",
      rating: 4.8,
      reviews: 156,
      location: "2.3 km away",
      trustScore: 95,
      products: ["Vegetables", "Spices", "Oils"],
      price: "₹45/kg",
      originalPrice: "₹52/kg",
      savings: "13% off",
      deliveryTime: "2-4 hours",
      minOrder: "₹500"
    },
    {
      id: 2,
      name: "Spice Garden Ltd",
      rating: 4.6,
      reviews: 203,
      location: "1.8 km away",
      trustScore: 92,
      products: ["Spices", "Masalas", "Dry Fruits"],
      price: "₹38/kg",
      originalPrice: "₹42/kg",
      savings: "10% off",
      deliveryTime: "1-3 hours",
      minOrder: "₹300"
    },
    {
      id: 3,
      name: "Urban Fresh Market",
      rating: 4.9,
      reviews: 89,
      location: "3.1 km away",
      trustScore: 98,
      products: ["Vegetables", "Fruits", "Dairy"],
      price: "₹42/kg",
      originalPrice: "₹48/kg",
      savings: "12% off",
      deliveryTime: "3-5 hours",
      minOrder: "₹400"
    }
  ];

  const groupOrders = [
    {
      id: 1,
      product: "Premium Basmati Rice",
      organizer: "Ravi's Food Cart",
      currentMembers: 8,
      maxMembers: 12,
      pricePerKg: "₹65",
      normalPrice: "₹80",
      savings: "₹15/kg",
      deadline: "2 hours left",
      progress: 67
    },
    {
      id: 2,
      product: "Fresh Tomatoes",
      organizer: "Street Food Junction",
      currentMembers: 15,
      maxMembers: 20,
      pricePerKg: "₹25",
      normalPrice: "₹32",
      savings: "₹7/kg",
      deadline: "45 minutes left",
      progress: 75
    }
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
                <h1 className="text-xl font-bold text-foreground">Vendor Dashboard</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                Trust Score: 87%
              </Badge>
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
                <CardTitle className="text-lg">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Orders This Month</span>
                  <span className="font-semibold">23</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total Savings</span>
                  <span className="font-semibold text-secondary">₹4,250</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Favorite Suppliers</span>
                  <span className="font-semibold">5</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Filters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Distance</label>
                  <select className="w-full mt-1 p-2 border rounded-md">
                    <option>Within 5 km</option>
                    <option>Within 10 km</option>
                    <option>Within 15 km</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium">Trust Score</label>
                  <select className="w-full mt-1 p-2 border rounded-md">
                    <option>90% and above</option>
                    <option>80% and above</option>
                    <option>70% and above</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium">Delivery Time</label>
                  <select className="w-full mt-1 p-2 border rounded-md">
                    <option>Same day</option>
                    <option>Next day</option>
                    <option>Within 3 days</option>
                  </select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
              {/* Search Bar */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex space-x-4">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input 
                        placeholder="Search for vegetables, spices, oils..." 
                        className="pl-10"
                      />
                    </div>
                    <Button variant="outline">
                      <Filter className="w-4 h-4 mr-2" />
                      Filter
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Tabs */}
              <Tabs defaultValue="suppliers" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="suppliers">Browse Suppliers</TabsTrigger>
                  <TabsTrigger value="groups">Group Orders</TabsTrigger>
                  <TabsTrigger value="orders">My Orders</TabsTrigger>
                </TabsList>

                <TabsContent value="suppliers" className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Available Suppliers</h2>
                    <Button variant="outline" size="sm">
                      <BarChart3 className="w-4 h-4 mr-2" />
                      Compare Selected
                    </Button>
                  </div>
                  
                  <div className="grid gap-4">
                    {mockSuppliers.map((supplier) => (
                      <Card key={supplier.id} className="hover:shadow-[var(--shadow-soft)] transition-all duration-300">
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                <h3 className="text-lg font-semibold">{supplier.name}</h3>
                                <Badge className="bg-trust/10 text-trust border-trust/20">
                                  Trust: {supplier.trustScore}%
                                </Badge>
                              </div>
                              
                              <div className="flex items-center space-x-4 mb-3">
                                <div className="flex items-center space-x-1">
                                  <Star className="w-4 h-4 fill-primary text-primary" />
                                  <span className="font-medium">{supplier.rating}</span>
                                  <span className="text-muted-foreground">({supplier.reviews})</span>
                                </div>
                                <span className="text-muted-foreground">{supplier.location}</span>
                              </div>

                              <div className="flex flex-wrap gap-2 mb-3">
                                {supplier.products.map((product) => (
                                  <Badge key={product} variant="outline">{product}</Badge>
                                ))}
                              </div>

                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                <div>
                                  <span className="text-muted-foreground">Price:</span>
                                  <div className="font-semibold text-primary">{supplier.price}</div>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">Delivery:</span>
                                  <div className="font-medium">{supplier.deliveryTime}</div>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">Min Order:</span>
                                  <div className="font-medium">{supplier.minOrder}</div>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">Savings:</span>
                                  <div className="font-semibold text-secondary">{supplier.savings}</div>
                                </div>
                              </div>
                            </div>

                            <div className="flex flex-col space-y-2 ml-4">
                              <Button variant="vendor" size="sm">
                                Order Now
                              </Button>
                              <Button variant="outline" size="sm">
                                <Heart className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="groups" className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Active Group Orders</h2>
                    <Button variant="vendor">
                      <Users className="w-4 h-4 mr-2" />
                      Create Group Order
                    </Button>
                  </div>

                  <div className="grid gap-4">
                    {groupOrders.map((order) => (
                      <Card key={order.id} className="hover:shadow-[var(--shadow-soft)] transition-all duration-300">
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="text-lg font-semibold mb-1">{order.product}</h3>
                              <p className="text-muted-foreground">Organized by {order.organizer}</p>
                            </div>
                            <Badge className="bg-secondary/10 text-secondary border-secondary/20">
                              <Clock className="w-3 h-3 mr-1" />
                              {order.deadline}
                            </Badge>
                          </div>

                          <div className="space-y-4">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-muted-foreground">Progress</span>
                              <span className="text-sm font-medium">{order.currentMembers}/{order.maxMembers} members</span>
                            </div>
                            <Progress value={order.progress} className="h-2" />

                            <div className="grid grid-cols-3 gap-4 text-sm">
                              <div>
                                <span className="text-muted-foreground">Group Price:</span>
                                <div className="font-semibold text-primary">{order.pricePerKg}</div>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Normal Price:</span>
                                <div className="line-through text-muted-foreground">{order.normalPrice}</div>
                              </div>
                              <div>
                                <span className="text-muted-foreground">You Save:</span>
                                <div className="font-semibold text-secondary">{order.savings}</div>
                              </div>
                            </div>

                            <Button variant="vendor" className="w-full">
                              <Users className="w-4 h-4 mr-2" />
                              Join Group Order
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="orders" className="space-y-4">
                  <h2 className="text-xl font-semibold">My Recent Orders</h2>
                  
                  <Card>
                    <CardContent className="p-6 text-center">
                      <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">No Recent Orders</h3>
                      <p className="text-muted-foreground mb-4">Start ordering from verified suppliers to see your order history here.</p>
                      <Button variant="vendor">Browse Suppliers</Button>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;