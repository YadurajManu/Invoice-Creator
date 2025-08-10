import { ArrowDown, Play, Sparkles, CheckCircle } from "lucide-react";

export default function HeroSection() {
  const scrollToGenerator = () => {
    document.getElementById('generator')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with enhanced gradient */}
      <div className="absolute inset-0 gradient-surface"></div>
      
      {/* Floating elements for visual interest */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl animate-float"></div>
      <div className="absolute top-40 right-20 w-32 h-32 bg-secondary/10 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-40 left-1/4 w-16 h-16 bg-primary/5 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-8 animate-scale-in">
            <Sparkles size={16} />
            <span>Professional Invoicing Made Easy</span>
          </div>
          
          {/* Main Headline */}
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-8 leading-[0.9] animate-slide-up-fade">
            <span className="block text-slate-900 mb-2">Create Stunning</span>
            <span className="block text-gradient">Invoices</span>
            <span className="block text-slate-600 text-4xl md:text-5xl lg:text-6xl font-medium mt-2">in seconds</span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-slate-600 mb-12 max-w-4xl mx-auto leading-relaxed animate-slide-up-fade" style={{ animationDelay: '0.2s' }}>
            Generate beautiful, professional invoices instantly. Built for freelancers, consultants, and small businesses who demand excellence.
          </p>
          
          {/* Feature highlights */}
          <div className="flex flex-wrap justify-center gap-6 mb-12 animate-slide-up-fade" style={{ animationDelay: '0.4s' }}>
            {['No signup required', 'Instant PDF download', 'Professional templates'].map((feature, index) => (
              <div key={index} className="flex items-center gap-2 text-slate-700">
                <CheckCircle size={20} className="text-success" />
                <span className="font-medium">{feature}</span>
              </div>
            ))}
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20 animate-slide-up-fade" style={{ animationDelay: '0.6s' }}>
            <button 
              onClick={scrollToGenerator}
              className="group relative button-primary px-12 py-5 rounded-2xl font-semibold text-xl shadow-luxury hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300"
            >
              <span className="relative z-10 flex items-center gap-3">
                <Sparkles size={24} />
                Start Creating
                <ArrowDown size={20} className="group-hover:translate-y-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-purple-600 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300"></div>
            </button>
            
            <button className="group flex items-center gap-3 text-slate-700 hover:text-primary px-8 py-5 rounded-2xl font-semibold text-xl transition-all duration-300 hover:bg-white hover:shadow-md">
              <div className="w-12 h-12 bg-slate-100 group-hover:bg-primary/10 rounded-full flex items-center justify-center transition-colors duration-300">
                <Play size={20} className="ml-1" />
              </div>
              Watch Demo
            </button>
          </div>

          {/* Enhanced Hero Visual */}
          <div className="relative mx-auto max-w-5xl animate-slide-up-fade" style={{ animationDelay: '0.8s' }}>
            {/* Background glow */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent blur-3xl transform scale-110"></div>
            
            {/* Main invoice mockup */}
            <div className="relative bg-white rounded-3xl shadow-luxury p-10 border border-slate-200/50 transform rotate-1 hover:rotate-0 transition-transform duration-500">
              {/* Invoice header */}
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h3 className="text-3xl font-bold text-slate-900 mb-2">INVOICE</h3>
                  <p className="text-primary font-semibold text-lg">#INV-2024-001</p>
                </div>
                <div className="text-right">
                  <div className="text-slate-900 font-bold text-xl mb-1">Creative Studio</div>
                  <p className="text-slate-600">Date: March 15, 2024</p>
                  <p className="text-slate-600">Due: April 15, 2024</p>
                </div>
              </div>
              
              {/* Bill to section */}
              <div className="mb-8 p-4 bg-slate-50 rounded-xl">
                <h4 className="font-semibold text-slate-700 mb-2">Bill To:</h4>
                <p className="text-slate-900 font-medium text-lg">Acme Corporation</p>
                <p className="text-slate-600">client@acme.com</p>
              </div>
              
              {/* Services table */}
              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <div className="bg-slate-50 px-6 py-4 grid grid-cols-4 gap-4 text-sm font-semibold text-slate-700">
                  <div className="col-span-2">Service Description</div>
                  <div className="text-center">Qty</div>
                  <div className="text-right">Amount</div>
                </div>
                <div className="px-6 py-4 grid grid-cols-4 gap-4 border-t border-slate-200">
                  <div className="col-span-2 text-slate-900 font-medium">Website Development & Design</div>
                  <div className="text-center text-slate-600">1</div>
                  <div className="text-right font-semibold text-slate-900">$2,500.00</div>
                </div>
                <div className="px-6 py-4 grid grid-cols-4 gap-4 border-t border-slate-200">
                  <div className="col-span-2 text-slate-900 font-medium">Brand Identity Package</div>
                  <div className="text-center text-slate-600">1</div>
                  <div className="text-right font-semibold text-slate-900">$1,200.00</div>
                </div>
              </div>
              
              {/* Total section */}
              <div className="flex justify-end mt-8">
                <div className="bg-primary rounded-2xl p-6 text-white">
                  <div className="text-sm opacity-90 mb-1">Total Amount</div>
                  <div className="text-3xl font-bold">$3,700.00</div>
                </div>
              </div>
            </div>
            
            {/* Floating UI elements */}
            <div className="absolute -top-6 -left-6 bg-white rounded-xl shadow-lg p-4 animate-float">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center">
                  <CheckCircle size={16} className="text-white" />
                </div>
                <span className="font-medium text-slate-700">Auto-calculated</span>
              </div>
            </div>
            
            <div className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-lg p-4 animate-float" style={{ animationDelay: '1s' }}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <Sparkles size={16} className="text-white" />
                </div>
                <span className="font-medium text-slate-700">PDF Ready</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
