import { Link } from 'react-router-dom';
import { 
  Scale, Users, Briefcase, ShieldCheck, 
  Zap, FileText, PieChart, MessageCircle, 
  CheckCircle2, Check, Mail, Phone, MapPin
} from 'lucide-react';

const Nav = () => (
  <header className="fixed top-0 w-full z-50 glass-nav border-b border-gray-200">
    <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <div className="p-2 bg-primary rounded-twelve text-white">
          <Scale className="w-6 h-6" />
        </div>
        <span className="text-xl font-bold text-primary tracking-tight">SoluGrow</span>
      </div>
      <div className="hidden md:flex items-center space-x-8">
        <a className="text-sm font-medium hover:text-primary transition-colors" href="#home">Home</a>
        <a className="text-sm font-medium hover:text-primary transition-colors" href="#features">Features</a>
        <a className="text-sm font-medium hover:text-primary transition-colors" href="#pricing">Pricing</a>
        <a className="text-sm font-medium hover:text-primary transition-colors" href="#contact">Contact</a>
      </div>
      <div className="flex items-center space-x-4">
        <Link className="text-sm font-semibold hover:text-primary" to="/login">Login</Link>
        <Link className="bg-primary text-white px-6 py-2.5 rounded-twelve text-sm font-semibold hover:bg-opacity-90 transition-all shadow-md" to="/signup">
          Start Free Trial
        </Link>
      </div>
    </nav>
  </header>
);

const Hero = () => (
  <section className="relative py-20 lg:py-32 overflow-hidden" id="home">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <h1 className="text-5xl lg:text-6xl font-extrabold text-textMain leading-[1.1]">
            SoluGrow <span className="text-primary">Legal Practice</span> Suite
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
            Manage clients, cases, documents and billing in one intelligent workspace built for CA firms and legal professionals.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link className="bg-primary text-white px-8 py-4 rounded-twelve font-bold text-lg hover:scale-105 transition-transform shadow-lg text-center" to="/signup">
              Start Free Trial
            </Link>
            <a className="border-2 border-primary text-primary px-8 py-4 rounded-twelve font-bold text-lg hover:bg-primary hover:text-white transition-all flex items-center justify-center space-x-2" href="https://wa.me/919719408937" target="_blank" rel="noopener noreferrer">
              <MessageCircle className="w-5 h-5" />
              <span>Book Demo</span>
            </a>
          </div>
        </div>
        <div className="relative">
          <div className="bg-primary/5 absolute -inset-4 rounded-[2rem] -rotate-2"></div>
          <img 
            alt="Legal professional working in a modern office" 
            className="relative z-10 rounded-twelve shadow-2xl w-full h-[500px] object-cover" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCUeNtLmuLmwxQmDi2XzMy82Ue8uSAtgDYVGxRI4LhzuRVOTaidFmv8aiJJFn8Mc0ZFS9h-Wd9xfoXNocT3tAhvLRabXjwKENZ8ejXFgpy72UhQpX0RmAMCGnf7xCcKNAVGHiUsxmHC6YybynjTEoFvlVnrkshUUCzvnYsr6gVsvMwe1eV98lHvqdrZfnFDQEJAUEZnd4-7BYE6hMY5DkrY_d4Z0dXYlKFwMZV-j6febXka9IZ-KuFxZlwZb4TtErbz6D0Khjn7uA" 
          />
        </div>
      </div>
    </div>
  </section>
);

