# Contentsquare Integration Validation Guide
## Raqeem ANAT SA - Simulation Environment

This simulation environment replicates the client's production setup to validate the Contentsquare (CSQ) tag integration according to the Technical Requirements and Validation Plan (TRVP).

---

## 🎯 Environment Overview

### Technology Stack
- **Framework**: AngularJS v1.6.5 (Legacy SPA)
- **Application Type**: Single Page Application with virtual routing
- **Security**: Content Security Policy (CSP) enforced
- **Tracking**: Contentsquare mock tag with manual pageview tracking

### Simulated Client Details
- **Client**: ANAT SA
- **Application**: Raqeem Document Management System
- **URL**: raqeem.anat.sa (simulated locally)

---

## 🚀 Quick Start

### 1. Run the Application

You can run this application using any local web server. Here are a few options:

#### Option A: Python HTTP Server
```bash
# Python 3
python3 -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

#### Option B: Node.js HTTP Server
```bash
# Install http-server globally (if not already installed)
npm install -g http-server

# Run server
http-server -p 8000
```

#### Option C: PHP Built-in Server
```bash
php -S localhost:8000
```

### 2. Access the Application
Open your browser and navigate to:
```
http://localhost:8000
```

---

## ✅ Validation Test Cases

### Test Case 1: CSP Compliance ✓

**Objective**: Verify that the Contentsquare tag loads without violating Content Security Policy

**Steps**:
1. Open the application in your browser
2. Open Developer Tools (F12)
3. Go to the Console tab
4. Look for CSP violation errors

**Expected Outcome**:
- ✅ No CSP violation errors in console
- ✅ Green message: "CSP Compliance Check: No Content Security Policy errors detected"
- ✅ Contentsquare tag loads successfully

**CSP Configuration**:
```html
<meta http-equiv="Content-Security-Policy" 
      content="script-src 'self' 'unsafe-inline' 'unsafe-eval' 
               https://t.contentsquare.net 
               https://uxamanager.contentsquare.com">
```

---

### Test Case 2: Initial Pageview Tracking ✓

**Objective**: Verify that the initial pageview for `/login` is tracked correctly

**Steps**:
1. Load the application (login page)
2. Check the console logs (both browser console and on-page console)

**Expected Outcome**:
- ✅ Console shows: `Contentsquare initial pageview triggered for /login`
- ✅ Browser console shows CSQ mock pageview data
- ✅ Session ID is generated and displayed

**Console Output Example**:
```
[Contentsquare Mock] Pageview tracked: {
  path: "/login",
  sessionId: "CSQ_SESSION_...",
  pageviewCount: 1
}
```

---

### Test Case 3: SPA Transition (Login → Dashboard) ✓

**Objective**: Verify that virtual pageview is tracked when navigating from login to dashboard

**Steps**:
1. On the login page, enter any username and password
2. Click "تسجيل الدخول / Login" button
3. Observe the console logs

**Expected Outcome**:
- ✅ Login successful message appears
- ✅ View changes to dashboard (without full page reload)
- ✅ Console shows: `Contentsquare artificial pageview triggered for /dashboard/home`
- ✅ Console shows: `SPA Transition: Navigated from /login to /dashboard/home`
- ✅ Same session ID is maintained

**Console Output Example**:
```
[Contentsquare Mock] Pageview tracked: {
  path: "/dashboard/home",
  sessionId: "CSQ_SESSION_...",  // Same session ID
  pageviewCount: 2
}
```

---

### Test Case 4: SPA Transition (Dashboard → Login via Logout) ✓

**Objective**: Verify that virtual pageview is tracked when logging out

**Steps**:
1. From the dashboard, click "تسجيل الخروج / Logout" button
2. Observe the console logs

**Expected Outcome**:
- ✅ Logout successful message appears
- ✅ View changes back to login (without full page reload)
- ✅ Console shows: `Contentsquare artificial pageview triggered for /login`
- ✅ Console shows: `SPA Transition: Navigated from /dashboard/home to /login`
- ✅ Same session ID is maintained (session continuity)

---

### Test Case 5: Data Integrity & Click Tracking ✓

**Objective**: Verify that user interactions are captured for heatmaps and session replays

**Steps**:
1. Log in to the dashboard
2. Click on any of the four stat cards:
   - إجمالي المستندات (Total Documents)
   - المستندات النشطة (Active Documents)
   - المستخدمون (Users)
   - التقارير (Reports)
3. Check the browser console for click tracking

**Expected Outcome**:
- ✅ Each click is logged in the console
- ✅ Click data includes element information and coordinates
- ✅ Console shows: `Click tracked on element: stat-card-X`
- ✅ Browser console shows CSQ mock click capture with position data

**Console Output Example**:
```
[Contentsquare Mock] Click captured: {
  element: "DIV.stat-card",
  position: { x: 450, y: 320 },
  sessionId: "CSQ_SESSION_..."
}
```

---

## 🔍 Session Continuity Verification

**Critical Requirement**: All pageviews and interactions must belong to the same session

**How to Verify**:
1. Open browser console (F12)
2. After completing the full user journey (login → dashboard → logout), run:
   ```javascript
   window._csqDebug.getSessionSummary()
   ```

**Expected Output**:
```
=== Contentsquare Session Summary ===
Session ID: CSQ_SESSION_1234567890_abc123
Total Pageviews: 3
Total Interactions: X
Pageviews: [
  { path: "/login", timestamp: "...", sessionId: "CSQ_SESSION_..." },
  { path: "/dashboard/home", timestamp: "...", sessionId: "CSQ_SESSION_..." },
  { path: "/login", timestamp: "...", sessionId: "CSQ_SESSION_..." }
]
Session Replay URL: https://app.contentsquare.com/replay/CSQ_SESSION_...
```

**Verification**:
- ✅ All pageviews have the **same sessionId**
- ✅ All interactions have the **same sessionId**
- ✅ Single session replay URL is generated

---

## 🎨 Visual Console Logger

The application includes an on-page console logger at the bottom of the screen that displays:
- ✅ CSP compliance checks (green)
- ✅ Pageview tracking events (green)
- ✅ SPA transitions (green)
- ✅ Click tracking (blue)
- ❌ Any errors (red)

This provides real-time validation feedback without needing to open browser DevTools.

---

## 🧪 Complete Test Scenario

### Full User Journey Test

**Scenario**: Complete user session from login to logout

**Steps**:
1. **Initial Load**
   - Open http://localhost:8000
   - Verify CSP compliance message
   - Verify initial pageview for `/login`

2. **Login**
   - Enter username: `test` (or any value)
   - Enter password: `test` (or any value)
   - Click Login button
   - Verify SPA transition to `/dashboard/home`
   - Verify no page reload occurred

3. **Dashboard Interaction**
   - Click on "إجمالي المستندات" card
   - Click on "المستخدمون" card
   - Verify clicks are tracked

4. **Logout**
   - Click Logout button
   - Verify SPA transition back to `/login`
   - Verify no page reload occurred

5. **Session Verification**
   - Open browser console
   - Run: `window._csqDebug.getSessionSummary()`
   - Verify all events share the same session ID

**Expected Results**:
- ✅ 3 pageviews tracked: `/login` → `/dashboard/home` → `/login`
- ✅ Multiple click interactions tracked
- ✅ Single session ID for entire journey
- ✅ No CSP violations
- ✅ No JavaScript errors

---

## 🔧 Debugging Tools

### Available Debug Commands

Open browser console and use these commands:

```javascript
// Get current session ID
window._csqDebug.getSessionId()

