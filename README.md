# Hector Hernandez - Portfolio Website

Professional portfolio website for a backend software engineer specializing in data pipelines, ETL systems, and scalable backend architecture.

## Overview

This is a modern, responsive portfolio website built with HTML5, CSS3, and JavaScript. The website showcases professional experience, technical skills, education, and projects with a clean, professional design optimized for software engineering recruiters.

## Features

- **Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- **Modern Design**: Clean, professional aesthetic with smooth animations
- **Smooth Scrolling**: Navigation with active section highlighting
- **Interactive Projects**: Showcase of backend engineering projects
- **Contact Form**: Easy contact mechanism for recruiters and collaborators
- **Performance Optimized**: Fast loading times and lazy loading images
- **Accessible**: WCAG AA compliant with proper ARIA labels

## Sections

1. **Hero Section** - Introduction with key statistics and call-to-action
2. **About** - Professional background and expertise overview
3. **Technical Skills** - Categorized skill sets with visual tags
4. **Education** - Academic credentials in timeline format
5. **Professional Experience** - Detailed work history with achievements
6. **Projects** - Featured projects with technology stacks
7. **Contact** - Contact form and social media links

## Technology Stack

- **HTML5** - Semantic markup
- **CSS3** - Custom styling with CSS Grid and Flexbox
- **JavaScript** - Vanilla JS for interactivity
- **Bootstrap 5.3** - Responsive framework
- **Font Awesome 6.4** - Icons
- **Google Fonts** - Montserrat and Open Sans typography

## File Structure

```
portfolio-website/
├── index.html              # Main HTML file
├── css/
│   └── style.css          # Custom styles
├── js/
│   └── main.js            # JavaScript functionality
├── images/
│   ├── project-screenshots/  # Project images
│   └── icons/             # Icon assets
├── fonts/                 # Custom fonts (if any)
├── docs/
│   └── Hector_Hernandez_Resume.pdf  # Resume file
└── README.md              # This file
```

## Setup Instructions

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/HectorHernandez1/HectorHernandez.ai.git
   cd HectorHernandez.ai
   ```

2. Open `index.html` in your web browser:
   ```bash
   # On macOS
   open index.html

   # On Linux
   xdg-open index.html

   # On Windows
   start index.html
   ```

   Or use a local server (recommended):
   ```bash
   # Using Python 3
   python -m http.server 8000

   # Using Node.js http-server
   npx http-server
   ```

3. View the website at `http://localhost:8000`

### GitHub Pages Deployment

1. Push your code to GitHub:
   ```bash
   git add .
   git commit -m "Initial portfolio website"
   git push origin main
   ```

2. Enable GitHub Pages:
   - Go to your repository settings
   - Navigate to "Pages" section
   - Select "main" branch as source
   - Click "Save"

3. Your site will be live at: `https://HectorHernandez1.github.io/HectorHernandez.ai/`

## Customization

### Update Personal Information

1. **Contact Details** - Update email, LinkedIn, and GitHub links in:
   - `index.html` (Contact section and footer)

2. **Resume** - Replace the placeholder resume:
   - Add your PDF resume to `docs/Hector_Hernandez_Resume.pdf`

3. **Social Media Links** - Update links in:
   - Navigation bar
   - Contact section
   - Footer

### Add Project Images

1. Add project screenshots to `images/project-screenshots/`
2. Update image paths in the Projects section of `index.html`
3. Recommended image size: 800x600px (4:3 ratio)
4. Use WebP format for better performance

### Color Scheme

The color scheme is defined in CSS variables at the top of `css/style.css`:

```css
:root {
    --primary-color: #2C3E50;        /* Navy Blue */
    --accent-color: #1ABC9C;         /* Teal */
    --secondary-accent: #E74C3C;     /* Coral */
    --text-dark: #333333;
    --text-light: #666666;
    --bg-light: #F8F9FA;
    --white: #FFFFFF;
}
```

Modify these values to change the entire color scheme.

### Contact Form

The contact form currently uses a `mailto:` fallback. For production use, integrate with:

- **Formspree** (https://formspree.io/) - Easy setup, free tier available
- **EmailJS** (https://www.emailjs.com/) - Send emails from JavaScript
- **Netlify Forms** - If deploying on Netlify
- **Custom Backend** - Build your own API endpoint

To integrate Formspree:
1. Sign up at https://formspree.io/
2. Create a new form
3. Update the form action in `index.html`:
   ```html
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```

## Next Steps

### Content to Add

1. **Resume PDF** - Add your actual resume to `docs/` folder
2. **Project Screenshots** - Add images for all 6 projects
3. **Project Links** - Update GitHub repository and demo links
4. **Profile Photo** - Optional: Add a professional headshot to the About section
5. **Social Media** - Update all social media links with your actual profiles

### Current Projects

The portfolio showcases the following projects:

1. **PersonalFinanceHub** - AI-powered finance tool with OpenAI GPT categorization (Python, PostgreSQL, FastAPI)
2. **Wedding Website** - Bilingual wedding site with RSVP system (React, FastAPI, PostgreSQL, Tailwind)
3. **Money Review Page** - Budget dashboard with D3.js visualizations (FastAPI, React, D3.js, PostgreSQL)
4. **REST API with Advanced Features** - Enterprise patterns with auth and caching (FastAPI, PostgreSQL, Redis)
5. **Claude MCP Server Collection** - MCP servers for Claude AI with stocks/weather APIs (Python, MCP, APIs)
6. **LeetCode Practice** - Daily algorithm practice with solutions (Python, Algorithms, Data Structures)

### SEO Optimization

1. Update meta tags in `<head>`:
   - Title
   - Description
   - Keywords
   - Open Graph tags for social sharing

2. Create a `sitemap.xml`:
   ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>https://HectorHernandez1.github.io/</loc>
       <lastmod>2026-01-11</lastmod>
       <priority>1.0</priority>
     </url>
   </urlset>
   ```

3. Add `robots.txt`:
   ```
   User-agent: *
   Allow: /
   Sitemap: https://HectorHernandez1.github.io/sitemap.xml
   ```

### Performance Optimization

1. **Optimize Images**:
   - Convert to WebP format
   - Compress using tools like ImageOptim or TinyPNG
   - Use appropriate dimensions

2. **Minify Assets**:
   - Minify CSS and JavaScript for production
   - Consider using a build tool like Webpack or Parcel

3. **Add Analytics** (Optional):
   - Google Analytics
   - Plausible Analytics
   - Simple Analytics

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Accessibility

- Semantic HTML5 elements
- ARIA labels for screen readers
- Keyboard navigation support
- Sufficient color contrast (WCAG AA)
- Focus indicators for interactive elements

## License

This project is open source and available for personal use.

## Contact

Hector Hernandez
- Email: hhhector9@gmail.com
- LinkedIn: [linkedin.com/in/hector-hernandez-55600191](https://www.linkedin.com/in/hector-hernandez-55600191/)
- GitHub: [github.com/HectorHernandez1](https://github.com/HectorHernandez1)
- Location: Chandler, AZ

---

Built with care and attention to detail. Happy coding!
