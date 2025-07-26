import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Shield, Users, TrendingUp, CheckCircle, PhoneCall } from "lucide-react";
import heroImage from "@/assets/hero-marketplace.jpg";
import vendorIcon from "@/assets/vendor-icon.jpg";
import supplierIcon from "@/assets/supplier-icon.jpg";
import { Link, useNavigate, useLocation } from "react-router-dom";

interface LandingPageProps {
  onUserTypeSelect: (userType: 'vendor' | 'supplier') => void;
}

const LandingPage = ({ onUserTypeSelect }: LandingPageProps) => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg"></div>
            <h1 className="text-xl font-bold text-foreground">FreshConnect</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost">About</Button>
            <Button variant="ghost">Contact</Button>
            <Link to="/auth/login">
              <Button variant="outline">Login</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10"></div>
        <div className="container mx-auto px-4 py-20 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="w-fit bg-primary/10 text-primary border-primary/20">
                  🚀 Connecting Street Food Vendors
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                  Fresh Ingredients,
                  <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    {" "}Fair Prices
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Connect with verified suppliers, compare prices, join group orders for bulk discounts,
                  and track deliveries—all in one trusted platform.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  variant="hero"
                  size="hero"
                  onClick={() => onUserTypeSelect('vendor')}
                  className="flex-1"
                >
                  <Users className="w-5 h-5" />
                  I'm a Vendor
                </Button>
                <Button
                  variant="supplier"
                  size="hero"
                  onClick={() => onUserTypeSelect('supplier')}
                  className="flex-1"
                >
                  <TrendingUp className="w-5 h-5" />
                  I'm a Supplier
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">1000+</div>
                  <div className="text-sm text-muted-foreground">Active Vendors</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-secondary">500+</div>
                  <div className="text-sm text-muted-foreground">Verified Suppliers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-trust">95%</div>
                  <div className="text-sm text-muted-foreground">Trust Score</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur-3xl"></div>
              <img
                src={heroImage}
                alt="Street food marketplace"
                className="relative rounded-2xl shadow-2xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* User Type Selection Cards */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Choose Your Role
            </h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of vendors and suppliers already connected
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Vendor Card */}
            <Card className="group hover:shadow-[var(--shadow-soft)] transition-all duration-300 cursor-pointer border-2 hover:border-primary/50" onClick={() => onUserTypeSelect('vendor')}>
              <CardHeader className="text-center pb-6">
                <div className="w-24 h-24 mx-auto rounded-full overflow-hidden mb-4 ring-4 ring-primary/20">
                  <img src={vendorIcon} alt="Street Food Vendor" className="w-full h-full object-cover" />
                </div>
                <CardTitle className="text-2xl text-primary">Street Food Vendor</CardTitle>
                <CardDescription className="text-base">
                  Find trusted suppliers and get the best prices for your ingredients
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm">Compare prices across suppliers</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm">Join group orders for bulk discounts</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm">Track orders in real-time</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm">Access verified supplier ratings</span>
                  </div>
                </div>
                <Button variant="vendor" className="w-full mt-6 group-hover:scale-105 transition-transform">
                  Start as Vendor
                </Button>
              </CardContent>
            </Card>

            {/* Supplier Card */}
            <Card className="group hover:shadow-[var(--shadow-soft)] transition-all duration-300 cursor-pointer border-2 hover:border-secondary/50" onClick={() => onUserTypeSelect('supplier')}>
              <CardHeader className="text-center pb-6">
                <div className="w-24 h-24 mx-auto rounded-full overflow-hidden mb-4 ring-4 ring-secondary/20">
                  <img src={supplierIcon} alt="Raw Material Supplier" className="w-full h-full object-cover" />
                </div>
                <CardTitle className="text-2xl text-secondary">Raw Material Supplier</CardTitle>
                <CardDescription className="text-base">
                  Reach more vendors and grow your business with verified listings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0" />
                    <span className="text-sm">List products with real-time pricing</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0" />
                    <span className="text-sm">Bid on group orders</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0" />
                    <span className="text-sm">Manage delivery schedules</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0" />
                    <span className="text-sm">Build trust with verified reviews</span>
                  </div>
                </div>
                <Button variant="supplier" className="w-full mt-6 group-hover:scale-105 transition-transform">
                  Start as Supplier
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Trust & Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Built on Trust & Transparency
            </h2>
            <p className="text-xl text-muted-foreground">
              Every supplier verified, every transaction secure
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <Shield className="w-12 h-12 text-trust mx-auto mb-4" />
                <CardTitle className="text-trust">Verified Suppliers</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  All suppliers verified through GSTIN and business licenses with ongoing trust monitoring
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Star className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle className="text-primary">Trust Ratings</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  AI-powered sentiment analysis ensures authentic reviews and maintains supplier quality
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <PhoneCall className="w-12 h-12 text-secondary mx-auto mb-4" />
                <CardTitle className="text-secondary">24/7 Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Dedicated support team to help resolve any issues and ensure smooth operations
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-12 border-t">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg"></div>
                <h3 className="text-lg font-bold">FreshConnect</h3>
              </div>
              <p className="text-muted-foreground">
                Connecting street food vendors with trusted suppliers across India.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Vendors</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Find Suppliers</li>
                <li>Price Comparison</li>
                <li>Group Orders</li>
                <li>Track Deliveries</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Suppliers</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>List Products</li>
                <li>Manage Orders</li>
                <li>Analytics Dashboard</li>
                <li>Verification Process</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Trust & Safety</li>
                <li>Terms & Conditions</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 FreshConnect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;