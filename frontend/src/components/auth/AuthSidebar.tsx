import { UtensilsCrossed, Truck } from "lucide-react";

export function AuthSidebar() {
  return (
    <div className="hidden md:flex md:w-2/5 bg-gradient-to-br from-amber-100 to-orange-200 relative">
      <div className="absolute inset-0 bg-white/50 backdrop-blur-sm"></div>

      <div className="relative z-10 flex flex-col justify-center items-center p-10 h-full w-full">
        <div className="max-w-lg text-center animate-fade-up">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">
            Your Marketplace for Fresh Ingredients
          </h2>
          <p className="text-gray-700 mb-10">
            FreshConnect empowers street food vendors by directly linking them
            with a network of trusted local suppliers.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-left">
            {/* Vendor Card */}
            <div className="bg-white/80 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-amber-100 rounded-full mr-3">
                  <UtensilsCrossed className="h-5 w-5 text-amber-700" />
                </div>
                <h3 className="font-semibold text-lg text-gray-900">For Food Vendors</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-2 mt-1.5 flex-shrink-0"></span>
                  Find fresh, quality ingredients daily
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-2 mt-1.5 flex-shrink-0"></span>
                  Compare prices and save money
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-2 mt-1.5 flex-shrink-0"></span>
                  Access a network of trusted suppliers
                </li>
              </ul>
            </div>

            {/* Supplier Card */}
            <div className="bg-white/80 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-teal-100 rounded-full mr-3">
                  <Truck className="h-5 w-5 text-teal-700" />
                </div>
                <h3 className="font-semibold text-lg text-gray-900">For Suppliers</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-teal-500 rounded-full mr-2 mt-1.5 flex-shrink-0"></span>
                  Reach thousands of local vendors
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-teal-500 rounded-full mr-2 mt-1.5 flex-shrink-0"></span>
                  Manage orders and deliveries easily
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-teal-500 rounded-full mr-2 mt-1.5 flex-shrink-0"></span>
                  Grow your business with our tools
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}