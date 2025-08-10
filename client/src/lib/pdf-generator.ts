import { type CreateInvoiceRequest } from "@shared/schema";
import jsPDF from "jspdf";

export async function generateInvoicePDF(data: CreateInvoiceRequest): Promise<void> {
  const pdf = new jsPDF();
  
  // Set font
  pdf.setFont("helvetica");
  
  // Header
  pdf.setFontSize(28);
  pdf.setTextColor(99, 102, 241); // Primary color
  pdf.text("INVOICE", 20, 30);
  
  pdf.setFontSize(12);
  pdf.setTextColor(0, 0, 0);
  pdf.text(data.invoiceNumber, 20, 42);
  
  // Business info (left side)
  let yPos = 60;
  pdf.setFontSize(16);
  pdf.setFont("helvetica", "bold");
  pdf.text(data.businessName, 20, yPos);
  
  yPos += 8;
  pdf.setFontSize(10);
  pdf.setFont("helvetica", "normal");
  
  if (data.businessAddress) {
    const addressLines = data.businessAddress.split('\n');
    addressLines.forEach(line => {
      pdf.text(line.trim(), 20, yPos);
      yPos += 5;
    });
  }
  
  if (data.businessPhone) {
    pdf.text(`Phone: ${data.businessPhone}`, 20, yPos);
    yPos += 5;
  }
  
  if (data.businessEmail) {
    pdf.text(`Email: ${data.businessEmail}`, 20, yPos);
    yPos += 5;
  }
  
  if (data.businessWebsite) {
    pdf.text(`Website: ${data.businessWebsite}`, 20, yPos);
    yPos += 5;
  }
  
  // Invoice details (right side)
  pdf.setFontSize(10);
  let rightYPos = 60;
  pdf.text(`Date: ${formatDate(data.invoiceDate)}`, 120, rightYPos);
  rightYPos += 6;
  pdf.text(`Due Date: ${formatDate(data.dueDate)}`, 120, rightYPos);
  rightYPos += 6;
  pdf.text(`Currency: ${data.currency || 'USD'}`, 120, rightYPos);
  rightYPos += 6;
  
  if (data.paymentTerms) {
    pdf.text(`Terms: ${data.paymentTerms}`, 120, rightYPos);
    rightYPos += 6;
  }
  
  // Client info
  yPos = Math.max(yPos + 10, 100);
  pdf.setFontSize(12);
  pdf.setFont("helvetica", "bold");
  pdf.text("Bill To:", 20, yPos);
  
  yPos += 8;
  pdf.setFont("helvetica", "normal");
  pdf.text(data.clientName, 20, yPos);
  yPos += 6;
  
  if (data.clientEmail) {
    pdf.text(data.clientEmail, 20, yPos);
    yPos += 6;
  }
  
  if (data.clientAddress) {
    const clientAddressLines = data.clientAddress.split('\n');
    clientAddressLines.forEach(line => {
      pdf.text(line.trim(), 20, yPos);
      yPos += 5;
    });
  }
  
  if (data.clientPhone) {
    pdf.text(`Phone: ${data.clientPhone}`, 20, yPos);
    yPos += 6;
  }
  
  // Table header
  yPos = Math.max(yPos + 15, 140);
  pdf.setFontSize(10);
  pdf.setFont("helvetica", "bold");
  pdf.setFillColor(248, 250, 252); // Light gray background
  pdf.rect(20, yPos - 5, 170, 10, 'F');
  pdf.text("Description", 25, yPos);
  pdf.text("Qty", 120, yPos);
  pdf.text("Rate", 140, yPos);
  pdf.text("Amount", 170, yPos);
  
  // Items
  yPos += 10;
  pdf.setFont("helvetica", "normal");
  let subtotal = 0;
  
  data.items.forEach(item => {
    const amount = item.quantity * item.rate;
    subtotal += amount;
    
    // Alternate row colors
    if (data.items.indexOf(item) % 2 === 1) {
      pdf.setFillColor(249, 250, 251);
      pdf.rect(20, yPos - 5, 170, 8, 'F');
    }
    
    pdf.text(item.description, 25, yPos);
    pdf.text(item.quantity.toString(), 125, yPos);
    pdf.text(formatCurrency(item.rate, data.currency), 145, yPos, { align: 'right' });
    pdf.text(formatCurrency(amount, data.currency), 185, yPos, { align: 'right' });
    
    yPos += 8;
  });
  
  // Calculate totals
  const discountAmount = data.discountType === "percentage" 
    ? subtotal * ((data.discountValue || 0) / 100)
    : data.discountType === "fixed" 
    ? (data.discountValue || 0)
    : 0;
  
  const taxableAmount = subtotal - discountAmount;
  const taxAmount = taxableAmount * ((data.taxRate || 0) / 100);
  const total = taxableAmount + taxAmount;
  
  // Totals section
  yPos += 10;
  pdf.line(120, yPos, 190, yPos); // Line above totals
  yPos += 8;
  
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(10);
  
  // Subtotal
  pdf.text("Subtotal:", 140, yPos);
  pdf.text(formatCurrency(subtotal, data.currency), 185, yPos, { align: 'right' });
  yPos += 6;
  
  // Discount
  if (data.discountType !== "none" && discountAmount > 0) {
    pdf.setTextColor(34, 197, 94); // Green color for discount
    pdf.text(`Discount ${data.discountType === "percentage" ? `(${data.discountValue}%)` : ""}:`, 140, yPos);
    pdf.text(`-${formatCurrency(discountAmount, data.currency)}`, 185, yPos, { align: 'right' });
    pdf.setTextColor(0, 0, 0); // Reset to black
    yPos += 6;
  }
  
  // Tax
  if ((data.taxRate || 0) > 0) {
    pdf.text(`Tax (${data.taxRate}%):`, 140, yPos);
    pdf.text(formatCurrency(taxAmount, data.currency), 185, yPos, { align: 'right' });
    yPos += 6;
  }
  
  // Total
  yPos += 2;
  pdf.line(140, yPos, 190, yPos); // Line above total
  yPos += 8;
  
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(12);
  pdf.text("Total:", 140, yPos);
  pdf.setTextColor(99, 102, 241); // Primary color
  pdf.text(formatCurrency(total, data.currency), 185, yPos, { align: 'right' });
  
  // Notes and Footer
  yPos += 20;
  pdf.setTextColor(0, 0, 0);
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(10);
  
  if (data.notes) {
    pdf.setFont("helvetica", "bold");
    pdf.text("Notes:", 20, yPos);
    yPos += 6;
    
    pdf.setFont("helvetica", "normal");
    const noteLines = pdf.splitTextToSize(data.notes, 170);
    pdf.text(noteLines, 20, yPos);
    yPos += noteLines.length * 5 + 10;
  }
  
  if (data.footer) {
    pdf.setTextColor(107, 114, 128); // Gray color
    pdf.setFontSize(9);
    pdf.text(data.footer, 105, yPos, { align: 'center' });
  }
  
  // Save the PDF
  pdf.save(`${data.invoiceNumber}.pdf`);
}

function formatCurrency(amount: number, currency = 'USD'): string {
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
  
  const symbol = currencySymbols[currency] || '$';
  return `${symbol}${amount.toFixed(2)}`;
}

function formatDate(dateString: string): string {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}
