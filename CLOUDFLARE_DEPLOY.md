# Cloudflare Pages Deployment Guide

## Prerequisites
- Node.js 18+ installed
- Cloudflare account

## Build & Deploy Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Build the Project
```bash
npm run build
```
This creates a `dist/` folder with optimized production files.

### 3. Deploy to Cloudflare Pages

#### Option A: Via Cloudflare Dashboard
1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to **Workers & Pages** → **Create Application** → **Pages** → **Connect to Git**
3. Select your repo: `pintuclub51-rgb/laxi-repo`
4. Build settings:
   - **Production branch**: `main`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
5. Environment variables (add these in Pages settings):
   - `VITE_RAZORPAY_KEY_ID` = `rzp_test_SS6ATCngAC8vhJ`
6. Click **Save and Deploy**

#### Option B: Via Wrangler CLI
```bash
npm install -g wrangler
wrangler pages deploy dist --project-name=laxi-repo
```

## Environment Variables Needed
Add these in Cloudflare Pages Settings → Environment Variables:
- `VITE_RAZORPAY_KEY_ID` = `rzp_test_SS6ATCngAC8vhJ`
- `INSFORGE_BASE_URL` = `https://ak9w74vp.ap-southeast.insforge.app`
- `INSFORGE_ANON_KEY` = `ik_4ac64bf30330771488f02f8dc1e0cbd6`

## Features Ready
✅ Vite build configured  
✅ React Router with client-side routing  
✅ Tailwind CSS v4  
✅ TypeScript  
✅ Edge Functions ready (`insforge/functions/`)  
✅ Razorpay payment integration  
✅ Role-based authentication  

## Notes
- Cloudflare Pages serves static files from `dist/` folder
- All routes will fallback to `index.html` (handled by `_routes.json`)
- For dynamic edge functions, you may need to deploy separately to Cloudflare Workers