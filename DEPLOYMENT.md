# Deployment Guide

This guide will help you deploy your portfolio website to GitHub Pages.

## Prerequisites

- Git installed on your computer
- GitHub account
- Repository created on GitHub

## Step-by-Step Deployment to GitHub Pages

### 1. Prepare Your Repository

First, make sure all your files are ready:

```bash
# Check git status
git status

# Add all files
git add .

# Commit changes
git commit -m "Initial portfolio website commit"
```

### 2. Create GitHub Repository

If you haven't already created a repository:

1. Go to https://github.com
2. Click the "+" icon in the top right
3. Select "New repository"
4. **Important**: Name it `yourusername.github.io` (replace with your GitHub username)
   - Example: If your username is "hectorh", name it `hectorh.github.io`
   - This creates a user site that will be accessible at `https://hectorh.github.io`
5. **Do NOT** initialize with README, .gitignore, or license (we already have these)
6. Click "Create repository"

### 3. Connect Local Repository to GitHub

```bash
# Add GitHub remote (replace with your repository URL)
git remote add origin https://github.com/yourusername/yourusername.github.io.git

# Verify remote was added
git remote -v

# Push to GitHub
git branch -M main
git push -u origin main
```

### 4. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click "Settings" tab
3. Scroll down to "Pages" in the left sidebar
4. Under "Source", select:
   - Branch: `main`
   - Folder: `/ (root)`
5. Click "Save"

### 5. Wait for Deployment

- GitHub will build and deploy your site
- This usually takes 1-2 minutes
- You'll see a message: "Your site is ready to be published at `https://yourusername.github.io/`"
- Refresh the page after a minute to see: "Your site is published at..."

### 6. Verify Deployment

Visit your site at: `https://yourusername.github.io/`

## Alternative: Project Repository (Not User Site)

If you named your repository something other than `yourusername.github.io`:

1. Your site will be at: `https://yourusername.github.io/repository-name/`
2. **Important**: You'll need to update paths in your HTML:
   - Change `href="css/style.css"` to `href="/repository-name/css/style.css"`
   - Update all asset paths accordingly

## Custom Domain (Optional)

### Steps to Add Custom Domain

1. **Purchase a domain** from:
   - Namecheap
   - Google Domains
   - Cloudflare
   - GoDaddy

2. **Configure DNS settings** at your domain provider:

   Add these DNS records:
   ```
   Type: A
   Host: @
   Value: 185.199.108.153

   Type: A
   Host: @
   Value: 185.199.109.153

   Type: A
   Host: @
   Value: 185.199.110.153

   Type: A
   Host: @
   Value: 185.199.111.153

   Type: CNAME
   Host: www
   Value: yourusername.github.io
   ```

3. **Add custom domain to GitHub**:
   - Go to repository Settings → Pages
   - Under "Custom domain", enter your domain (e.g., `hectorhernandez.com`)
   - Click "Save"
   - Wait for DNS check (can take up to 48 hours)
   - Enable "Enforce HTTPS" once DNS is verified

4. **Create CNAME file** in your repository root:
   ```bash
   echo "yourdomain.com" > CNAME
   git add CNAME
   git commit -m "Add custom domain"
   git push
   ```

## Making Updates

After deployment, to update your site:

```bash
# Make your changes to files

# Stage changes
git add .

# Commit with descriptive message
git commit -m "Update projects section"

# Push to GitHub
git push

# Changes will be live in 1-2 minutes
```

## Troubleshooting

### Site Not Loading

1. Check GitHub Pages status in repository Settings → Pages
2. Verify branch is set to `main` and folder to `/ (root)`
3. Clear browser cache (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)
4. Check browser console for errors (F12)

### 404 Errors on Assets

1. Verify file paths are correct (case-sensitive!)
2. Check that files exist in repository
3. If using project repository (not user site), update paths to include repository name

### Custom Domain Not Working

1. Verify DNS records are correct
2. Wait up to 48 hours for DNS propagation
3. Use https://dnschecker.org to verify DNS records globally
4. Check that CNAME file exists in repository root

### Images Not Showing

1. Verify image files exist in `images/project-screenshots/`
2. Check file names match exactly (case-sensitive)
3. The site includes automatic placeholder generation if images are missing

## Performance Optimization

Before deployment, consider:

1. **Optimize Images**:
   ```bash
   # Using ImageOptim (Mac)
   # Drag and drop images to ImageOptim app

   # Or use online tools:
   # - TinyPNG (tinypng.com)
   # - Squoosh (squoosh.app)
   ```

2. **Minify CSS and JS** (optional):
   ```bash
   # Using online tools:
   # - CSS: cssnano.co
   # - JS: javascript-minifier.com
   ```

3. **Enable Caching** (automatic with GitHub Pages)

## Testing Before Deployment

Test locally before pushing:

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx http-server

# Using PHP
php -S localhost:8000

# Then visit: http://localhost:8000
```

## Security

- GitHub Pages automatically provides HTTPS
- Enable "Enforce HTTPS" in repository settings
- Keep dependencies updated (Bootstrap, Font Awesome)
- Don't commit sensitive information (.env files, API keys)

## SEO After Deployment

1. **Submit to Google Search Console**:
   - Visit: https://search.google.com/search-console
   - Add your property (website URL)
   - Verify ownership
   - Submit sitemap

2. **Submit to Bing Webmaster Tools**:
   - Visit: https://www.bing.com/webmasters
   - Add your site
   - Verify ownership

3. **Create sitemap.xml** (optional):
   - Add sitemap.xml to root directory
   - Submit to search engines

## Analytics (Optional)

Add Google Analytics:

1. Create account at https://analytics.google.com
2. Get tracking ID
3. Add tracking code to `index.html` before `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## Support

If you encounter issues:
- Check [GitHub Pages documentation](https://docs.github.com/en/pages)
- Review [GitHub Community](https://github.community/)
- Check browser console for JavaScript errors

---

Good luck with your deployment! Your portfolio will be live and helping you land your next role.
