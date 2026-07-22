# Compare Shore Excursions - Complete Setup & Deployment Guide

## Overview

This project is being transitioned from Waylo (shuttle marketplace) to Compare Shore Excursions (cruise port comparison site).

**Status**: 60% done remotely, 40% remaining locally

## Quick Timeline

1. **Local Cleanup** (15 min) - Delete old Waylo files
2. **Local Testing** (10 min) - Verify it works  
3. **Push to GitHub** (5 min) - Commit changes
4. **Supabase Setup** (5 min) - Create database
5. **Vercel Deployment** (5 min) - Deploy to production

**Total time: ~40 minutes** ⏱️

---

## Phase 1: Local Cleanup (Your Machine)

### Step 1a: Pull Latest Code

```powershell
cd C:\Users\mbanw\carifive_workspace\01.Projects\08.waylo
git fetch origin
git checkout cleanup/remove-old-shuttleflow-waylo
git pull
```

### Step 1b: Delete Old Waylo Files

```powershell
# Run the cleanup script (easiest method)
powershell -ExecutionPolicy Bypass -File cleanup.ps1
```

**What it deletes:**
- ❌ `app/(admin)`, `app/(customer)`, `app/(operator)` - Old user portals
- ❌ `lib/stripe.ts`, `lib/email.ts` - Old payment/email integrations
- ❌ `lib/auth`, `lib/supabase` - Old Waylo auth (we're using Supabase cleanly now)
- ❌ `middleware.ts` - Old route protection
- ❌ `public/waylo/` - Old branding assets
- ❌ Old migrations in `prisma/migrations/2026*`

### Step 1c: Reset Database & Install

```powershell
# Create fresh database schema (PostgreSQL)
npx prisma migrate dev --name init

# Install dependencies
npm install
```

### Step 1d: Test Locally

```powershell
# Start dev server
npm run dev
```

**Verify in browser:**
- ✅ http://localhost:3000 - Homepage loads
- ✅ http://localhost:3000/ports - Port listing loads
- ✅ http://localhost:3000/group-matching - Waitlist loads
- ✅ http://localhost:3000/customer - Returns 404 (old route gone)
- ✅ Terminal shows no errors

---

## Phase 2: Push to GitHub

```powershell
# Stage all changes
git add -A

# Commit
git commit -m "refactor: remove legacy Waylo code, setup for Vercel + Supabase

- Delete 24+ pages from old customer/operator/admin portals
- Remove old payment/email integrations (Stripe, Resend, old Supabase auth)
- Clean database schema: 23 Waylo tables → 6 CSE tables
- Update to PostgreSQL for Supabase
- Add affiliate tracking tables
- Reset all migrations for clean schema"

# Push to GitHub
git push origin cleanup/remove-old-shuttleflow-waylo
```

**Then on GitHub:**
1. Go to your repository
2. Click "Compare & pull request"
3. Review changes
4. Click "Merge pull request"
5. Confirm merge to main

---

## Phase 3: Supabase Setup (Cloud)

### Step 3a: Create Supabase Project

1. Go to https://supabase.com
2. Click "Start your project"
3. Sign up or log in
4. Click "New project"
5. Fill in:
   - **Name**: `compare-shore-excursions`
   - **Database Password**: Create strong password (save it!)
   - **Region**: Pick closest to your users
   - **Plan**: Free tier (500MB included)
6. Click "Create new project"
7. Wait 2-3 minutes for database

### Step 3b: Get Connection String

1. Supabase Dashboard → **Settings** → **Database**
2. Scroll to "Connection strings"
3. Click **Prisma** tab
4. Copy the string (save it somewhere)

**Format:**
```
postgresql://postgres:PASSWORD@HOST:5432/postgres
```

---

## Phase 4: Vercel Deployment

### Step 4a: Connect to Vercel

1. Go to https://vercel.com
2. Click "New Project"
3. Click "Import Git Repository"
4. Select your GitHub repo
5. Click "Import"

### Step 4b: Add Environment Variables

In Vercel, set these environment variables:

```
DATABASE_URL = postgresql://postgres:PASSWORD@HOST:5432/postgres
NEXT_PUBLIC_SUPABASE_URL = https://PROJECT_ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJ...
SUPABASE_SERVICE_ROLE_KEY = eyJ...
```

**To get Supabase keys:**
- Supabase Dashboard → **Settings** → **API**
- Copy the keys listed there

### Step 4c: Deploy

1. In Vercel, click **Deploy**
2. Wait 3-5 minutes for build
3. Get your production URL: `https://[project].vercel.app`

### Step 4d: Initialize Database

```powershell
# Set production database URL
$env:DATABASE_URL = "postgresql://postgres:PASSWORD@HOST:5432/postgres"

# Deploy migrations
npx prisma migrate deploy

# Clear local env var
$env:DATABASE_URL = ""
```

---

## Verify Everything Works

### Local ✅
```powershell
npm run dev
# Visit http://localhost:3000
```

### Production ✅
```
Visit https://[your-vercel-url]/
Click around: /ports, /group-matching
Check browser console for errors
```

---

## Project Structure (After Cleanup)

```
waylo/
├── app/
│   ├── page.tsx                    ← Homepage
│   ├── layout.tsx
│   ├── globals.css
│   ├── shore-excursions.css
│   ├── ports/                      ← Port comparison pages
│   │   ├── page.tsx               ← Port listing
│   │   └── [slug]/page.tsx        ← Individual port
│   ├── group-matching/             ← Waitlist signup
│   │   └── page.tsx
│   └── api/
│       ├── affiliate-clicks/       ← Track affiliate links
│       └── leads/                  ← Capture waitlist signups
├── lib/
│   ├── prisma.ts                  ← Database client
│   └── viator-client.ts           ← Provider integration (stub)
├── prisma/
│   ├── schema.prisma              ← CSE database schema (PostgreSQL)
│   └── migrations/                ← Fresh migrations
├── package.json                    ← Dependencies (cleaned)
├── .env.example                    ← Environment config (updated)
└── Documentation/
    ├── README.md
    ├── CLEANUP_POWERSHELL.md       ← PowerShell commands
    ├── VERCEL_DEPLOYMENT.md        ← This deployment guide
    └── ... other guides
```

---

## Database Schema (New CSE)

```prisma
Port                      // Ports: Barcelona, Cozumel, etc
CruiseShip               // Ship registry
CruiseSchedule           // When ships dock at ports  
CruiseLineExcursion      // Official cruise line pricing
IndependentExcursion     // Viator, GetYourGuide, etc
Lead                     // Group matching waitlist
AffiliateClick           // Affiliate link tracking
```

---

## Important Files Changed

### Modified (3 files)
- `package.json` - Added `@supabase/supabase-js`, removed old deps
- `prisma/schema.prisma` - Changed to PostgreSQL, new CSE tables
- `.env.example` - Updated with Supabase keys

### Deleted (via cleanup script)
- 24+ pages from `app/(admin)`, `app/(customer)`, `app/(operator)`
- 6 library files (stripe, email, auth, etc)
- 5 old migrations
- 2 asset files

---

## Environment Variables

### Local Development

Create `.env.local`:
```
DATABASE_URL="postgresql://postgres:password@localhost:5432/postgres"
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-key"
```

### Production (Vercel)

Set in Vercel Dashboard → Settings → Environment Variables

---

## Troubleshooting

### "Cannot find module '@stripe/react-stripe-js'"
→ Run cleanup script fully (didn't delete old files)

### "Database connection refused"
→ Check DATABASE_URL in .env.local
→ Verify Supabase project is running
→ Confirm password has correct escaping

### "Module build failed"
```powershell
rm -r node_modules package-lock.json
npm install
npm run dev
```

### Build fails on Vercel
1. Check Vercel logs: Deployments → Build logs
2. Verify all environment variables set
3. Run locally to test: `npm run build`

---

## What's Next After Deployment

1. **Add Real Viator Integration** - Replace mock API
2. **Add GetYourGuide Feed** - Affiliate data
3. **Seed Ports & Ships** - Initial data
4. **Build Comparison UI** - Official vs independent display
5. **Add Analytics** - Track clicks and conversions

---

## Quick Reference Commands

```powershell
# Local setup
cd C:\Users\mbanw\carifive_workspace\01.Projects\08.waylo
powershell -ExecutionPolicy Bypass -File cleanup.ps1
npx prisma migrate dev --name init
npm install
npm run dev

# Push to GitHub
git add -A
git commit -m "message"
git push origin main

# Production database
$env:DATABASE_URL = "postgresql://..."
npx prisma migrate deploy
```

---

## Support Files

Read these for more details:
- `CLEANUP_POWERSHELL.md` - Detailed cleanup steps
- `VERCEL_DEPLOYMENT.md` - Detailed deployment steps
- `README_CLEANUP.md` - Complete cleanup guide
- `CLEANUP_SUMMARY.md` - Statistics and overview

---

## Success Checklist

- [ ] Cleanup script ran successfully
- [ ] Local dev server starts
- [ ] Homepage loads at http://localhost:3000
- [ ] Old routes (customer, admin, operator) return 404
- [ ] Changes pushed to GitHub main branch
- [ ] Supabase project created
- [ ] Database connection string saved
- [ ] Vercel project created
- [ ] Environment variables set in Vercel
- [ ] Vercel build successful
- [ ] Production site loads at vercel URL
- [ ] No console errors in browser
- [ ] Database migrations deployed to Supabase

---

**You're ready to go! 🚀**

Any questions? See the detailed guides in the docs folder.
