import { Zap, Palette, Download, Clock, Shield, Sparkles, ArrowRight } from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Create professional invoices in under 30 seconds with our streamlined interface.",
      highlight: "30 sec",
      color: "from-yellow-400 to-orange-500"
    },
    {
      icon: Palette,
      title: "Beautiful Design",
      description: "Clean, modern templates that make your business look professional and trustworthy.",
      highlight: "Premium",
      color: "from-pink-400 to-purple-500"
    },
    {
      icon: Download,
      title: "Instant PDF",
      description: "Download your invoice as a high-quality PDF ready to send to your clients.",
      highlight: "PDF Ready",
      color: "from-blue-400 to-indigo-500"
    },
    {
      icon: Clock,
      title: "Auto Calculate",
      description: "Automatic calculations for totals, taxes, and line items. No math errors, ever.",
      highlight: "Smart",
      color: "from-green-400 to-emerald-500"
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your data stays on your device. No accounts required, complete privacy guaranteed.",
      highlight: "Private",
      color: "from-slate-400 to-slate-600"
    },
    {
      icon: Sparkles,
      title: "Professional",
      description: "Impress clients with polished, branded invoices that reflect your quality.",
      highlight: "Pro",
      color: "from-primary to-purple-600"
    }
  ];

  return (
    <section id="features" className="py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-white"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6 animate-scale-in">
            <Sparkles size={16} />
            <span>Powerful Features</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 animate-slide-up-fade">
            Everything you need to
            <span className="block text-gradient">get paid faster</span>
          </h2>
          
          <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed animate-slide-up-fade" style={{ animationDelay: '0.2s' }}>
            Simple, powerful tools designed for modern freelancers and small businesses who value efficiency and professionalism.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group relative bg-white p-8 rounded-3xl shadow-glass hover:shadow-luxury transition-all duration-500 hover:-translate-y-2 card-interactive animate-slide-up-fade"
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              {/* Background gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-slate-50/50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Content */}
              <div className="relative">
                {/* Icon */}
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <feature.icon className="text-white" size={28} />
                </div>
                
                {/* Badge */}
                <div className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-medium mb-4">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                  {feature.highlight}
                </div>
                
                {/* Title */}
                <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </h3>
                
                {/* Description */}
                <p className="text-slate-600 leading-relaxed mb-6">
                  {feature.description}
                </p>
                
                {/* Learn more link */}
                <div className="flex items-center text-primary font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <span className="mr-2">Learn more</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Bottom CTA */}
        <div className="text-center mt-20 animate-slide-up-fade" style={{ animationDelay: '0.8s' }}>
          <div className="inline-flex items-center gap-4 bg-white rounded-2xl p-6 shadow-luxury">
            <div className="flex -space-x-2">
              {[1,2,3,4].map((i) => (
                <div key={i} className={`w-10 h-10 bg-gradient-to-r ${features[i-1]?.color || 'from-slate-400 to-slate-600'} rounded-full border-2 border-white`}></div>
              ))}
            </div>
            <div className="text-left">
              <div className="font-bold text-slate-900">Join 10,000+ users</div>
              <div className="text-sm text-slate-600">Creating professional invoices daily</div>
            </div>
            <button 
              onClick={() => document.getElementById('generator')?.scrollIntoView({ behavior: 'smooth' })}
              className="button-primary px-6 py-3 rounded-xl font-semibold hover:shadow-lg"
            >
              Try It Free
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
