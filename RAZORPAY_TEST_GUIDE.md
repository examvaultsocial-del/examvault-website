# 🧪 Razorpay Test Mode - Complete Testing Guide

## Overview
This guide walks you through testing the complete checkout flow with Razorpay in **TEST MODE** (no real money involved).

---

## ✅ Prerequisites

### 1. Razorpay Account Setup
- ✅ You have a Razorpay account
- ✅ Account is verified
- ✅ You can access the dashboard

### 2. Test API Keys
- Get your **Test Keys** from: https://dashboard.razorpay.com/app/settings/api-keys
- You should see two tabs: **Test Keys** and **Live Keys**
- Copy the **Test Keys** (Key ID and Key Secret)

---

## 🔧 Step 1: Update Environment Variables

Your current `.env.local` has:
```
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_StgPsR3ZMUq1cA
RAZORPAY_KEY_SECRET=YFpeogtCfB7NpINpIQtvSbWK
```

**These keys are returning 401 errors**, which means they're either:
1. Invalid/expired
2. From a different Razorpay account
3. Not properly configured

**Action Required:**
1. Go to https://dashboard.razorpay.com/app/settings/api-keys
2. Make sure you're viewing **TEST KEYS** (not Live Keys)
3. Copy your actual Test Key ID and Key Secret
4. Update `.env.local` with your real keys

---

## 🧪 Step 2: Test Razorpay Test Cards

Razorpay provides **FREE test cards** for testing without real money:

### ✅ Successful Payment Test Cards

**Card 1: Visa**
```
Card Number: 4111 1111 1111 1111
Expiry: 12/25 (any future date)
CVV: 123 (any 3 digits)
OTP: 123456 (if prompted)
```

**Card 2: Mastercard**
```
Card Number: 5555 5555 5555 4444
Expiry: 12/25 (any future date)
CVV: 123 (any 3 digits)
OTP: 123456 (if prompted)
```

### ❌ Failed Payment Test Cards (for testing error handling)

**Card 3: Visa (Will Fail)**
```
Card Number: 4000 0000 0000 0002
Expiry: 12/25
CVV: 123
Result: Payment will be declined
```

---

## 🚀 Step 3: Complete Test Walkthrough

### Phase 1: Setup
1. Update `.env.local` with your **actual test keys**
2. Restart the dev server: `npm run dev`
3. Open http://localhost:3000

### Phase 2: Browse Products
1. Navigate to **Junior Products** or **Adult Products**
2. Click on the **Test Product**
3. Review product details
4. Click **"Add to Cart"**

### Phase 3: Open Cart
1. Click the **Cart Icon** (top right)
2. You should see:
   - Product name: "Test Product"
   - Price: ₹9
   - Original Price: ₹99
   - Savings: ₹90
   - Total: ₹9

### Phase 4: Fill Checkout Form
1. **Full Name**: Enter any name (e.g., "John Doe")
2. **Email**: Enter a valid email (e.g., "test@example.com")
3. **Phone**: Enter a 10-digit number (e.g., "9876543210")
4. Click **"Pay ₹9 Securely"** button

### Phase 5: Razorpay Payment Overlay
1. Razorpay overlay will open
2. You'll see:
   - Order amount: ₹9
   - ExamVault Store name
   - Your prefilled details

### Phase 6: Enter Test Card Details
1. **Card Number**: 4111 1111 1111 1111
2. **Expiry**: 12/25
3. **CVV**: 123
4. Click **"Pay"** button
5. If prompted for OTP: Enter **123456**

### Phase 7: Payment Processing
1. Razorpay will process the payment
2. You'll see a **success message**
3. You'll be redirected to the **Success Page**

### Phase 8: Success Page
You should see:
- ✅ Order confirmation
- ✅ Order ID
- ✅ Download links for your purchased books
- ✅ Confirmation message

---

## 📊 What Happens Behind the Scenes

### Database Records Created:

**1. Customer Record**
```
Email: test@example.com
Name: John Doe
Phone: 9876543210
Total Spent: ₹9
```

**2. Order Record**
```
Order ID: (auto-generated)
Customer Email: test@example.com
Total Amount: ₹9
Status: completed
Razorpay Order ID: (from Razorpay)
Razorpay Payment ID: (from Razorpay)
Currency: INR
```

