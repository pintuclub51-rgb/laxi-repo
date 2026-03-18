import { useEffect, useState } from 'react';
import { insforge } from '../../lib/insforge';
import { FileText, Upload, Folder, Search, MoreVertical, Loader2, HardDrive } from 'lucide-react';

export default function Documents() {
  const [docs, setDocs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDocs = async () => {
      const { data } = await insforge.database.from('documents').select('*');
      setDocs(data || []);
      setLoading(false);
    };
    fetchDocs();
  }, []);

  return (
    <div className="space-y-6 text-left">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-textMain mb-1">Document Vault</h1>
          <p className="text-gray-500">Securely store and manage legal documents & files.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white border border-gray-100 text-textMain px-4 py-2 rounded-twelve flex items-center gap-2 transition-all card-shadow hover:bg-gray-50">
            <Folder size={18} className="text-primary" />
            New Folder
          </button>
          <button className="bg-primary hover:bg-opacity-90 text-white px-4 py-2 rounded-twelve flex items-center gap-2 transition-all shadow-lg shadow-primary/20">
            <Upload size={18} />
            Upload File
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white border border-gray-100 p-5 rounded-twelve card-shadow">
            <h3 className="text-sm font-bold text-textMain mb-4 flex items-center gap-2">
              <HardDrive size={16} className="text-primary" />
              Storage Explorer
            </h3>
            <nav className="space-y-1">
              {['All Documents', 'Case Files', 'Identities', 'Invoices', 'Legal Notices'].map((cat) => (
                <button key={cat} className="w-full text-left px-3 py-2 rounded-lg text-sm transition-all hover:bg-primary/5 hover:text-primary text-gray-500">
                  {cat}
                </button>
              ))}
            </nav>
          </div>
          
          <div className="bg-primary/5 border border-primary/10 p-5 rounded-twelve">
            <h4 className="text-xs font-bold text-primary uppercase mb-2">Storage Usage</h4>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-2">
              <div className="w-1/3 h-full bg-primary"></div>
            </div>
            <p className="text-[10px] text-gray-400">12.4 MB of 5.0 GB used (0.3%)</p>
          </div>
        </div>

        <div className="lg:col-span-3 space-y-4">
          <div className="bg-white border border-gray-100 rounded-twelve overflow-hidden card-shadow">
            <div className="p-4 border-b border-gray-50 relative">
              <Search className="absolute left-7 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                className="w-full bg-gray-50 border border-gray-200 rounded-twelve py-2 pl-12 pr-4 text-sm text-textMain focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="Search by filename, category or case..."
              />
            </div>

            {loading ? (
              <div className="p-20 flex flex-col items-center justify-center text-gray-400">
                <Loader2 className="animate-spin mb-4" size={32} />
                <p>Loading your vault...</p>
              </div>
            ) : docs.length === 0 ? (
              <div className="p-20 text-center">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="text-gray-300" size={32} />
                </div>
                <h3 className="text-lg font-semibold text-textMain mb-1">Your Vault is Empty</h3>
                <p className="text-gray-500 mb-6">Drop files here or use the upload button to get started.</p>
                <div className="border-2 border-dashed border-gray-100 rounded-twelve p-8 bg-gray-50/50">
                  <Upload className="mx-auto text-gray-300 mb-4" size={48} />
                  <p className="text-gray-400 text-sm font-medium">Drag and drop files to upload</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 p-6 gap-6">
                {docs.map((doc) => (
                  <div key={doc.id} className="group relative bg-white border border-gray-100 p-4 rounded-twelve hover:border-primary/30 transition-all text-center card-shadow">
                    <div className="w-12 h-12 bg-gray-50 group-hover:bg-primary/5 rounded-lg flex items-center justify-center mx-auto mb-3 transition-colors">
                      <FileText className="text-gray-400 group-hover:text-primary" size={24} />
                    </div>
                    <p className="text-xs font-semibold text-textMain line-clamp-1">{doc.name}</p>
                    <p className="text-[10px] text-gray-400 mt-1 uppercase font-bold tracking-wider">{doc.category || 'Uncategorized'}</p>
                    <button className="absolute top-2 right-2 p-1 text-gray-300 hover:text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreVertical size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
