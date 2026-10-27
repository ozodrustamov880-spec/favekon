# 🚀 IconForge — World-Class Favicon Generator

> **"Your brand, in one tiny icon."**  
> Create, customize, preview, and download production-grade favicons for websites and apps in seconds.

IconForge is a modern, high-performance web application designed to replace legacy favicon workflows. Built with React 19, TypeScript, Vite, Tailwind CSS, and the HTML5 Canvas API, it generates 100% compliant multi-resolution `.ico` binaries, Apple Touch icons, Android PWA assets, and Web Manifests directly in the user's browser with zero server roundtrips.

---

## ✨ Features

### 1. 🔤 Text to Favicon
- Generates icons from initials, letters, or short monograms (1–4 characters).
- Curated selection of 12+ Google & Web fonts (Plus Jakarta Sans, Inter, Outfit, Poppins, Fira Code, Playfair Display, Space Grotesk, Orbitron, etc.).
- Sliders for font size, font weight (400–900), text color with HEX picker, and subtle drop shadow.
- Built-in style presets:
  - **IF on Indigo**
  - **A on Blue**
  - **DEV on Black**
  - **Z on Violet**
  - **Minimal White on Dark**

### 2. 🖼️ Image to Favicon
- Drag-and-drop or browse PNG, JPG, JPEG, and WebP images.
- Precise crop and fit controls: `contain`, `cover`, and `fill`.
- Zoom scale (0.2× to 2.5×), rotation angle (-180° to +180°), and 2D positional offsets (X & Y).
- Solid, gradient, or transparent background support.

### 3. 😀 Emoji to Favicon
- Full visual emoji catalog with categorized tabs (Tech & Code, Smileys, Symbols, Objects, Nature, Food).
- Live real-time emoji search and session history for recently used icons.
- Adjustable emoji scaling and background styling.

### 4. ⚡ SVG to Favicon
- Paste raw SVG code or upload `.svg` files.
- Built-in **DOMParser security sandbox** that strips `<script>`, event handlers (`onload`, `onerror`), and `<foreignObject>` tags before rendering.
- Lossless vector-to-bitmap rasterization across all required resolutions.

### 5. 🔍 Website Favicon Checker
- Inspect any public domain (e.g., `github.com`, `stripe.com`, `apple.com`).
- Scans root `/favicon.ico`, declared `<link rel="icon">`, and Apple touch icons.
- High-resolution fallback resolution via verified public DNS/CDN registries.
- **SSRF protection**: Blocks requests to `localhost`, internal IPs (`127.0.0.1`, `10.*`, `192.168.*`, `172.16-31.*`), and cloud metadata destinations.

### 6. 📱 Realistic Live Previews
- **Simulated Browser Tab**: Visualizes the icon at 16×16 inside a macOS/Chrome-style browser window with an active tab, close button, address bar, and customizable title.
- **Website Header**: Shows the generated icon as an active brand logo inside a modern SaaS navbar.
- **Smartphone Home Screen**: Displays the icon on an iOS/Android mobile home screen with app grid and status bar.
- **Resolution Grid**: Inspects pixel-crisp renders at 16×16, 32×32, 48×48, 180×180, 192×192, and 512×512.

