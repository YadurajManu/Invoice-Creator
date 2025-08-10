import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Plus, Search, Filter, Eye, Download, Edit, Trash2 } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";
import type { InvoiceWithItems } from "@shared/schema";

export default function Invoices() {
  const { data: invoices = [], isLoading } = useQuery<InvoiceWithItems[]>({
    queryKey: ["/api/invoices"],
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("date");

  // Filter and sort invoices
  const filteredInvoices = invoices
    .filter(invoice => {
      const matchesSearch = 
        invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        invoice.clientName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "all" || invoice.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "date":
          return new Date(b.invoiceDate).getTime() - new Date(a.invoiceDate).getTime();
        case "amount":
          return parseFloat(b.total) - parseFloat(a.total);
        case "client":
          return a.clientName.localeCompare(b.clientName);
        default:
          return 0;
      }
    });

  const formatCurrency = (amount: number, currency = "USD") => {
    const symbols: Record<string, string> = {
      USD: "$", EUR: "€", GBP: "£", CAD: "C$", AUD: "A$", 
      JPY: "¥", INR: "₹", CNY: "¥"
    };
    return `${symbols[currency] || "$"}${amount.toFixed(2)}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-slate-200 rounded w-1/4"></div>
            <div className="h-12 bg-slate-200 rounded"></div>
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-20 bg-slate-200 rounded"></div>
              ))}
            </div>
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
            <h1 className="text-3xl font-bold text-slate-900">Invoices</h1>
            <p className="text-slate-600 mt-1">Manage and track all your invoices in one place.</p>
          </div>
          <Link href="/">
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200">
              <Plus size={16} className="mr-2" />
              Create Invoice
            </Button>
          </Link>
        </div>

        {/* Filters */}
        <Card className="bg-white/60 backdrop-blur-sm border-slate-200/50">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                  <Input
                    placeholder="Search invoices by number or client..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white/80"
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[150px] bg-white/80">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="overdue">Overdue</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[150px] bg-white/80">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date">Date</SelectItem>
                    <SelectItem value="amount">Amount</SelectItem>
                    <SelectItem value="client">Client</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Invoices List */}
        <Card className="bg-white/60 backdrop-blur-sm border-slate-200/50">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>All Invoices ({filteredInvoices.length})</span>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Filter size={16} />
                <span>{filteredInvoices.length} of {invoices.length} invoices</span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {filteredInvoices.length === 0 ? (
              <div className="text-center py-12">
                <FileText size={48} className="mx-auto text-slate-400 mb-4" />
                <h3 className="text-lg font-medium text-slate-900 mb-2">
                  {searchTerm || statusFilter !== "all" ? "No matching invoices" : "No invoices yet"}
                </h3>
                <p className="text-slate-600 mb-6">
                  {searchTerm || statusFilter !== "all" 
                    ? "Try adjusting your search or filter criteria" 
                    : "Create your first invoice to get started"
                  }
                </p>
                <Link href="/">
                  <Button>Create Invoice</Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredInvoices.map((invoice) => (
                  <div
                    key={invoice.id}
                    className="flex flex-col lg:flex-row lg:items-center lg:justify-between p-6 bg-white rounded-xl border border-slate-200/50 hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex items-start lg:items-center space-x-4 mb-4 lg:mb-0">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <FileText size={24} className="text-purple-600" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h4 className="font-semibold text-slate-900">{invoice.invoiceNumber}</h4>
                          <Badge
                            variant={invoice.status === "paid" ? "default" : "secondary"}
                            className={
                              invoice.status === "paid"
                                ? "bg-green-100 text-green-800 hover:bg-green-100"
                                : invoice.status === "overdue"
                                ? "bg-red-100 text-red-800 hover:bg-red-100"
                                : "bg-orange-100 text-orange-800 hover:bg-orange-100"
                            }
                          >
                            {invoice.status || "Draft"}
                          </Badge>
                        </div>
                        <p className="text-slate-600 font-medium">{invoice.clientName}</p>
                        <div className="flex items-center gap-4 text-sm text-slate-500 mt-1">
                          <span>Created: {formatDate(invoice.invoiceDate)}</span>
                          <span>Due: {formatDate(invoice.dueDate)}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between lg:justify-end gap-4">
                      <div className="text-right">
                        <p className="text-xl font-bold text-slate-900">
                          {formatCurrency(parseFloat(invoice.total), invoice.currency || "USD")}
                        </p>
                        <p className="text-sm text-slate-500">{invoice.currency}</p>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-900">
                          <Eye size={16} />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-900">
                          <Download size={16} />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-900">
                          <Edit size={16} />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-slate-600 hover:text-red-600">
                          <Trash2 size={16} />
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