import { Zap, Palette, Download } from "lucide-react";

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-800 mb-4">Everything you need</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">Simple, powerful tools to create professional invoices that get you paid faster.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="text-center p-8 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors duration-300">
            <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Zap className="text-white text-2xl" size={24} />
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-4">Lightning Fast</h3>
            <p className="text-slate-600 leading-relaxed">Create professional invoices in under 30 seconds with our streamlined interface.</p>
          </div>

          {/* Feature 2 */}
          <div className="text-center p-8 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors duration-300">
            <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Palette className="text-white text-2xl" size={24} />
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-4">Beautiful Design</h3>
            <p className="text-slate-600 leading-relaxed">Clean, modern templates that make your business look professional and trustworthy.</p>
          </div>

          {/* Feature 3 */}
          <div className="text-center p-8 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors duration-300">
            <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Download className="text-white text-2xl" size={24} />
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-4">Instant PDF</h3>
            <p className="text-slate-600 leading-relaxed">Download your invoice as a high-quality PDF ready to send to your clients.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
