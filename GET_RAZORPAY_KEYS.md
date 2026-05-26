# 🔑 How to Get Your Razorpay Test API Keys

## Step-by-Step Guide

### Step 1: Open Razorpay Dashboard
1. Go to: https://dashboard.razorpay.com
2. Log in with your Razorpay account credentials
3. You should see the main dashboard

### Step 2: Navigate to API Keys
1. Click on **Settings** (usually in the left sidebar or top menu)
2. Look for **API Keys** option
3. Click on **API Keys**

### Step 3: Select Test Keys
You'll see two tabs:
- **Test Keys** ← Click this one
- **Live Keys** (for production - ignore for now)

Make sure you're on the **Test Keys** tab!

### Step 4: Copy Your Keys
You'll see two keys displayed:

**Key ID:**
- Looks like: `rzp_test_xxxxxxxxxx`
- Copy this entire string

**Key Secret:**
- Looks like: A long string of random characters
- Copy this entire string

### Step 5: Update Your .env.local File

Open the file: `e:\Private\e-books\examvault-website\.env.local`

Replace these lines:
```
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_test_key_id_here
RAZORPAY_KEY_SECRET=your_test_key_secret_here
```

With your actual keys:
```
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxx
RAZORPAY_KEY_SECRET=your_actual_secret_key_here
```

### Step 6: Restart Dev Server
1. Stop the dev server (Ctrl+C in terminal)
2. Run: `npm run dev`
3. Wait for it to start (you'll see "Ready in XXXms")

### Step 7: Test!
1. Go to http://localhost:3000
2. Follow the testing guide

---

## ✅ Verification Checklist

- [ ] I logged in to Razorpay Dashboard
- [ ] I navigated to Settings → API Keys
- [ ] I selected the **TEST KEYS** tab (not Live)
- [ ] I copied my Key ID (starts with rzp_test_)
- [ ] I copied my Key Secret
- [ ] I updated `.env.local` with both keys
- [ ] I restarted the dev server
- [ ] I can see the app at http://localhost:3000

---

## 🎯 Quick Copy-Paste Template

Once you have your keys, use this template:

```env
NEXT_PUBLIC_SUPABASE_URL=https://smtqxcepkrdjfgyogclz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNtdHF4Y2Vwa3JkamZneW9nY2x6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkxNjM3OTUsImV4cCI6MjA5NDczOTc5NX0.JVcliwTZtg4jIAxG0PDhS-xIKu4xO7SCM2wHa5FxsNk
NEXT_PUBLIC_RAZORPAY_KEY_ID=YOUR_TEST_KEY_ID_HERE
RAZORPAY_KEY_SECRET=YOUR_TEST_KEY_SECRET_HERE
```

Replace:
- `YOUR_TEST_KEY_ID_HERE` with your actual Key ID
- `YOUR_TEST_KEY_SECRET_HERE` with your actual Key Secret

---

## 🔒 Security Notes

⚠️ **IMPORTANT:**
- Never share your **Key Secret** with anyone
- Never commit `.env.local` to git
- Test Keys are safe to use - they don't charge real money
- Live Keys should only be used in production

---

## 🆘 Troubleshooting

### Can't Find API Keys?
1. Make sure you're logged in to the correct Razorpay account
2. Look for "Settings" in the main menu
3. If you still can't find it, check: https://razorpay.com/docs/api/admin/api-keys/

### Still Getting 401 Errors?
1. Verify you copied the **entire** Key ID and Key Secret
2. Make sure there are no extra spaces
3. Verify you're using **TEST KEYS** (not Live)
4. Restart the dev server after updating `.env.local`

### Keys Look Different?
Different Razorpay accounts may have slightly different formats, but:
- Key ID always starts with `rzp_test_` (for test) or `rzp_live_` (for live)
- Key Secret is a long random string
- Both are required for the integration to work

---

## 📚 Helpful Links

- **Razorpay Dashboard:** https://dashboard.razorpay.com
- **Razorpay API Docs:** https://razorpay.com/docs/
- **Test Cards:** https://razorpay.com/docs/payments/payments/test-cards/

---

**Once you have your keys, you're ready to test! 🚀**
