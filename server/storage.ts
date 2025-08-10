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
    
    // Calculate total
    const total = request.items.reduce((sum, item) => {
      return sum + (item.quantity * item.rate);
    }, 0);

    // Create invoice
    const invoice: Invoice = {
      id: invoiceId,
      businessName: request.businessName,
      invoiceNumber: request.invoiceNumber,
      clientName: request.clientName,
      clientEmail: request.clientEmail,
      invoiceDate: request.invoiceDate,
      dueDate: request.dueDate,
      notes: request.notes || "",
      total: total.toString(),
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
