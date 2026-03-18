import { useEffect, useState } from 'react';
import { insforge } from '../../lib/insforge';
import { Users, Briefcase, Clock, AlertCircle, IndianRupee, TrendingUp } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  trend?: string;
}

const StatsCard = ({ title, value, icon: Icon, trend }: StatsCardProps) => (
  <div className="bg-white border border-gray-100 p-6 rounded-twelve card-shadow text-left">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-textMain">{value}</h3>
      </div>
      <div className="p-3 bg-primary/10 rounded-twelve text-primary">
        <Icon size={24} />
      </div>
    </div>
    {trend && (
      <div className="mt-4 flex items-center gap-2 text-emerald-600 text-sm font-medium">
        <TrendingUp size={16} />
        <span>{trend} vs last month</span>
      </div>
    )}
  </div>
);

export default function FirmDashboard() {
  const [stats, setStats] = useState({
    clients: 0,
    cases: 0,
    tasks: 0,
    revenue: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      const { count: clientCount } = await insforge.database.from('clients').select('*', { count: 'exact', head: true });
      const { count: caseCount } = await insforge.database.from('cases').select('*', { count: 'exact', head: true });
      const { count: taskCount } = await insforge.database.from('tasks').select('*', { count: 'exact', head: true });
      const { data: invoices } = await insforge.database.from('invoices').select('amount').eq('status', 'Paid');
      
      const totalRevenue = invoices?.reduce((sum: number, inv: any) => sum + Number(inv.amount), 0) || 0;

      setStats({
        clients: clientCount || 0,
        cases: caseCount || 0,
        tasks: taskCount || 0,
        revenue: totalRevenue
      });
    };
    fetchStats();
  }, []);

  return (
    <div className="space-y-8 text-left">
      <div>
        <h1 className="text-3xl font-bold text-textMain mb-2">Practice Overview</h1>
        <p className="text-gray-500">Real-time metrics for your firm's performance.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard title="Total Clients" value={stats.clients} icon={Users} trend="+12%" />
        <StatsCard title="Active Cases" value={stats.cases} icon={Briefcase} trend="+5%" />
        <StatsCard title="Pending Tasks" value={stats.tasks} icon={Clock} />
        <StatsCard title="Monthly Revenue" value={`₹${stats.revenue.toLocaleString()}`} icon={IndianRupee} trend="+18%" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Cases */}
        <div className="bg-white border border-gray-100 rounded-twelve p-6 card-shadow">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-textMain">Recent Cases</h3>
            <button className="text-primary hover:underline font-medium text-sm">View all</button>
          </div>
          <div className="space-y-4 text-center py-10">
            <AlertCircle className="mx-auto text-gray-300 mb-2" size={32} />
            <p className="text-gray-400">No cases found. Start by adding a client and case.</p>
          </div>
        </div>

        {/* Task List */}
        <div className="bg-white border border-gray-100 rounded-twelve p-6 card-shadow">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-textMain">Upcoming Tasks</h3>
            <button className="text-primary hover:underline font-medium text-sm">View all</button>
          </div>
          <div className="space-y-4 text-center py-10">
            <AlertCircle className="mx-auto text-gray-300 mb-2" size={32} />
            <p className="text-gray-400">All caught up! No pending tasks for today.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