### 7. 📦 Export Suite & Binary ICO Generation
- **True Multi-Resolution Binary ICO**: Custom binary encoder that compiles an authentic Windows `.ico` container with 16×16, 32×32, and 48×48 PNG streams.
- **Apple Touch Icon**: 180×180 PNG.
- **Android / PWA Icons**: 192×192 and 512×512 PNGs.
- **PWA Manifest**: Automatically configured `site.webmanifest`.
- **ZIP Bundling**: 1-click download of all assets in a neat `.zip` archive via JSZip with celebration confetti.
- **HTML Installation Code**: Syntax-highlighted `<link>` tags with 1-click clipboard copy.

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite 6+](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 3.4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Archiving**: [JSZip](https://stuk.github.io/jszip/)
- **Effects**: [canvas-confetti](https://www.npmjs.com/package/canvas-confetti)
- **Rendering**: Browser Canvas 2D API + DataView binary serialization

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (tested on Node v24)
- npm 9+

### Installation & Local Development

```bash
# 1. Clone or navigate to the repository
cd favekon

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

Visit `http://localhost:5173/` in your browser.

### Production Build

```bash
npm run build
npm run preview
```

The optimized static assets will be output to the `dist/` directory, ready to deploy to Vercel, Netlify, Cloudflare Pages, or GitHub Pages.

---

## 📁 Project Architecture

```
src/
├── assets/                  # Brand graphics & SVGs
├── components/
│   ├── checker/
│   │   └── FaviconChecker.tsx      # Website inspector with SSRF protection
│   ├── docs/
│   │   └── DocumentationPage.tsx   # Framework guides & design rules
│   ├── editor/
│   │   ├── EmojiEditor.tsx         # Categorized emoji selector
│   │   ├── FaviconEditor.tsx       # Main 2-column studio layout
│   │   ├── ImageEditor.tsx         # Drag-and-drop & crop/fit controls
│   │   ├── PresetsBar.tsx          # Quick template styles
│   │   ├── ShapeControls.tsx       # Squircle, circle, gradients, shadows
│   │   ├── SvgEditor.tsx           # Sanitized SVG XML editor
│   │   └── TextEditor.tsx          # Typography, fonts & color inputs
│   ├── export/
│   │   └── ExportModal.tsx         # ZIP bundle & individual file downloads
│   ├── landing/
│   │   ├── FAQSection.tsx          # Interactive accordion FAQ
│   │   ├── Hero.tsx                # Hero with live interactive playground
│   │   ├── HowItWorks.tsx          # 3-step visual workflow
│   │   ├── IconShowcase.tsx        # Style inspiration gallery
│   │   ├── LandingPage.tsx         # Master landing page layout
│   │   ├── SupportedFormats.tsx    # Technical specifications table
│   │   └── ToolsGrid.tsx           # 4 interactive tool cards
│   ├── layout/
│   │   ├── BrandLogo.tsx           # Geometric IconForge logo mark
│   │   ├── Footer.tsx              # Footer navigation & compliance info
│   │   └── Navbar.tsx              # Nav with theme toggle & tool launcher
│   └── preview/
│       ├── BrowserTabPreview.tsx   # Chrome/macOS browser tab simulation
│       ├── IconSizesGrid.tsx       # 6 resolution cards with downloads
│       ├── LivePreviewPanel.tsx    # Master preview container
│       ├── MobileAppPreview.tsx    # iOS/Android home screen mockup
│       └── WebsiteHeaderPreview.tsx# SaaS header mockup
├── hooks/
│   ├── useFaviconCanvas.ts         # High-DPI master canvas rendering hook
│   └── useTheme.ts                 # Dark & light mode state manager
├── types/
│   └── favicon.ts                  # Type definitions for editor state
├── utils/
│   ├── icoEncoder.ts               # Binary Windows ICO generator
│   ├── presets.ts                  # Curated design presets
│   ├── svgSanitizer.ts             # Safe SVG DOM sanitization
│   └── zipExporter.ts              # JSZip exporter & manifest generator
├── App.tsx                         # View controller & routing
├── index.css                       # Tailwind layers & utilities
└── main.tsx                        # React application entry
```

---

## 🔒 Security & Privacy

- **Client-Side Exclusively**: Icons are rasterized on an offscreen HTML Canvas. Your images, text, and designs never leave your browser.
- **SVG Sanitization**: Strips executable JavaScript, inline event handlers, and external resource tags before rendering.
- **SSRF Blocklist**: The Favicon Checker strictly prohibits loopback (`127.0.0.1`), LAN private subnets, and cloud metadata IP addresses.

---

## 📄 License

MIT © IconForge
