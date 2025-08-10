import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import FeaturesSection from "@/components/features-section";
import AdvancedInvoiceGenerator from "@/components/advanced-invoice-generator";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navigation />
      <HeroSection />
      <FeaturesSection />
      <AdvancedInvoiceGenerator />
      
      {/* Enhanced CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 gradient-primary"></div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-6xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="text-white">
            <h2 className="text-5xl md:text-6xl font-bold mb-8 animate-slide-up-fade">
              Ready to create your
              <span className="block">first invoice?</span>
            </h2>
            <p className="text-xl md:text-2xl mb-12 text-white/90 max-w-3xl mx-auto leading-relaxed animate-slide-up-fade" style={{ animationDelay: '0.2s' }}>
              Join thousands of freelancers and small businesses who trust InvoiceFlow for their professional invoicing needs.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-slide-up-fade" style={{ animationDelay: '0.4s' }}>
              <button 
                onClick={() => document.getElementById('generator')?.scrollIntoView({ behavior: 'smooth' })}
                className="group bg-white text-primary hover:bg-slate-50 px-12 py-5 rounded-2xl font-bold text-xl transition-all duration-300 transform hover:scale-[1.02] shadow-luxury hover:shadow-xl"
              >
                <span className="flex items-center gap-3">
                  Start Creating Invoices
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <span className="text-white text-sm">→</span>
                  </div>
                </span>
              </button>
              
              <div className="text-white/80 text-sm">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-4 h-4 bg-green-400 rounded-full"></div>
                  <span>No signup required</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-400 rounded-full"></div>
                  <span>Instant PDF download</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
