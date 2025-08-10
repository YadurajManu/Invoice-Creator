import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import FeaturesSection from "@/components/features-section";
import InvoiceGenerator from "@/components/invoice-generator";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-800">
      <Navigation />
      <HeroSection />
      <FeaturesSection />
      <InvoiceGenerator />
      <section className="py-20 gradient-bg">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="text-white">
            <h2 className="text-4xl font-bold mb-6">Ready to streamline your invoicing?</h2>
            <p className="text-xl mb-8 text-blue-100">Join thousands of freelancers who trust InvoiceFlow for their professional invoicing needs.</p>
            <button 
              onClick={() => document.getElementById('generator')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-primary hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Start Creating Invoices
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
