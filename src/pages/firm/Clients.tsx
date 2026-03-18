import { useEffect, useState } from 'react';
import { insforge } from '../../lib/insforge';
import { UserPlus, Search, Mail, Phone, MoreVertical, Loader2 } from 'lucide-react';

export default function Clients() {
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClients = async () => {
      const { data } = await insforge.database.from('clients').select('*').order('created_at', { ascending: false });
      setClients(data || []);
      setLoading(false);
    };
    fetchClients();
  }, []);

  return (
    <div className="space-y-6 text-left">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-textMain mb-1">Client Management</h1>
          <p className="text-gray-500">Manage your firm's client records and contacts.</p>
        </div>
        <button className="bg-primary hover:bg-opacity-90 text-white px-4 py-2 rounded-twelve flex items-center gap-2 transition-all shadow-lg shadow-primary/20">
          <UserPlus size={20} />
          Add Client
        </button>
      </div>

      <div className="bg-white border border-gray-100 rounded-twelve overflow-hidden card-shadow">
        <div className="p-4 border-b border-gray-50">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              className="w-full bg-gray-50 border border-gray-200 rounded-twelve py-2 pl-10 pr-4 text-sm text-textMain focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="Search clients..."
            />
          </div>
        </div>

        {loading ? (
          <div className="p-20 flex flex-col items-center justify-center text-gray-400">
            <Loader2 className="animate-spin mb-4" size={32} />
            <p>Loading your client directory...</p>
          </div>
        ) : clients.length === 0 ? (
          <div className="p-20 text-center">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <UserPlus className="text-gray-300" size={32} />
            </div>
            <h3 className="text-lg font-semibold text-textMain mb-1">No Clients Yet</h3>
            <p className="text-gray-500 mb-6">Add your first client to start managing their cases and documents.</p>
            <button className="text-primary font-medium hover:underline">Add New Client</button>
          </div>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-500 text-xs font-semibold uppercase">
              <tr>
                <th className="px-6 py-4">Client Name</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Phone</th>
                <th className="px-6 py-4">Date Added</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {clients.map((client) => (
                <tr key={client.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-6 py-4 text-textMain font-medium">{client.name}</td>
                  <td className="px-6 py-4 text-gray-500">
                    <div className="flex items-center gap-2">
                      <Mail size={14} className="text-gray-400" />
                      {client.email || 'N/A'}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    <div className="flex items-center gap-2">
                      <Phone size={14} className="text-gray-400" />
                      {client.phone || 'N/A'}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500 text-sm">{new Date(client.created_at).toLocaleDateString()}</td>
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
