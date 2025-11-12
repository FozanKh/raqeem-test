# Raqeem ANAT SA - Contentsquare CSP Integration Simulation

This is a simulation environment to demonstrate and troubleshoot the Content Security Policy (CSP) issue preventing Contentsquare from loading on the client's website.

---

## 🎯 Purpose

As a Contentsquare Solution Consultant, this environment allows you to:
1. **Reproduce** the exact CSP error the client is experiencing
2. **Demonstrate** the problem to stakeholders
3. **Test** the solution before implementing in production
4. **Validate** that the fix works correctly

---

## 📁 Files Overview

| File | Purpose |
|------|---------|
| `index.html` | **BROKEN VERSION** - Shows CSP blocking Contentsquare (current client state) |
| `index-FIXED.html` | **FIXED VERSION** - Shows working Contentsquare with updated CSP |
| `app.js` | AngularJS application logic with pageview tracking |
| `csq-mock.js` | Mock Contentsquare tag for simulation |
| `prd.md` | Original Technical Requirements and Validation Plan |
| `CSP_TROUBLESHOOTING.md` | **Complete troubleshooting guide** with error details and fix |
| `VALIDATION_GUIDE.md` | Validation test cases and success criteria |

---

## 🚀 Quick Start

### 1. Start Local Server

Choose one method:

```bash
# Python 3
python3 -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js
npx http-server -p 8000

# PHP
php -S localhost:8000
```

### 2. View the Broken Version (Current Client State)

Open: **http://localhost:8000/index.html**

**What you'll see:**
- ❌ CSP violation errors in console
- ❌ Contentsquare script blocked
- ❌ Red error messages
- ❌ Tracking doesn't work

### 3. View the Fixed Version (After CSP Update)

Open: **http://localhost:8000/index-FIXED.html**

**What you'll see:**
- ✅ No CSP errors
- ✅ Contentsquare loads successfully
- ✅ Green success messages
- ✅ Tracking works properly

---

## 🔍 The Problem

### Current CSP (Broken)
```html
<meta http-equiv="Content-Security-Policy" 
      content="script-src 'self' 'unsafe-inline' 'unsafe-eval'">
```

**Issue:** Contentsquare CDN (`https://t.contentsquare.net`) is not whitelisted, so the browser blocks it.

### Error You'll See
```
Refused to load the script 'https://t.contentsquare.net/s.js' 
because it violates the following Content Security Policy directive: 
"script-src 'self' 'unsafe-inline' 'unsafe-eval'".
```

---

## ✅ The Solution

### Updated CSP (Fixed)
```html
<meta http-equiv="Content-Security-Policy" 
      content="script-src 'self' 'unsafe-inline' 'unsafe-eval' 
               https://t.contentsquare.net 
               https://uxamanager.contentsquare.com">
```

**What changed:** Added Contentsquare CDN domains to the whitelist.

---

## 🧪 Testing Workflow

### Step 1: Demonstrate the Problem
1. Open `index.html` (broken version)
2. Open browser DevTools (F12) → Console tab
3. Show the CSP violation errors
4. Point out that Contentsquare doesn't load

### Step 2: Explain the Solution
1. Open `CSP_TROUBLESHOOTING.md`
2. Show the current vs. fixed CSP
3. Explain what needs to be whitelisted

### Step 3: Demonstrate the Fix
1. Open `index-FIXED.html`
2. Show no CSP errors in console
3. Show Contentsquare loading successfully
4. Demonstrate tracking working

### Step 4: Validate Complete Flow
1. Login with any credentials
2. Click on dashboard elements
3. Logout
4. Run in console: `window._csqDebug.getSessionSummary()`
5. Show all pageviews tracked with same session ID

---

## 📋 Test Scenarios

### Scenario 1: CSP Compliance Check
- **File:** `index.html` (broken)
- **Expected:** CSP violation errors
- **File:** `index-FIXED.html` (fixed)
- **Expected:** No CSP errors

### Scenario 2: Initial Pageview
- **Action:** Load the page
- **Expected:** `/login` pageview tracked

### Scenario 3: SPA Transition (Login)
- **Action:** Login with any credentials
- **Expected:** `/dashboard/home` pageview tracked (no page reload)

### Scenario 4: Click Tracking
- **Action:** Click on stat cards
- **Expected:** Clicks captured in console

