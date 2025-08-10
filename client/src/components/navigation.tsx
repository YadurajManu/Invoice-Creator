import { Menu, FileText, Sparkles } from "lucide-react";
import { useState } from "react";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full z-50 transition-all duration-300">
      <div className="absolute inset-0 bg-white/90 backdrop-blur-lg border-b border-slate-200/50"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center shadow-lg">
              <FileText className="text-white" size={20} />
            </div>
            <div>
              <span className="text-2xl font-bold text-slate-900">InvoiceFlow</span>
              <div className="flex items-center gap-1 text-xs text-primary font-medium">
                <Sparkles size={10} />
                <span>Professional</span>
              </div>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
            <button 
              onClick={() => scrollToSection('features')}
              className="text-slate-600 hover:text-slate-900 font-medium transition-colors duration-200 relative group"
            >
              Features
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full"></div>
            </button>
            <button 
              onClick={() => scrollToSection('generator')}
              className="text-slate-600 hover:text-slate-900 font-medium transition-colors duration-200 relative group"
            >
              Generator
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full"></div>
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-slate-600 hover:text-slate-900 font-medium transition-colors duration-200 relative group"
            >
              Contact
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full"></div>
            </button>
          </div>
          
          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <button 
              onClick={() => scrollToSection('generator')}
              className="button-primary px-6 py-3 rounded-xl font-semibold transition-all duration-200 hover:shadow-lg"
            >
              Get Started
            </button>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-slate-600 hover:text-slate-900 transition-colors duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu size={24} />
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-lg border-b border-slate-200/50 shadow-lg">
            <div className="px-4 py-6 space-y-4">
              <button 
                onClick={() => scrollToSection('features')}
                className="block w-full text-left text-slate-600 hover:text-slate-900 font-medium py-2 transition-colors duration-200"
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection('generator')}
                className="block w-full text-left text-slate-600 hover:text-slate-900 font-medium py-2 transition-colors duration-200"
              >
                Generator
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="block w-full text-left text-slate-600 hover:text-slate-900 font-medium py-2 transition-colors duration-200"
              >
                Contact
              </button>
              <button 
                onClick={() => scrollToSection('generator')}
                className="w-full button-primary px-6 py-3 rounded-xl font-semibold transition-all duration-200 mt-4"
              >
                Get Started
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
