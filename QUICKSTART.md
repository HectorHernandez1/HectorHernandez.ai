# Quick Start Guide

Get your portfolio website up and running in minutes!

## Immediate Next Steps

### 1. Test Locally (Right Now!)

Open the website in your browser:

```bash
# Method 1: Direct open (simplest)
open index.html

# Method 2: Using Python server (recommended)
python3 -m http.server 8000
# Then visit: http://localhost:8000
```

### 2. Update Your Information (15 minutes)

#### Critical Updates:

1. **Social Media Links** in `index.html`:
   - Line ~135: LinkedIn URL
   - Line ~140: GitHub URL
   - Line ~508-520: Contact section links
   - Line ~538-544: Footer social links

2. **GitHub Repository Name**:
   - Update this README.md
   - Update DEPLOYMENT.md with your actual GitHub username

#### Search and Replace:
```bash
# Replace placeholder text in index.html
# LinkedIn: HectorHernandez1 → your-actual-linkedin-username
# GitHub: HectorHernandez1 → your-actual-github-username
```

### 3. Add Your Resume (5 minutes)

1. Export your resume as PDF
2. Save it as `docs/Hector_Hernandez_Resume.pdf`
3. Make sure the file size is under 2MB

**Don't have a resume yet?** See `docs/README.md` for guidelines.

### 4. Deploy to GitHub Pages (10 minutes)

```bash
# Initialize git (if not already done)
git init
git add .
git commit -m "Initial portfolio website"

# Create repository on GitHub named: HectorHernandez1.github.io

# Connect and push
git remote add origin https://github.com/HectorHernandez1/HectorHernandez1.github.io.git
git branch -M main
git push -u origin main

# Enable GitHub Pages in repository Settings → Pages
# Select: main branch, / (root) folder
# Your site will be live at: https://HectorHernandez1.github.io/
```

See `DEPLOYMENT.md` for detailed instructions.

## What Works Right Now

### ✅ Fully Functional

- Responsive design (mobile, tablet, desktop)
- Smooth scrolling navigation
- All sections with your content
- Interactive project cards
- Contact form (uses mailto as fallback)
- Back-to-top button
- Scroll animations
- Professional styling

### ⚠️ Needs Your Content

- **Resume PDF** - Add to `docs/` folder
- **Project Images** - Add to `images/project-screenshots/` (optional - auto-generated placeholders work)
- **Social Links** - Update LinkedIn and GitHub URLs
- **Project Links** - Update GitHub repo and demo links when projects are built

## Customization Priority

### High Priority (Do First)

1. ✅ Social media links (LinkedIn, GitHub)
2. ✅ Resume PDF
3. ✅ Email verification (already set to hhhector9@gmail.com)

### Medium Priority (Do This Week)

4. Project screenshots (or use auto-generated placeholders)
5. Update project GitHub links when you build them
6. Add professional headshot (optional)

### Low Priority (Do Later)

7. Custom color scheme (if desired)
8. Custom domain
9. Analytics integration
10. Advanced contact form integration (Formspree/EmailJS)

## File Organization

```
HectorHernandez.ai/
├── index.html              ← Main website (UPDATE social links here)
├── css/style.css           ← Styling (customize colors here)
├── js/main.js             ← Interactivity (works as-is)
├── docs/
│   └── Hector_Hernandez_Resume.pdf  ← ADD YOUR RESUME HERE
├── images/
│   └── project-screenshots/         ← ADD PROJECT IMAGES HERE (optional)
├── README.md              ← Project documentation
├── DEPLOYMENT.md          ← Deployment guide
└── QUICKSTART.md          ← This file
```

## Testing Checklist

Before deploying, verify:

- [ ] Website opens in browser
- [ ] All navigation links work
- [ ] Smooth scrolling works
- [ ] Resume download link works (or remove button if no PDF yet)
- [ ] Contact form opens email client
- [ ] Social media links are correct
- [ ] Responsive on mobile (resize browser window)
- [ ] No console errors (press F12, check Console tab)

## Common Issues

### Resume Link 404

If you don't have a resume yet:
1. Remove or comment out the resume download buttons
2. Or add a placeholder PDF

### Images Not Showing

Don't worry! The site automatically generates gradient placeholders for missing project images. Add real screenshots when you have them.

### Social Links Wrong

Update three places in `index.html`:
- Contact section (~line 508-520)
- Footer (~line 538-544)
- Any other references

## What's Next?

### This Week:
1. Deploy to GitHub Pages
2. Share link with friends for feedback
3. Update LinkedIn with portfolio link
4. Start building the 6 featured projects

### This Month:
1. Build at least 2-3 projects
2. Add project screenshots
3. Get feedback from other developers
4. Apply to jobs with your portfolio link

### Long Term:
1. Build all 6 projects
2. Add blog posts (optional)
3. Consider custom domain
4. Keep content updated

## Getting Help

- **HTML/CSS issues**: Check browser console (F12)
- **Git issues**: See DEPLOYMENT.md
- **Content ideas**: See README.md
- **Design changes**: Modify css/style.css

## Ready to Launch?

Your portfolio is production-ready right now! The only must-haves before deploying:

1. ✅ Content is already there (your experience, education, skills)
2. ⚠️ Update social media links (5 minutes)
3. ⚠️ Add resume PDF (or hide download button)

**You can deploy with auto-generated project placeholders and add real projects later!**

---

## Quick Reference Commands

```bash
# Test locally
python3 -m http.server 8000

# Deploy to GitHub
git add .
git commit -m "Update portfolio"
git push

# Check git status
git status

# View in browser
open http://localhost:8000
```

---

**You're all set!** Your professional portfolio is ready to help you land your next role. 🚀

Questions? Review the detailed guides:
- README.md - Full documentation
- DEPLOYMENT.md - Deployment steps
- docs/README.md - Resume guidelines
