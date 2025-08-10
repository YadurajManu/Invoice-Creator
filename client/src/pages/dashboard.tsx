import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, DollarSign, Users, TrendingUp, Plus, Eye, Download } from "lucide-react";
import { Link } from "wouter";
import type { InvoiceWithItems } from "@shared/schema";

export default function Dashboard() {
  const { data: invoices = [], isLoading } = useQuery<InvoiceWithItems[]>({
    queryKey: ["/api/invoices"],
  });

  // Calculate statistics
  const totalInvoices = invoices.length;
  const totalRevenue = invoices.reduce((sum, invoice) => sum + parseFloat(invoice.total), 0);
  const paidInvoices = invoices.filter(invoice => invoice.status === "paid").length;
  const pendingInvoices = invoices.filter(invoice => invoice.status === "pending").length;

  const formatCurrency = (amount: number, currency = "USD") => {
    const symbols: Record<string, string> = {
      USD: "$", EUR: "€", GBP: "£", CAD: "C$", AUD: "A$", 
      JPY: "¥", INR: "₹", CNY: "¥"
    };
    return `${symbols[currency] || "$"}${amount.toFixed(2)}`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="h-4 bg-slate-200 rounded w-3/4 mb-2"></div>
                  <div className="h-8 bg-slate-200 rounded w-1/2"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
            <p className="text-slate-600 mt-1">Welcome back! Here's your business overview.</p>
          </div>
          <Link href="/">
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200">
              <Plus size={16} className="mr-2" />
              Create Invoice
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-white/60 backdrop-blur-sm border-slate-200/50 hover:shadow-lg transition-all duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Total Invoices</p>
                  <p className="text-2xl font-bold text-slate-900">{totalInvoices}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <FileText size={24} className="text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border-slate-200/50 hover:shadow-lg transition-all duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-slate-900">{formatCurrency(totalRevenue)}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <DollarSign size={24} className="text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border-slate-200/50 hover:shadow-lg transition-all duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Paid Invoices</p>
                  <p className="text-2xl font-bold text-slate-900">{paidInvoices}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <TrendingUp size={24} className="text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border-slate-200/50 hover:shadow-lg transition-all duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Pending</p>
                  <p className="text-2xl font-bold text-slate-900">{pendingInvoices}</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <Users size={24} className="text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Invoices */}
        <Card className="bg-white/60 backdrop-blur-sm border-slate-200/50">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Recent Invoices</span>
              <Link href="/invoices">
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {invoices.length === 0 ? (
              <div className="text-center py-12">
                <FileText size={48} className="mx-auto text-slate-400 mb-4" />
                <h3 className="text-lg font-medium text-slate-900 mb-2">No invoices yet</h3>
                <p className="text-slate-600 mb-6">Create your first invoice to get started</p>
                <Link href="/">
                  <Button>Create Invoice</Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {invoices.slice(0, 5).map((invoice) => (
                  <div
                    key={invoice.id}
                    className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-200/50 hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg flex items-center justify-center">
                        <FileText size={20} className="text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-slate-900">{invoice.invoiceNumber}</h4>
                        <p className="text-sm text-slate-600">{invoice.clientName}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Badge
                        variant={invoice.status === "paid" ? "default" : "secondary"}
                        className={
                          invoice.status === "paid"
                            ? "bg-green-100 text-green-800 hover:bg-green-100"
                            : "bg-orange-100 text-orange-800 hover:bg-orange-100"
                        }
                      >
                        {invoice.status || "Draft"}
                      </Badge>
                      <span className="font-medium text-slate-900">
                        {formatCurrency(parseFloat(invoice.total), invoice.currency || "USD")}
                      </span>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye size={16} />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download size={16} />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}