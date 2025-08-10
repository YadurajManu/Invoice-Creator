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
import { Plus, Trash2, Eye, Download, Sparkles, Building, User, Calculator, FileText, CreditCard, Percent, Phone, Mail, Globe, MapPin, Calendar, Hash, ArrowLeft, ArrowRight } from "lucide-react";
import EnhancedInvoicePreview from "./enhanced-invoice-preview";
import { generateInvoicePDF } from "@/lib/pdf-generator";

export default function AdvancedInvoiceGenerator() {
  const { toast } = useToast();
  const [previewData, setPreviewData] = useState<CreateInvoiceRequest | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  const currencies = [
    { value: "USD", label: "USD ($)" },
    { value: "EUR", label: "EUR (€)" },
    { value: "GBP", label: "GBP (£)" },
    { value: "CAD", label: "CAD (C$)" },
    { value: "AUD", label: "AUD (A$)" },
    { value: "JPY", label: "JPY (¥)" },
    { value: "INR", label: "INR (₹)" },
    { value: "CNY", label: "CNY (¥)" },
  ];

  const paymentTermsOptions = [
    "Due on receipt",
    "Net 15",
    "Net 30", 
    "Net 45",
    "Net 60",
    "Payment on delivery",
    "Cash on delivery",
    "2/10 Net 30",
  ];

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

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const watchedValues = form.watch();
  const watchedItems = form.watch("items");
  const watchedTaxRate = form.watch("taxRate");
  const watchedDiscountType = form.watch("discountType");
  const watchedDiscountValue = form.watch("discountValue");

  // Calculate totals
  const subtotal = watchedItems.reduce((sum, item) => sum + (item.quantity * item.rate), 0);
  const discountAmount = watchedDiscountType === "percentage" 
    ? subtotal * (watchedDiscountValue / 100)
    : watchedDiscountType === "fixed" 
    ? watchedDiscountValue
    : 0;
  const taxableAmount = subtotal - discountAmount;
  const taxAmount = taxableAmount * (watchedTaxRate / 100);
  const total = taxableAmount + taxAmount;

  return (
    <section id="generator" className="py-32 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-300/10 rounded-full blur-3xl"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 bg-primary/10 text-primary px-6 py-3 rounded-full text-sm font-semibold mb-8 animate-slide-up-fade">
            <Sparkles size={16} />
            Advanced Invoice Generator
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 animate-slide-up-fade">
            Create Your
            <span className="block text-gradient">Perfect Invoice</span>
          </h2>
          
          <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed animate-slide-up-fade" style={{ animationDelay: '0.2s' }}>
            Professional invoicing with tax calculations, discounts, multiple currencies, and more
          </p>
        </div>

        <div className="grid xl:grid-cols-2 gap-12 items-start">
          {/* Advanced Invoice Form */}
          <div className="space-y-8 animate-slide-up-fade" style={{ animationDelay: '0.4s' }}>
            <div className="bg-white rounded-3xl shadow-luxury p-8 border border-slate-200/50">
              {/* Progress Indicator */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-slate-900">Invoice Builder</h3>
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span>Step {currentStep} of {totalSteps}</span>
                  </div>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-primary to-indigo-600 h-3 rounded-full transition-all duration-500" 
                    style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                  ></div>
                </div>
              </div>
            
              <Form {...form}>
                <form className="space-y-8">
                  {/* Step 1: Business Information */}
                  {currentStep === 1 && (
                    <div className="space-y-6 animate-slide-up-fade">
                      <div className="flex items-center gap-3 pb-4 border-b border-slate-200">
                        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                          <Building size={20} className="text-primary" />
                        </div>
                        <h4 className="text-xl font-semibold text-slate-900">Business Information</h4>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="businessName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                <Building size={16} />
                                Business Name
                                <span className="text-red-500">*</span>
                              </FormLabel>
                              <FormControl>
                                <Input 
                                  {...field} 
                                  placeholder="e.g. John Doe Design Studio" 
                                  className="px-4 py-4 border-2 border-slate-200 rounded-2xl focus:border-primary focus:ring-0 transition-all duration-300" 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="businessEmail"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                <Mail size={16} />
                                Business Email
                              </FormLabel>
                              <FormControl>
                                <Input 
                                  {...field} 
                                  placeholder="business@example.com"
                                  type="email"
                                  className="px-4 py-4 border-2 border-slate-200 rounded-2xl focus:border-primary focus:ring-0 transition-all duration-300" 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="businessAddress"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                              <MapPin size={16} />
                              Business Address
                            </FormLabel>
                            <FormControl>
                              <Textarea 
                                {...field} 
                                placeholder="123 Business St., City, State, ZIP"
                                className="px-4 py-4 border-2 border-slate-200 rounded-2xl focus:border-primary focus:ring-0 transition-all duration-300 min-h-[100px]" 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="businessPhone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                <Phone size={16} />
                                Phone Number
                              </FormLabel>
                              <FormControl>
                                <Input 
                                  {...field} 
                                  placeholder="+1 (555) 123-4567"
                                  className="px-4 py-4 border-2 border-slate-200 rounded-2xl focus:border-primary focus:ring-0 transition-all duration-300" 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="businessWebsite"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                <Globe size={16} />
                                Website
                              </FormLabel>
                              <FormControl>
                                <Input 
                                  {...field} 
                                  placeholder="www.yourwebsite.com"
                                  className="px-4 py-4 border-2 border-slate-200 rounded-2xl focus:border-primary focus:ring-0 transition-all duration-300" 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  )}

                  {/* Step 2: Client Information */}
                  {currentStep === 2 && (
                    <div className="space-y-6 animate-slide-up-fade">
                      <div className="flex items-center gap-3 pb-4 border-b border-slate-200">
                        <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center">
                          <User size={20} className="text-blue-600" />
                        </div>
                        <h4 className="text-xl font-semibold text-slate-900">Client Information</h4>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="clientName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                <User size={16} />
                                Client Name
                                <span className="text-red-500">*</span>
                              </FormLabel>
                              <FormControl>
                                <Input 
                                  {...field} 
                                  placeholder="e.g. Acme Corporation"
                                  className="px-4 py-4 border-2 border-slate-200 rounded-2xl focus:border-primary focus:ring-0 transition-all duration-300" 
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
                              <FormLabel className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                <Mail size={16} />
                                Client Email
                                <span className="text-red-500">*</span>
                              </FormLabel>
                              <FormControl>
                                <Input 
                                  {...field} 
                                  placeholder="client@example.com"
                                  type="email"
                                  className="px-4 py-4 border-2 border-slate-200 rounded-2xl focus:border-primary focus:ring-0 transition-all duration-300" 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="clientAddress"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                              <MapPin size={16} />
                              Client Address
                            </FormLabel>
                            <FormControl>
                              <Textarea 
                                {...field} 
                                placeholder="456 Client Ave., City, State, ZIP"
                                className="px-4 py-4 border-2 border-slate-200 rounded-2xl focus:border-primary focus:ring-0 transition-all duration-300 min-h-[100px]" 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="clientPhone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                              <Phone size={16} />
                              Client Phone
                            </FormLabel>
                            <FormControl>
                              <Input 
                                {...field} 
                                placeholder="+1 (555) 987-6543"
                                className="px-4 py-4 border-2 border-slate-200 rounded-2xl focus:border-primary focus:ring-0 transition-all duration-300" 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}

                  {/* Step 3: Invoice Details */}
                  {currentStep === 3 && (
                    <div className="space-y-6 animate-slide-up-fade">
                      <div className="flex items-center gap-3 pb-4 border-b border-slate-200">
                        <div className="w-10 h-10 bg-green-500/10 rounded-xl flex items-center justify-center">
                          <FileText size={20} className="text-green-600" />
                        </div>
                        <h4 className="text-xl font-semibold text-slate-900">Invoice Details</h4>
                      </div>

                      <div className="grid md:grid-cols-3 gap-6">
                        <FormField
                          control={form.control}
                          name="invoiceNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                <Hash size={16} />
                                Invoice Number
                                <span className="text-red-500">*</span>
                              </FormLabel>
                              <FormControl>
                                <Input 
                                  {...field} 
                                  placeholder="INV-2024-001"
                                  className="px-4 py-4 border-2 border-slate-200 rounded-2xl focus:border-primary focus:ring-0 transition-all duration-300" 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="invoiceDate"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                <Calendar size={16} />
                                Invoice Date
                                <span className="text-red-500">*</span>
                              </FormLabel>
                              <FormControl>
                                <Input 
                                  {...field} 
                                  type="date"
                                  className="px-4 py-4 border-2 border-slate-200 rounded-2xl focus:border-primary focus:ring-0 transition-all duration-300" 
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
                              <FormLabel className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                <Calendar size={16} />
                                Due Date
                                <span className="text-red-500">*</span>
                              </FormLabel>
                              <FormControl>
                                <Input 
                                  {...field} 
                                  type="date"
                                  className="px-4 py-4 border-2 border-slate-200 rounded-2xl focus:border-primary focus:ring-0 transition-all duration-300" 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="currency"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                <CreditCard size={16} />
                                Currency
                              </FormLabel>
                              <Select value={field.value} onValueChange={field.onChange}>
                                <FormControl>
                                  <SelectTrigger className="px-4 py-4 border-2 border-slate-200 rounded-2xl focus:border-primary">
                                    <SelectValue placeholder="Select currency" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {currencies.map((currency) => (
                                    <SelectItem key={currency.value} value={currency.value}>
                                      {currency.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="paymentTerms"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                <Calculator size={16} />
                                Payment Terms
                              </FormLabel>
                              <Select value={field.value} onValueChange={field.onChange}>
                                <FormControl>
                                  <SelectTrigger className="px-4 py-4 border-2 border-slate-200 rounded-2xl focus:border-primary">
                                    <SelectValue placeholder="Select payment terms" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {paymentTermsOptions.map((term) => (
                                    <SelectItem key={term} value={term}>
                                      {term}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  )}

                  {/* Step 4: Items & Calculations */}
                  {currentStep === 4 && (
                    <div className="space-y-6 animate-slide-up-fade">
                      <div className="flex items-center gap-3 pb-4 border-b border-slate-200">
                        <div className="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center">
                          <Calculator size={20} className="text-purple-600" />
                        </div>
                        <h4 className="text-xl font-semibold text-slate-900">Items & Calculations</h4>
                      </div>

                      {/* Items */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h5 className="font-semibold text-slate-700">Invoice Items</h5>
                          <Button
                            type="button"
                            onClick={() => append({ description: "", quantity: 1, rate: 0 })}
                            size="sm"
                            className="bg-primary/10 text-primary hover:bg-primary/20 border-0"
                          >
                            <Plus size={16} className="mr-2" />
                            Add Item
                          </Button>
                        </div>

                        {fields.map((field, index) => (
                          <div key={field.id} className="p-6 bg-slate-50 rounded-2xl border-2 border-slate-100">
                            <div className="grid grid-cols-12 gap-4 items-end">
                              <div className="col-span-6">
                                <FormField
                                  control={form.control}
                                  name={`items.${index}.description`}
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel className="text-sm font-medium text-slate-600">Description</FormLabel>
                                      <FormControl>
                                        <Input 
                                          {...field} 
                                          placeholder="e.g. Web Design Services"
                                          className="border-slate-200 focus:border-primary"
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
                                      <FormLabel className="text-sm font-medium text-slate-600">Qty</FormLabel>
                                      <FormControl>
                                        <Input 
                                          {...field} 
                                          type="number"
                                          min="1"
                                          onChange={(e) => field.onChange(Number(e.target.value))}
                                          className="border-slate-200 focus:border-primary"
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
                                  name={`items.${index}.rate`}
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel className="text-sm font-medium text-slate-600">Rate</FormLabel>
                                      <FormControl>
                                        <Input 
                                          {...field} 
                                          type="number"
                                          min="0"
                                          step="0.01"
                                          onChange={(e) => field.onChange(Number(e.target.value))}
                                          className="border-slate-200 focus:border-primary"
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>
                              <div className="col-span-1">
                                <FormLabel className="text-sm font-medium text-slate-600">Amount</FormLabel>
                                <div className="px-3 py-2 bg-slate-100 rounded-lg text-sm font-medium text-slate-700">
                                  ${((watchedItems[index]?.quantity || 0) * (watchedItems[index]?.rate || 0)).toFixed(2)}
                                </div>
                              </div>
                              <div className="col-span-1">
                                {fields.length > 1 && (
                                  <Button
                                    type="button"
                                    onClick={() => remove(index)}
                                    size="sm"
                                    variant="ghost"
                                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                  >
                                    <Trash2 size={16} />
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Tax and Discount */}
                      <div className="space-y-4">
                        <h5 className="font-semibold text-slate-700">Tax & Discount</h5>
                        
                        <div className="grid md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="taxRate"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                  <Percent size={16} />
                                  Tax Rate (%)
                                </FormLabel>
                                <FormControl>
                                  <Input 
                                    {...field} 
                                    type="number"
                                    min="0"
                                    max="100"
                                    step="0.01"
                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                    className="px-4 py-4 border-2 border-slate-200 rounded-2xl focus:border-primary"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="discountType"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-sm font-semibold text-slate-700">Discount Type</FormLabel>
                                <Select value={field.value} onValueChange={field.onChange}>
                                  <FormControl>
                                    <SelectTrigger className="px-4 py-4 border-2 border-slate-200 rounded-2xl focus:border-primary">
                                      <SelectValue />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="none">No Discount</SelectItem>
                                    <SelectItem value="percentage">Percentage (%)</SelectItem>
                                    <SelectItem value="fixed">Fixed Amount</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        {watchedDiscountType !== "none" && (
                          <FormField
                            control={form.control}
                            name="discountValue"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-sm font-semibold text-slate-700">
                                  Discount {watchedDiscountType === "percentage" ? "Percentage" : "Amount"}
                                </FormLabel>
                                <FormControl>
                                  <Input 
                                    {...field} 
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                    className="px-4 py-4 border-2 border-slate-200 rounded-2xl focus:border-primary"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        )}
                      </div>

                      {/* Calculation Summary */}
                      <div className="bg-gradient-to-r from-primary/5 to-indigo-500/5 p-6 rounded-2xl border border-primary/20">
                        <h5 className="font-semibold text-slate-700 mb-4">Invoice Summary</h5>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Subtotal:</span>
                            <span>${subtotal.toFixed(2)}</span>
                          </div>
                          {discountAmount > 0 && (
                            <div className="flex justify-between text-sm text-green-600">
                              <span>Discount:</span>
                              <span>-${discountAmount.toFixed(2)}</span>
                            </div>
                          )}
                          {taxAmount > 0 && (
                            <div className="flex justify-between text-sm">
                              <span>Tax ({watchedTaxRate}%):</span>
                              <span>${taxAmount.toFixed(2)}</span>
                            </div>
                          )}
                          <div className="flex justify-between text-lg font-bold border-t pt-2">
                            <span>Total:</span>
                            <span>${total.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 5: Additional Details */}
                  {currentStep === 5 && (
                    <div className="space-y-6 animate-slide-up-fade">
                      <div className="flex items-center gap-3 pb-4 border-b border-slate-200">
                        <div className="w-10 h-10 bg-orange-500/10 rounded-xl flex items-center justify-center">
                          <FileText size={20} className="text-orange-600" />
                        </div>
                        <h4 className="text-xl font-semibold text-slate-900">Additional Details</h4>
                      </div>

                      <FormField
                        control={form.control}
                        name="notes"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-semibold text-slate-700">Notes</FormLabel>
                            <FormControl>
                              <Textarea 
                                {...field} 
                                placeholder="Add any additional notes or terms..."
                                className="px-4 py-4 border-2 border-slate-200 rounded-2xl focus:border-primary focus:ring-0 transition-all duration-300 min-h-[100px]" 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="footer"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-semibold text-slate-700">Footer</FormLabel>
                            <FormControl>
                              <Input 
                                {...field} 
                                placeholder="Thank you for your business!"
                                className="px-4 py-4 border-2 border-slate-200 rounded-2xl focus:border-primary focus:ring-0 transition-all duration-300" 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}

                  {/* Navigation and Action Buttons */}
                  <div className="flex flex-col gap-4 pt-8">
                    {/* Step Navigation */}
                    <div className="flex gap-4">
                      <Button
                        type="button"
                        onClick={prevStep}
                        disabled={currentStep === 1}
                        variant="outline"
                        className="flex-1 py-4 rounded-2xl font-semibold transition-all duration-300"
                      >
                        <ArrowLeft size={20} className="mr-2" />
                        Previous
                      </Button>

                      {currentStep < totalSteps ? (
                        <Button
                          type="button"
                          onClick={nextStep}
                          className="flex-1 button-primary py-4 rounded-2xl font-semibold transition-all duration-300"
                        >
                          Next
                          <ArrowRight size={20} className="ml-2" />
                        </Button>
                      ) : (
                        <div className="flex gap-4 flex-1">
                          <Button
                            type="button"
                            variant="secondary"
                            className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-4 rounded-2xl font-semibold transition-all duration-300"
                            onClick={handlePreview}
                          >
                            <Eye size={20} className="mr-2" />
                            Preview
                          </Button>
                          <Button
                            type="button"
                            className="flex-1 button-primary py-4 rounded-2xl font-semibold transition-all duration-300"
                            onClick={handleGeneratePDF}
                            disabled={createInvoiceMutation.isPending}
                          >
                            <Download size={20} className="mr-2" />
                            {createInvoiceMutation.isPending ? "Generating..." : "Generate PDF"}
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </form>
              </Form>
            </div>
          </div>

          {/* Enhanced Invoice Preview */}
          <div className="animate-slide-up-fade" style={{ animationDelay: '0.6s' }}>
            <EnhancedInvoicePreview data={previewData || watchedValues} />
          </div>
        </div>
      </div>
    </section>
  );
}