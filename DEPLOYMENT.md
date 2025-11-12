# 🚀 GitHub Pages Deployment Guide

## Quick Deploy Steps

### 1. Create GitHub Repository

1. Go to [GitHub](https://github.com) and log in
2. Click the **"+"** icon in the top right → **"New repository"**
3. Repository settings:
   - **Name**: `raqeem-csp-demo` (or any name you prefer)
   - **Description**: "Contentsquare CSP Integration Demo for Raqeem ANAT SA"
   - **Visibility**: Choose **Public** or **Private**
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
4. Click **"Create repository"**

### 2. Push to GitHub

After creating the repository, GitHub will show you commands. Use these:

```bash
# Add the remote repository
git remote add origin https://github.com/YOUR_USERNAME/raqeem-csp-demo.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**Replace `YOUR_USERNAME` with your actual GitHub username!**

### 3. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **"Settings"** tab
3. Scroll down to **"Pages"** in the left sidebar
4. Under **"Source"**, select:
   - **Branch**: `main`
   - **Folder**: `/ (root)`
5. Click **"Save"**
6. Wait 1-2 minutes for deployment

### 4. Access Your Demo

Your site will be available at:
```
https://YOUR_USERNAME.github.io/raqeem-csp-demo/
```

The main page will automatically redirect to the comparison page.

---

## 📂 What Gets Deployed

All files in the repository:
- ✅ `index.html` - Auto-redirects to comparison page
- ✅ `comparison.html` - Side-by-side comparison
- ✅ `index-BROKEN.html` - Broken version (CSP blocks)
- ✅ `index-FIXED.html` - Fixed version (CSP allows)
- ✅ `index-WORKING.html` - Working version (same as FIXED)
- ✅ `app.js` - AngularJS application
- ✅ `csq-mock.js` - Mock Contentsquare tag
- ✅ All documentation files (*.md)

---

## 🔗 Direct Links (After Deployment)

Replace `YOUR_USERNAME` with your GitHub username:

- **Main Demo**: `https://YOUR_USERNAME.github.io/raqeem-csp-demo/`
- **Comparison**: `https://YOUR_USERNAME.github.io/raqeem-csp-demo/comparison.html`
- **Broken Version**: `https://YOUR_USERNAME.github.io/raqeem-csp-demo/index-BROKEN.html`
- **Fixed Version**: `https://YOUR_USERNAME.github.io/raqeem-csp-demo/index-FIXED.html`

---

## 🔄 Updating the Demo

After making changes:

```bash
# Stage all changes
git add -A

# Commit with a message
git commit -m "Updated demo with new features"

# Push to GitHub
git push
```

GitHub Pages will automatically redeploy (takes 1-2 minutes).

---

## 🎯 For Client Presentations

Share the comparison page link:
```
https://YOUR_USERNAME.github.io/raqeem-csp-demo/comparison.html
```

Or use a URL shortener for a cleaner link:
- [bit.ly](https://bitly.com)
- [tinyurl.com](https://tinyurl.com)

---

## 🔒 Private Repository Option

If you made the repository **private**:
- GitHub Pages works with private repos (requires GitHub Pro/Team/Enterprise)
- The site will still be publicly accessible
- Only the repository code is private

---

## ⚠️ Important Notes

1. **CSP Violations**: The BROKEN version will show CSP errors in the browser console - this is expected and demonstrates the problem!

2. **Mock Tag**: We're using `csq-mock.js` instead of the real Contentsquare tag. For production, replace with the actual tag.

3. **No Server Required**: GitHub Pages serves static files, perfect for this demo.

4. **HTTPS**: GitHub Pages automatically provides HTTPS.

---

## 🆘 Troubleshooting

### "404 - Page Not Found"
- Wait 2-3 minutes after enabling GitHub Pages
- Check that you selected the correct branch (`main`) and folder (`/ root`)
- Verify the repository is public or you have GitHub Pro for private repos

### "Changes Not Showing"
- Wait 1-2 minutes for GitHub Pages to rebuild
- Hard refresh your browser (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)
- Check GitHub Actions tab for deployment status

### "Permission Denied"
- Make sure you're authenticated with GitHub
- Use HTTPS URL or set up SSH keys
- Check repository permissions

---

## 📞 Next Steps After Deployment

1. ✅ Test all three pages (comparison, broken, fixed)
2. ✅ Open DevTools and verify console output
3. ✅ Test the full user journey (login → dashboard → logout)
4. ✅ Share the link with your team for review
5. ✅ Prepare your client presentation

---

**Ready to deploy? Follow the steps above!** 🚀

