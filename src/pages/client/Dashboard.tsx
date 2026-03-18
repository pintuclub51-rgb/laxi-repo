import { useEffect, useState } from 'react';
import { insforge } from '../../lib/insforge';
import { Briefcase, FileText, CreditCard, Bell, Info, Loader2 } from 'lucide-react';

export default function ClientDashboard() {
  const [stats, setStats] = useState({
    myCases: 0,
    documents: 0,
    unpaidInvoices: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClientStats = async () => {
      // In a real app, filters would apply based on the logged-in client ID
      const { count: caseCount } = await insforge.database.from('cases').select('*', { count: 'exact', head: true });
      const { count: docCount } = await insforge.database.from('documents').select('*', { count: 'exact', head: true });
      const { count: invCount } = await insforge.database.from('invoices').select('*', { count: 'exact', head: true }).neq('status', 'Paid');

      setStats({
        myCases: caseCount || 0,
        documents: docCount || 0,
        unpaidInvoices: invCount || 0
      });
      setLoading(false);
    };
    fetchClientStats();
  }, []);

  return (
    <div className="space-y-8 text-left">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-textMain mb-1">Client Portal</h1>
          <p className="text-gray-500">Track your legal matters and access shared documents.</p>
        </div>
        <button className="p-2 bg-white border border-gray-100 rounded-full card-shadow text-gray-400 hover:text-primary transition-colors relative">
          <Bell size={20} />
          <span className="absolute top-0 right-0 w-2 h-2 bg-primary rounded-full border-2 border-white"></span>
        </button>
      </div>

      {loading ? (
        <div className="h-64 flex flex-col items-center justify-center text-gray-400">
          <Loader2 className="animate-spin mb-4" size={40} />
          <p>Accessing your records...</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-primary/5 border border-primary/10 p-6 rounded-twelve card-shadow group hover:bg-primary/10 transition-all cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white rounded-twelve text-primary card-shadow">
                  <Briefcase size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-textMain">{stats.myCases}</h3>
                  <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">Active Cases</p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-100 p-6 rounded-twelve card-shadow border-l-4 border-l-amber-500 group hover:bg-gray-50 transition-all cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-amber-50 rounded-twelve text-amber-600">
                  <FileText size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-textMain">{stats.documents}</h3>
                  <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">Documents</p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-100 p-6 rounded-twelve card-shadow border-l-4 border-l-emerald-500 group hover:bg-gray-50 transition-all cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-emerald-50 rounded-twelve text-emerald-600">
                  <CreditCard size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-textMain">{stats.unpaidInvoices}</h3>
                  <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">Pending Bills</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-twelve card-shadow p-8">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-50 rounded-full text-blue-600">
                <Info size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-textMain mb-2">Welcome to your portal</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  You can securely view case progress, download documents, and pay invoices from this dashboard. 
                  All your data is encrypted and managed by your legal firm.
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
