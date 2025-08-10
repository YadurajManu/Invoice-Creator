import { type CreateInvoiceRequest } from "@shared/schema";
import { FileText, Building, User, Mail, Phone, MapPin, Globe } from "lucide-react";

interface EnhancedInvoicePreviewProps {
  data: CreateInvoiceRequest;
}

export default function EnhancedInvoicePreview({ data }: EnhancedInvoicePreviewProps) {
  const calculateSubtotal = () => {
    return data.items?.reduce((sum, item) => {
      return sum + (item.quantity * item.rate);
    }, 0) || 0;
  };

  const subtotal = calculateSubtotal();
  const discountAmount = data.discountType === "percentage" 
    ? subtotal * ((data.discountValue || 0) / 100)
    : data.discountType === "fixed" 
    ? (data.discountValue || 0)
    : 0;
  const taxableAmount = subtotal - discountAmount;
  const taxAmount = taxableAmount * ((data.taxRate || 0) / 100);
  const total = taxableAmount + taxAmount;

  const formatCurrency = (amount: number) => {
    const currencySymbols: Record<string, string> = {
      USD: '$',
      EUR: '€',
      GBP: '£',
      CAD: 'C$',
      AUD: 'A$',
      JPY: '¥',
      INR: '₹',
      CNY: '¥',
    };
    
    const symbol = currencySymbols[data.currency || 'USD'] || '$';
    return `${symbol}${amount.toFixed(2)}`;
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const hasValidData = data.businessName || data.clientName || (data.items && data.items.length > 0 && data.items[0].description);

  return (
    <div className="bg-white rounded-3xl shadow-luxury p-8 border border-slate-200/50 sticky top-8">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-2xl font-bold text-slate-900">Live Preview</h3>
        <div className="flex items-center space-x-2 text-sm text-slate-500">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span>Updates in real-time</span>
        </div>
      </div>

      <div className="border-2 border-slate-200 rounded-2xl p-8 bg-slate-50 min-h-[700px] relative overflow-hidden">
        {!hasValidData ? (
          <div className="text-center text-slate-400 flex items-center justify-center h-full">
            <div>
              <FileText size={64} className="mx-auto mb-4" />
              <p className="text-lg">Fill in the form to see your invoice preview</p>
              <p className="text-sm mt-2">Your professional invoice will appear here as you type</p>
            </div>
          </div>
        ) : (
          <div className="bg-white p-8 rounded-xl shadow-sm">
            {/* Header */}
            <div className="flex justify-between items-start mb-8 pb-6 border-b-2 border-slate-200">
              <div>
                <h2 className="text-4xl font-bold text-slate-800 mb-2">INVOICE</h2>
                <p className="text-lg text-slate-600 font-medium">{data.invoiceNumber || 'INV-001'}</p>
              </div>
              <div className="text-right">
                <h3 className="text-xl font-bold text-slate-800 mb-1">{data.businessName || 'Your Business'}</h3>
                {data.businessAddress && (
                  <div className="text-sm text-slate-600 mb-1 flex items-start justify-end gap-1">
                    <MapPin size={14} className="mt-0.5 flex-shrink-0" />
                    <span className="text-right">{data.businessAddress}</span>
                  </div>
                )}
                {data.businessPhone && (
                  <div className="text-sm text-slate-600 mb-1 flex items-center justify-end gap-1">
                    <Phone size={14} />
                    <span>{data.businessPhone}</span>
                  </div>
                )}
                {data.businessEmail && (
                  <div className="text-sm text-slate-600 mb-1 flex items-center justify-end gap-1">
                    <Mail size={14} />
                    <span>{data.businessEmail}</span>
                  </div>
                )}
                {data.businessWebsite && (
                  <div className="text-sm text-slate-600 flex items-center justify-end gap-1">
                    <Globe size={14} />
                    <span>{data.businessWebsite}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Invoice Details */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                  <User size={18} />
                  Bill To:
                </h3>
                <div className="bg-slate-50 p-4 rounded-lg">
                  <p className="font-semibold text-slate-700">{data.clientName || 'Client Name'}</p>
                  {data.clientEmail && (
                    <div className="text-sm text-slate-600 mt-1 flex items-center gap-1">
                      <Mail size={14} />
                      <span>{data.clientEmail}</span>
                    </div>
                  )}
                  {data.clientPhone && (
                    <div className="text-sm text-slate-600 mt-1 flex items-center gap-1">
                      <Phone size={14} />
                      <span>{data.clientPhone}</span>
                    </div>
                  )}
                  {data.clientAddress && (
                    <div className="text-sm text-slate-600 mt-1 flex items-start gap-1">
                      <MapPin size={14} className="mt-0.5 flex-shrink-0" />
                      <span>{data.clientAddress}</span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h3 className="font-bold text-slate-800 mb-3">Invoice Details:</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Invoice Date:</span>
                    <span className="font-medium">{formatDate(data.invoiceDate)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Due Date:</span>
                    <span className="font-medium">{formatDate(data.dueDate)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Currency:</span>
                    <span className="font-medium">{data.currency || 'USD'}</span>
                  </div>
                  {data.paymentTerms && (
                    <div className="flex justify-between">
                      <span className="text-slate-600">Payment Terms:</span>
                      <span className="font-medium">{data.paymentTerms}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Items Table */}
            <div className="mb-8">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-slate-100 border-b">
                      <th className="text-left py-3 px-4 font-semibold text-slate-700">Description</th>
                      <th className="text-center py-3 px-4 font-semibold text-slate-700">Qty</th>
                      <th className="text-right py-3 px-4 font-semibold text-slate-700">Rate</th>
                      <th className="text-right py-3 px-4 font-semibold text-slate-700">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.items && data.items.length > 0 && data.items[0].description ? (
                      data.items.map((item, index) => (
                        <tr key={index} className="border-b border-slate-200">
                          <td className="py-3 px-4 text-slate-700">{item.description || `Service ${index + 1}`}</td>
                          <td className="py-3 px-4 text-center text-slate-700">{item.quantity}</td>
                          <td className="py-3 px-4 text-right text-slate-700">{formatCurrency(item.rate)}</td>
                          <td className="py-3 px-4 text-right font-medium text-slate-800">
                            {formatCurrency(item.quantity * item.rate)}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="py-8 text-center text-slate-400">
                          Add items to see them here
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Totals */}
            <div className="flex justify-end">
              <div className="w-full max-w-sm">
                <div className="space-y-3">
                  <div className="flex justify-between py-2">
                    <span className="text-slate-600">Subtotal:</span>
                    <span className="font-medium">{formatCurrency(subtotal)}</span>
                  </div>
                  
                  {data.discountType !== "none" && discountAmount > 0 && (
                    <div className="flex justify-between py-2 text-green-600">
                      <span>
                        Discount {data.discountType === "percentage" ? `(${data.discountValue}%)` : ""}:
                      </span>
                      <span>-{formatCurrency(discountAmount)}</span>
                    </div>
                  )}
                  
                  {(data.taxRate || 0) > 0 && (
                    <div className="flex justify-between py-2">
                      <span className="text-slate-600">Tax ({data.taxRate}%):</span>
                      <span className="font-medium">{formatCurrency(taxAmount)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between py-3 border-t-2 border-slate-300">
                    <span className="text-lg font-bold text-slate-800">Total:</span>
                    <span className="text-xl font-bold text-slate-800">{formatCurrency(total)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Notes and Footer */}
            {(data.notes || data.footer) && (
              <div className="mt-8 pt-6 border-t border-slate-200">
                {data.notes && (
                  <div className="mb-4">
                    <h4 className="font-semibold text-slate-800 mb-2">Notes:</h4>
                    <p className="text-sm text-slate-600 whitespace-pre-wrap">{data.notes}</p>
                  </div>
                )}
                
                {data.footer && (
                  <div className="text-center">
                    <p className="text-sm text-slate-500 italic">{data.footer}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}