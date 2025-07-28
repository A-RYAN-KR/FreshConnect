import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { IndianRupee, Clock, ShieldAlert, Users, PackageX } from "lucide-react";
import { SupplierAnalyticsData, SupplierKpis } from "@/services/supplierServices";

// --- Props interface defines what data this component receives ---
interface AnalyticsTabProps {
    analytics: SupplierAnalyticsData;
    kpis: SupplierKpis;
}

// Colors for the pie chart slices
const PIE_CHART_COLORS = ['#4CAF50', '#FFC107', '#2196F3', '#FF9800', '#F44336'];
const COMPLAINT_CHART_COLORS = ['#F44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5'];

const AnalyticsTab = ({ analytics, kpis }: AnalyticsTabProps) => {

    const formatCurrency = (value: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(value);

    return (
        <div className="space-y-8 py-6">
            {/* Section 1: Key Performance Indicators */}
            <div>
                <h3 className="text-xl font-semibold mb-4">Key Metrics</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Average Order Value</CardTitle><IndianRupee className="h-4 w-4 text-muted-foreground" /></CardHeader>
                        <CardContent><div className="text-2xl font-bold">{formatCurrency(kpis.averageOrderValue)}</div></CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Avg. Fulfillment Time</CardTitle><Clock className="h-4 w-4 text-muted-foreground" /></CardHeader>
                        <CardContent><div className="text-2xl font-bold">{kpis.averageFulfillmentTime} Days</div></CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Complaint Rate</CardTitle><ShieldAlert className="h-4 w-4 text-muted-foreground" /></CardHeader>
                        <CardContent><div className="text-2xl font-bold">{kpis.complaintRate.toFixed(1)}%</div></CardContent>
                    </Card>
                    <Card className={kpis.lowStockProductsCount > 0 ? 'bg-amber-50 border-amber-200' : ''}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Low Stock Items</CardTitle><PackageX className="h-4 w-4 text-muted-foreground" /></CardHeader>
                        <CardContent><div className="text-2xl font-bold">{kpis.lowStockProductsCount}</div><p className="text-xs text-muted-foreground">Items with {'<'} 10 units</p></CardContent>
                    </Card>
                    <Card className="lg:col-span-2">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Top Customers (by spend)</CardTitle><Users className="h-4 w-4 text-muted-foreground" /></CardHeader>
                        <CardContent>
                            {kpis.topVendors.length > 0 ? (
                                <ul className="space-y-1">{kpis.topVendors.map((v, i) => <li key={i} className="flex justify-between items-center text-sm"><span>{v.name}</span><Badge variant="secondary">{formatCurrency(v.totalSpent)}</Badge></li>)}</ul>
                            ) : <p className="text-sm text-muted-foreground">No customer data yet.</p>}
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Section 2: Visual Charts */}
            <div>
                <h3 className="text-xl font-semibold mb-4">Visual Analytics</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card className="lg:col-span-2">
                        <CardHeader><CardTitle>Revenue Over Time</CardTitle></CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={analytics.revenueOverTime}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="name" /><YAxis tickFormatter={(v) => formatCurrency(v as number)} /><Tooltip formatter={(v) => formatCurrency(v as number)} /><Legend /><Line type="monotone" dataKey="revenue" stroke="#8884d8" strokeWidth={2} activeDot={{ r: 8 }} /></LineChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader><CardTitle>Order Status Distribution</CardTitle></CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart><Tooltip /><Legend /><Pie data={analytics.orderStatusDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} >{analytics.orderStatusDistribution.map((e, i) => <Cell key={`cell-${i}`} fill={PIE_CHART_COLORS[i % PIE_CHART_COLORS.length]} />)}</Pie></PieChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader><CardTitle>Complaint Breakdown</CardTitle></CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart><Tooltip /><Legend /><Pie data={kpis.complaintBreakdown} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5}>{kpis.complaintBreakdown.map((e, i) => <Cell key={`cell-${i}`} fill={COMPLAINT_CHART_COLORS[i % COMPLAINT_CHART_COLORS.length]} />)}</Pie></PieChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                    <Card className="lg:col-span-2">
                        <CardHeader><CardTitle>Top Selling Products</CardTitle></CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={400}>
                                <BarChart data={analytics.topSellingProducts} layout="vertical" margin={{ top: 5, right: 20, left: 100, bottom: 5 }}><CartesianGrid strokeDasharray="3 3" /><XAxis type="number" /><YAxis dataKey="name" type="category" width={80} /><Tooltip /><Legend /><Bar dataKey="totalSold" name="Units Sold" fill="#82ca9d" /></BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsTab;