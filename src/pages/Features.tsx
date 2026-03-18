import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Users, Briefcase, FolderLock, CheckSquare, Receipt, 
  BarChart3, Cpu, UserCircle, Building, Scale,
  ChevronRight, Mail, MapPin, Phone,
  ScanLine, MessageSquare, ShieldCheck, PenTool, RefreshCw, Bot
} from 'lucide-react';

const icons = {
  users: Users,
  briefcase: Briefcase,
  'folder-lock': FolderLock,
  checklist: CheckSquare,
  receipt: Receipt,
  'bar-chart': BarChart3,
  cpu: Cpu,
  'user-circle': UserCircle,
  building: Building,
  'scan-line': ScanLine,
  'message-square': MessageSquare,
  'shield-check': ShieldCheck,
  'pen-tool': PenTool,
  'refresh-cw': RefreshCw,
  'bot': Bot
};

interface Feature {
  title: string;
  icon: string;
  description: string;
}

const coreFeatures: Feature[] = [
  {
    title: 'Client Management',
    icon: 'users',
    description: 'Manage all client profiles, companies and contact details in one place.'
  },
  {
    title: 'Case Tracking',
    icon: 'briefcase',
    description: 'Track legal or accounting work with real-time status updates.'
  },
  {
    title: 'Document Vault',
    icon: 'folder-lock',
    description: 'Securely upload and store client documents in the cloud.'
  },
  {
    title: 'Task Manager',
    icon: 'checklist',
    description: 'Assign and track tasks for team members with deadlines.'
  },
  {
    title: 'Billing & Invoices',
    icon: 'receipt',
    description: 'Generate invoices, track payments, and manage expenses.'
  },
  {
    title: 'Multi-Firm Support',
    icon: 'building',
    description: 'Manage multiple branches or teams under one platform.'
  }
];

const automationFeatures: Feature[] = [
  {
    title: 'AI Document OCR',
    icon: 'scan-line',
    description: 'Automatically extract data from PAN, Aadhaar, and Bills to save hours of typing.'
  },
  {
    title: 'Smart WhatsApp Reminders',
    icon: 'message-square',
    description: 'Automatic reminders for pending documents and payment dues sent via WhatsApp.'
  },
  {
    title: 'One-Click Compliance',
    icon: 'shield-check',
    description: 'Directly generate GST and ITR ready reports from your transaction data.'
  },
  {
    title: 'Digital E-Signatures',
    icon: 'pen-tool',
    description: 'Send documents for legally binding digital signatures without any paper work.'
  },
  {
    title: 'Bank Auto-Accounting',
    icon: 'refresh-cw',
    description: 'Sync and categorize bank transactions automatically with smart matching.'
  },
  {
    title: '24/7 AI WhatsApp Bot',
    icon: 'bot',
    description: 'Your clients can check case status and upload docs via a smart WhatsApp bot.'
  }
];

