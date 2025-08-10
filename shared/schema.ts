import { sql } from "drizzle-orm";
import { pgTable, text, varchar, decimal, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const invoices = pgTable("invoices", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  // Business Information
  businessName: text("business_name").notNull(),
  businessAddress: text("business_address"),
  businessPhone: text("business_phone"),
  businessEmail: text("business_email"),
  businessWebsite: text("business_website"),
  businessLogo: text("business_logo"),
  // Invoice Details
  invoiceNumber: text("invoice_number").notNull(),
  invoiceDate: text("invoice_date").notNull(),
  dueDate: text("due_date").notNull(),
  // Client Information
  clientName: text("client_name").notNull(),
  clientEmail: text("client_email").notNull(),
  clientAddress: text("client_address"),
  clientPhone: text("client_phone"),
  // Financial Details
  currency: text("currency").default("USD"),
  subtotal: decimal("subtotal", { precision: 10, scale: 2 }).notNull(),
  taxRate: decimal("tax_rate", { precision: 5, scale: 4 }).default("0"),
  taxAmount: decimal("tax_amount", { precision: 10, scale: 2 }).default("0"),
  discountType: text("discount_type").default("none"), // none, percentage, fixed
  discountValue: decimal("discount_value", { precision: 10, scale: 2 }).default("0"),
  discountAmount: decimal("discount_amount", { precision: 10, scale: 2 }).default("0"),
  total: decimal("total", { precision: 10, scale: 2 }).notNull(),
  // Additional Features
  paymentTerms: text("payment_terms"),
  notes: text("notes"),
  footer: text("footer"),
  status: text("status").default("draft"), // draft, sent, paid, overdue
});

export const invoiceItems = pgTable("invoice_items", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  invoiceId: varchar("invoice_id").notNull(),
  description: text("description").notNull(),
  quantity: integer("quantity").notNull(),
  rate: decimal("rate", { precision: 10, scale: 2 }).notNull(),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
});

export const insertInvoiceSchema = createInsertSchema(invoices).omit({
  id: true,
});

export const insertInvoiceItemSchema = createInsertSchema(invoiceItems).omit({
  id: true,
  invoiceId: true,
});

export const createInvoiceSchema = z.object({
  // Business Information
  businessName: z.string().min(1, "Business name is required"),
  businessAddress: z.string().optional(),
  businessPhone: z.string().optional(),
  businessEmail: z.string().email().optional().or(z.literal("")),
  businessWebsite: z.string().optional(),
  businessLogo: z.string().optional(),
  
  // Invoice Details
  invoiceNumber: z.string().min(1, "Invoice number is required"),
  invoiceDate: z.string().min(1, "Invoice date is required"),
  dueDate: z.string().min(1, "Due date is required"),
  
  // Client Information
  clientName: z.string().min(1, "Client name is required"),
  clientEmail: z.string().email("Valid email is required"),
  clientAddress: z.string().optional(),
  clientPhone: z.string().optional(),
  
  // Financial Details
  currency: z.string().default("USD"),
  taxRate: z.number().min(0).max(100).default(0),
  discountType: z.enum(["none", "percentage", "fixed"]).default("none"),
  discountValue: z.number().min(0).default(0),
  
  // Additional Features
  paymentTerms: z.string().optional(),
  notes: z.string().optional(),
  footer: z.string().optional(),
  
  // Items
  items: z.array(z.object({
    description: z.string().min(1, "Description is required"),
    quantity: z.number().min(1, "Quantity must be at least 1"),
    rate: z.number().min(0, "Rate must be positive"),
  })).min(1, "At least one item is required"),
});

export type InsertInvoice = z.infer<typeof insertInvoiceSchema>;
export type InsertInvoiceItem = z.infer<typeof insertInvoiceItemSchema>;
export type CreateInvoiceRequest = z.infer<typeof createInvoiceSchema>;
export type Invoice = typeof invoices.$inferSelect;
export type InvoiceItem = typeof invoiceItems.$inferSelect;

export type InvoiceWithItems = Invoice & {
  items: InvoiceItem[];
};
