import { Button } from "@/components/ui/button";
import { FileText, Sparkles, Eye, Building, Calculator, Globe, Zap, Shield, Download } from "lucide-react";
import AdvancedInvoiceGenerator from "@/components/advanced-invoice-generator";

const features = [
  {
    icon: Calculator,
    title: "Advanced Calculations",
    description: "Automatic tax calculations, discounts, and multi-currency support with real-time totals.",
    color: "bg-gradient-to-br from-blue-500 to-blue-600",
    emoji: "🧮"
  },
  {
    icon: Globe,
    title: "Multi-Currency Support",
    description: "Support for 8 major currencies including USD, EUR, GBP, and more with proper formatting.",
    color: "bg-gradient-to-br from-green-500 to-green-600",
    emoji: "🌍"
  },
  {
    icon: Building,
    title: "Professional Templates",
    description: "Beautiful, clean invoice layouts that make your business look professional and trustworthy.",
    color: "bg-gradient-to-br from-purple-500 to-purple-600",
    emoji: "🏢"
  },
  {
    icon: Zap,
    title: "Instant PDF Generation",
    description: "Generate and download professional PDFs instantly with all your branding and details.",
    color: "bg-gradient-to-br from-orange-500 to-orange-600",
    emoji: "⚡"
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Your data stays private. No signup required, and nothing is stored on our servers.",
    color: "bg-gradient-to-br from-red-500 to-red-600",
    emoji: "🔒"
  },
  {
    icon: Download,
    title: "Easy Export",
    description: "Download your invoices as PDFs or save your templates for future use.",
    color: "bg-gradient-to-br from-indigo-500 to-indigo-600",
    emoji: "📤"
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden pt-8 pb-20">
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-600 rounded-3xl flex items-center justify-center shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
                <FileText size={40} className="text-white" />
              </div>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold text-slate-900 mb-6 leading-tight">
              Professional
              <span className="block bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Invoice Generator
              </span>
            </h1>
            
            <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-12 leading-relaxed">
              Create stunning, professional invoices in minutes. Perfect for freelancers, 
              consultants, and small businesses who want to get paid faster with beautiful, 
              detailed invoices.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold shadow-luxury hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                onClick={() => document.getElementById('invoice-generator')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Sparkles className="mr-2" size={20} />
                Start Creating
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-slate-300 text-slate-700 hover:bg-slate-100 px-8 py-4 text-lg font-semibold"
              >
                <Eye className="mr-2" size={20} />
                View Example
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Everything You Need for Professional Invoicing
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Advanced features designed to make invoicing simple, fast, and professional
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200/50 hover:border-blue-200 transform hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-14 h-14 ${feature.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon size={28} className="text-white" />
                  </div>
                  <div className="text-2xl">{feature.emoji}</div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Advanced Invoice Generator */}
      <div id="invoice-generator" className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Create Your Professional Invoice
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Fill in your details and watch your invoice come to life with real-time preview
            </p>
          </div>
          
          <AdvancedInvoiceGenerator />
        </div>
      </div>
      
      {/* Enhanced CTA Section */}
      <div className="py-20 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-6xl mx-auto text-center px-6">
          <div className="text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to create your first invoice?
            </h2>
            <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto leading-relaxed">
              Join thousands of freelancers and small businesses who trust InvoiceFlow for their professional invoicing needs.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button
                size="lg"
                className="bg-white text-purple-600 hover:bg-slate-50 px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                onClick={() => document.getElementById('invoice-generator')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Start Creating Invoices
              </Button>
              
              <div className="text-white/80 text-sm">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <span>No signup required</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                  <span>Instant PDF download</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
