import axios from "axios";

// --- Define all the types for our data for full type safety ---

// For the top-level stat cards
export interface SupplierStats {
  totalRevenue: number;
  activeOrders: number;
  productsListed: number;
  trustScore: number;
  averageRating: number;
}

// For the charts
export interface SupplierAnalyticsData {
  revenueOverTime: { name: string; revenue: number }[];
  orderStatusDistribution: { name: string; value: number }[];
  topSellingProducts: { name: string; totalSold: number }[];
}

// For the new KPI cards
export interface SupplierKpis {
  averageOrderValue: number;
  averageFulfillmentTime: number | "N/A";
  complaintRate: number;
  complaintBreakdown: { name: string; value: number }[];
  topVendors: { name: string; totalSpent: number }[];
  lowStockProductsCount: number;
}

// This is the full shape of the API response
export interface FullSupplierDashboardData {
  success: boolean;
  stats: SupplierStats;
  analytics: SupplierAnalyticsData;
  kpis: SupplierKpis;
}

/**
 * Fetches all aggregated dashboard data (stats, analytics, KPIs) for the logged-in supplier.
 * This is now the single source of truth for the dashboard.
 */
export const getSupplierDashboardData =
  async (): Promise<FullSupplierDashboardData> => {
    try {
      // Use the controller endpoint that returns EVERYTHING
      const response = await axios.get<FullSupplierDashboardData>(
        "/api/supplier/stats",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data && response.data.success) {
        // Return the entire data object
        return response.data;
      }
      throw new Error("Failed to fetch supplier dashboard data from API");
    } catch (error) {
      console.error("Error fetching supplier dashboard data:", error);
      throw error;
    }
  };
