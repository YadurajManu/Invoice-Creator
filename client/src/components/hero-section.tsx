export default function HeroSection() {
  const scrollToGenerator = () => {
    document.getElementById('generator')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="pt-24 pb-20 bg-gradient-to-br from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-800 mb-6 leading-tight">
            Professional Invoices<br />
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Made Simple</span>
          </h1>
          <p className="text-xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            Generate beautiful, professional invoices in seconds. Perfect for freelancers, consultants, and small businesses who value clean design and efficiency.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button 
              onClick={scrollToGenerator}
              className="bg-primary hover:bg-indigo-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <span className="mr-2">+</span>Create Invoice
            </button>
            <button className="border border-slate-300 hover:border-primary text-slate-700 hover:text-primary px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300">
              <span className="mr-2">▶</span>See How It Works
            </button>
          </div>

          {/* Hero Visual */}
          <div className="relative mx-auto max-w-4xl animate-slide-up">
            <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100 transform rotate-1">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-slate-800">INVOICE</h3>
                  <p className="text-slate-600">#INV-2024-001</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-slate-600">Date: March 15, 2024</p>
                  <p className="text-sm text-slate-600">Due: April 15, 2024</p>
                </div>
              </div>
              <div className="border-t border-gray-200 pt-6">
                <div className="grid grid-cols-3 gap-4 text-sm text-slate-600 mb-4">
                  <div>Service Description</div>
                  <div>Quantity</div>
                  <div className="text-right">Amount</div>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-4 pb-4 border-b border-gray-100">
                  <div className="text-slate-800 font-medium">Website Development</div>
                  <div className="text-slate-600">1</div>
                  <div className="text-right font-semibold text-slate-800">$2,500.00</div>
                </div>
                <div className="flex justify-end">
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">$2,500.00</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
