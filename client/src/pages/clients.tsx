import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Users, Plus, Search, Mail, Phone, MapPin, FileText, DollarSign } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";
import type { InvoiceWithItems } from "@shared/schema";

export default function Clients() {
  const { data: invoices = [], isLoading } = useQuery<InvoiceWithItems[]>({
    queryKey: ["/api/invoices"],
  });

  const [searchTerm, setSearchTerm] = useState("");

  // Extract unique clients from invoices
  const clients = invoices.reduce((acc, invoice) => {
    const existingClient = acc.find(client => client.email === invoice.clientEmail);
    if (existingClient) {
      existingClient.invoices.push(invoice);
      existingClient.totalAmount += parseFloat(invoice.total);
    } else {
      acc.push({
        name: invoice.clientName,
        email: invoice.clientEmail,
        phone: invoice.clientPhone,
        address: invoice.clientAddress,
        invoices: [invoice],
        totalAmount: parseFloat(invoice.total),
      });
    }
    return acc;
  }, [] as Array<{
    name: string;
    email: string;
    phone: string | null;
    address: string | null;
    invoices: InvoiceWithItems[];
    totalAmount: number;
  }>);

  // Filter clients
  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatCurrency = (amount: number) => {
    return `$${amount.toFixed(2)}`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-slate-200 rounded w-1/4"></div>
            <div className="h-12 bg-slate-200 rounded"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-48 bg-slate-200 rounded"></div>
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
            <h1 className="text-3xl font-bold text-slate-900">Clients</h1>
            <p className="text-slate-600 mt-1">Manage your client relationships and invoice history.</p>
          </div>
          <Link href="/">
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200">
              <Plus size={16} className="mr-2" />
              Create Invoice
            </Button>
          </Link>
        </div>

        {/* Search */}
        <Card className="bg-white/60 backdrop-blur-sm border-slate-200/50">
          <CardContent className="p-6">
            <div className="relative">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <Input
                placeholder="Search clients by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/80"
              />
            </div>
          </CardContent>
        </Card>

        {/* Clients Grid */}
        {filteredClients.length === 0 ? (
          <Card className="bg-white/60 backdrop-blur-sm border-slate-200/50">
            <CardContent className="p-12">
              <div className="text-center">
                <Users size={48} className="mx-auto text-slate-400 mb-4" />
                <h3 className="text-lg font-medium text-slate-900 mb-2">
                  {searchTerm ? "No matching clients" : "No clients yet"}
                </h3>
                <p className="text-slate-600 mb-6">
                  {searchTerm 
                    ? "Try adjusting your search criteria" 
                    : "Create your first invoice to add clients automatically"
                  }
                </p>
                <Link href="/">
                  <Button>Create Invoice</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClients.map((client, index) => (
              <Card key={index} className="bg-white/60 backdrop-blur-sm border-slate-200/50 hover:shadow-lg transition-all duration-200">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl flex items-center justify-center">
                        <Users size={24} className="text-purple-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{client.name}</CardTitle>
                        <p className="text-sm text-slate-600">{client.invoices.length} invoice{client.invoices.length !== 1 ? 's' : ''}</p>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Contact Information */}
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm text-slate-600">
                      <Mail size={14} />
                      <span className="truncate">{client.email}</span>
                    </div>
                    {client.phone && (
                      <div className="flex items-center space-x-2 text-sm text-slate-600">
                        <Phone size={14} />
                        <span>{client.phone}</span>
                      </div>
                    )}
                    {client.address && (
                      <div className="flex items-start space-x-2 text-sm text-slate-600">
                        <MapPin size={14} className="mt-0.5 flex-shrink-0" />
                        <span className="text-xs leading-relaxed">{client.address}</span>
                      </div>
                    )}
                  </div>

                  {/* Statistics */}
                  <div className="border-t pt-4">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="flex items-center justify-center space-x-1 text-slate-600 mb-1">
                          <FileText size={14} />
                          <span className="text-xs">Invoices</span>
                        </div>
                        <p className="text-lg font-semibold text-slate-900">{client.invoices.length}</p>
                      </div>
                      <div>
                        <div className="flex items-center justify-center space-x-1 text-slate-600 mb-1">
                          <DollarSign size={14} />
                          <span className="text-xs">Total</span>
                        </div>
                        <p className="text-lg font-semibold text-slate-900">{formatCurrency(client.totalAmount)}</p>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="border-t pt-4">
                    <div className="flex gap-2">
                      <Link href={`/invoices?client=${encodeURIComponent(client.email)}`} className="flex-1">
                        <Button variant="outline" size="sm" className="w-full">
                          View Invoices
                        </Button>
                      </Link>
                      <Link href={`/?client=${encodeURIComponent(client.email)}`} className="flex-1">
                        <Button size="sm" className="w-full">
                          New Invoice
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}