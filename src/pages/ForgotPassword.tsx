import React, { useState } from 'react';
import { insforge } from '../lib/insforge';
import { useNavigate, Link } from 'react-router-dom';
import { Scale, Mail, AlertCircle, Loader2, ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleResetRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error: resetError } = await insforge.auth.sendResetPasswordEmail({ email });
      if (resetError) throw resetError;
      setSuccess(true);
      
      // Navigate to verify-reset page after a short delay
      setTimeout(() => {
        navigate(`/verify-reset?email=${encodeURIComponent(email)}`);
      }, 1500);
    } catch (err: any) {
      setError(err.message || 'Failed to send reset email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-twelve shadow-2xl border border-gray-100 p-8 my-8">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-twelve flex items-center justify-center mb-4 shadow-lg shadow-primary/20">
            <Scale size={32} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-textMain mb-2">SoluGrow</h1>
          <p className="text-gray-500 text-center">Reset your account password</p>
        </div>

        {success ? (
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                <CheckCircle2 size={32} />
              </div>
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-textMain">Check your email</h2>
              <p className="text-gray-500 text-sm">
                We've sent a password reset link to <span className="font-semibold text-textMain">{email}</span>.
                Please check your inbox and follow the instructions.
              </p>
            </div>
            <Link 
              to="/login"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold transition-colors"
            >
              <ArrowLeft size={18} />
              Return to Login
            </Link>
          </div>
        ) : (
          <>
            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-xl flex items-center gap-3 text-red-600 animate-shake">
                <AlertCircle size={20} />
                <span className="text-sm font-medium">{error}</span>
              </div>
            )}

            <form onSubmit={handleResetRequest} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 block ml-1">Work Email</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={18} />
                  <input
                    type="email"
                    required
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3.5 pl-12 pr-4 text-textMain focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="name@firm.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-opacity-90 disabled:opacity-50 text-white font-bold py-4 rounded-twelve shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : <Mail size={20} />}
                {loading ? 'Sending link...' : 'Send Reset Link'}
              </button>

              <div className="text-center pt-4">
                <Link 
                  to="/login"
                  className="inline-flex items-center gap-2 text-gray-500 hover:text-primary font-medium transition-colors text-sm"
                >
                  <ArrowLeft size={16} />
                  Back to sign in
                </Link>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
