import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { createInvoiceSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Create invoice
  app.post("/api/invoices", async (req, res) => {
    try {
      const validatedData = createInvoiceSchema.parse(req.body);
      const invoice = await storage.createInvoice(validatedData);
      res.json(invoice);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Validation error", errors: error.errors });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  // Get invoice by ID
  app.get("/api/invoices/:id", async (req, res) => {
    try {
      const invoice = await storage.getInvoice(req.params.id);
      if (!invoice) {
        res.status(404).json({ message: "Invoice not found" });
        return;
      }
      res.json(invoice);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get all invoices
  app.get("/api/invoices", async (req, res) => {
    try {
      const invoices = await storage.getAllInvoices();
      res.json(invoices);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
