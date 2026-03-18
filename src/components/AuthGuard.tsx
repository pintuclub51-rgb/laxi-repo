import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { insforge } from '../lib/insforge';
import { Loader2 } from 'lucide-react';

export default function AuthGuard({ children, requiredRole }: { children: React.ReactNode, requiredRole?: string }) {
  const [user, setUser] = useState<any>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await insforge.auth.getCurrentUser();
        const currentUser = data?.user;
        
        if (currentUser) {
          setUser(currentUser);
          const { data: profile } = await insforge.database
            .from('profiles')
            .select('role')
            .eq('id', currentUser.id)
            .single();
          
          if (profile) setRole(profile.role);
        }
      } catch (err) {
        console.error('Auth check failed:', err);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={48} />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRole && role !== requiredRole && role !== 'Super Admin') {
    const dashboardMap: Record<string, string> = {
      'Firm Admin': '/firm',
      'Staff': '/staff',
      'Client': '/client',
      'Super Admin': '/admin'
    };
    return <Navigate to={dashboardMap[role || ''] || '/login'} replace />;
  }

  return <>{children}</>;
}
