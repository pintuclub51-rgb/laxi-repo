import React, { useState, useEffect } from 'react';
import { insforge } from '../lib/insforge';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Scale, Lock, KeyRound, AlertCircle, Loader2, CheckCircle2, Eye, EyeOff, ArrowLeft } from 'lucide-react';

export default function VerifyReset() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const email = searchParams.get('email');

  useEffect(() => {
    if (!email) {
      setError('Email is missing. Please go back to the forgot password page.');
    }
  }, [email]);

  const handleVerifyAndReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    if (otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Step 1: Exchange code for reset token
      const { data: exchangeData, error: exchangeError } = await insforge.auth.exchangeResetPasswordToken({
        email,
        code: otp
      });

      if (exchangeError) throw exchangeError;
      if (!exchangeData?.token) throw new Error('Failed to obtain reset token');

      // Step 2: Reset the password
      const { error: resetError } = await insforge.auth.resetPassword({
        otp: exchangeData.token,
        newPassword: password
      });

      if (resetError) throw resetError;

      setSuccess(true);
      
      // Step 3: Auto-login
      const { data: authData, error: loginError } = await insforge.auth.signInWithPassword({
        email,
        password
      });

      if (loginError) {
        console.error('Auto-login failed after reset:', loginError);
        // If auto-login fails, just show the success message and let them login manually
        setTimeout(() => navigate('/login'), 3000);
        return;
      }

      // Fetch profile to determine role and redirect
      const { data: profile } = await insforge.database
        .from('profiles')
        .select('role')
        .eq('id', authData?.user?.id || '')
        .single();

      const role = profile?.role;
      setTimeout(() => {
        if (role === 'Super Admin') navigate('/admin');
        else if (role === 'Staff') navigate('/staff');
        else if (role === 'Client') navigate('/client');
        else navigate('/firm'); // Default to firm for Firm Admin or others
      }, 2000);

    } catch (err: any) {
      setError(err.message || 'Verification or reset failed');
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
          <p className="text-gray-500 text-center">Enter the OTP sent to <span className="font-semibold text-textMain">{email}</span></p>
        </div>

        {success ? (
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                <CheckCircle2 size={32} />
              </div>
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-textMain">Password Updated!</h2>
              <p className="text-gray-500 text-sm">
                Success! You are being automatically logged in and redirected to your dashboard...
              </p>
            </div>
            <Loader2 className="animate-spin text-primary mx-auto" size={24} />
          </div>
        ) : (
          <>
            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-xl flex items-center gap-3 text-red-600 animate-shake">
                <AlertCircle size={20} />
                <span className="text-sm font-medium">{error}</span>
              </div>
            )}

            <form onSubmit={handleVerifyAndReset} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 block ml-1">6-Digit OTP</label>
                <div className="relative group">
                  <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={18} />
                  <input
                    type="text"
                    required
                    maxLength={6}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3.5 pl-12 pr-4 text-textMain focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all tracking-[0.5em] font-mono text-lg"
                    placeholder="000000"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 block ml-1">New Password</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={18} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3.5 pl-12 pr-12 text-textMain focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || !email}
                className="w-full bg-primary hover:bg-opacity-90 disabled:opacity-50 text-white font-bold py-4 rounded-twelve shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : <CheckCircle2 size={20} />}
                {loading ? 'Verifying...' : 'Update & Login'}
              </button>

              <div className="text-center pt-4">
                <button
                  type="button"
                  onClick={() => navigate('/forgot-password')}
                  className="inline-flex items-center gap-2 text-gray-500 hover:text-primary font-medium transition-colors text-sm"
                >
                  <ArrowLeft size={16} />
                  Resend OTP or change email
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
