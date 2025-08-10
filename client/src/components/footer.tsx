import { FileText } from "lucide-react";

export default function Footer() {
  return (
    <footer id="contact" className="bg-slate-800 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
                <FileText className="text-white text-sm" size={16} />
              </div>
              <span className="text-xl font-bold">InvoiceFlow</span>
            </div>
            <p className="text-slate-300 mb-6 max-w-md">Professional invoice generation made simple. Perfect for freelancers, consultants, and small businesses.</p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-slate-700 hover:bg-primary rounded-lg flex items-center justify-center transition-colors duration-300">
                <span>𝕏</span>
              </a>
              <a href="#" className="w-10 h-10 bg-slate-700 hover:bg-primary rounded-lg flex items-center justify-center transition-colors duration-300">
                <span>in</span>
              </a>
              <a href="#" className="w-10 h-10 bg-slate-700 hover:bg-primary rounded-lg flex items-center justify-center transition-colors duration-300">
                <span>⚡</span>
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-slate-300">
              <li><a href="#features" className="hover:text-white transition-colors duration-300">Features</a></li>
              <li><a href="#generator" className="hover:text-white transition-colors duration-300">Generator</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-300">Templates</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-300">Pricing</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-slate-300">
              <li><a href="#" className="hover:text-white transition-colors duration-300">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-300">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-300">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-300">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-700 mt-12 pt-8 text-center text-slate-400">
          <p>&copy; 2024 InvoiceFlow. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
