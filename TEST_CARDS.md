# 🎫 Razorpay Test Cards - Quick Reference

## ✅ SUCCESSFUL PAYMENT CARDS

### Visa Test Card
```
Card Number:  4111 1111 1111 1111
Expiry:       12/25 (or any future date)
CVV:          123 (or any 3 digits)
OTP:          123456 (if prompted)
Result:       ✅ PAYMENT SUCCESSFUL
```

### Mastercard Test Card
```
Card Number:  5555 5555 5555 4444
Expiry:       12/25 (or any future date)
CVV:          123 (or any 3 digits)
OTP:          123456 (if prompted)
Result:       ✅ PAYMENT SUCCESSFUL
```

### Amex Test Card
```
Card Number:  3782 822463 10005
Expiry:       12/25 (or any future date)
CVV:          1234 (4 digits for Amex)
OTP:          123456 (if prompted)
Result:       ✅ PAYMENT SUCCESSFUL
```

---

## ❌ FAILED PAYMENT CARDS (for testing error handling)

### Visa - Declined
```
Card Number:  4000 0000 0000 0002
Expiry:       12/25
CVV:          123
Result:       ❌ PAYMENT DECLINED
```

### Visa - Insufficient Funds
```
Card Number:  4000 0000 0000 9995
Expiry:       12/25
CVV:          123
Result:       ❌ INSUFFICIENT FUNDS
```

### Visa - Lost Card
```
Card Number:  4000 0000 0000 9987
Expiry:       12/25
CVV:          123
Result:       ❌ LOST CARD
```

---

## 🔐 Important Notes

1. **These are TEST cards only** - They don't charge any real money
2. **Expiry date** - Can be any future date (12/25, 01/26, etc.)
3. **CVV** - Can be any 3 digits (123, 456, 789, etc.)
4. **OTP** - If prompted, always use: **123456**
5. **Name** - Can be any name (John Doe, Test User, etc.)

---

## 📋 Test Checkout Form Data

**Use this for testing:**
```
Full Name:    John Doe
Email:        test@example.com
Phone:        9876543210
```

Or use your own details - they don't matter in test mode!

---

## ✨ Pro Tips

1. **Use the same card multiple times** - Test cards can be used unlimited times
2. **Try different cards** - Test both successful and failed scenarios
3. **Check Razorpay Dashboard** - See your test orders at https://dashboard.razorpay.com/app/orders
4. **No real charges** - Test mode never charges real money
5. **Instant processing** - Test payments process instantly

---

## 🎯 Quick Test Flow

1. Go to http://localhost:3000/junior/products
2. Click on "Test Product"
3. Click "Add to Cart"
4. Click Cart icon
5. Fill form:
   - Name: John Doe
   - Email: test@example.com
   - Phone: 9876543210
6. Click "Pay ₹9 Securely"
7. Enter card: 4111 1111 1111 1111
8. Enter expiry: 12/25
9. Enter CVV: 123
10. Click "Pay"
11. If OTP prompt: Enter 123456
12. ✅ Payment successful!
13. See success page with download links

---

**That's it! You're now ready to test Razorpay! 🚀**
