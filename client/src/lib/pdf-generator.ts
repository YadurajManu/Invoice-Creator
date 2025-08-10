import { type CreateInvoiceRequest } from "@shared/schema";
import jsPDF from "jspdf";

export async function generateInvoicePDF(data: CreateInvoiceRequest): Promise<void> {
  const pdf = new jsPDF();
  
  // Set font
  pdf.setFont("helvetica");
  
  // Header background
  pdf.setFillColor(248, 250, 252); // Light gray background
  pdf.rect(0, 0, 210, 50, 'F');
  
  // Logo/Signature area (if provided)
  if (data.businessLogo) {
    try {
      // Add logo/signature image
      pdf.addImage(data.businessLogo, 'JPEG', 20, 15, 30, 20);
    } catch (error) {
      console.log('Could not add logo/signature image');
    }
  }
  
  // Header text
  pdf.setFontSize(32);
  pdf.setTextColor(51, 51, 51); // Dark gray
  pdf.setFont("helvetica", "bold");
  pdf.text("INVOICE", data.businessLogo ? 60 : 20, 30);
  
  pdf.setFontSize(14);
  pdf.setTextColor(102, 102, 102);
  pdf.setFont("helvetica", "normal");
  pdf.text(data.invoiceNumber, data.businessLogo ? 60 : 20, 42);
  
  // Business info section
  let yPos = 65;
  
  // Business info box
  pdf.setFillColor(255, 255, 255);
  pdf.setDrawColor(230, 230, 230);
  pdf.rect(20, yPos - 5, 85, 45, 'FD');
  
  pdf.setFontSize(18);
  pdf.setFont("helvetica", "bold");
  pdf.setTextColor(51, 51, 51);
  pdf.text(data.businessName, 25, yPos + 5);
  
  yPos += 12;
  pdf.setFontSize(10);
  pdf.setFont("helvetica", "normal");
  pdf.setTextColor(102, 102, 102);
  
  if (data.businessAddress) {
    const addressLines = data.businessAddress.split('\n');
    addressLines.forEach(line => {
      pdf.text(line.trim(), 25, yPos);
      yPos += 4;
    });
  }
  
  if (data.businessPhone) {
    pdf.text(`Phone: ${data.businessPhone}`, 25, yPos);
    yPos += 4;
  }
  
  if (data.businessEmail) {
    pdf.text(`Email: ${data.businessEmail}`, 25, yPos);
    yPos += 4;
  }
  
  if (data.businessWebsite) {
    pdf.text(`Website: ${data.businessWebsite}`, 25, yPos);
    yPos += 4;
  }
  
  // Invoice details box (right side)
  pdf.setFillColor(255, 255, 255);
  pdf.setDrawColor(230, 230, 230);
  pdf.rect(115, 60, 75, 35, 'FD');
  
  pdf.setFontSize(12);
  pdf.setFont("helvetica", "bold");
  pdf.setTextColor(51, 51, 51);
  pdf.text("Invoice Details", 120, 70);
  
  pdf.setFontSize(10);
  pdf.setFont("helvetica", "normal");
  pdf.setTextColor(102, 102, 102);
  
  let rightYPos = 78;
  pdf.text(`Date: ${formatDate(data.invoiceDate)}`, 120, rightYPos);
  rightYPos += 5;
  pdf.text(`Due Date: ${formatDate(data.dueDate)}`, 120, rightYPos);
  rightYPos += 5;
  pdf.text(`Currency: ${data.currency || 'USD'}`, 120, rightYPos);
  rightYPos += 5;
  
  if (data.paymentTerms) {
    pdf.text(`Terms: ${data.paymentTerms}`, 120, rightYPos);
    rightYPos += 5;
  }
  
  // Client info section
  yPos = 120;
  
  // Client info box
  pdf.setFillColor(250, 251, 252);
  pdf.setDrawColor(230, 230, 230);
  pdf.rect(20, yPos - 5, 85, 35, 'FD');
  
  pdf.setFontSize(12);
  pdf.setFont("helvetica", "bold");
  pdf.setTextColor(51, 51, 51);
  pdf.text("Bill To:", 25, yPos + 5);
  
  yPos += 12;
  pdf.setFontSize(11);
  pdf.setFont("helvetica", "bold");
  pdf.text(data.clientName, 25, yPos);
  yPos += 6;
  
  pdf.setFontSize(10);
  pdf.setFont("helvetica", "normal");
  pdf.setTextColor(102, 102, 102);
  
  if (data.clientEmail) {
    pdf.text(data.clientEmail, 25, yPos);
    yPos += 4;
  }
  
  if (data.clientAddress) {
    const clientAddressLines = data.clientAddress.split('\n');
    clientAddressLines.forEach(line => {
      pdf.text(line.trim(), 25, yPos);
      yPos += 4;
    });
  }
  
  if (data.clientPhone) {
    pdf.text(`Phone: ${data.clientPhone}`, 25, yPos);
    yPos += 4;
  }
  
  // Table section
  yPos = 170;
  
  // Table header
  pdf.setFillColor(51, 51, 51); // Dark header
  pdf.rect(20, yPos - 5, 170, 12, 'F');
  
  pdf.setFontSize(11);
  pdf.setFont("helvetica", "bold");
  pdf.setTextColor(255, 255, 255); // White text on dark background
  pdf.text("Description", 25, yPos + 2);
  pdf.text("Qty", 125, yPos + 2);
  pdf.text("Rate", 145, yPos + 2);
  pdf.text("Amount", 175, yPos + 2);
  
  // Reset text color
  pdf.setTextColor(51, 51, 51);
  
  // Items
  yPos += 15;
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(10);
  let subtotal = 0;
  
  data.items.forEach((item, index) => {
    const amount = item.quantity * item.rate;
    subtotal += amount;
    
    // Alternate row colors for better readability
    if (index % 2 === 1) {
      pdf.setFillColor(252, 252, 252);
      pdf.rect(20, yPos - 3, 170, 10, 'F');
    }
    
    // Add borders for professional look
    pdf.setDrawColor(240, 240, 240);
    pdf.line(20, yPos + 5, 190, yPos + 5);
    
    pdf.setTextColor(51, 51, 51);
    pdf.text(item.description, 25, yPos + 2);
    pdf.text(item.quantity.toString(), 128, yPos + 2, { align: 'center' });
    pdf.text(formatCurrency(item.rate, data.currency), 150, yPos + 2, { align: 'right' });
    pdf.text(formatCurrency(amount, data.currency), 185, yPos + 2, { align: 'right' });
    
    yPos += 10;
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
  
  // Totals section with professional styling
  yPos += 15;
  
  // Totals box
  pdf.setFillColor(248, 250, 252);
  pdf.setDrawColor(230, 230, 230);
  const totalsHeight = 35 + (data.discountType !== "none" && discountAmount > 0 ? 6 : 0) + ((data.taxRate || 0) > 0 ? 6 : 0);
  pdf.rect(120, yPos - 5, 70, totalsHeight, 'FD');
  
  yPos += 5;
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(11);
  pdf.setTextColor(102, 102, 102);
  
  // Subtotal
  pdf.text("Subtotal:", 125, yPos);
  pdf.text(formatCurrency(subtotal, data.currency), 185, yPos, { align: 'right' });
  yPos += 6;
  
  // Discount
  if (data.discountType !== "none" && discountAmount > 0) {
    pdf.setTextColor(220, 38, 38); // Red for discount
    pdf.text(`Discount ${data.discountType === "percentage" ? `(${data.discountValue}%)` : ""}:`, 125, yPos);
    pdf.text(`-${formatCurrency(discountAmount, data.currency)}`, 185, yPos, { align: 'right' });
    pdf.setTextColor(102, 102, 102); // Reset color
    yPos += 6;
  }
  
  // Tax
  if ((data.taxRate || 0) > 0) {
    pdf.text(`Tax (${data.taxRate}%):`, 125, yPos);
    pdf.text(formatCurrency(taxAmount, data.currency), 185, yPos, { align: 'right' });
    yPos += 6;
  }
  
  // Total with emphasis
  yPos += 3;
  pdf.setDrawColor(51, 51, 51);
  pdf.line(125, yPos, 185, yPos); // Line above total
  yPos += 8;
  
  pdf.setFillColor(51, 51, 51);
  pdf.rect(120, yPos - 6, 70, 12, 'F');
  
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(14);
  pdf.setTextColor(255, 255, 255); // White text on dark background
  pdf.text("TOTAL:", 125, yPos);
  pdf.text(formatCurrency(total, data.currency), 185, yPos, { align: 'right' });
  
  // Notes and Footer section
  yPos += 25;
  pdf.setTextColor(51, 51, 51);
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(10);
  
  if (data.notes) {
    // Notes box
    pdf.setFillColor(250, 251, 252);
    pdf.setDrawColor(230, 230, 230);
    
    pdf.setFont("helvetica", "bold");
    pdf.text("Notes:", 20, yPos);
    yPos += 8;
    
    pdf.setFont("helvetica", "normal");
    const noteLines = pdf.splitTextToSize(data.notes, 170);
    const notesHeight = noteLines.length * 5 + 10;
    pdf.rect(20, yPos - 5, 170, notesHeight, 'FD');
    pdf.text(noteLines, 25, yPos);
    yPos += notesHeight + 5;
  }
  
  // Footer with professional styling
  if (data.footer) {
    yPos += 10;
    pdf.setDrawColor(200, 200, 200);
    pdf.line(20, yPos, 190, yPos); // Separator line
    yPos += 8;
    
    pdf.setTextColor(102, 102, 102);
    pdf.setFontSize(9);
    pdf.setFont("helvetica", "italic");
    pdf.text(data.footer, 105, yPos, { align: 'center' });
  }
  
  // Professional footer with page numbers and generation date
  pdf.setTextColor(153, 153, 153);
  pdf.setFontSize(8);
  pdf.setFont("helvetica", "normal");
  pdf.text(`Generated on ${new Date().toLocaleDateString()}`, 20, 285);
  pdf.text("Page 1 of 1", 185, 285, { align: 'right' });
  
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