export default function Features() {
  const navigate = useNavigate();

  const FeatureCard = ({ feature, idx }: { feature: Feature; idx: number }) => {
    const Icon = icons[feature.icon as keyof typeof icons] || Scale;
    return (
      <motion.div
        key={idx}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: idx * 0.1 }}
        whileHover={{ y: -5 }}
        className="bg-[#F6F3F2]/50 p-8 rounded-3xl border border-gray-100 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all text-left group"
      >
        <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-md mb-6 group-hover:bg-primary group-hover:text-white transition-all">
          <Icon size={28} />
        </div>
        <h3 className="text-xl font-bold text-textMain mb-3">{feature.title}</h3>
        <p className="text-gray-600 leading-relaxed">
          {feature.description}
        </p>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-[#F6F3F2] font-sans text-[#2A2A2A] selection:bg-primary/20">
      {/* Navbar ... */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-primary rounded-twelve flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
                <Scale className="text-white" size={24} />
              </div>
              <span className="text-2xl font-bold text-textMain">SoluGrow</span>
            </Link>
            
            <div className="hidden md:flex items-center gap-8">
              <Link to="/" className="text-gray-600 hover:text-primary font-medium transition-colors">Home</Link>
              <Link to="/features" className="text-primary font-semibold transition-colors">Features</Link>
              <Link to="/pricing" className="text-gray-600 hover:text-primary font-medium transition-colors">Pricing</Link>
              <Link to="/contact" className="text-gray-600 hover:text-primary font-medium transition-colors">Contact</Link>
            </div>

            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate('/login')}
                className="text-gray-700 font-semibold px-4 py-2 hover:text-primary transition-colors"
              >
                Login
              </button>
              <button 
                onClick={() => navigate('/signup')}
                className="bg-primary hover:bg-opacity-90 text-white font-bold px-6 py-2.5 rounded-twelve shadow-lg shadow-primary/20 transition-all scale-100 hover:scale-105 active:scale-95"
              >
                Start Free Trial
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 overflow-hidden text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl lg:text-6xl font-bold text-textMain leading-tight mb-6">
                Powerful Features for <span className="text-primary italic">CA Firms</span> & Legal Professionals
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                SoluGrow provides a complete workspace to manage clients, cases, documents, billing and analytics in one platform.
              </p>
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => navigate('/signup')}
                  className="bg-primary hover:bg-opacity-90 text-white font-bold px-8 py-4 rounded-twelve shadow-xl shadow-primary/20 transition-all flex items-center gap-2 group"
                >
                  Start Free Trial
                  <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-primary/10 rounded-3xl blur-[100px] -z-10 animate-pulse"></div>
              <img 
                  src="/C:/Users/pintu/.gemini/antigravity/brain/abb1ab92-6b73-467a-a0b2-3ff231e374ba/hero_professional_legal_1773819017492.png"
                  alt="Lawyer and accountant reviewing documents"
                  className="rounded-3xl shadow-2xl border border-white/50 w-full object-cover aspect-video"
                />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Features Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-4xl font-bold text-textMain mb-4 underline decoration-primary/30 underline-offset-8 uppercase tracking-wider text-sm">Core Infrastructure</h2>
            <h3 className="text-3xl font-bold text-textMain mt-4">Everything you need to manage your firm</h3>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreFeatures.map((feature, idx) => (
              <FeatureCard key={idx} feature={feature} idx={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* Automation Features Grid */}
      <section className="py-20 bg-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-4xl font-bold text-textMain mb-4 underline decoration-primary/30 underline-offset-8 uppercase tracking-wider text-sm">Automation Powerhouse</h2>
            <h3 className="text-3xl font-bold text-textMain mt-4">End Manual Work with Smart Automation</h3>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {automationFeatures.map((feature, idx) => (
              <FeatureCard key={idx} feature={feature} idx={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* Real Image Showcase */}
      <section className="py-24 bg-[#F6F3F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-[40px] p-8 lg:p-16 shadow-2xl overflow-hidden relative border border-gray-100">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <img 
                  src="/C:/Users/pintu/.gemini/antigravity/brain/abb1ab92-6b73-467a-a0b2-3ff231e374ba/financial_charts_laptop_screen_premium_1773818061910.png"
                    alt="Financial Analytics"
                  className="rounded-3xl shadow-xl border border-gray-100"
                />
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="text-4xl font-bold text-textMain mb-6">Data-Driven Insights for Your Firm</h2>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Get a 360-degree view of your firm's health. Track revenue trends, client retention, and team efficiency with real-time analytics.
                </p>
                <ul className="space-y-4">
                  {[
                    'Automated Revenue Tracking',
                    'Case Lifecycle Analytics',
                    'Resource Allocation Optimization',
                    'Compliance Monitoring'
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-700 font-medium">
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                        <ChevronRight size={14} />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-primary rounded-[3rem] p-12 lg:p-20 text-white shadow-2xl shadow-primary/30 overflow-hidden relative"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2"></div>
            
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 relative z-10">Start Managing Your Firm with SoluGrow</h2>
            <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto relative z-10">
              Join hundreds of legal and accounting professionals who have streamlined their workflow with our suite.
            </p>
            <div className="flex flex-wrap justify-center gap-4 relative z-10">
              <button 
                onClick={() => navigate('/signup')}
                className="bg-white text-primary font-bold px-8 py-4 rounded-twelve hover:bg-gray-50 transition-all shadow-xl"
              >
                Start Free Trial
              </button>
              <button 
                onClick={() => window.location.href = 'mailto:solugrow@gmail.com'}
                className="bg-primary/20 border-2 border-white/20 hover:bg-white/10 text-white font-bold px-8 py-4 rounded-twelve transition-all backdrop-blur-sm"
              >
                Contact Support
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
                  <Scale size={18} />
                </div>
                <span className="text-xl font-bold text-textMain">SoluGrow</span>
              </div>
              <p className="text-gray-500 max-w-sm mb-6">
                The ultimate legal practice suite for modern CA firms and legal professionals.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-600">
                  <Mail size={18} className="text-primary" />
                  <span>solugrow@gmail.com</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Phone size={18} className="text-primary" />
                  <span>+91 9719408937</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <MapPin size={18} className="text-primary" />
                  <span>U.P (India)</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-[#2A2A2A] font-bold mb-6">Quick Links</h4>
              <ul className="space-y-4 text-gray-500 font-medium">
                <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
                <li><Link to="/features" className="text-primary hover:text-primary transition-colors">Features</Link></li>
                <li><Link to="/pricing" className="hover:text-primary transition-colors">Pricing</Link></li>
                <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-[#2A2A2A] font-bold mb-6">Connect</h4>
              <a 
                href="https://wa.me/919719408937" 
                target="_blank" 
                rel="noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-green-500/20"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>
          
          <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400 text-sm font-medium">
            <p>© 2026 SoluGrow – Legal Practice Suite. All rights reserved.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
