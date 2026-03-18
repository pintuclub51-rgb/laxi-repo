import React, { useState } from 'react';
import { insforge } from '../lib/insforge';
import { useNavigate, Link } from 'react-router-dom';
import { Scale, Mail, Lock, User, Building, AlertCircle, Loader2 } from 'lucide-react';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [firmName, setFirmName] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // 1. Sign up user
      const { error: signupError } = await insforge.auth.signUp({
        email,
        password,
      });

      if (signupError) throw signupError;
      setShowOtp(true);
    } catch (err: any) {
      setError(err.message || 'Failed to sign up');
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // 1. Verify Email
      const { error: verifyError } = await insforge.auth.verifyEmail({
        email,
        otp
      });
      if (verifyError) throw verifyError;

      // 2. Create tenant (firm)
      const { data: tenant, error: tenantError } = await insforge.database
        .from('tenants')
        .insert([{ name: firmName }])
        .select()
        .single();

      if (tenantError) throw tenantError;

      // 3. Create profile as Firm Admin
      const { data: userData } = await insforge.auth.getCurrentUser();
      const { error: profileError } = await insforge.database
        .from('profiles')
        .insert([{
          id: userData?.user?.id || '',
          tenant_id: tenant?.id,
          role: 'Firm Admin',
          full_name: fullName
        }]);

      if (profileError) throw profileError;

      navigate('/firm');
    } catch (err: any) {
      setError(err.message || 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4"></div>

      <div className="max-w-md w-full bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-100 p-8 my-8 relative">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-twelve flex items-center justify-center mb-4 shadow-lg shadow-primary/20">
            <Scale size={32} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-textMain mb-2">SoluGrow</h1>
          <p className="text-gray-500 text-center">
            {showOtp ? 'Verify your email' : 'Start your 14-day free trial of SoluGrow today'}
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-xl flex items-center gap-3 text-red-600 animate-shake">
            <AlertCircle size={20} />
            <span className="text-sm font-medium">{error}</span>
          </div>
        )}

        {!showOtp ? (
          <form onSubmit={handleSignup} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 block ml-1">Full Name</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={18} />
                <input
                  type="text"
                  required
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-12 pr-4 text-textMain focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 block ml-1">Firm Name</label>
              <div className="relative group">
                <Building className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={18} />
                <input
                  type="text"
                  required
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-12 pr-4 text-textMain focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="Elite Legal Associates"
                  value={firmName}
                  onChange={(e) => setFirmName(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 block ml-1">Work Email</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={18} />
                <input
                  type="email"
                  required
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-12 pr-4 text-textMain focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="john@firm.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 block ml-1">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={18} />
                <input
                  type="password"
                  required
                  minLength={6}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-12 pr-4 text-textMain focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="Min 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-opacity-90 disabled:opacity-50 text-white font-bold py-4 rounded-twelve shadow-lg shadow-primary/20 transition-all mt-4 flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : <Scale size={20} />}
              {loading ? 'Sending Code...' : 'Start Trial'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerify} className="space-y-6">
            <p className="text-sm text-gray-500 text-center">
              We've sent a 6-digit verification code to <span className="font-bold text-textMain">{email}</span>. Please enter it below.
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
              {loading ? <Loader2 className="animate-spin" size={20} /> : <Scale size={20} />}
              {loading ? 'Verifying...' : 'Verify & Continue'}
            </button>
            
            <button 
              type="button"
              onClick={() => setShowOtp(false)}
              className="w-full text-sm font-medium text-gray-500 hover:text-primary transition-colors"
            >
              Back to Signup
            </button>
          </form>
        )}

        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <p className="text-gray-500 text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-primary hover:text-primary/80 font-bold transition-colors ml-1">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
