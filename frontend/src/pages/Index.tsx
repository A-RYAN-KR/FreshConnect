import { useState } from "react";
import LandingPage from "@/components/LandingPage";
import VendorDashboard from "@/components/VendorDashboard";
import SupplierDashboard from "@/components/SupplierDashboard";

type ViewType = 'landing' | 'vendor' | 'supplier';

const Index = () => {
  const [currentView, setCurrentView] = useState<ViewType>('landing');

  const handleUserTypeSelect = (userType: 'vendor' | 'supplier') => {
    setCurrentView(userType);
  };

  const handleBack = () => {
    setCurrentView('landing');
  };

  return (
    <>
      {currentView === 'landing' && (
        <LandingPage onUserTypeSelect={handleUserTypeSelect} />
      )}
      {currentView === 'vendor' && (
        <VendorDashboard onBack={handleBack} />
      )}
      {currentView === 'supplier' && (
        <SupplierDashboard onBack={handleBack} />
      )}
    </>
  );
};

export default Index;
