# 🚀 Quick Start Guide - Contentsquare CSP Simulation

## For Contentsquare Solution Consultants

This simulation environment replicates the exact CSP issue preventing Contentsquare from loading on the Raqeem ANAT SA client website.

---

## ⚡ 3-Minute Setup

### 1. Start Server (Choose One)
```bash
python3 -m http.server 8000
# OR
npx http-server -p 8000
```

### 2. Open Comparison Page
```
http://localhost:8000/comparison.html
```

### 3. Open Browser DevTools
Press **F12** or **Right-click → Inspect** → **Console tab**

---

## 🎯 What You'll Demonstrate

### The Problem (index.html)
- ❌ CSP blocks Contentsquare CDN
- ❌ Red errors in console
- ❌ No tracking works

### The Solution (index-FIXED.html)
- ✅ CSP allows Contentsquare
- ✅ Green success messages
- ✅ Full tracking works

---

## 📊 The Fix (One Line Change)

### BEFORE (Broken):
```html
<meta http-equiv="Content-Security-Policy" 
      content="script-src 'self' 'unsafe-inline' 'unsafe-eval'">
```

### AFTER (Fixed):
```html
<meta http-equiv="Content-Security-Policy" 
      content="script-src 'self' 'unsafe-inline' 'unsafe-eval' 
               https://t.contentsquare.net 
               https://uxamanager.contentsquare.com">
```

**That's it!** Just add the two Contentsquare domains.

---

## 🧪 5-Minute Demo Flow

### Step 1: Show the Problem (2 min)
1. Open `http://localhost:8000/index.html`
2. Open DevTools Console (F12)
3. Point out the red CSP violation errors
4. Show that Contentsquare is blocked

**Key Message:** "The current CSP blocks external scripts, including Contentsquare."

### Step 2: Explain the Solution (1 min)
1. Open `CSP_TROUBLESHOOTING.md` or show comparison page
2. Show the before/after CSP
3. Explain we're just whitelisting Contentsquare domains

**Key Message:** "We only need to add two specific domains to the CSP whitelist."

### Step 3: Show It Working (2 min)
1. Open `http://localhost:8000/index-FIXED.html`
2. Show DevTools Console - no errors
3. Login with any credentials
4. Click dashboard elements
5. Run: `window._csqDebug.getSessionSummary()`

**Key Message:** "With the CSP updated, everything works perfectly."

---

## 📁 File Reference

| File | Purpose | When to Use |
|------|---------|-------------|
| `comparison.html` | Side-by-side overview | **Start here** - Best for presentations |
| `index.html` | Broken version | Show the current problem |
| `index-FIXED.html` | Fixed version | Show the solution working |
| `CSP_TROUBLESHOOTING.md` | Complete guide | Technical deep-dive |
| `README.md` | Full documentation | Comprehensive reference |

---

## 🎓 Client Presentation Tips

### Opening
"I've set up a simulation environment that replicates your exact CSP configuration. Let me show you the issue and the solution."

### Showing the Problem
"Here's what's happening right now - your CSP is blocking Contentsquare. See these red errors? That's the browser refusing to load our tracking script."

### Explaining the Solution
"The fix is simple - we just need to add two Contentsquare domains to your CSP whitelist. Your security stays intact, we're just explicitly allowing Contentsquare."

### Showing It Working
"And here's the same application with the updated CSP. No errors, tracking works perfectly, and we maintain session continuity across your SPA."

### Addressing Concerns
- **Security:** "We're not weakening your CSP, just adding specific trusted domains."
- **Risk:** "This is a standard configuration used by all our clients with CSP."
- **Testing:** "We can test this in your staging environment first."
- **Rollback:** "If there are any issues, it's a simple one-line change to revert."

---

## 🔍 Debug Commands

Open browser console on the **fixed version** and try:

```javascript
// Check if Contentsquare loaded
typeof window._uxa !== 'undefined'
// Should return: true

// Get session summary
window._csqDebug.getSessionSummary()
// Shows all pageviews and interactions

// Get current session ID
window._csqDebug.getSessionId()
// Shows the session ID

// Get all pageviews
window._csqDebug.getPageviews()
// Shows array of pageviews
```

---

## ✅ Success Indicators

### In the Broken Version (index.html):
- ❌ Console shows: "CSP VIOLATION DETECTED"
- ❌ Console shows: "Blocked URI: https://t.contentsquare.net/..."
- ❌ Red error messages in on-page console

### In the Fixed Version (index-FIXED.html):
- ✅ Console shows: "CSP Compliance Check: No violations detected"
- ✅ Console shows: "Contentsquare initial pageview triggered for /login"
- ✅ Green success messages in on-page console
- ✅ Session ID generated
- ✅ Pageviews tracked

---

## 📋 Pre-Meeting Checklist

Before your client meeting:

- [ ] Server is running (`python3 -m http.server 8000`)
- [ ] Tested both versions (broken and fixed)
- [ ] Browser DevTools console is open
- [ ] Reviewed `CSP_TROUBLESHOOTING.md`
- [ ] Know the exact CSP change needed
- [ ] Prepared to answer security questions
- [ ] Have staging/production deployment plan ready

---

## 🚨 Common Questions & Answers

**Q: Will this affect our security?**
A: No, you're only whitelisting specific Contentsquare domains, not opening up the CSP broadly.

**Q: Can we test this first?**
A: Absolutely! We recommend testing in staging before production.

**Q: What if something breaks?**
A: It's a simple one-line change that can be reverted immediately. Plus, we'll test in staging first.

**Q: Why do we need two domains?**
A: One for the script delivery (t.contentsquare.net) and one for data collection (uxamanager.contentsquare.com).

**Q: Do other clients do this?**
A: Yes, this is the standard implementation for all clients using CSP with Contentsquare.

**Q: How long will implementation take?**
A: The change itself is one line. Testing in staging might take a day, then production deployment.

---

## 📞 Next Steps After Demo

1. **Get buy-in** on the CSP update
2. **Identify** where their CSP is configured (HTML meta tag or HTTP header)
3. **Schedule** staging environment testing
4. **Coordinate** with their dev team for implementation
5. **Plan** production deployment
6. **Set up** post-deployment monitoring

---

## 🎯 Key Takeaways

✅ **The problem is clear:** CSP blocks Contentsquare
✅ **The solution is simple:** Add two domains to CSP
✅ **Security is maintained:** Only specific domains whitelisted
✅ **Testing is easy:** Can validate in staging first
✅ **Implementation is quick:** One-line change
✅ **Rollback is simple:** Easy to revert if needed

---

**You're ready!** Open `comparison.html` and start your demo.

For detailed technical information, see `CSP_TROUBLESHOOTING.md`.

