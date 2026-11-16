# Deployment Guide: FINAL BOARDING

This guide explains how to deploy **FINAL BOARDING** to production using modern cloud static hosting platforms like **Vercel** or **Netlify**.

---

## 1. Deploying to Vercel (Recommended)

FINAL BOARDING is a Vite-based Single Page Application (SPA) that compiles to static HTML, CSS, and JS assets inside `dist/`.

### Method A: Deploy via Vercel Dashboard (Git Integration)

1. Push your code to your GitHub repository:
   ```bash
   git push -u origin main
   ```
2. Log into [Vercel](https://vercel.com/) and click **Add New Project**.
3. Import the repository: `aastha-yadav2/Final-Boarding`.
4. Configure the Project Settings:
   - **Framework Preset:** `Vite`
   - **Root Directory:** `./`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
5. Click **Deploy**.

### Method B: Deploy via Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Deploy directly from repository root
vercel
```

---

## 2. Deploying to Netlify

1. Link your GitHub repository in the [Netlify Dashboard](https://app.netlify.com/).
2. Set build configurations:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
3. Click **Deploy site**.

---

## 3. Production Build Verification

Always verify your production build locally before triggering a remote deployment:

```bash
npm run build
npm run preview
```

Ensure the output bundle compiles cleanly:
- `dist/index.html`
- `dist/assets/index-[hash].js`
- `dist/assets/index-[hash].css`