**3. Order Items Record**
```
Order ID: (linked to order)
Book ID: 1
Book Title: Test Product
Price at Purchase: ₹9
```

**4. Download Tokens**
```
Token Hash: (secure random hash)
Email: test@example.com
Expires At: 48 hours from now
Book ID: 1
Book Title: Test Product
```

---

## 🔍 Verify Database Records

### Check Mock Database Logs
After payment, check the browser console for logs like:
```
✅ Order created: order_123456
✅ Download tokens issued: 1 token
✅ Email sent to: test@example.com
```

### Check Razorpay Dashboard
1. Go to https://dashboard.razorpay.com/app/orders
2. You should see your test order
3. Status should be: **Captured** (payment successful)
4. Amount: ₹9

---

## 🎯 Test Scenarios

### Scenario 1: Successful Payment ✅
**Steps:**
1. Fill form with valid data
2. Use card: 4111 1111 1111 1111
3. Complete payment

**Expected Result:**
- Order created in database
- Payment status: Completed
- Download tokens generated
- Redirected to success page

### Scenario 2: Failed Payment ❌
**Steps:**
1. Fill form with valid data
2. Use card: 4000 0000 0000 0002
3. Try to complete payment

**Expected Result:**
- Razorpay shows "Payment Failed"
- Order remains in "pending" status
- No download tokens generated
- Can retry payment

### Scenario 3: Multiple Purchases
**Steps:**
1. Complete payment for Test Product
2. Add another product to cart
3. Complete another payment

**Expected Result:**
- Multiple orders created
- Customer record updated with total spent
- Separate download tokens for each order

---

## 🛠️ Troubleshooting

### Issue 1: "401 Unauthorized" Error
**Cause:** Invalid or expired test keys

**Solution:**
1. Go to Razorpay Dashboard
2. Verify you're viewing **TEST KEYS** (not Live)
3. Copy the correct Key ID and Key Secret
4. Update `.env.local`
5. Restart dev server

### Issue 2: "Payment Failed" in Razorpay Overlay
**Cause:** Test card not recognized or Razorpay account not configured

**Solution:**
1. Make sure you're using the correct test card
2. Check that your Razorpay account is active
3. Verify test mode is enabled in your account
4. Try a different test card

### Issue 3: Order Not Created
**Cause:** API endpoint error

**Solution:**
1. Check browser console for error messages
2. Check server logs (terminal where `npm run dev` is running)
3. Verify `.env.local` has correct keys
4. Restart dev server

### Issue 4: Download Links Not Generated
**Cause:** Payment verification failed

**Solution:**
1. Check that payment was actually completed
2. Verify order status in Razorpay dashboard
3. Check server logs for verification errors

---

## 📝 Testing Checklist

- [ ] Updated `.env.local` with real test keys
- [ ] Restarted dev server
- [ ] Browsed to product page
- [ ] Added product to cart
- [ ] Filled checkout form with valid data
- [ ] Clicked "Pay Securely" button
- [ ] Razorpay overlay opened
- [ ] Entered test card details
- [ ] Payment completed successfully
- [ ] Redirected to success page
- [ ] Download links visible
- [ ] Checked Razorpay dashboard for order
- [ ] Verified database records created

---

## 🎓 What You'll Learn

By completing this test, you'll verify:
1. ✅ Frontend checkout form validation
2. ✅ API order creation
3. ✅ Razorpay integration
4. ✅ Payment verification
5. ✅ Database record creation
6. ✅ Download token generation
7. ✅ Success page display
8. ✅ Email notification logging

---

## 💡 Next Steps After Testing

1. **Test with multiple products** - Add more products and test bundle purchases
2. **Test error scenarios** - Use failed card to test error handling
3. **Test on mobile** - Verify checkout works on mobile devices
4. **Test email delivery** - Set up Resend API for real email notifications
5. **Test downloads** - Verify download links work and expire after 48 hours

---

## 📞 Support

If you encounter issues:
1. Check the troubleshooting section above
2. Check browser console for error messages
3. Check server logs (terminal output)
4. Verify `.env.local` has correct keys
5. Restart dev server

---

**Happy Testing! 🚀**
