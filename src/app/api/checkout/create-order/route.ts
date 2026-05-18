import { NextResponse } from "next/server";
import { allProducts } from "@/lib/products";
import { supabase, mockDb } from "@/lib/supabase";

// Razorpay SDK loading dynamically
let RazorpayInstance: any = null;
try {
  if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
    const Razorpay = require("razorpay");
    RazorpayInstance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
  }
} catch (error) {
  console.warn("⚠️ Razorpay SDK not initialized. Mock mode enabled.", error);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, items, browserAgent, ipAddress } = body;

    if (!email || !name || !items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "Name, email, and shopping cart items are required." },
        { status: 400 }
      );
    }

    // 1. Calculate & verify totals on server side to prevent customer tampering
    let subtotal = 0;
    let savings = 0;
    const validatedItems = [];

    for (const item of items) {
      const product = allProducts.find((p) => p.id === item.id);
      if (!product) {
        return NextResponse.json(
          { error: `Study guide item with ID ${item.id} not found in our catalog.` },
          { status: 404 }
        );
      }
      subtotal += product.price;
      savings += (product.originalPrice || 0) - product.price;
      validatedItems.push({
        book_id: product.id,
        book_title: product.title,
        price_at_purchase: product.price,
      });
    }

    // Apply any discounts/bundles if applicable (currently simple sum)
    const totalAmount = subtotal;

    // 2. Setup Order ID (Razorpay or Mock)
    let razorpayOrderId = "";
    const mockOrderId = `order_mock_${Math.random().toString(36).substring(2, 11)}`;

    if (RazorpayInstance) {
      try {
        const rzpOrder = await RazorpayInstance.orders.create({
          amount: Math.round(totalAmount * 100), // Razorpay accepts in Paisa (1 INR = 100 Paisa)
          currency: "INR",
          receipt: `receipt_${Date.now()}`,
          notes: {
            customer_name: name,
            customer_email: email,
          },
        });
        razorpayOrderId = rzpOrder.id;
      } catch (err: any) {
        console.error("Razorpay order creation failed, falling back to mock:", err);
        razorpayOrderId = mockOrderId;
      }
    } else {
      razorpayOrderId = mockOrderId;
    }

    // 3. Save transactions in Supabase or MockDb
    if (supabase) {
      // Create or locate Customer record
      const { data: customer, error: customerErr } = await supabase
        .from("customers")
        .upsert({ email, name, phone }, { onConflict: "email" })
        .select()
        .single();

      if (customerErr) {
        console.error("Supabase customer upsert error:", customerErr);
        return NextResponse.json({ error: "Failed to process customer database log." }, { status: 500 });
      }

      // Record Order log
      const { data: order, error: orderErr } = await supabase
        .from("orders")
        .insert({
          customer_id: customer.id,
          customer_email: email,
          total_amount: totalAmount,
          razorpay_order_id: razorpayOrderId,
          status: "pending",
          currency: "INR",
          savings_amount: savings,
          browser_agent: browserAgent || "",
          ip_address: ipAddress || "",
        })
        .select()
        .single();

      if (orderErr) {
        console.error("Supabase order insert error:", orderErr);
        return NextResponse.json({ error: "Failed to log secure pending order." }, { status: 500 });
      }

      // Record detailed list items
      const itemsToInsert = validatedItems.map((item) => ({
        order_id: order.id,
        ...item,
      }));

      const { error: itemsErr } = await supabase.from("order_items").insert(itemsToInsert);
      if (itemsErr) {
        console.error("Supabase order items insert error:", itemsErr);
        return NextResponse.json({ error: "Failed to record purchase transaction details." }, { status: 500 });
      }
    } else {
      // High-integrity Mock DB transaction logs
      const customer = await mockDb.customers.upsert({ email, name, phone });
      const order = await mockDb.orders.create({
        customer_id: customer.id,
        customer_email: email,
        total_amount: totalAmount,
        razorpay_order_id: razorpayOrderId,
        currency: "INR",
        savings_amount: savings,
        browser_agent: browserAgent || "",
        ip_address: ipAddress || "",
      });

      const itemsToInsert = validatedItems.map((item) => ({
        order_id: order.id,
        ...item,
      }));

      await mockDb.orderItems.createMany(itemsToInsert);
    }

    return NextResponse.json({
      success: true,
      razorpayOrderId,
      amount: totalAmount,
      currency: "INR",
      keyId: process.env.RAZORPAY_KEY_ID || "rzp_test_mockKeyId12345",
      isMock: !RazorpayInstance,
    });
  } catch (error: any) {
    console.error("Order creation api error:", error);
    return NextResponse.json(
      { error: "Internal Server Error in checkout order processing." },
      { status: 500 }
    );
  }
}
