import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { createInvoiceSchema, type CreateInvoiceRequest } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Plus, Trash2, Eye, Download, Sparkles, Building, User, Calculator, FileText, CreditCard, Percent } from "lucide-react";
import InvoicePreview from "./invoice-preview";
import { generateInvoicePDF } from "@/lib/pdf-generator";

export default function InvoiceGenerator() {
  const { toast } = useToast();
  const [previewData, setPreviewData] = useState<CreateInvoiceRequest | null>(null);

  const form = useForm<CreateInvoiceRequest>({
    resolver: zodResolver(createInvoiceSchema),
    defaultValues: {
      // Business Information
      businessName: "",
      businessAddress: "",
      businessPhone: "",
      businessEmail: "",
      businessWebsite: "",
      businessLogo: "",
      
      // Invoice Details
      invoiceNumber: `INV-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`,
      invoiceDate: new Date().toISOString().split('T')[0],
      dueDate: (() => {
        const date = new Date();
        date.setMonth(date.getMonth() + 1);
        return date.toISOString().split('T')[0];
      })(),
      
      // Client Information
      clientName: "",
      clientEmail: "",
      clientAddress: "",
      clientPhone: "",
      
      // Financial Details
      currency: "USD",
      taxRate: 0,
      discountType: "none" as const,
      discountValue: 0,
      
      // Additional Features
      paymentTerms: "Net 30",
      notes: "",
      footer: "Thank you for your business!",
      
      // Items
      items: [{ description: "", quantity: 1, rate: 0 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });

  const createInvoiceMutation = useMutation({
    mutationFn: async (data: CreateInvoiceRequest) => {
      const response = await apiRequest("POST", "/api/invoices", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Invoice created successfully!",
        description: "Your invoice has been saved and is ready to download.",
      });
    },
    onError: () => {
      toast({
        title: "Error creating invoice",
        description: "Please check your data and try again.",
        variant: "destructive",
      });
    },
  });

  const handlePreview = async () => {
    const isValid = await form.trigger();
    if (isValid) {
      setPreviewData(form.getValues());
    }
  };

  const handleGeneratePDF = async () => {
    const isValid = await form.trigger();
    if (!isValid) {
      toast({
        title: "Please fix form errors",
        description: "Make sure all required fields are filled correctly.",
        variant: "destructive",
      });
      return;
    }

    const data = form.getValues();
    
    try {
      // Create invoice in backend
      await createInvoiceMutation.mutateAsync(data);
      
      // Generate and download PDF
      await generateInvoicePDF(data);
      
      toast({
        title: "PDF generated successfully!",
        description: "Your invoice PDF has been downloaded.",
      });
    } catch (error) {
      toast({
        title: "Error generating PDF",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  const watchedValues = form.watch();

  return (
    <section id="generator" className="py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-surface"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6 animate-scale-in">
            <Sparkles size={16} />
            <span>Invoice Generator</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 animate-slide-up-fade">
            Create Your
            <span className="block text-gradient">Perfect Invoice</span>
          </h2>
          
          <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed animate-slide-up-fade" style={{ animationDelay: '0.2s' }}>
            Fill in the details below and watch your professional invoice come to life in real-time
          </p>
        </div>

        <div className="grid xl:grid-cols-2 gap-12 items-start">
          {/* Enhanced Invoice Form */}
          <div className="space-y-8 animate-slide-up-fade" style={{ animationDelay: '0.4s' }}>
            <div className="bg-white rounded-3xl shadow-luxury p-8 border border-slate-200/50">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-slate-900">Invoice Details</h3>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>Real-time preview</span>
                </div>
              </div>
            
            <Form {...form}>
              <form className="space-y-6">
                {/* Business Information Section */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3 pb-3 border-b border-slate-200">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                      <span className="text-primary font-bold text-sm">1</span>
                    </div>
                    <h4 className="text-lg font-semibold text-slate-900">Business Information</h4>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="businessName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                            Your Name/Business
                            <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input 
                                {...field} 
                                placeholder="e.g. John Doe Design Studio" 
                                className="px-4 py-4 border-2 border-slate-200 rounded-2xl focus:border-primary focus:ring-0 transition-all duration-300 text-slate-900 placeholder:text-slate-400 bg-slate-50 focus:bg-white" 
                              />
                              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                                {field.value && (
                                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                )}
                              </div>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="invoiceNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                            Invoice Number
                            <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input 
                                {...field} 
                                placeholder="e.g. INV-2024-001" 
                                className="px-4 py-4 border-2 border-slate-200 rounded-2xl focus:border-primary focus:ring-0 transition-all duration-300 text-slate-900 placeholder:text-slate-400 bg-slate-50 focus:bg-white" 
                              />
                              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                                {field.value && (
                                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                )}
                              </div>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Client Information */}
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="clientName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-slate-700">Client Name</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            placeholder="Acme Corporation" 
                            className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="clientEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-slate-700">Client Email</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            type="email"
                            placeholder="client@example.com" 
                            className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Dates */}
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="invoiceDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-slate-700">Invoice Date</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            type="date"
                            className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="dueDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-slate-700">Due Date</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            type="date"
                            className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Service Items */}
                <div>
                  <FormLabel className="block text-sm font-medium text-slate-700 mb-4">Services</FormLabel>
                  <div className="space-y-4">
                    {fields.map((field, index) => (
                      <div key={field.id} className="grid grid-cols-12 gap-4 items-end">
                        <div className="col-span-6">
                          <FormField
                            control={form.control}
                            name={`items.${index}.description`}
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input 
                                    {...field} 
                                    placeholder="Service description" 
                                    className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300" 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="col-span-2">
                          <FormField
                            control={form.control}
                            name={`items.${index}.quantity`}
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input 
                                    {...field} 
                                    type="number"
                                    placeholder="Qty" 
                                    className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                                    onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="col-span-3">
                          <FormField
                            control={form.control}
                            name={`items.${index}.rate`}
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input 
                                    {...field} 
                                    type="number"
                                    step="0.01"
                                    placeholder="Rate" 
                                    className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                                    onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="col-span-1">
                          {fields.length > 1 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="w-full p-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors duration-300"
                              onClick={() => remove(index)}
                            >
                              <Trash2 size={16} />
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    className="mt-4 text-primary hover:text-indigo-700 font-medium transition-colors duration-300"
                    onClick={() => append({ description: "", quantity: 1, rate: 0 })}
                  >
                    <Plus size={16} className="mr-2" />
                    Add Another Service
                  </Button>
                </div>

                {/* Notes */}
                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-slate-700">Additional Notes</FormLabel>
                      <FormControl>
                        <Textarea 
                          {...field} 
                          rows={3}
                          placeholder="Payment terms, thank you message, etc." 
                          className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300" 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Action Buttons */}
                <div className="flex gap-4 pt-8">
                  <Button
                    type="button"
                    variant="secondary"
                    className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-4 px-6 rounded-2xl font-semibold transition-all duration-300 hover:shadow-md"
                    onClick={handlePreview}
                  >
                    <Eye size={20} className="mr-2" />
                    Preview
                  </Button>
                  <Button
                    type="button"
                    className="flex-1 button-primary py-4 px-6 rounded-2xl font-semibold transition-all duration-300 hover:shadow-luxury transform hover:scale-[1.02]"
                    onClick={handleGeneratePDF}
                    disabled={createInvoiceMutation.isPending}
                  >
                    <Download size={20} className="mr-2" />
                    {createInvoiceMutation.isPending ? "Generating..." : "Generate PDF"}
                  </Button>
                </div>
              </form>
            </Form>
            </div>
          </div>

          {/* Enhanced Invoice Preview */}
          <div className="animate-slide-up-fade" style={{ animationDelay: '0.6s' }}>
            <InvoicePreview data={previewData || watchedValues} />
          </div>
        </div>
      </div>
    </section>
  );
}
