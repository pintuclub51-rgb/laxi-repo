import { useEffect, useState } from 'react';
import { insforge } from '../../lib/insforge';
import { Building2, Search, MoreVertical, Loader2, Globe, Calendar } from 'lucide-react';

export default function AdminFirms() {
  const [firms, setFirms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFirms = async () => {
      const { data } = await insforge.database.from('tenants').select('*').order('created_at', { ascending: false });
      setFirms(data || []);
      setLoading(false);
    };
    fetchFirms();
  }, []);

  return (
    <div className="space-y-6 text-left">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-textMain mb-1">Firm Management</h1>
          <p className="text-gray-500">Monitor and manage all legal & CA firms on the platform.</p>
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-twelve overflow-hidden card-shadow font-sans">
        <div className="p-4 border-b border-gray-50">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              className="w-full bg-gray-50 border border-gray-200 rounded-twelve py-2 pl-10 pr-4 text-sm text-textMain focus:outline-none focus:ring-2 focus:ring-primary/20 font-sans"
              placeholder="Search firms by name or domain..."
            />
          </div>
        </div>

        {loading ? (
          <div className="p-20 flex flex-col items-center justify-center text-gray-400">
            <Loader2 className="animate-spin mb-4" size={32} />
            <p>Loading platform tenants...</p>
          </div>
        ) : firms.length === 0 ? (
          <div className="p-20 text-center">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Building2 className="text-gray-300" size={32} />
            </div>
            <h3 className="text-lg font-semibold text-textMain mb-1">No Firms Found</h3>
            <p className="text-gray-500">There are no firms registered on the platform yet.</p>
          </div>
        ) : (
          <table className="w-full text-left font-sans">
            <thead className="bg-gray-50 text-gray-500 text-xs font-semibold uppercase">
              <tr>
                <th className="px-6 py-4">Firm Name</th>
                <th className="px-6 py-4">Domain</th>
                <th className="px-6 py-4">Created At</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {firms.map((firm) => (
                <tr key={firm.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                        {firm.name?.[0]}
                      </div>
                      <span className="text-textMain font-medium">{firm.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    <div className="flex items-center gap-2 text-sm">
                      <Globe size={14} className="text-gray-400" />
                      {firm.domain}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="text-gray-400" />
                      {new Date(firm.created_at).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border border-emerald-100 bg-emerald-50 text-emerald-600">
                      Active
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-gray-400 hover:text-primary transition-colors">
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
