# Contentsquare CSP Troubleshooting Guide
## Raqeem ANAT SA - Content Security Policy Issue Resolution

---

## 🔴 THE PROBLEM

### Current Situation
The client's website (raqeem.anat.sa) has a **Content Security Policy (CSP)** that blocks external scripts, including the Contentsquare tracking tag.

### Current CSP Configuration
```html
<meta http-equiv="Content-Security-Policy" 
      content="script-src 'self' 'unsafe-inline' 'unsafe-eval'">
```

**What this means:**
- `'self'` - Only scripts from the same domain (raqeem.anat.sa) are allowed
- `'unsafe-inline'` - Inline scripts in HTML are allowed
- `'unsafe-eval'` - Dynamic code evaluation is allowed (needed for AngularJS)
- **MISSING**: No external CDN domains are whitelisted

### The Error You'll See

When you try to load Contentsquare, you'll see this error in the browser console:

```
Refused to load the script 'https://t.contentsquare.net/s.js?t=YOUR_PROJECT_ID' 
because it violates the following Content Security Policy directive: 
"script-src 'self' 'unsafe-inline' 'unsafe-eval'".
```

**Visual Indicators:**
- ❌ Red error messages in browser console
- ❌ Contentsquare tag fails to load
- ❌ No tracking data is sent
- ❌ Session replays don't work
- ❌ Heatmaps don't capture data

---

## 🧪 STEP 1: Reproduce the Error

### Test in Simulation Environment

1. **Start the local server** (if not already running):
   ```bash
   python3 -m http.server 8000
   ```

2. **Open the application**:
   ```
   http://localhost:8000
   ```

3. **Open Browser DevTools** (F12 or Right-click → Inspect)

4. **Go to Console tab**

5. **Look for CSP violation errors**:
   - You should see red error messages
   - Error will mention "Content Security Policy directive"
   - Blocked URI will be `https://t.contentsquare.net/...`

### Expected Error Output

```
=== CONTENT SECURITY POLICY VIOLATION ===
Blocked URI: https://t.contentsquare.net/s.js?t=YOUR_PROJECT_ID
Violated Directive: script-src-elem
Effective Directive: script-src-elem
Original Policy: script-src 'self' 'unsafe-inline' 'unsafe-eval'
=========================================
```

### In the On-Page Console Logger

You'll see:
```
✗ CSP VIOLATION DETECTED!
Blocked URI: https://t.contentsquare.net/s.js?t=YOUR_PROJECT_ID
Violated Directive: script-src-elem
✗ CSP Compliance Check FAILED: CSP violations detected!
⚠ Contentsquare script blocked by Content Security Policy
⚠ Current CSP: script-src 'self' 'unsafe-inline' 'unsafe-eval'
```

---

## ✅ STEP 2: The Solution

### Option A: Update CSP Meta Tag (Recommended)

Update the CSP meta tag in the `<head>` section to whitelist Contentsquare CDN domains:

**BEFORE (Current - Broken):**
```html
<meta http-equiv="Content-Security-Policy" 
      content="script-src 'self' 'unsafe-inline' 'unsafe-eval'">
```

**AFTER (Fixed):**
```html
<meta http-equiv="Content-Security-Policy" 
      content="script-src 'self' 'unsafe-inline' 'unsafe-eval' 
               https://t.contentsquare.net 
               https://uxamanager.contentsquare.com">
```

### Contentsquare Required Domains

Add these domains to your CSP `script-src` directive:

1. **`https://t.contentsquare.net`**
   - Main tag delivery CDN
   - Required for loading the tracking script

2. **`https://uxamanager.contentsquare.com`**
   - Data collection endpoint
   - Required for sending tracking data

### Option B: CSP via HTTP Header (Alternative)

If the client uses server-side CSP headers instead of meta tags, update the HTTP response header:

**Apache (.htaccess or httpd.conf):**
```apache
Header set Content-Security-Policy "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://t.contentsquare.net https://uxamanager.contentsquare.com"
```

**Nginx (nginx.conf):**
```nginx
add_header Content-Security-Policy "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://t.contentsquare.net https://uxamanager.contentsquare.com";
```

**Node.js/Express:**
```javascript
app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://t.contentsquare.net https://uxamanager.contentsquare.com"
  );
  next();
});
```

---

## 🧪 STEP 3: Test the Fix

### Apply the Fix in Simulation

1. **Open `index.html`** in your editor

2. **Find the CSP meta tag** (around line 9)

3. **Replace it with the fixed version:**
   ```html
   <meta http-equiv="Content-Security-Policy" 
         content="script-src 'self' 'unsafe-inline' 'unsafe-eval' 
                  https://t.contentsquare.net 
                  https://uxamanager.contentsquare.com">
   ```

4. **Save the file**

5. **Refresh the browser** (Ctrl+F5 or Cmd+Shift+R for hard refresh)

6. **Check the console** - you should now see:
   ```
   ✓ CSP Compliance Check: No violations detected
   ```

### Verification Checklist

After applying the fix, verify:

- [ ] No CSP violation errors in console
- [ ] Contentsquare script loads successfully
- [ ] Green success messages appear
- [ ] `window._uxa` object is available
- [ ] Pageviews are tracked
- [ ] No red error messages

