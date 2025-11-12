#!/bin/bash

echo "🚀 GitHub Pages Deployment Helper"
echo "=================================="
echo ""

# Check if git is initialized
if [ ! -d .git ]; then
    echo "❌ Error: Not a git repository"
    exit 1
fi

# Check if there are uncommitted changes
if ! git diff-index --quiet HEAD --; then
    echo "⚠️  You have uncommitted changes. Committing them now..."
    git add -A
    read -p "Enter commit message: " commit_msg
    git commit -m "$commit_msg"
fi

# Check if remote exists
if ! git remote | grep -q origin; then
    echo ""
    echo "📝 Setting up GitHub remote..."
    echo ""
    read -p "Enter your GitHub username: " github_user
    read -p "Enter repository name (default: raqeem-csp-demo): " repo_name
    repo_name=${repo_name:-raqeem-csp-demo}
    
    git remote add origin "https://github.com/$github_user/$repo_name.git"
    echo "✅ Remote added: https://github.com/$github_user/$repo_name.git"
else
    echo "✅ Remote already configured"
fi

# Push to GitHub
echo ""
echo "📤 Pushing to GitHub..."
git branch -M main
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Successfully pushed to GitHub!"
    echo ""
    echo "📋 Next Steps:"
    echo "1. Go to your repository on GitHub"
    echo "2. Click 'Settings' → 'Pages'"
    echo "3. Under 'Source', select branch 'main' and folder '/ (root)'"
    echo "4. Click 'Save'"
    echo "5. Wait 1-2 minutes for deployment"
    echo ""
    echo "🌐 Your site will be available at:"
    remote_url=$(git remote get-url origin)
    if [[ $remote_url =~ github.com[:/]([^/]+)/([^/.]+) ]]; then
        user="${BASH_REMATCH[1]}"
        repo="${BASH_REMATCH[2]}"
        echo "   https://$user.github.io/$repo/"
    fi
else
    echo ""
    echo "❌ Push failed. Please check your credentials and try again."
    echo ""
    echo "💡 Tips:"
    echo "- Make sure you've created the repository on GitHub first"
    echo "- Check your GitHub username and repository name"
    echo "- You may need to authenticate with GitHub"
fi
