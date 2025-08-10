# InvoiceFlow - Professional Invoice Generator

## Overview

InvoiceFlow is a full-stack web application designed for freelancers, consultants, and small businesses to generate professional invoices quickly and efficiently. The application features a modern React frontend with a clean, intuitive interface and an Express.js backend that handles invoice data management. Users can create invoices with business information, client details, line items, and generate PDF downloads for professional presentation.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development patterns
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management and caching
- **UI Framework**: Radix UI primitives with shadcn/ui components for accessibility and consistency
- **Styling**: Tailwind CSS with custom design tokens and CSS variables for theming
- **Form Handling**: React Hook Form with Zod validation for robust form management
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework for REST API endpoints
- **Database ORM**: Drizzle ORM with PostgreSQL for type-safe database operations
- **Validation**: Zod schemas shared between frontend and backend for consistent data validation
- **Storage Strategy**: In-memory storage implementation (MemStorage) for development, with interface design for easy database integration
- **API Design**: RESTful endpoints for CRUD operations on invoices and invoice items

### Data Storage Solutions
- **Database**: PostgreSQL configured through Neon serverless connection
- **Schema Design**: Normalized tables for invoices and invoice items with proper relationships
- **Migration System**: Drizzle Kit for database schema migrations and updates
- **Development Storage**: Memory-based storage for rapid development and testing

### Authentication and Authorization
- Currently implements basic session handling infrastructure
- Uses connect-pg-simple for PostgreSQL session storage
- Designed for future authentication feature expansion

## External Dependencies

### Database Services
- **Neon Database**: Serverless PostgreSQL hosting for production database needs
- **Drizzle ORM**: Type-safe database toolkit for PostgreSQL interactions

### UI and Design Libraries
- **Radix UI**: Comprehensive set of accessible, unstyled UI primitives
- **Lucide React**: Modern icon library for consistent iconography
- **Tailwind CSS**: Utility-first CSS framework for rapid styling

### Development and Build Tools
- **Vite**: Fast build tool with Hot Module Replacement for development
- **TypeScript**: Static type checking for enhanced code reliability
- **ESBuild**: Fast JavaScript bundler for production builds

### Form and Validation
- **React Hook Form**: Performant form library with minimal re-renders
- **Zod**: TypeScript-first schema validation for runtime type safety

### PDF Generation
- **jsPDF**: Client-side PDF generation for invoice downloads

### Additional Integrations
- **Replit Development**: Custom plugins for Replit environment integration
- **Error Handling**: Runtime error overlay for improved development experience