### Scenario 5: SPA Transition (Logout)
- **Action:** Click logout
- **Expected:** `/login` pageview tracked (no page reload)

### Scenario 6: Session Continuity
- **Action:** Complete full journey, run `window._csqDebug.getSessionSummary()`
- **Expected:** All events share same session ID

---

## 🎓 For Client Presentation

### Presentation Flow

1. **Introduction** (2 min)
   - Explain the CSP issue
   - Why it's blocking Contentsquare

2. **Problem Demonstration** (3 min)
   - Show `index.html` with errors
   - Show console violations
   - Explain impact (no tracking, no replays)

3. **Solution Explanation** (3 min)
   - Show CSP before/after
   - Explain what domains need whitelisting
   - Address security concerns

4. **Working Demo** (5 min)
   - Show `index-FIXED.html` working
   - Demonstrate full user journey
   - Show session continuity

5. **Implementation Plan** (5 min)
   - Review `CSP_TROUBLESHOOTING.md`
   - Discuss staging vs. production
   - Answer questions

### Key Talking Points

✅ **Security is maintained** - We're only whitelisting specific Contentsquare domains, not opening up the CSP completely

✅ **Minimal change** - Only adding two domains to existing CSP

✅ **Tested solution** - Can be validated in staging before production

✅ **Easy rollback** - Simple to revert if any issues arise

✅ **Industry standard** - This is how all clients implement Contentsquare with CSP

---

## 🔧 Debug Commands

Open browser console and try these:

```javascript
// Check current CSP
document.querySelector('meta[http-equiv="Content-Security-Policy"]').content

// Check if Contentsquare loaded
typeof window._uxa !== 'undefined'

// Get session summary (fixed version only)
window._csqDebug.getSessionSummary()

// Get all pageviews
window._csqDebug.getPageviews()

// Get all interactions
window._csqDebug.getInteractions()
```

---

## 📊 Comparison Table

| Aspect | Broken (index.html) | Fixed (index-FIXED.html) |
|--------|---------------------|--------------------------|
| CSP Errors | ❌ Yes | ✅ No |
| CSQ Loads | ❌ No | ✅ Yes |
| Pageviews | ❌ Not tracked | ✅ Tracked |
| Clicks | ❌ Not tracked | ✅ Tracked |
| Session Replay | ❌ No | ✅ Yes |
| Console | ❌ Red errors | ✅ Green success |

---

## 📖 Documentation

- **`CSP_TROUBLESHOOTING.md`** - Complete guide to the CSP issue and fix
- **`VALIDATION_GUIDE.md`** - Test cases and validation procedures
- **`prd.md`** - Original technical requirements

---

## 🎯 Success Criteria

After implementing the fix in production, verify:

- [ ] No CSP violation errors in browser console
- [ ] Contentsquare script loads from CDN
- [ ] Initial pageview tracked for `/login`
- [ ] SPA transitions tracked (login → dashboard → logout)
- [ ] Click interactions captured
- [ ] Session continuity maintained (same session ID)
- [ ] Session replay URL generated
- [ ] No JavaScript errors

---

## 🚨 Important Notes

### For Production Implementation

1. **Get the actual Contentsquare project ID** from your CSQ account
2. **Replace `YOUR_PROJECT_ID`** in the script tag
3. **Test in staging first** before production
4. **Coordinate with client's dev team** for CSP update
5. **Monitor console** after deployment for any issues

### CSP Update Methods

The client can update CSP via:
- **HTML meta tag** (in `index.html`)
- **HTTP header** (server configuration)

See `CSP_TROUBLESHOOTING.md` for examples of both methods.

---

## 📞 Support

For questions or issues:
1. Review `CSP_TROUBLESHOOTING.md` for detailed troubleshooting
2. Check browser console for specific error messages
3. Use debug commands to inspect state
4. Verify CSP configuration matches the fixed version

---

## ✨ Environment Features

✅ AngularJS 1.6.5 (matches client)
✅ Content Security Policy enforcement
✅ Contentsquare tag integration
✅ Manual pageview tracking for SPA
✅ Session continuity demonstration
✅ Real-time console logging
✅ Bilingual interface (Arabic/English)
✅ Side-by-side broken/fixed comparison

---

**Ready to test?** Start the server and open both versions to see the difference!

