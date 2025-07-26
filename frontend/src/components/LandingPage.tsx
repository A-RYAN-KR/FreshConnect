import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  Shield,
  Users,
  TrendingUp,
  CheckCircle,
  PhoneCall,
} from "lucide-react";
import heroImage from "@/assets/hero-marketplace.jpg";
import vendorIcon from "@/assets/vendor-icon.jpg";
import supplierIcon from "@/assets/supplier-icon.jpg";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface LandingPageProps {
  onUserTypeSelect: (userType: "vendor" | "supplier") => void;
}

const LandingPage = ({ onUserTypeSelect }: LandingPageProps) => {
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang =
      i18n.language === "en" ? "hi" : i18n.language === "hi" ? "mr" : "en";
    i18n.changeLanguage(newLang);
  };

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
            <Button variant="ghost">{t("buttons.about")}</Button>
            <Button variant="ghost">{t("buttons.contact")}</Button>
            <Link to="/auth/login">
              <Button variant="outline">{t("buttons.login")}</Button>
            </Link>
            <select
              value={i18n.language}
              onChange={toggleLanguage}
              className="text-sm bg-transparent border border-border rounded px-2 py-1"
            >
              <option value="en">English</option>
              <option value="hi">हिन्दी</option>
              <option value="mr">मराठी</option>
            </select>
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
                  🚀 {t("hero.badge")}
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                  {t("hero.title.part1")}
                  <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    {t("hero.title.part2")}
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  {t("hero.subtitle")}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  variant="hero"
                  size="hero"
                  onClick={() => onUserTypeSelect("vendor")}
                  className="flex-1"
                >
                  <Users className="w-5 h-5" />
                  {t("buttons.vendor")}
                </Button>
                <Button
                  variant="supplier"
                  size="hero"
                  onClick={() => onUserTypeSelect("supplier")}
                  className="flex-1"
                >
                  <TrendingUp className="w-5 h-5" />
                  {t("buttons.supplier")}
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">1000+</div>
                  <div className="text-sm text-muted-foreground">
                    {t("metrics.vendors")}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-secondary">500+</div>
                  <div className="text-sm text-muted-foreground">
                    {t("metrics.suppliers")}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-trust">95%</div>
                  <div className="text-sm text-muted-foreground">
                    {t("metrics.trust")}
                  </div>
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
              {t("choose_role.title")}
            </h2>
            <p className="text-xl text-muted-foreground">
              {t("choose_role.subtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Vendor Card */}
            <Card
              className="group hover:shadow-[var(--shadow-soft)] transition-all duration-300 cursor-pointer border-2 hover:border-primary/50"
              onClick={() => onUserTypeSelect("vendor")}
            >
              <CardHeader className="text-center pb-6">
                <div className="w-24 h-24 mx-auto rounded-full overflow-hidden mb-4 ring-4 ring-primary/20">
                  <img
                    src={vendorIcon}
                    alt="Street Food Vendor"
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardTitle className="text-2xl text-primary">
                  {t("vendor_card.title")}
                </CardTitle>
                <CardDescription className="text-base">
                  {t("vendor_card.desc")}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {(
                    t("vendor_card.features", {
                      returnObjects: true,
                    }) as string[]
                  ).map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
                <Button
                  variant="vendor"
                  className="w-full mt-6 group-hover:scale-105 transition-transform"
                >
                  {t("vendor_card.cta")}
                </Button>
              </CardContent>
            </Card>

            {/* Supplier Card */}
            <Card
              className="group hover:shadow-[var(--shadow-soft)] transition-all duration-300 cursor-pointer border-2 hover:border-secondary/50"
              onClick={() => onUserTypeSelect("supplier")}
            >
              <CardHeader className="text-center pb-6">
                <div className="w-24 h-24 mx-auto rounded-full overflow-hidden mb-4 ring-4 ring-secondary/20">
                  <img
                    src={supplierIcon}
                    alt="Raw Material Supplier"
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardTitle className="text-2xl text-secondary">
                  {t("supplier_card.title")}
                </CardTitle>
                <CardDescription className="text-base">
                  {t("supplier_card.desc")}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {(
                    t("supplier_card.features", {
                      returnObjects: true,
                    }) as string[]
                  ).map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
                <Button
                  variant="supplier"
                  className="w-full mt-6 group-hover:scale-105 transition-transform"
                >
                  {t("supplier_card.cta")}
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
              {t("trust_section.title")}
            </h2>
            <p className="text-xl text-muted-foreground">
              {t("trust_section.subtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {["verified", "ratings", "support"].map((key) => (
              <Card key={key} className="text-center">
                <CardHeader>
                  {key === "verified" && (
                    <Shield className="w-12 h-12 text-trust mx-auto mb-4" />
                  )}
                  {key === "ratings" && (
                    <Star className="w-12 h-12 text-primary mx-auto mb-4" />
                  )}
                  {key === "support" && (
                    <PhoneCall className="w-12 h-12 text-secondary mx-auto mb-4" />
                  )}
                  <CardTitle
                    className={
                      key === "verified"
                        ? "text-trust"
                        : key === "ratings"
                        ? "text-primary"
                        : "text-secondary"
                    }
                  >
                    {t(`trust_section.cards.${key}.title`)}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {t(`trust_section.cards.${key}.desc`)}
                  </p>
                </CardContent>
              </Card>
            ))}
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
              <p className="text-muted-foreground">{t("footer.about")}</p>
            </div>
            {["vendors", "suppliers", "support"].map((key) => (
              <div key={key}>
                <h4 className="font-semibold mb-4">
                  {t(`footer.${key}.title`)}
                </h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {(
                    t(`footer.${key}.items`, {
                      returnObjects: true,
                    }) as string[]
                  ).map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>{t("footer.copyright")}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
