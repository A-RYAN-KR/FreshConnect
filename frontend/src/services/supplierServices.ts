import { api } from './api'; // Assuming you have a central API setup

// Define an interface for the stats object for type safety
export interface SupplierStats {
    totalRevenue: number;
    activeOrders: number;
    productsListed: number;
    trustScore: number;
    averageRating: number;
}

/**
 * Fetches the aggregated dashboard statistics for the logged-in supplier.
 */
export const getSupplierDashboardStats = async (): Promise<SupplierStats> => {
    try {
        // The API call will go to GET /api/supplier/stats
        const response = await api.get<{ success: boolean; stats: SupplierStats }>('/supplier/stats');
        if (response.data && response.data.success) {
            return response.data.stats;
        }
        throw new Error('Failed to fetch supplier stats from API');
    } catch (error) {
        console.error('Error fetching supplier dashboard stats:', error);
        // Re-throw the error to be caught by the component
        throw error;
    }
};