const ServiceCard = ({ icon: Icon, title, description }: any) => (
  <div className="p-8 border border-gray-100 rounded-twelve card-shadow bg-background/30 text-left">
    <div className="w-12 h-12 bg-primary/10 text-primary rounded-twelve flex items-center justify-center mb-6">
      <Icon className="w-6 h-6" />
    </div>
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const Services = () => (
  <section className="py-24 bg-white" id="features">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 className="text-3xl font-bold mb-16">All-in-One Legal Management</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <ServiceCard icon={Users} title="Client Management" description="Centralized database for all client communications, history, and sensitive documentation." />
        <ServiceCard icon={Briefcase} title="Case Tracking" description="Track every stage of litigation or consultation with automated status updates and alerts." />
        <ServiceCard icon={ShieldCheck} title="Document Vault" description="Secure, encrypted storage for legal briefs, contracts, and financial records with version control." />
        <ServiceCard icon={Zap} title="Task Automation" description="Eliminate repetitive tasks with workflow automation designed for busy legal practitioners." />
        <ServiceCard icon={FileText} title="Billing & Invoices" description="Professional invoice generation with integrated payment tracking and tax compliance." />
        <ServiceCard icon={PieChart} title="Analytics Dashboard" description="Get a birds-eye view of your firm's performance, revenue growth, and case load." />
      </div>
    </div>
  </section>
);

const FeatureSection = () => (
  <section className="py-24">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
        <div className="order-2 lg:order-1">
          <img 
            alt="Team discussing financial charts" 
            className="rounded-twelve shadow-xl" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBmW6S2YEhCXZDdJw_UgYJOehww88xflHYBm3zAVgkPoUc9cTe_nrgDohEwZPhf6b2C5BJDWcFRhXHU_5hqRzpOiKO_9rVq1yVsSRR-1Zxv0uNrZXbSgeOP-MIM0PspZduY1nIaDS8T87-mI9e_0J3GrMFXpaDHu3lVncRGwub1BtLX9a9mCmB3cDAIKDnlE2pwCpUSKH7bup76qeLx_RF1E4-tDi5AmC_Hayedq4AB4C_JsMktFoABsa0xnIuiNsyivcX2QVyy_Q" 
          />
        </div>
        <div className="order-1 lg:order-2 space-y-6 text-left">
          <h2 className="text-4xl font-bold text-textMain">Built for Collaboration</h2>
          <p className="text-gray-600 text-lg">Our multi-user workspace allows your entire firm to sync in real-time. Assign tasks, share documents, and track billable hours seamlessly.</p>
          <div className="grid grid-cols-2 gap-6 pt-4">
            <div className="flex items-start space-x-3">
              <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0" />
              <span className="font-medium">Multi-User Sync</span>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0" />
              <span className="font-medium">Revenue Analytics</span>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0" />
              <span className="font-medium">Smart Task Manager</span>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0" />
              <span className="font-medium">Case Timeline</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Pricing = () => (
  <section className="py-24 bg-white" id="pricing">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 className="text-4xl font-bold mb-4">Transparent Pricing</h2>
      <p className="text-gray-600 mb-16">Choose a plan that scales with your practice.</p>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="p-10 bg-background/20 rounded-twelve border border-gray-100 flex flex-col items-center">
          <span className="font-bold text-primary mb-4">Starter</span>
          <div className="mb-6">
            <span className="text-4xl font-extrabold">₹999</span>
            <span className="text-gray-500">/mo</span>
          </div>
          <ul className="space-y-4 mb-8 text-left w-full">
            <li className="flex items-center text-sm"><Check className="w-4 h-4 mr-2 text-primary" /> 5 Clients</li>
            <li className="flex items-center text-sm"><Check className="w-4 h-4 mr-2 text-primary" /> Basic Document Vault</li>
            <li className="flex items-center text-sm"><Check className="w-4 h-4 mr-2 text-primary" /> Case Tracking</li>
          </ul>
          <Link className="w-full py-3 bg-white border border-primary text-primary font-bold rounded-twelve hover:bg-primary hover:text-white transition-all text-center" to="/signup">Choose Plan</Link>
        </div>
        <div className="p-10 bg-primary text-white rounded-twelve transform lg:scale-105 shadow-2xl flex flex-col items-center relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-yellow-400 text-primary text-[10px] font-bold px-4 py-1 uppercase tracking-widest -rotate-45 translate-x-4 translate-y-2">Popular</div>
          <span className="font-bold mb-4">Professional</span>
          <div className="mb-6">
            <span className="text-4xl font-extrabold">₹2499</span>
            <span className="text-white/80">/mo</span>
          </div>
          <ul className="space-y-4 mb-8 text-left w-full">
            <li className="flex items-center text-sm"><Check className="w-4 h-4 mr-2" /> Unlimited Clients</li>
            <li className="flex items-center text-sm"><Check className="w-4 h-4 mr-2" /> Priority Support</li>
            <li className="flex items-center text-sm"><Check className="w-4 h-4 mr-2" /> Advanced Analytics</li>
            <li className="flex items-center text-sm"><Check className="w-4 h-4 mr-2" /> Multi-User Sync</li>
          </ul>
          <Link className="w-full py-3 bg-white text-primary font-bold rounded-twelve hover:bg-gray-100 transition-all text-center" to="/signup">Choose Plan</Link>
        </div>
        <div className="p-10 bg-background/20 rounded-twelve border border-gray-100 flex flex-col items-center">
          <span className="font-bold text-primary mb-4">Enterprise</span>
          <div className="mb-6">
            <span className="text-4xl font-extrabold">Custom</span>
          </div>
          <ul className="space-y-4 mb-8 text-left w-full">
            <li className="flex items-center text-sm"><Check className="w-4 h-4 mr-2 text-primary" /> Custom Integrations</li>
            <li className="flex items-center text-sm"><Check className="w-4 h-4 mr-2 text-primary" /> Dedicated Manager</li>
            <li className="flex items-center text-sm"><Check className="w-4 h-4 mr-2 text-primary" /> On-Premise Support</li>
          </ul>
          <Link className="w-full py-3 bg-white border border-primary text-primary font-bold rounded-twelve hover:bg-primary hover:text-white transition-all text-center" to="/signup">Choose Plan</Link>
        </div>
      </div>
    </div>
  </section>
);

const Contact = () => (
  <section className="py-24" id="contact">
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-twelve shadow-xl overflow-hidden grid md:grid-cols-2">
        <div className="p-12 bg-primary text-white text-left">
          <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
          <p className="mb-10 text-white/80">Have questions about our platform? We're here to help legal professionals scale their operations.</p>
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <Mail className="w-6 h-6" />
              <span>solugrow@gmail.com</span>
            </div>
            <a className="flex items-center space-x-4 hover:underline" href="https://wa.me/919719408937" target="_blank" rel="noopener noreferrer">
              <Phone className="w-6 h-6" />
              <span>+91 9719408937</span>
            </a>
            <div className="flex items-center space-x-4">
              <MapPin className="w-6 h-6" />
              <span>U.P, India</span>
            </div>
          </div>
        </div>
        <div className="p-12 text-left">
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <input className="w-full rounded-twelve border-gray-200 focus:border-primary focus:ring-primary py-2 px-3 border" type="text" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email Address</label>
              <input className="w-full rounded-twelve border-gray-200 focus:border-primary focus:ring-primary py-2 px-3 border" type="email" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Message</label>
              <textarea className="w-full rounded-twelve border-gray-200 focus:border-primary focus:ring-primary py-2 px-3 border" rows={4}></textarea>
            </div>
            <button className="w-full py-3 bg-primary text-white font-bold rounded-twelve hover:opacity-90 transition-all shadow-md" type="submit">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-textMain text-white py-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-4 gap-12 mb-12 border-b border-white/10 pb-12">
        <div className="col-span-1 md:col-span-1 text-left">
          <div className="flex items-center space-x-2 mb-6">
            <div className="p-1.5 bg-primary rounded-twelve">
              <Scale className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">SoluGrow</span>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed">
            The next generation legal practice management suite for modern firms.
          </p>
        </div>
        <div className="text-left">
          <h4 className="font-bold mb-6">Product</h4>
          <ul className="space-y-4 text-sm text-gray-400">
            <li><a className="hover:text-white" href="#features">Features</a></li>
            <li><a className="hover:text-white" href="#pricing">Pricing</a></li>
            <li><Link className="hover:text-white" to="/signup">Free Trial</Link></li>
          </ul>
        </div>
        <div className="text-left">
          <h4 className="font-bold mb-6">Company</h4>
          <ul className="space-y-4 text-sm text-gray-400">
            <li><a className="hover:text-white" href="#contact">Contact Us</a></li>
            <li><Link className="hover:text-white" to="/login">Login</Link></li>
            <li><a className="hover:text-white" href="#">Privacy Policy</a></li>
          </ul>
        </div>
        <div className="text-left">
          <h4 className="font-bold mb-6">Connect</h4>
          <div className="text-sm text-gray-400 space-y-2">
            <p>solugrow@gmail.com</p>
            <p>+91 9719408937</p>
            <p>Uttar Pradesh, India</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
        <p>© 2023 SoluGrow Legal Practice Suite. All rights reserved.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a className="hover:text-white" href="#">LinkedIn</a>
          <a className="hover:text-white" href="#">Twitter</a>
          <a className="hover:text-white" href="https://wa.me/919719408937" target="_blank" rel="noopener noreferrer">WhatsApp</a>
        </div>
      </div>
    </div>
  </footer>
);

export default function Landing() {
  return (
    <div className="min-h-screen bg-background text-textMain">
      <Nav />
      <Hero />
      <Services />
      <FeatureSection />
      <Pricing />
      <Contact />
      <Footer />
    </div>
  );
}
