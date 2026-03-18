import { useEffect, useState } from 'react';
import { insforge } from '../../lib/insforge';
import { Users, Briefcase, CreditCard, Shield, TrendingUp, IndianRupee, Loader2 } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalFirms: 0,
    activeSubscriptions: 0,
    monthlyRevenue: 0,
    newSignups: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminStats = async () => {
      setLoading(true);
      try {
        // In a real app, these would come from specialized admin views/functions
        const { count: firmCount } = await insforge.database.from('tenants').select('*', { count: 'exact', head: true });
        const { data: invoices, error: invError } = await insforge.database.from('invoices').select('amount').eq('status', 'Paid');
        
        if (invError) throw invError;

        const totalRevenue = invoices?.reduce((sum: number, inv: any) => sum + Number(inv.amount), 0) || 0;

        setStats({
          totalFirms: firmCount || 0,
          activeSubscriptions: firmCount || 0, // Placeholder
          monthlyRevenue: totalRevenue,
          newSignups: firmCount || 0 // Placeholder
        });
      } catch (err: any) {
        console.error('Failed to fetch admin stats:', err);
        // Fallback or error state could be handled here
      } finally {
        setLoading(false);
      }
    };
    fetchAdminStats();
  }, []);

  return (
    <div className="space-y-8 text-left">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-textMain mb-1">Platform Admin Hub</h1>
          <p className="text-gray-500">Global overview of SoluGrow ecosystem performance.</p>
        </div>
        <div className="px-4 py-2 bg-primary/10 border border-primary/20 rounded-twelve flex items-center gap-2">
          <Shield className="text-primary" size={20} />
          <span className="text-primary font-bold text-sm">Super Admin Access</span>
        </div>
      </div>

      {loading ? (
        <div className="h-64 flex flex-col items-center justify-center text-gray-400">
          <Loader2 className="animate-spin mb-4" size={40} />
          <p className="font-medium">Loading platform analytics...</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-twelve card-shadow border border-gray-100">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-blue-50 rounded-twelve text-blue-600">
                  <Users size={24} />
                </div>
                <span className="text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full text-[10px] font-bold">+5%</span>
              </div>
              <p className="text-gray-500 text-sm font-medium mb-1">Total Firms</p>
              <h3 className="text-2xl font-bold text-textMain">{stats.totalFirms}</h3>
            </div>

            <div className="bg-white p-6 rounded-twelve card-shadow border border-gray-100">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-primary/10 rounded-twelve text-primary">
                  <CreditCard size={24} />
                </div>
                <span className="text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full text-[10px] font-bold">Live</span>
              </div>
              <p className="text-gray-500 text-sm font-medium mb-1">Active Subs</p>
              <h3 className="text-2xl font-bold text-textMain">{stats.activeSubscriptions}</h3>
            </div>

            <div className="bg-white p-6 rounded-twelve card-shadow border border-gray-100">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-emerald-50 rounded-twelve text-emerald-600">
                  <IndianRupee size={24} />
                </div>
                <TrendingUp className="text-emerald-500" size={16} />
              </div>
              <p className="text-gray-500 text-sm font-medium mb-1">Total Revenue</p>
              <h3 className="text-2xl font-bold text-textMain">₹{stats.monthlyRevenue.toLocaleString()}</h3>
            </div>

            <div className="bg-white p-6 rounded-twelve card-shadow border border-gray-100">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-purple-50 rounded-twelve text-purple-600">
                  <Briefcase size={24} />
                </div>
              </div>
              <p className="text-gray-500 text-sm font-medium mb-1">New Signups</p>
              <h3 className="text-2xl font-bold text-textMain">{stats.newSignups}</h3>
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-twelve card-shadow overflow-hidden">
            <div className="p-6 border-b border-gray-50 flex items-center justify-between">
              <h2 className="text-xl font-bold text-textMain">Recent Firm Onboarding</h2>
              <button className="text-primary hover:underline text-sm font-medium">Manage All Firms</button>
            </div>
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-gray-300" size={32} />
              </div>
              <p className="text-gray-500 max-w-xs mx-auto">Welcome to the SoluGrow Admin Dashboard. You can monitor and manage all subscribed firms from here.</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
