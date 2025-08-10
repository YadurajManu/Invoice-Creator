import { type CreateInvoiceRequest } from "@shared/schema";
import jsPDF from "jspdf";

export async function generateInvoicePDF(data: CreateInvoiceRequest): Promise<void> {
  const pdf = new jsPDF();
  
  // Set font
  pdf.setFont("helvetica");
  
  // Header
  pdf.setFontSize(24);
  pdf.setTextColor(99, 102, 241); // Primary color
  pdf.text("INVOICE", 20, 30);
  
  pdf.setFontSize(12);
  pdf.setTextColor(0, 0, 0);
  pdf.text(data.invoiceNumber, 20, 40);
  
  // Business info
  pdf.setFontSize(14);
  pdf.text(data.businessName, 20, 60);
  
  // Dates (right aligned)
  pdf.setFontSize(10);
  pdf.text(`Date: ${formatDate(data.invoiceDate)}`, 150, 30);
  pdf.text(`Due: ${formatDate(data.dueDate)}`, 150, 40);
  
  // Client info
  pdf.setFontSize(12);
  pdf.text("Bill To:", 20, 80);
  pdf.text(data.clientName, 20, 90);
  pdf.text(data.clientEmail, 20, 100);
  
  // Table header
  let yPosition = 120;
  pdf.setFontSize(10);
  pdf.setFont("helvetica", "bold");
  pdf.text("Description", 20, yPosition);
  pdf.text("Qty", 120, yPosition);
  pdf.text("Rate", 140, yPosition);
  pdf.text("Amount", 170, yPosition);
  
  // Line under header
  pdf.line(20, yPosition + 2, 190, yPosition + 2);
  
  // Items
  yPosition += 10;
  pdf.setFont("helvetica", "normal");
  let total = 0;
  
  data.items.forEach(item => {
    const amount = item.quantity * item.rate;
    total += amount;
    
    pdf.text(item.description, 20, yPosition);
    pdf.text(item.quantity.toString(), 120, yPosition);
    pdf.text(formatCurrency(item.rate), 140, yPosition);
    pdf.text(formatCurrency(amount), 170, yPosition);
    
    yPosition += 10;
  });
  
  // Total
  yPosition += 10;
  pdf.line(20, yPosition, 190, yPosition);
  yPosition += 10;
  
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(14);
  pdf.text("Total:", 140, yPosition);
  pdf.setTextColor(99, 102, 241); // Primary color
  pdf.text(formatCurrency(total), 170, yPosition);
  
  // Notes
  if (data.notes) {
    yPosition += 20;
    pdf.setTextColor(0, 0, 0);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(12);
    pdf.text("Notes:", 20, yPosition);
    
    yPosition += 10;
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(10);
    
    // Split notes into lines
    const noteLines = pdf.splitTextToSize(data.notes, 170);
    noteLines.forEach((line: string) => {
      pdf.text(line, 20, yPosition);
      yPosition += 6;
    });
  }
  
  // Save the PDF
  pdf.save(`${data.invoiceNumber}.pdf`);
}

function formatDate(dateString: string): string {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}
