#!/bin/bash

echo "🚀 Firebase Hosting Deployment"
echo "==============================="
echo ""

# Check if Firebase CLI is installed
if ! command -v firebase &> /dev/null; then
    echo "❌ Firebase CLI not found!"
    echo ""
    echo "Install it with:"
    echo "  npm install -g firebase-tools"
    echo ""
    exit 1
fi

echo "✅ Firebase CLI found"

# Check if logged in
if ! firebase projects:list &> /dev/null; then
    echo ""
    echo "⚠️  Not logged in to Firebase"
    echo ""
    read -p "Do you want to login now? (y/n): " login_choice
    if [[ $login_choice == "y" || $login_choice == "Y" ]]; then
        firebase login
    else
        echo "❌ Login required to deploy. Exiting."
        exit 1
    fi
fi

echo "✅ Logged in to Firebase"

# Check if firebase.json exists
if [ ! -f firebase.json ]; then
    echo ""
    echo "📝 Firebase not initialized. Initializing now..."
    echo ""
    echo "Please answer the prompts:"
    echo "  1. Select or create a project"
    echo "  2. Public directory: . (dot)"
    echo "  3. Single-page app: N (no)"
    echo "  4. GitHub deploys: N (no)"
    echo "  5. Overwrite index.html: N (no)"
    echo ""
    read -p "Press Enter to continue..."
    
    firebase init hosting
    
    if [ $? -ne 0 ]; then
        echo "❌ Firebase initialization failed"
        exit 1
    fi
    
    # Update firebase.json to ignore documentation files
    echo ""
    echo "📝 Updating firebase.json configuration..."
    cat > firebase.json << 'EOF'
{
  "hosting": {
    "public": ".",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**",
      "**/*.md",
      "deploy.sh",
      "deploy-firebase.sh",
      "prd.md"
    ]
  }
}
EOF
    echo "✅ firebase.json configured"
fi

# Commit changes to git (optional)
if [ -d .git ]; then
    if ! git diff-index --quiet HEAD --; then
        echo ""
        echo "⚠️  You have uncommitted changes"
        read -p "Commit changes before deploying? (y/n): " commit_choice
        if [[ $commit_choice == "y" || $commit_choice == "Y" ]]; then
            git add -A
            read -p "Enter commit message: " commit_msg
            git commit -m "$commit_msg"
            echo "✅ Changes committed"
        fi
    fi
fi

# Deploy to Firebase
echo ""
echo "🚀 Deploying to Firebase Hosting..."
echo ""

firebase deploy --only hosting

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Successfully deployed to Firebase!"
    echo ""
    echo "📋 Your demo is now live!"
    echo ""
    echo "🌐 Access your demo at the URL shown above"
    echo ""
    echo "📂 Pages available:"
    echo "   - Main (redirects to comparison): /index.html"
    echo "   - Comparison: /comparison.html"
    echo "   - Broken version: /index-BROKEN.html"
    echo "   - Fixed version: /index-FIXED.html"
    echo ""
    echo "💡 Share the comparison page with your client!"
    echo ""
else
    echo ""
    echo "❌ Deployment failed"
    echo ""
    echo "💡 Troubleshooting:"
    echo "   - Check your internet connection"
    echo "   - Verify you have access to the Firebase project"
    echo "   - Try: firebase login --reauth"
    echo ""
    exit 1
fi

