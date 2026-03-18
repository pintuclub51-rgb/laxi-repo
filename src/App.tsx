import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { insforge } from './lib/insforge';
import { Loader2 } from 'lucide-react';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import VerifyReset from './pages/VerifyReset';
import Landing from './pages/Landing';
import Features from './pages/Features';
import DashboardLayout from './components/DashboardLayout';
import AuthGuard from './components/AuthGuard';

// Firm Pages
import FirmDashboard from './pages/firm/Dashboard';
import Clients from './pages/firm/Clients';
import Cases from './pages/firm/Cases';
import Tasks from './pages/firm/Tasks';
import Documents from './pages/firm/Documents';
import Billing from './pages/firm/Billing';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import AdminFirms from './pages/admin/Firms';

// Staff Pages
import StaffDashboard from './pages/staff/Dashboard';

// Client Pages
import ClientDashboard from './pages/client/Dashboard';

// Dashboard Redirect Component
const DashboardRedirect = () => {
  return (
    <AuthGuard>
      <NavigateToRoleDashboard />
    </AuthGuard>
  );
};

const NavigateToRoleDashboard = () => {
  // We use current session role to redirect
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkRole = async () => {
      const { data } = await insforge.auth.getCurrentUser();
      const user = data?.user;
      if (user) {
        const { data: profile } = await insforge.database.from('profiles').select('role').eq('id', user.id).single();
        setRole(profile?.role || 'Firm Admin');
      }
      setLoading(false);
    };
    checkRole();
  }, []);

  if (loading) return <div className="min-h-screen bg-background flex items-center justify-center"><Loader2 className="animate-spin text-primary" size={40} /></div>;

  switch (role) {
    case 'Super Admin': return <Navigate to="/admin" replace />;
    case 'Staff': return <Navigate to="/staff" replace />;
    case 'Client': return <Navigate to="/client" replace />;
    default: return <Navigate to="/firm" replace />;
  }
};

// Placeholders for other roles
const Placeholder = ({ title }: { title: string }) => (
  <div className="p-8 text-center min-h-[400px] flex flex-col items-center justify-center bg-background rounded-twelve border border-gray-100">
    <h1 className="text-2xl font-bold text-textMain mb-4">{title}</h1>
    <p className="text-gray-500">This module is coming soon or restricted in your plan.</p>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/features" element={<Features />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify-reset" element={<VerifyReset />} />
        
        {/* Unified Dashboard Redirect */}
        <Route path="/dashboard" element={<DashboardRedirect />} />

        {/* Firm Admin Routes */}
        <Route path="/firm" element={
          <AuthGuard requiredRole="Firm Admin">
            <DashboardLayout role="Firm Admin"><FirmDashboard /></DashboardLayout>
          </AuthGuard>
        } />
        <Route path="/firm/clients" element={
          <AuthGuard requiredRole="Firm Admin">
            <DashboardLayout role="Firm Admin"><Clients /></DashboardLayout>
          </AuthGuard>
        } />
        <Route path="/firm/cases" element={
          <AuthGuard requiredRole="Firm Admin">
            <DashboardLayout role="Firm Admin"><Cases /></DashboardLayout>
          </AuthGuard>
        } />
        <Route path="/firm/tasks" element={
          <AuthGuard requiredRole="Firm Admin">
            <DashboardLayout role="Firm Admin"><Tasks /></DashboardLayout>
          </AuthGuard>
        } />
        <Route path="/firm/documents" element={
          <AuthGuard requiredRole="Firm Admin">
            <DashboardLayout role="Firm Admin"><Documents /></DashboardLayout>
          </AuthGuard>
        } />
        <Route path="/firm/billing" element={
          <AuthGuard requiredRole="Firm Admin">
            <DashboardLayout role="Firm Admin"><Billing /></DashboardLayout>
          </AuthGuard>
        } />

        {/* Staff Routes */}
        <Route path="/staff" element={
          <AuthGuard requiredRole="Staff">
            <DashboardLayout role="Staff"><StaffDashboard /></DashboardLayout>
          </AuthGuard>
        } />
        <Route path="/staff/cases" element={
          <AuthGuard requiredRole="Staff">
            <DashboardLayout role="Staff"><Cases /></DashboardLayout>
          </AuthGuard>
        } />
        <Route path="/staff/tasks" element={
          <AuthGuard requiredRole="Staff">
            <DashboardLayout role="Staff"><Tasks /></DashboardLayout>
          </AuthGuard>
        } />
        <Route path="/staff/documents" element={
          <AuthGuard requiredRole="Staff">
            <DashboardLayout role="Staff"><Documents /></DashboardLayout>
          </AuthGuard>
        } />
        <Route path="/staff/*" element={
          <AuthGuard requiredRole="Staff">
            <DashboardLayout role="Staff"><Placeholder title="Module in Progress" /></DashboardLayout>
          </AuthGuard>
        } />

        {/* Client Routes */}
        <Route path="/client" element={
          <AuthGuard requiredRole="Client">
            <DashboardLayout role="Client"><ClientDashboard /></DashboardLayout>
          </AuthGuard>
        } />
        <Route path="/client/cases" element={
          <AuthGuard requiredRole="Client">
            <DashboardLayout role="Client"><Cases /></DashboardLayout>
          </AuthGuard>
        } />
        <Route path="/client/documents" element={
          <AuthGuard requiredRole="Client">
            <DashboardLayout role="Client"><Documents /></DashboardLayout>
          </AuthGuard>
        } />
        <Route path="/client/billing" element={
          <AuthGuard requiredRole="Client">
            <DashboardLayout role="Client"><Billing /></DashboardLayout>
          </AuthGuard>
        } />
        <Route path="/client/*" element={
          <AuthGuard requiredRole="Client">
            <DashboardLayout role="Client"><Placeholder title="Module in Progress" /></DashboardLayout>
          </AuthGuard>
        } />

        {/* Super Admin Routes */}
        <Route path="/admin" element={
          <AuthGuard requiredRole="Super Admin">
            <DashboardLayout role="Super Admin"><AdminDashboard /></DashboardLayout>
          </AuthGuard>
        } />
        <Route path="/admin/firms" element={
          <AuthGuard requiredRole="Super Admin">
            <DashboardLayout role="Super Admin"><AdminFirms /></DashboardLayout>
          </AuthGuard>
        } />
        <Route path="/admin/*" element={
          <AuthGuard requiredRole="Super Admin">
            <DashboardLayout role="Super Admin"><Placeholder title="Module in Progress" /></DashboardLayout>
          </AuthGuard>
        } />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
