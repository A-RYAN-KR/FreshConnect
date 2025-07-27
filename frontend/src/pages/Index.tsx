import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Star, Shield, Users, TrendingUp, CheckCircle, PhoneCall, Globe } from "lucide-react";
import heroImage from "@/assets/hero-marketplace.jpg";
import vendorIcon from "@/assets/vendor-icon.jpg";
import supplierIcon from "@/assets/supplier-icon.jpg";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const SmoothScrollStyle = () => (
  <style>{`
    html {
      scroll-behavior: smooth;
    }
  `}</style>
);

const LandingPage = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="min-h-screen bg-background">
      <SmoothScrollStyle />

      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg"></div>
            <h1 className="text-xl font-bold text-foreground">FreshConnect</h1>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Globe className="h-[1.2rem] w-[1.2rem]" />
                  <span className="sr-only">Change Language</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => changeLanguage('en')}>English</DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeLanguage('hi')}>हिंदी (Hindi)</DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeLanguage('mr')}>मराठी (Marathi)</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button asChild variant="ghost"><a href="#about">{t('buttons.about')}</a></Button>
            <Button asChild variant="ghost"><a href="#contact">{t('buttons.contact')}</a></Button>
            <Button asChild variant="outline"><Link to="/auth/login">{t('buttons.login')}</Link></Button>
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
                <Badge className="w-fit bg-primary/10 text-primary border-primary/20">{t('hero.badge')}</Badge>
                <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                  {t('hero.title.part1')}
                  <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">{t('hero.title.part2')}</span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">{t('hero.subtitle')}</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/auth/login" state={{ userType: 'vendor' }} className="flex-1">
                  <Button size="hero" className="w-full text-primary-foreground shadow-lg hover:shadow-glow hover:brightness-110 transition-all duration-300 transform hover:-translate-y-1">
                    <Users className="w-5 h-5 mr-2" />
                    {t('buttons.vendor')}
                  </Button>
                </Link>
                <Link to="/auth/login" state={{ userType: 'supplier' }} className="flex-1">
                  <Button size="hero" className="bg-green-500 w-full text-secondary-foreground shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl hover:bg-green-400">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    {t('buttons.supplier')}
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="text-center"><div className="text-2xl font-bold text-primary">1000+</div><div className="text-sm text-muted-foreground">{t('metrics.vendors')}</div></div>
                <div className="text-center"><div className="text-2xl font-bold text-secondary">500+</div><div className="text-sm text-muted-foreground">{t('metrics.suppliers')}</div></div>
                <div className="text-center"><div className="text-2xl font-bold text-trust">95%</div><div className="text-sm text-muted-foreground">{t('metrics.trust')}</div></div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur-3xl"></div>
              <img src={heroImage} alt={t('hero.badge')} className="relative rounded-2xl shadow-2xl w-full h-auto"/>
            </div>
          </div>
        </div>
      </section>

      {/* User Type Selection Cards */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">{t('choose_role.title')}</h2>
            <p className="text-xl text-muted-foreground">{t('choose_role.subtitle')}</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Link to="/auth/login" state={{ userType: 'vendor' }}>
              <Card className="group hover:shadow-[var(--shadow-soft)] transition-all duration-300 cursor-pointer border-2 hover:border-primary/50">
                <CardHeader className="text-center pb-6">
                  <div className="w-24 h-24 mx-auto rounded-full overflow-hidden mb-4 ring-4 ring-primary/20"><img src={vendorIcon} alt={t('vendor_card.title')} className="w-full h-full object-cover" /></div>
                  <CardTitle className="text-2xl text-primary">{t('vendor_card.title')}</CardTitle>
                  <CardDescription className="text-base">{t('vendor_card.desc')}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3"><CheckCircle className="w-5 h-5 text-primary flex-shrink-0" /><span>{t('vendor_card.features.0')}</span></div>
                    <div className="flex items-center space-x-3"><CheckCircle className="w-5 h-5 text-primary flex-shrink-0" /><span>{t('vendor_card.features.1')}</span></div>
                  </div>
                  <Button variant="vendor" className="w-full mt-6 group-hover:scale-105 transition-transform">{t('vendor_card.cta')}</Button>
                </CardContent>
              </Card>
            </Link>
            <Link to="/auth/login" state={{ userType: 'supplier' }}>
              <Card className="group hover:shadow-[var(--shadow-soft)] transition-all duration-300 cursor-pointer border-2 hover:border-secondary/50">
                <CardHeader className="text-center pb-6">
                  <div className="w-24 h-24 mx-auto rounded-full overflow-hidden mb-4 ring-4 ring-secondary/20"><img src={supplierIcon} alt={t('supplier_card.title')} className="w-full h-full object-cover" /></div>
                  <CardTitle className="text-2xl text-secondary">{t('supplier_card.title')}</CardTitle>
                  <CardDescription className="text-base">{t('supplier_card.desc')}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3"><CheckCircle className="w-5 h-5 text-secondary flex-shrink-0" /><span>{t('supplier_card.features.0')}</span></div>
                    <div className="flex items-center space-x-3"><CheckCircle className="w-5 h-5 text-secondary flex-shrink-0" /><span>{t('supplier_card.features.1')}</span></div>
                  </div>
                  <Button variant="supplier" className="w-full mt-6 group-hover:scale-105 transition-transform">{t('supplier_card.cta')}</Button>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">{t('about_section.title')}</h2>
            <p className="text-xl text-muted-foreground">{t('about_section.subtitle')}</p>
            <p className="mt-8 text-lg text-foreground/80 leading-relaxed">{t('about_section.empowerment_paragraph')}</p>
          </div>
          <div className="text-center mb-16">
            <h3 className="text-2xl font-semibold">{t('about_section.approach_title')}</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center shadow-soft hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <CardHeader>
                <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle className="text-primary">{t('about_section.cards.transparency.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{t('about_section.cards.transparency.desc')}</p>
              </CardContent>
            </Card>
            <Card className="text-center shadow-soft hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <CardHeader>
                <Users className="w-12 h-12 text-secondary mx-auto mb-4" />
                <CardTitle className="text-secondary">{t('about_section.cards.community.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{t('about_section.cards.community.desc')}</p>
              </CardContent>
            </Card>
            <Card className="text-center shadow-soft hover:shadow-trust transition-all duration-300 transform hover:-translate-y-2">
              <CardHeader>
                <CheckCircle className="w-12 h-12 text-trust mx-auto mb-4" />
                <CardTitle className="text-trust">{t('about_section.cards.trust.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{t('about_section.cards.trust.desc')}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer id="contact" className="bg-muted py-12 border-t">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg"></div>
                <h3 className="text-lg font-bold">FreshConnect</h3>
              </div>
              <p className="text-muted-foreground">{t('footer.about')}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t('footer.vendors.title')}</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>{t('footer.vendors.items.0')}</li>
                <li>{t('footer.vendors.items.1')}</li>
                <li>{t('footer.vendors.items.2')}</li>
                <li>{t('footer.vendors.items.3')}</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t('footer.suppliers.title')}</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>{t('footer.suppliers.items.0')}</li>
                <li>{t('footer.suppliers.items.1')}</li>
                <li>{t('footer.suppliers.items.2')}</li>
                <li>{t('footer.suppliers.items.3')}</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t('footer.support.title')}</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>{t('footer.support.items.0')}</li>
                <li>{t('footer.support.items.1')}</li>
                <li>{t('footer.support.items.2')}</li>
                <li>{t('footer.support.items.3')}</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>{t('footer.copyright')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;