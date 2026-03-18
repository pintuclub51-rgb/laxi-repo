import { useEffect, useState } from 'react';
import { insforge } from '../../lib/insforge';
import { Briefcase, Plus, Search, Filter, Calendar, Loader2 } from 'lucide-react';

export default function Cases() {
  const [cases, setCases] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCases = async () => {
      const { data } = await insforge.database.from('cases').select('*, clients(name)').order('created_at', { ascending: false });
      setCases(data || []);
      setLoading(false);
    };
    fetchCases();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'open': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'closed': return 'bg-gray-50 text-gray-600 border-gray-100';
      case 'pending': return 'bg-amber-50 text-amber-600 border-amber-100';
      default: return 'bg-gray-100 text-gray-500';
    }
  };

  return (
    <div className="space-y-6 text-left">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-textMain mb-1">Case Tracking</h1>
          <p className="text-gray-500">Monitor hearings, timelines, and case status.</p>
        </div>
        <button className="bg-primary hover:bg-opacity-90 text-white px-4 py-2 rounded-twelve flex items-center gap-2 transition-all shadow-lg shadow-primary/20">
          <Plus size={20} />
          New Case
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-white border border-gray-100 rounded-twelve card-shadow">
          <p className="text-gray-400 text-xs font-semibold uppercase mb-1">Open Cases</p>
          <p className="text-2xl font-bold text-textMain">{cases.filter(c => c.status === 'Open').length}</p>
        </div>
        <div className="p-4 bg-white border border-gray-100 rounded-twelve card-shadow">
          <p className="text-gray-400 text-xs font-semibold uppercase mb-1">Pending Hearings</p>
          <p className="text-2xl font-bold text-textMain">0</p>
        </div>
        <div className="p-4 bg-white border border-gray-100 rounded-twelve card-shadow">
          <p className="text-gray-400 text-xs font-semibold uppercase mb-1">Recent Updates</p>
          <p className="text-2xl font-bold text-textMain">{cases.length}</p>
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-twelve overflow-hidden card-shadow">
        <div className="p-4 border-b border-gray-50 flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              className="w-full bg-gray-50 border border-gray-200 rounded-twelve py-2 pl-10 pr-4 text-sm text-textMain focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="Search cases..."
            />
          </div>
          <button className="p-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-400 hover:text-primary transition-colors">
            <Filter size={18} />
          </button>
        </div>

        {loading ? (
          <div className="p-20 flex flex-col items-center justify-center text-gray-400">
            <Loader2 className="animate-spin mb-4" size={32} />
            <p>Gathering case files...</p>
          </div>
        ) : cases.length === 0 ? (
          <div className="p-20 text-center">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Briefcase className="text-gray-300" size={32} />
            </div>
            <h3 className="text-lg font-semibold text-textMain mb-1">No Active Cases</h3>
            <p className="text-gray-500 mb-6">Create a case to start tracking hearings and documents.</p>
            <button className="text-primary font-medium hover:underline">Add New Case</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 p-6 gap-6">
            {cases.map((cs) => (
              <div key={cs.id} className="bg-white border border-gray-100 p-5 rounded-twelve hover:border-primary/30 transition-all cursor-pointer group card-shadow">
                <div className="flex items-start justify-between mb-4">
                  <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase border ${getStatusColor(cs.status)}`}>
                    {cs.status}
                  </span>
                  <Calendar className="text-gray-300 group-hover:text-primary transition-colors" size={18} />
                </div>
                <h3 className="text-lg font-bold text-textMain mb-1">{cs.title}</h3>
                <p className="text-gray-500 text-sm mb-4 line-clamp-2">{cs.description || 'No description provided.'}</p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-bold">
                      {cs.clients?.name?.[0] || 'C'}
                    </div>
                    <span className="text-xs text-textMain font-medium">{cs.clients?.name}</span>
                  </div>
                  <span className="text-[10px] text-gray-400 italic">Added {new Date(cs.created_at).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
