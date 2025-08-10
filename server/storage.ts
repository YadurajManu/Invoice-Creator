import { type Invoice, type InvoiceItem, type InsertInvoice, type InsertInvoiceItem, type InvoiceWithItems, type CreateInvoiceRequest } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  createInvoice(request: CreateInvoiceRequest): Promise<InvoiceWithItems>;
  getInvoice(id: string): Promise<InvoiceWithItems | undefined>;
  getAllInvoices(): Promise<InvoiceWithItems[]>;
}

export class MemStorage implements IStorage {
  private invoices: Map<string, Invoice>;
  private invoiceItems: Map<string, InvoiceItem[]>;

  constructor() {
    this.invoices = new Map();
    this.invoiceItems = new Map();
  }

  async createInvoice(request: CreateInvoiceRequest): Promise<InvoiceWithItems> {
    const invoiceId = randomUUID();
    
    // Calculate totals
    const subtotal = request.items.reduce((sum, item) => {
      return sum + (item.quantity * item.rate);
    }, 0);

    const discountAmount = request.discountType === "percentage" 
      ? subtotal * ((request.discountValue || 0) / 100)
      : request.discountType === "fixed" 
      ? (request.discountValue || 0)
      : 0;

    const taxableAmount = subtotal - discountAmount;
    const taxAmount = taxableAmount * ((request.taxRate || 0) / 100);
    const total = taxableAmount + taxAmount;

    // Create invoice
    const invoice: Invoice = {
      id: invoiceId,
      // Business Information
      businessName: request.businessName,
      businessAddress: request.businessAddress || null,
      businessPhone: request.businessPhone || null,
      businessEmail: request.businessEmail || null,
      businessWebsite: request.businessWebsite || null,
      businessLogo: request.businessLogo || null,
      // Invoice Details
      invoiceNumber: request.invoiceNumber,
      invoiceDate: request.invoiceDate,
      dueDate: request.dueDate,
      // Client Information
      clientName: request.clientName,
      clientEmail: request.clientEmail,
      clientAddress: request.clientAddress || null,
      clientPhone: request.clientPhone || null,
      // Financial Details
      currency: request.currency || "USD",
      subtotal: subtotal.toString(),
      taxRate: (request.taxRate || 0).toString(),
      taxAmount: taxAmount.toString(),
      discountType: request.discountType || "none",
      discountValue: (request.discountValue || 0).toString(),
      discountAmount: discountAmount.toString(),
      total: total.toString(),
      // Additional Features
      paymentTerms: request.paymentTerms || null,
      notes: request.notes || null,
      footer: request.footer || null,
      status: "draft",
    };

    // Create invoice items
    const items: InvoiceItem[] = request.items.map(item => ({
      id: randomUUID(),
      invoiceId,
      description: item.description,
      quantity: item.quantity,
      rate: item.rate.toString(),
      amount: (item.quantity * item.rate).toString(),
    }));

    this.invoices.set(invoiceId, invoice);
    this.invoiceItems.set(invoiceId, items);

    return {
      ...invoice,
      items,
    };
  }

  async getInvoice(id: string): Promise<InvoiceWithItems | undefined> {
    const invoice = this.invoices.get(id);
    if (!invoice) return undefined;

    const items = this.invoiceItems.get(id) || [];
    return {
      ...invoice,
      items,
    };
  }

  async getAllInvoices(): Promise<InvoiceWithItems[]> {
    return Array.from(this.invoices.values()).map(invoice => ({
      ...invoice,
      items: this.invoiceItems.get(invoice.id) || [],
    }));
  }
}

export const storage = new MemStorage();
