import type { ReactNode } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { insforge } from '../lib/insforge';
import { 
  Users, Briefcase, CheckSquare, FileText, LayoutDashboard, 
  CreditCard, LogOut, Scale, Settings, ChevronRight, Menu, X
} from 'lucide-react';
import { useState } from 'react';

interface NavItem {
  name: string;
  path: string;
  icon: any;
}

const navItemsByRole: Record<string, NavItem[]> = {
  'Firm Admin': [
    { name: 'Dashboard', path: '/firm', icon: LayoutDashboard },
    { name: 'Clients', path: '/firm/clients', icon: Users },
    { name: 'Cases', path: '/firm/cases', icon: Briefcase },
    { name: 'Tasks', path: '/firm/tasks', icon: CheckSquare },
    { name: 'Documents', path: '/firm/documents', icon: FileText },
    { name: 'Billing', path: '/firm/billing', icon: CreditCard },
  ],
  'Staff': [
    { name: 'My Dashboard', path: '/staff', icon: LayoutDashboard },
    { name: 'Cases', path: '/staff/cases', icon: Briefcase },
    { name: 'Tasks', path: '/staff/tasks', icon: CheckSquare },
    { name: 'Documents', path: '/staff/documents', icon: FileText },
  ],
  'Client': [
    { name: 'Portfolio', path: '/client', icon: LayoutDashboard },
    { name: 'My Cases', path: '/client/cases', icon: Briefcase },
    { name: 'Storage', path: '/client/documents', icon: FileText },
    { name: 'Invoices', path: '/client/billing', icon: CreditCard },
  ],
  'Super Admin': [
    { name: 'Admin Hub', path: '/admin', icon: LayoutDashboard },
    { name: 'Firms', path: '/admin/firms', icon: Users },
    { name: 'Subscriptions', path: '/admin/subscriptions', icon: CreditCard },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
  ]
};

export default function DashboardLayout({ children, role }: { children: ReactNode, role: string }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const menu = navItemsByRole[role] || [];

  const handleLogout = async () => {
    await insforge.auth.signOut();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-background flex text-textMain">
      {/* Mobile Toggle */}
      <button 
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed bottom-6 right-6 z-50 p-4 bg-primary rounded-full shadow-xl text-white"
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-40 w-72 bg-white/80 backdrop-blur-xl border-r border-gray-200 
        transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0 lg:w-20'}
      `}>
        <div className="h-full flex flex-col p-6">
          <div className="flex items-center gap-3 mb-12 px-2">
            <div className="w-10 h-10 bg-primary rounded-twelve flex items-center justify-center shadow-lg shadow-primary/20">
              <Scale className="text-white" size={24} />
            </div>
            {isSidebarOpen && <span className="text-xl font-bold text-primary tracking-tight">SoluGrow</span>}
          </div>

          <nav className="flex-1 space-y-2">
            {menu.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/firm' || item.path === '/staff' || item.path === '/client' || item.path === '/admin'}
                className={({ isActive }) => `
                  flex items-center gap-3 px-4 py-3 rounded-twelve transition-all group
                  ${isActive 
                    ? 'bg-primary text-white shadow-lg shadow-primary/10' 
                    : 'hover:bg-primary/5 text-gray-600 hover:text-primary'}
                `}
              >
                {({ isActive }) => (
                  <>
                    <item.icon size={20} className={isActive ? 'text-white' : 'text-gray-400 group-hover:text-primary transition-colors'} />
                    {isSidebarOpen && <span className="font-medium">{item.name}</span>}
                    {isActive && isSidebarOpen && <ChevronRight className="ml-auto" size={16} />}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="pt-6 border-t border-gray-100 space-y-2">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-twelve hover:bg-gray-50 transition-all text-gray-500 hover:text-primary">
              <Settings size={20} />
              {isSidebarOpen && <span className="font-medium">Settings</span>}
            </button>
            <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-twelve hover:bg-red-50 transition-all text-gray-500 hover:text-red-600"
            >
              <LogOut size={20} />
              {isSidebarOpen && <span className="font-medium">Sign Out</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        <header className="h-16 border-b border-gray-200 flex items-center justify-between px-8 bg-white/80 backdrop-blur-md sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <span className="text-xs font-bold uppercase tracking-widest text-gray-400">{role}</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-gray-100 border border-gray-200"></div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar bg-background/50">
          {children}
        </div>
      </main>
    </div>
  );
}
