import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { insforge } from '../lib/insforge';
import { LogIn, Mail, Lock, Loader2, AlertCircle, ChevronRight, Scale } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await insforge.auth.signInWithPassword({ email, password });
      
      if (error) {
        console.log('Login attempt failed:', error);
        const msg = (error.message || '').toLowerCase();
        // Handle unverified email (check for "verify", "verification", "403", or "confirmed")
        if (msg.includes('verify') || msg.includes('verification') || msg.includes('403') || msg.includes('confirm')) {
          setShowOtp(true);
          setError(null);
          return;
        }
        throw error;
      }
      
      handleRedirect(data?.user?.id);
    } catch (err: any) {
      console.error('Login error caught:', err);
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error: verifyError } = await insforge.auth.verifyEmail({ email, otp });
      if (verifyError) throw verifyError;

      // After verification, sign in again to get the session
      const { data, error: loginError } = await insforge.auth.signInWithPassword({ email, password });
      if (loginError) throw loginError;

      handleRedirect(data?.user?.id);
    } catch (err: any) {
      setError(err.message || 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  const handleRedirect = async (userId?: string) => {
    const { data: profile } = await insforge.database
      .from('profiles')
      .select('role')
      .eq('id', userId || '')
      .single();

    const role = profile?.role;
    if (role === 'Super Admin') navigate('/admin');
    else if (role === 'Firm Admin') navigate('/firm');
    else if (role === 'Staff') navigate('/staff');
    else if (role === 'Client') navigate('/client');
    else navigate('/firm'); // Default
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4"></div>

      <div className="w-full max-w-md relative">
        <div className="bg-white/80 backdrop-blur-xl border border-gray-100 rounded-3xl p-8 shadow-2xl">
          <div className="flex flex-col items-center mb-10 text-center">
            <div className="w-16 h-16 bg-primary flex items-center justify-center rounded-twelve shadow-xl shadow-primary/20 mb-6 text-white">
              <Scale size={32} />
            </div>
            <h1 className="text-3xl font-bold text-textMain mb-2">SoluGrow</h1>
            <p className="text-gray-500">{showOtp ? 'Verification Required' : 'Legal Practice Suite'}</p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-600 px-4 py-3 rounded-xl mb-6 flex items-center gap-3 text-sm animate-shake">
              <AlertCircle size={18} />
              {error}
            </div>
          )}

          {!showOtp ? (
            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 ml-1">Work Email</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={18} />
                  <input
                    type="email"
                    required
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-12 pr-4 text-textMain focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="name@firm.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <label className="text-sm font-medium text-gray-700">Password</label>
                  <Link to="/forgot-password" className="text-xs text-primary font-semibold hover:text-primary/80">Forgot?</Link>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={18} />
                  <input
                    type="password"
                    required
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-12 pr-4 text-textMain focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-opacity-90 disabled:opacity-50 text-white font-bold py-3.5 rounded-twelve shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 mt-4 group"
              >
                {loading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <>
                    <LogIn size={20} />
                    Sign In
                    <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerify} className="space-y-6">
              <p className="text-sm text-gray-500 text-center">
                Your email <span className="font-bold text-textMain">{email}</span> is not verified. Please enter the 6-digit code sent to you.
              </p>
              
              <div className="space-y-2 text-center">
                <input
                  type="text"
                  required
                  maxLength={6}
                  autoFocus
                  className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl py-4 text-center text-3xl font-bold tracking-[0.5em] text-primary focus:outline-none focus:border-primary transition-all"
                  placeholder="000000"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                />
              </div>

              <button
                type="submit"
                disabled={loading || otp.length !== 6}
                className="w-full bg-primary hover:bg-opacity-90 disabled:opacity-50 text-white font-bold py-4 rounded-twelve shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : <LogIn size={20} />}
                {loading ? 'Verifying...' : 'Verify & Sign In'}
              </button>
              
              <button 
                type="button"
                onClick={() => setShowOtp(false)}
                className="w-full text-sm font-medium text-gray-500 hover:text-primary transition-colors"
              >
                Back to Login
              </button>
            </form>
          )}

          <div className="mt-8 text-center pt-8 border-t border-gray-100">
            <p className="text-gray-500 text-sm">
              New Firm?{' '}
              <Link to="/signup" className="text-primary font-bold hover:text-primary/80 ml-1">Create Account</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
