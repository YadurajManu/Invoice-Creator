import { Menu } from "lucide-react";
import { FileText } from "lucide-react";

export default function Navigation() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
              <FileText className="text-white text-sm" size={16} />
            </div>
            <span className="text-xl font-bold text-slate-800">InvoiceFlow</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-slate-600 hover:text-primary transition-colors duration-300">Features</a>
            <a href="#generator" className="text-slate-600 hover:text-primary transition-colors duration-300">Generator</a>
            <a href="#contact" className="text-slate-600 hover:text-primary transition-colors duration-300">Contact</a>
          </div>
          <button className="md:hidden text-slate-600">
            <Menu size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
}
