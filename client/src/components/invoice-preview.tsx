import { type CreateInvoiceRequest } from "@shared/schema";
import { FileText } from "lucide-react";

interface InvoicePreviewProps {
  data: CreateInvoiceRequest;
}

export default function InvoicePreview({ data }: InvoicePreviewProps) {
  const calculateTotal = () => {
    return data.items?.reduce((sum, item) => {
      return sum + (item.quantity * item.rate);
    }, 0) || 0;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
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

      <div className="border-2 border-slate-200 rounded-2xl p-8 bg-slate-50 min-h-[600px] relative overflow-hidden">
        {!hasValidData ? (
          <div className="text-center text-slate-400 flex items-center justify-center h-full">
            <div>
              <FileText size={64} className="mx-auto mb-4" />
              <p className="text-lg">Fill in the form to see your invoice preview</p>
            </div>
          </div>
        ) : (
          <div className="bg-white p-8 rounded-lg">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h2 className="text-3xl font-bold text-slate-800">INVOICE</h2>
                <p className="text-slate-600">{data.invoiceNumber || 'INV-001'}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">{data.businessName || 'Your Business'}</p>
                <p className="text-sm text-slate-600">Date: {formatDate(data.invoiceDate)}</p>
                <p className="text-sm text-slate-600">Due: {formatDate(data.dueDate)}</p>
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="font-semibold mb-2">Bill To:</h3>
              <p className="text-slate-700">{data.clientName || 'Client Name'}</p>
              {data.clientEmail && (
                <p className="text-sm text-slate-600">{data.clientEmail}</p>
              )}
            </div>

            <div className="border-t border-gray-200 pt-6">
              {data.items && data.items.length > 0 && data.items[0].description ? (
                <>
                  <div className="grid grid-cols-12 gap-4 text-sm text-slate-600 mb-4 font-medium">
                    <div className="col-span-6">Description</div>
                    <div className="col-span-2 text-center">Qty</div>
                    <div className="col-span-2 text-right">Rate</div>
                    <div className="col-span-2 text-right">Amount</div>
                  </div>
                  
                  {data.items.map((item, index) => (
                    item.description && (
                      <div key={index} className="grid grid-cols-12 gap-4 mb-3 pb-3 border-b border-gray-100 last:border-b-0">
                        <div className="col-span-6 text-slate-800 font-medium">{item.description}</div>
                        <div className="col-span-2 text-center text-slate-600">{item.quantity}</div>
                        <div className="col-span-2 text-right text-slate-600">{formatCurrency(item.rate)}</div>
                        <div className="col-span-2 text-right font-semibold text-slate-800">
                          {formatCurrency(item.quantity * item.rate)}
                        </div>
                      </div>
                    )
                  ))}
                  
                  <div className="flex justify-end mt-6 pt-4 border-t border-gray-200">
                    <div className="text-right">
                      <p className="text-lg font-semibold text-slate-700">Total</p>
                      <div className="text-3xl font-bold text-primary">{formatCurrency(calculateTotal())}</div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center text-slate-400 py-8">
                  <p>Services will appear here as you fill the form</p>
                </div>
              )}
            </div>

            {data.notes && (
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="font-semibold text-slate-700 mb-2">Notes</h4>
                <p className="text-slate-600 whitespace-pre-line">{data.notes}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
