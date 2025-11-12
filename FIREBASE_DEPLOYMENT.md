# 🚀 Firebase Hosting Deployment Guide

## Quick Deploy Steps

### 1. Login to Firebase

```bash
firebase login
```

This will open your browser for authentication. Login with your Google account.

### 2. Initialize Firebase Hosting

```bash
firebase init hosting
```

**Answer the prompts as follows:**

1. **"Please select an option:"** 
   - Choose: `Use an existing project` (if you have one) OR `Create a new project`

2. **"What do you want to use as your public directory?"**
   - Enter: `.` (current directory - we want to deploy all HTML files)

3. **"Configure as a single-page app (rewrite all urls to /index.html)?"**
   - Enter: `N` (No - we have multiple pages)

4. **"Set up automatic builds and deploys with GitHub?"**
   - Enter: `N` (No - manual deployment for now)

5. **"File ./index.html already exists. Overwrite?"**
   - Enter: `N` (No - keep our existing files)

### 3. Configure Firebase

The `firebase.json` file will be created. Make sure it looks like this:

```json
{
  "hosting": {
    "public": ".",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**",
      "**/*.md",
      "deploy.sh",
      "deploy-firebase.sh"
    ]
  }
}
```

### 4. Deploy to Firebase

```bash
firebase deploy --only hosting
```

### 5. Access Your Demo

After deployment, Firebase will show you the URL:
```
✔  Deploy complete!

Project Console: https://console.firebase.google.com/project/YOUR_PROJECT/overview
Hosting URL: https://YOUR_PROJECT.web.app
```

---

## 🎯 Automated Deployment Script

I've created a script to automate this process:

```bash
./deploy-firebase.sh
```

This script will:
1. ✅ Check if Firebase CLI is installed
2. ✅ Check if you're logged in
3. ✅ Initialize Firebase Hosting (if needed)
4. ✅ Deploy to Firebase
5. ✅ Show you the live URL

---

## 📂 What Gets Deployed

All HTML and JS files:
- ✅ `index.html` - Auto-redirects to comparison page
- ✅ `comparison.html` - Side-by-side comparison
- ✅ `index-BROKEN.html` - Broken version (CSP blocks Contentsquare)
- ✅ `index-FIXED.html` - Fixed version (CSP allows Contentsquare)
- ✅ `index-WORKING.html` - Working version
- ✅ `app.js` - AngularJS application
- ✅ `csq-mock.js` - Mock Contentsquare tag

**NOT deployed** (automatically ignored):
- ❌ `*.md` files (documentation)
- ❌ `.git` directory
- ❌ `deploy*.sh` scripts
- ❌ `firebase.json` config

---

## 🔗 Direct Links (After Deployment)

Replace `YOUR_PROJECT` with your Firebase project ID:

- **Main Demo**: `https://YOUR_PROJECT.web.app/`
- **Comparison**: `https://YOUR_PROJECT.web.app/comparison.html`
- **Broken Version**: `https://YOUR_PROJECT.web.app/index-BROKEN.html`
- **Fixed Version**: `https://YOUR_PROJECT.web.app/index-FIXED.html`

---

## 🔄 Updating the Demo

After making changes:

```bash
# Commit changes to git (optional but recommended)
git add -A
git commit -m "Updated demo"

# Deploy to Firebase
firebase deploy --only hosting
```

Firebase will automatically update your site (takes ~30 seconds).

---

## 🎯 For Client Presentations

Share the comparison page link:
```
https://YOUR_PROJECT.web.app/comparison.html
```

Or use a custom domain (see Firebase Console → Hosting → Add custom domain)

---

## 🆓 Firebase Free Tier

Firebase Hosting free tier includes:
- ✅ 10 GB storage
- ✅ 360 MB/day transfer
- ✅ Free SSL certificate
- ✅ Global CDN
- ✅ Custom domain support

Perfect for demos and presentations!

---

## ⚠️ Important Notes

1. **CSP Violations**: The BROKEN version will show CSP errors in the browser console - this is expected!

2. **Mock Tag**: We're using `csq-mock.js` instead of the real Contentsquare tag.

3. **HTTPS**: Firebase automatically provides HTTPS.

4. **Fast Deployment**: Changes deploy in ~30 seconds.

---

## 🆘 Troubleshooting

### "Firebase CLI not found"
```bash
npm install -g firebase-tools
```

### "Not logged in"
```bash
firebase login
```

### "No project selected"
```bash
firebase use --add
# Then select your project from the list
```

### "Permission denied"
- Make sure you're logged in with the correct Google account
- Check that you have access to the Firebase project

### "Deploy failed"
```bash
# Check Firebase status
firebase projects:list

# Re-initialize if needed
firebase init hosting
```

---

## 📞 Next Steps After Deployment

1. ✅ Test all three pages (comparison, broken, fixed)
2. ✅ Open DevTools and verify console output
3. ✅ Test the full user journey (login → dashboard → logout)
4. ✅ Share the link with your team for review
5. ✅ Prepare your client presentation

---

## 🔒 Custom Domain (Optional)

To use a custom domain like `demo.contentsquare.com`:

1. Go to Firebase Console → Hosting
2. Click "Add custom domain"
3. Follow the DNS configuration steps
4. Wait for SSL certificate provisioning (~24 hours)

---

**Ready to deploy? Run:**

```bash
./deploy-firebase.sh
```

Or manually:

```bash
firebase login
firebase init hosting
firebase deploy --only hosting
```

🚀 **Your demo will be live in minutes!**

