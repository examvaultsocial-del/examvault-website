import { createClient } from "@supabase/supabase-js";

// Load environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

const isSupabaseConfigured = supabaseUrl && supabaseServiceKey;

if (!isSupabaseConfigured) {
  console.warn(
    "⚠️ WARNING: Supabase credentials (NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY) are missing in environment variables. Falling back to high-integrity Local Mock Database for seamless testing."
  );
}

// ----------------------------------------------------
// 1. Production Supabase Client
// ----------------------------------------------------
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        persistSession: false,
      },
    })
  : null;

// ----------------------------------------------------
// 2. High-Integrity Local Mock Database System
// ----------------------------------------------------
export interface MockCustomer {
  id: string;
  email: string;
  name: string;
  phone?: string;
  total_spent: number;
  created_at: string;
}

export interface MockOrder {
  id: string;
  customer_id?: string;
  customer_email: string;
  total_amount: number;
  razorpay_payment_id?: string;
  razorpay_order_id: string;
  status: string;
  currency: string;
  savings_amount: number;
  browser_agent?: string;
  ip_address?: string;
  created_at: string;
}

export interface MockOrderItem {
  id: string;
  order_id: string;
  book_id: string | number;
  book_title: string;
  price_at_purchase: number;
}

export interface MockDownloadToken {
  id: string;
  order_id: string;
  book_id: string | number;
  book_title: string;
  token_hash: string;
  email: string;
  used: boolean;
  used_at?: string;
  created_at: string;
  expires_at: string;
}

export interface MockSupportTicket {
  id: string;
  customer_id?: string;
  customer_email: string;
  order_id?: string;
  subject: string;
  message: string;
  status: string;
  created_at: string;
}

// Global in-memory storage to persist across API hot-reloads during server runtime
const globalMockDb = globalThis as typeof globalThis & {
  mockCustomers?: MockCustomer[];
  mockOrders?: MockOrder[];
  mockOrderItems?: MockOrderItem[];
  mockDownloadTokens?: MockDownloadToken[];
  mockSupportTickets?: MockSupportTicket[];
};

if (!globalMockDb.mockCustomers) globalMockDb.mockCustomers = [];
if (!globalMockDb.mockOrders) globalMockDb.mockOrders = [];
if (!globalMockDb.mockOrderItems) globalMockDb.mockOrderItems = [];
if (!globalMockDb.mockDownloadTokens) globalMockDb.mockDownloadTokens = [];
if (!globalMockDb.mockSupportTickets) globalMockDb.mockSupportTickets = [];

export const mockDb = {
  // --- Customers Table ---
  customers: {
    findUnique: async (email: string): Promise<MockCustomer | null> => {
      const customer = globalMockDb.mockCustomers?.find(c => c.email.toLowerCase() === email.toLowerCase());
      return customer || null;
    },
    upsert: async (customerData: Omit<MockCustomer, "id" | "created_at" | "total_spent">): Promise<MockCustomer> => {
      let customer = globalMockDb.mockCustomers?.find(c => c.email.toLowerCase() === customerData.email.toLowerCase());
      if (!customer) {
        customer = {
          id: `cust_${Math.random().toString(36).substr(2, 9)}`,
          email: customerData.email,
          name: customerData.name,
          phone: customerData.phone,
          total_spent: 0,
          created_at: new Date().toISOString(),
        };
        globalMockDb.mockCustomers?.push(customer);
      } else {
        customer.name = customerData.name;
        if (customerData.phone) customer.phone = customerData.phone;
      }
      return customer;
    },
    incrementSpend: async (customerId: string, amount: number): Promise<void> => {
      const customer = globalMockDb.mockCustomers?.find(c => c.id === customerId);
      if (customer) {
        customer.total_spent += amount;
      }
    }
  },

  // --- Orders Table ---
  orders: {
    create: async (orderData: Omit<MockOrder, "id" | "created_at" | "status">): Promise<MockOrder> => {
      const order: MockOrder = {
        id: `ord_${Math.random().toString(36).substr(2, 9)}`,
        ...orderData,
        status: "pending",
        created_at: new Date().toISOString(),
      };
      globalMockDb.mockOrders?.push(order);
      return order;
    },
    updateStatus: async (razorpayOrderId: string, status: string, paymentId?: string): Promise<MockOrder | null> => {
      const order = globalMockDb.mockOrders?.find(o => o.razorpay_order_id === razorpayOrderId);
      if (order) {
        order.status = status;
        if (paymentId) order.razorpay_payment_id = paymentId;
        return order;
      }
      return null;
    },
    findUniqueByOrderId: async (razorpayOrderId: string): Promise<MockOrder | null> => {
      const order = globalMockDb.mockOrders?.find(o => o.razorpay_order_id === razorpayOrderId);
      return order || null;
    }
  },

  // --- Order Items Table ---
  orderItems: {
    createMany: async (items: Omit<MockOrderItem, "id">[]): Promise<MockOrderItem[]> => {
      const createdItems = items.map(item => ({
        id: `item_${Math.random().toString(36).substr(2, 9)}`,
        ...item,
      }));
      globalMockDb.mockOrderItems?.push(...createdItems);
      return createdItems;
    },
    findByOrderId: async (orderId: string): Promise<MockOrderItem[]> => {
      return globalMockDb.mockOrderItems?.filter(item => item.order_id === orderId) || [];
    }
  },

  // --- Download Tokens Table (Expire & Single-use) ---
  downloadTokens: {
    createMany: async (tokens: Omit<MockDownloadToken, "id" | "used" | "used_at" | "created_at">[]): Promise<MockDownloadToken[]> => {
      const createdTokens = tokens.map(t => ({
        id: `tok_${Math.random().toString(36).substr(2, 9)}`,
        ...t,
        used: false,
        created_at: new Date().toISOString(),
      }));
      globalMockDb.mockDownloadTokens?.push(...createdTokens);
      return createdTokens;
    },
    findUnique: async (tokenHash: string): Promise<MockDownloadToken | null> => {
      const token = globalMockDb.mockDownloadTokens?.find(t => t.token_hash === tokenHash);
      return token || null;
    },
    markAsUsed: async (tokenHash: string): Promise<MockDownloadToken | null> => {
      const token = globalMockDb.mockDownloadTokens?.find(t => t.token_hash === tokenHash);
      if (token) {
        token.used = true;
        token.used_at = new Date().toISOString();
        return token;
      }
      return null;
    }
  },

  // --- Support Tickets ---
  supportTickets: {
    create: async (ticketData: Omit<MockSupportTicket, "id" | "status" | "created_at">): Promise<MockSupportTicket> => {
      const ticket: MockSupportTicket = {
        id: `tkt_${Math.random().toString(36).substr(2, 9)}`,
        ...ticketData,
        status: "open",
        created_at: new Date().toISOString(),
      };
      globalMockDb.mockSupportTickets?.push(ticket);
      return ticket;
    }
  }
};
