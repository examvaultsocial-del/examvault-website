import { NextResponse } from "next/server";
import { supabase, mockDb } from "@/lib/supabase";
import crypto from "crypto";

let ResendInstance: any = null;
try {
  if (process.env.RESEND_API_KEY) {
    const { Resend } = require("resend");
    ResendInstance = new Resend(process.env.RESEND_API_KEY);
  }
} catch (error) {
  console.warn("⚠️ Resend SDK loading failed. E-mail confirmation will operate in mock log mode.", error);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      customer_email,
      is_mock_payment,
    } = body;

    if (!razorpay_order_id || !customer_email) {
      return NextResponse.json({ error: "Missing required verification identifiers." }, { status: 400 });
    }

    // 1. Signature Verification (Only if NOT in mock mode and credentials exist)
    const isMock = razorpay_order_id.startsWith("order_mock_") || is_mock_payment;
    
    if (!isMock && process.env.RAZORPAY_KEY_SECRET) {
      if (!razorpay_payment_id || !razorpay_signature) {
        return NextResponse.json({ error: "Payment credentials required for verification." }, { status: 400 });
      }

      const secret = process.env.RAZORPAY_KEY_SECRET;
      const shasum = crypto.createHmac("sha256", secret);
      shasum.update(`${razorpay_order_id}|${razorpay_payment_id}`);
      const digest = shasum.digest("hex");

      if (digest !== razorpay_signature) {
        console.error("❌ Razorpay signature validation mismatch.");
        return NextResponse.json({ error: "High-security payment signature verification failed." }, { status: 400 });
      }
    }

    // 2. Fetch order items to issue tokens
    let dbOrderId = "";
    let totalSpent = 0;
    let customerName = "Student";
    const purchasedBooks: { book_id: string | number; book_title: string }[] = [];

    if (supabase) {
      // Find the pending order
      const { data: order, error: orderErr } = await supabase
        .from("orders")
        .select("id, total_amount, customer_id, customer_email, customers(name)")
        .eq("razorpay_order_id", razorpay_order_id)
        .single();

      if (orderErr || !order) {
        console.error("Pending order not found in Supabase:", orderErr);
        return NextResponse.json({ error: "Pending order transaction record missing." }, { status: 404 });
      }

      dbOrderId = order.id;
      totalSpent = order.total_amount;
      customerName = (order.customers as any)?.name || "Valued Student";

      // Fetch purchased items
      const { data: items, error: itemsErr } = await supabase
        .from("order_items")
        .select("book_id, book_title")
        .eq("order_id", order.id);

      if (itemsErr || !items) {
        console.error("Order items missing:", itemsErr);
        return NextResponse.json({ error: "Transaction item logs missing." }, { status: 500 });
      }

      purchasedBooks.push(...items);

      // Update Order Status & Payment ID
      const { error: updateErr } = await supabase
        .from("orders")
        .update({ status: "completed", razorpay_payment_id: razorpay_payment_id || "pay_mock" })
        .eq("id", order.id);

      if (updateErr) {
        console.error("Failed to set order status:", updateErr);
        return NextResponse.json({ error: "Failed to update order status." }, { status: 500 });
      }

      // Update Customer lifetime spent logs
      if (order.customer_id) {
        const { data: currentCustomer } = await supabase
          .from("customers")
          .select("total_spent")
          .eq("id", order.customer_id)
          .single();

        const newSpent = Number(currentCustomer?.total_spent || 0) + totalSpent;
        await supabase
          .from("customers")
          .update({ total_spent: newSpent })
          .eq("id", order.customer_id);
      }
    } else {
      // High-integrity Mock Db Update
      const order = await mockDb.orders.findUniqueByOrderId(razorpay_order_id);
      if (!order) {
        return NextResponse.json({ error: "Pending order transaction record missing." }, { status: 404 });
      }

      dbOrderId = order.id;
      totalSpent = order.total_amount;
      
      const customer = await mockDb.customers.findUnique(customer_email);
      if (customer) {
        customerName = customer.name;
        await mockDb.customers.incrementSpend(customer.id, totalSpent);
      }

      // Fetch items
      const items = await mockDb.orderItems.findByOrderId(order.id);
      purchasedBooks.push(...items);

      // Update status
      await mockDb.orders.updateStatus(razorpay_order_id, "completed", razorpay_payment_id || "pay_mock");
    }

    // 3. Issue single-use download tokens
    const secureTokens: { book_id: string | number; book_title: string; tokenUrl: string }[] = [];
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    const tokenRecords = purchasedBooks.map((book) => {
      // Secure random hex token hash to prevent brute forcing
      const tokenHash = crypto.randomBytes(32).toString("hex");
      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 48); // Expires in 48 hours

      secureTokens.push({
        book_id: book.book_id,
        book_title: book.book_title,
        tokenUrl: `${baseUrl}/download/${tokenHash}`,
      });

      return {
        order_id: dbOrderId,
        book_id: book.book_id,
        book_title: book.book_title,
        token_hash: tokenHash,
        email: customer_email,
        expires_at: expiresAt.toISOString(),
      };
    });

    if (supabase) {
      const { error: tokensErr } = await supabase.from("download_tokens").insert(tokenRecords);
      if (tokensErr) {
        console.error("Supabase download tokens insert error:", tokensErr);
        return NextResponse.json({ error: "Failed to issue secure download tokens." }, { status: 500 });
      }
    } else {
      await mockDb.downloadTokens.createMany(tokenRecords);
    }

    // 4. Send Confirmation Email via Resend (or Mock log if keys are empty)
    const emailSubject = `🎁 Your ExamVault Visual Guides are Ready! [Order ${razorpay_order_id.substring(0, 12)}]`;
    
    // Construct premium styled HTML email
    const emailHtml = `
      <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 2px solid #000; border-radius: 12px; background-color: #FAF8F5; box-shadow: 4px 4px 0px 0px #000;">
        <h1 style="font-size: 28px; font-weight: 800; border-bottom: 3px solid #000; padding-bottom: 12px; margin-bottom: 20px; color: #000; display: inline-block;">📚 ExamVault Checkout</h1>
        <p style="font-size: 16px; line-height: 1.6; color: #333;">Hi <strong>${customerName}</strong>,</p>
        <p style="font-size: 16px; line-height: 1.6; color: #333;">Thank you for studying with ExamVault! Your payment has been verified successfully. Your visual revision guides are ready for secure download.</p>
        
        <div style="background-color: #FEF3C7; border: 2px solid #F59E0B; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #D97706; font-weight: bold; font-size: 15px;">🔒 Crucial Security Information:</h3>
          <ul style="margin: 0; padding-left: 20px; font-size: 14px; color: #78350F; line-height: 1.5;">
            <li>Each link below is valid for **exactly ONE download click**.</li>
            <li>Do not click the links on email screening/scanners, or they will invalidate.</li>
            <li>Links expire automatically in **48 hours**.</li>
          </ul>
        </div>

        <h3 style="font-size: 18px; font-weight: 700; color: #000; margin-top: 25px;">Your Visual Revision Guides:</h3>
        <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
          <thead>
            <tr style="border-bottom: 2px solid #000;">
              <th style="text-align: left; padding: 10px 0; font-size: 15px;">Material Book Title</th>
              <th style="text-align: right; padding: 10px 0; font-size: 15px;">Download URL Link</th>
            </tr>
          </thead>
          <tbody>
            ${secureTokens
              .map(
                (tok) => `
              <tr style="border-bottom: 1px solid #E5E7EB;">
                <td style="padding: 12px 0; font-weight: 600; font-size: 14px; color: #000;">${tok.book_title}</td>
                <td style="padding: 12px 0; text-align: right;">
                  <a href="${tok.tokenUrl}" style="background-color: #FCD34D; color: #000; text-decoration: none; font-weight: bold; padding: 8px 12px; border: 2px solid #000; border-radius: 6px; box-shadow: 2px 2px 0px 0px #000; font-size: 13px; display: inline-block;">Download Book</a>
                </td>
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>

        <div style="margin-top: 30px; border-top: 2px solid #000; padding-top: 15px; font-size: 13px; color: #666; text-align: center;">
          <p>Need support or experiencing payment queries? Contact us at <strong>support@examvault.in</strong></p>
          <p style="font-weight: bold; color: #000;">Let's ace your exams! 🚀</p>
        </div>
      </div>
    `;

    if (ResendInstance) {
      try {
        await ResendInstance.emails.send({
          from: "ExamVault <onboarding@resend.dev>",
          to: customer_email,
          subject: emailSubject,
          html: emailHtml,
        });
        console.log(`✉️ Secure confirmation email sent via Resend to ${customer_email}`);
      } catch (emailErr) {
        console.error("❌ Failed to send secure transaction email via Resend:", emailErr);
      }
    } else {
      console.log(`
==================================================
✉️ MOCK EMAIL LOG (NO RESEND API KEY PRESENT)
To: ${customer_email}
Subject: ${emailSubject}
Body Highlights:
${secureTokens.map((tok) => `- ${tok.book_title}: ${tok.tokenUrl}`).join("\n")}
==================================================
      `);
    }

    return NextResponse.json({
      success: true,
      orderId: dbOrderId,
      tokens: secureTokens,
    });
  } catch (error: any) {
    console.error("Order payment verification API error:", error);
    return NextResponse.json({ error: "Internal Server Error during verification." }, { status: 500 });
  }
}