---

## 📋 Implementation Steps for Production

### For the Client (raqeem.anat.sa)

1. **Identify CSP Location**
   - Check if CSP is in HTML meta tag or HTTP headers
   - Look in `index.html` or server configuration

2. **Backup Current Configuration**
   - Save a copy of the current CSP settings
   - Document the change for rollback if needed

3. **Update CSP**
   - Add Contentsquare domains to `script-src` directive
   - Keep existing directives (`'self'`, `'unsafe-inline'`, `'unsafe-eval'`)

4. **Deploy to Staging First**
   - Test in staging environment
   - Verify no CSP errors
   - Confirm Contentsquare loads

5. **Validate Tracking**
   - Check browser console for errors
   - Verify pageviews are sent
   - Test session replay functionality

6. **Deploy to Production**
   - Apply the same change to production
   - Monitor for any issues
   - Verify tracking works end-to-end

---

## 🔍 Additional CSP Considerations

### Other Contentsquare Domains (Optional)

Depending on your Contentsquare configuration, you may also need:

**For Images/Media:**
```
img-src 'self' https://t.contentsquare.net;
```

**For Data Connections:**
```
connect-src 'self' https://uxamanager.contentsquare.com;
```

**Complete CSP Example:**
```html
<meta http-equiv="Content-Security-Policy" 
      content="
        script-src 'self' 'unsafe-inline' 'unsafe-eval' 
                   https://t.contentsquare.net 
                   https://uxamanager.contentsquare.com;
        img-src 'self' https://t.contentsquare.net;
        connect-src 'self' https://uxamanager.contentsquare.com;
      ">
```

---

## 🚨 Common Mistakes to Avoid

### ❌ DON'T DO THIS:

1. **Don't remove existing directives**
   ```html
   <!-- WRONG - Removes AngularJS support -->
   <meta http-equiv="Content-Security-Policy" 
         content="script-src https://t.contentsquare.net">
   ```

2. **Don't use wildcards for security**
   ```html
   <!-- WRONG - Too permissive, security risk -->
   <meta http-equiv="Content-Security-Policy" 
         content="script-src *">
   ```

3. **Don't forget the protocol (https://)**
   ```html
   <!-- WRONG - Missing protocol -->
   <meta http-equiv="Content-Security-Policy" 
         content="script-src 'self' t.contentsquare.net">
   ```

### ✅ DO THIS:

1. **Keep all existing directives**
2. **Add Contentsquare domains explicitly**
3. **Use HTTPS protocol**
4. **Test in staging first**

---

## 🎯 Quick Reference

### Current (Broken) CSP:
```
script-src 'self' 'unsafe-inline' 'unsafe-eval'
```

### Fixed CSP:
```
script-src 'self' 'unsafe-inline' 'unsafe-eval' https://t.contentsquare.net https://uxamanager.contentsquare.com
```

### What Changed:
```diff
- script-src 'self' 'unsafe-inline' 'unsafe-eval'
+ script-src 'self' 'unsafe-inline' 'unsafe-eval' https://t.contentsquare.net https://uxamanager.contentsquare.com
```

---

## 📞 Testing Commands

### Check Current CSP (Browser Console):
```javascript
// Get CSP from meta tag
document.querySelector('meta[http-equiv="Content-Security-Policy"]').content

// Check if Contentsquare loaded
typeof window._uxa !== 'undefined'

// Get session data (after fix)
window._csqDebug.getSessionSummary()
```

---

## 📊 Before & After Comparison

| Aspect | Before (Broken) | After (Fixed) |
|--------|----------------|---------------|
| CSP Errors | ❌ Yes | ✅ No |
| CSQ Script Loads | ❌ No | ✅ Yes |
| Pageview Tracking | ❌ No | ✅ Yes |
| Session Replay | ❌ No | ✅ Yes |
| Heatmaps | ❌ No | ✅ Yes |
| Console Errors | ❌ Red errors | ✅ Green success |

---

## 🎓 For Client Presentation

### Key Points to Communicate:

1. **The Problem**: CSP blocks external scripts for security
2. **Why It Happens**: Contentsquare CDN not whitelisted
3. **The Solution**: Add CSQ domains to CSP whitelist
4. **Security**: Still maintains security, just allows CSQ specifically
5. **Testing**: Can be tested in staging before production
6. **Rollback**: Easy to revert if any issues

### Demo Flow:

1. Show the error in simulation (current state)
2. Explain what CSP is and why it blocks CSQ
3. Show the fix (update CSP meta tag)
4. Demonstrate it working (no errors, tracking works)
5. Provide implementation steps for their environment

---

## ✅ Success Criteria

After implementing the fix, you should see:

- ✅ No CSP violation errors
- ✅ Contentsquare script loads from CDN
- ✅ `window._uxa` object is available
- ✅ Pageviews are tracked correctly
- ✅ Session continuity maintained
- ✅ Click tracking works
- ✅ Session replay URL generated
- ✅ All console messages are green (success)

---

**Next Steps**: Test the fix in the simulation, then prepare implementation plan for production.

