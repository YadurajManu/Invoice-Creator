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
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Plus, Trash2, Eye, Download } from "lucide-react";
import InvoicePreview from "./invoice-preview";
import { generateInvoicePDF } from "@/lib/pdf-generator";

export default function InvoiceGenerator() {
  const { toast } = useToast();
  const [previewData, setPreviewData] = useState<CreateInvoiceRequest | null>(null);

  const form = useForm<CreateInvoiceRequest>({
    resolver: zodResolver(createInvoiceSchema),
    defaultValues: {
      businessName: "",
      invoiceNumber: `INV-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`,
      clientName: "",
      clientEmail: "",
      invoiceDate: new Date().toISOString().split('T')[0],
      dueDate: (() => {
        const date = new Date();
        date.setMonth(date.getMonth() + 1);
        return date.toISOString().split('T')[0];
      })(),
      notes: "",
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

  const handlePreview = () => {
    const isValid = form.trigger();
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
    <section id="generator" className="py-20 bg-gradient-to-br from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-800 mb-4">Create Your Invoice</h2>
          <p className="text-xl text-slate-600">Fill in the details below and generate your professional invoice instantly</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Invoice Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <h3 className="text-2xl font-semibold text-slate-800 mb-8">Invoice Details</h3>
            
            <Form {...form}>
              <form className="space-y-6">
                {/* Business Information */}
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="businessName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-slate-700">Your Name/Business</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            placeholder="John Doe Design Studio" 
                            className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300" 
                          />
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
                        <FormLabel className="text-sm font-medium text-slate-700">Invoice Number</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            placeholder="INV-2024-001" 
                            className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
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
                <div className="flex gap-4 pt-4">
                  <Button
                    type="button"
                    variant="secondary"
                    className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 px-6 rounded-xl font-semibold transition-all duration-300"
                    onClick={handlePreview}
                  >
                    <Eye size={16} className="mr-2" />
                    Preview
                  </Button>
                  <Button
                    type="button"
                    className="flex-1 bg-primary hover:bg-indigo-700 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
                    onClick={handleGeneratePDF}
                    disabled={createInvoiceMutation.isPending}
                  >
                    <Download size={16} className="mr-2" />
                    {createInvoiceMutation.isPending ? "Generating..." : "Generate PDF"}
                  </Button>
                </div>
              </form>
            </Form>
          </div>

          {/* Invoice Preview */}
          <InvoicePreview data={previewData || watchedValues} />
        </div>
      </div>
    </section>
  );
}
