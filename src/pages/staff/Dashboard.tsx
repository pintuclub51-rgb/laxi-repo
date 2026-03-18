import { useEffect, useState } from 'react';
import { insforge } from '../../lib/insforge';
import { Briefcase, CheckSquare, Clock, FileText, AlertCircle, Loader2 } from 'lucide-react';

export default function StaffDashboard() {
  const [stats, setStats] = useState({
    myCases: 0,
    pendingTasks: 0,
    upcomingHearings: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStaffStats = async () => {
      // In a real app, filters would apply based on the logged-in staff ID
      const { count: caseCount } = await insforge.database.from('cases').select('*', { count: 'exact', head: true });
      const { count: taskCount } = await insforge.database.from('tasks').select('*', { count: 'exact', head: true });

      setStats({
        myCases: caseCount || 0,
        pendingTasks: taskCount || 0,
        upcomingHearings: 0
      });
      setLoading(false);
    };
    fetchStaffStats();
  }, []);

  return (
    <div className="space-y-8 text-left">
      <div>
        <h1 className="text-3xl font-bold text-textMain mb-1">Staff Workspace</h1>
        <p className="text-gray-500">Manage your assigned cases and daily tasks.</p>
      </div>

      {loading ? (
        <div className="h-64 flex flex-col items-center justify-center text-gray-400">
          <Loader2 className="animate-spin mb-4" size={40} />
          <p>Syncing your workspace...</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-twelve card-shadow border border-gray-100 flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-twelve text-primary">
                <Briefcase size={24} />
              </div>
              <div>
                <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">My Cases</p>
                <h3 className="text-2xl font-bold text-textMain">{stats.myCases}</h3>
              </div>
            </div>

            <div className="bg-white p-6 rounded-twelve card-shadow border border-gray-100 flex items-center gap-4">
              <div className="p-3 bg-amber-50 rounded-twelve text-amber-600">
                <CheckSquare size={24} />
              </div>
              <div>
                <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">Pending Tasks</p>
                <h3 className="text-2xl font-bold text-textMain">{stats.pendingTasks}</h3>
              </div>
            </div>

            <div className="bg-white p-6 rounded-twelve card-shadow border border-gray-100 flex items-center gap-4">
              <div className="p-3 bg-blue-50 rounded-twelve text-blue-600">
                <Clock size={24} />
              </div>
              <div>
                <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">Hearings Today</p>
                <h3 className="text-2xl font-bold text-textMain">{stats.upcomingHearings}</h3>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white border border-gray-100 rounded-twelve card-shadow p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-textMain">Recent Tasks</h3>
                <CheckSquare size={18} className="text-gray-300" />
              </div>
              <div className="space-y-4 text-center py-8">
                <AlertCircle className="mx-auto text-gray-200" size={32} />
                <p className="text-gray-400 text-sm">No tasks assigned to you yet.</p>
              </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-twelve card-shadow p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-textMain">File Access</h3>
                <FileText size={18} className="text-gray-300" />
              </div>
              <div className="space-y-4 text-center py-8">
                <FileText className="mx-auto text-gray-200" size={32} />
                <p className="text-gray-400 text-sm">Documents shared with your team will appear here.</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