// Get all pageviews
window._csqDebug.getPageviews()

// Get all interactions
window._csqDebug.getInteractions()

// Get complete session summary
window._csqDebug.getSessionSummary()
```

---

## 📋 Success Criteria Checklist

Use this checklist to validate the implementation:

- [ ] **CSP Compliance**: No CSP violation errors in console
- [ ] **Initial Pageview**: `/login` pageview tracked on load
- [ ] **Login Transition**: `/dashboard/home` pageview tracked after login
- [ ] **Logout Transition**: `/login` pageview tracked after logout
- [ ] **No Page Reloads**: All transitions happen without full page reload (SPA behavior)
- [ ] **Click Tracking**: Dashboard element clicks are captured
- [ ] **Session Continuity**: All events share the same session ID
- [ ] **Async Loading**: CSQ tag loads asynchronously without blocking render
- [ ] **Tag Placement**: CSQ tag is in `<head>` section, high up
- [ ] **Console Logging**: All expected console messages appear

---

## 🎯 Production Implementation Notes

When implementing this in the actual client environment:

1. **Replace Mock Script**: Change `csq-mock.js` to the actual Contentsquare tag URL
2. **Update CSP**: Ensure the actual CSQ CDN hosts are whitelisted
3. **Verify Paths**: Adjust pageview paths to match actual application routes
4. **Test Thoroughly**: Run all validation tests in staging before production
5. **Monitor**: Check for CSP violations and tracking errors in production

---

## 📞 Support

For questions about this simulation or the actual implementation:
- Review the TRVP document (prd.md)
- Check browser console for detailed CSQ mock logs
- Use debug commands to inspect session data

---

## ✨ Key Features Demonstrated

✅ AngularJS 1.6.5 SPA architecture
✅ Content Security Policy enforcement
✅ Contentsquare tag integration (mocked)
✅ Manual pageview tracking for SPA transitions
✅ Session continuity across virtual page changes
✅ Click tracking for heatmaps and replays
✅ Real-time console logging for validation
✅ Bilingual interface (Arabic/English)

