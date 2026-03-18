import { useEffect, useState } from 'react';
import { insforge } from '../../lib/insforge';
import { CreditCard, Check, History, Download, Loader2 } from 'lucide-react';

const PlanCard = ({ plan, onUpgrade, disabled }: any) => {
  const { name, price, features, current } = plan;
  return (
  <div className={`relative p-6 rounded-twelve border-2 transition-all ${
    current 
      ? `border-primary bg-primary/5 ring-4 ring-primary/10` 
      : 'border-gray-100 bg-white hover:border-primary/30 card-shadow'
  }`}>
    {current && (
      <span className={`absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-[10px] font-bold px-3 py-1 rounded-full text-white uppercase tracking-wider shadow-lg`}>
        Current Plan
      </span>
    )}
    <h3 className="text-xl font-bold text-textMain mb-2">{name}</h3>
    <div className="flex items-baseline gap-1 mb-6">
      <span className="text-3xl font-bold text-textMain">₹{price}</span>
      <span className="text-gray-500 text-sm">/month</span>
    </div>
    <ul className="space-y-3 mb-8 text-left">
      {features.map((f: string, i: number) => (
        <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
          <Check className="shrink-0 text-primary" size={18} />
          {f}
        </li>
      ))}
    </ul>
    <button 
      onClick={() => onUpgrade(plan)}
      disabled={disabled || current}
      className={`w-full py-2.5 rounded-twelve font-bold transition-all ${
      current 
        ? 'bg-gray-100 text-gray-400 cursor-default' 
        : `bg-primary hover:bg-opacity-90 text-white shadow-lg shadow-primary/20 disabled:opacity-50`
    }`}>
      {current ? 'Active' : disabled ? 'Processing...' : 'Upgrade Now'}
    </button>
  </div>
  );
};

export default function Billing() {
  const [invoices, setInvoices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [upgrading, setUpgrading] = useState(false);

  useEffect(() => {
    const fetchInvoices = async () => {
      const { data } = await insforge.database.from('invoices').select('*').order('created_at', { ascending: false });
      setInvoices(data || []);
      setLoading(false);
    };
    fetchInvoices();
  }, []);

  const handleUpgrade = async (plan: any) => {
    if (plan.current) return;
    setUpgrading(true);
    
    try {
      // 1. Create order via Edge Function
      const { data: order, error } = await insforge.functions.invoke('create-order', {
        body: { 
          amount: parseInt(plan.price.replace(',', '')),
          currency: 'INR',
          receipt: `plan_${plan.name.toLowerCase()}`
        }
      });

      if (error) throw error;

      // 2. Open Razorpay Checkout
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "SoluGrow",
        description: `Upgrade to ${plan.name} Plan`,
        order_id: order.id,
        handler: async function (response: any) {
          // 3. Verify payment via Edge Function
          const { data: userSession } = await (insforge.auth as any).getCurrentSession();
          const { data: profile } = await insforge.database.from('profiles').select('tenant_id').eq('id', userSession.user.id).single();

          if (!profile) throw new Error('User profile not found');

          const { error: verifyError } = await insforge.functions.invoke('verify-payment', {
            body: { 
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              tenant_id: profile.tenant_id,
              plan_name: plan.name,
              amount: parseInt(plan.price.replace(',', ''))
            }
          });

          if (verifyError) {
            alert(`Payment verification failed: ${verifyError.message}`);
          } else {
            alert(`Subscription upgraded to ${plan.name} successfully!`);
            // Refresh data
            window.location.reload();
          }
        },
        prefill: {
          name: "Legal Professional",
          email: "billing@firm.com",
        },
        theme: {
          color: "#7A2E2E",
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (err: any) {
      alert(`Upgrade failed: ${err.message}`);
    } finally {
      setUpgrading(false);
    }
  };

  const plans = [
    { 
      name: 'Starter', price: '999', color: 'slate', current: true,
      features: ['Up to 100 Clients', '5 GB Storage', 'Basic Case Tracking', 'Staff: 1 User']
    },
    { 
      name: 'Professional', price: '2,499', color: 'primary', current: false,
      features: ['Unlimited Clients', '50 GB Storage', 'Advanced Documents', 'Staff: 5 Users', 'Priority Support']
    },
    { 
      name: 'Enterprise', price: '4,999', color: 'emerald', current: false,
      features: ['Custom Storage', 'White-label Portal', 'Full Customization', 'Unlimited Staff', 'API Access']
    }
  ];

  return (
    <div className="space-y-10 pb-20 text-left">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-textMain mb-1">Billing & Subscription</h1>
          <p className="text-gray-500">Manage your plan, payments, and invoices.</p>
        </div>
        <div className="bg-primary/5 border border-primary/10 px-4 py-2 rounded-twelve flex items-center gap-3">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
          <span className="text-primary text-sm font-medium">Auto-renew active (Apr 12, 2026)</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <PlanCard 
            key={plan.name} 
            plan={plan} 
            onUpgrade={handleUpgrade} 
            disabled={upgrading}
          />
        ))}
      </div>

      {/* Invoice History */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <History className="text-gray-400" />
          <h2 className="text-xl font-bold text-textMain">Payment History</h2>
        </div>

        <div className="bg-white border border-gray-100 rounded-twelve overflow-hidden card-shadow">
          {loading ? (
            <div className="p-20 flex flex-col items-center justify-center text-gray-400">
              <Loader2 className="animate-spin mb-4" size={32} />
              <p>Fetching billing records...</p>
            </div>
          ) : invoices.length === 0 ? (
            <div className="p-12 text-center text-gray-400">
              <CreditCard className="mx-auto mb-4 opacity-10" size={48} />
              <p>No invoices found. Your next billing is due next month.</p>
            </div>
          ) : (
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-500 text-xs font-semibold uppercase">
                <tr>
                  <th className="px-6 py-4">Invoice ID</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4 text-right">Receipt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {invoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-gray-50 transition-colors group text-sm">
                    <td className="px-6 py-4 text-gray-600 font-mono text-xs">#INV-{inv.id.slice(0, 8)}</td>
                    <td className="px-6 py-4 text-textMain font-bold">₹{Number(inv.amount).toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border border-primary/20 bg-primary/5 text-primary">
                        {inv.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500">{new Date(inv.created_at).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-gray-400 hover:text-primary transition-colors">
                        <Download size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
