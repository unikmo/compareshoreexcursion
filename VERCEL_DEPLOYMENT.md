# Deploy to Vercel with Supabase Database

This guide walks through deploying Compare Shore Excursions to Vercel with a Supabase PostgreSQL database.

## Prerequisites

- GitHub account (code already there)
- Vercel account (free tier works)
- Supabase account (free tier includes 500MB database)

## Step 1: Set Up Supabase Database

### 1.1 Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project" (or log in if you have an account)
3. Click "New project"
4. Fill in:
   - **Name**: `compare-shore-excursions` (or your choice)
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose closest to your users
   - **Pricing Plan**: Free (includes 500MB)
5. Click "Create new project"
6. Wait ~2 minutes for database to initialize

### 1.2 Get Database Connection String

1. In Supabase Dashboard, go to **Settings** → **Database**
2. Scroll down to "Connection strings"
3. Click **Prisma** tab
4. Copy the connection string (looks like):
   ```
   postgresql://postgres:[PASSWORD]@[HOST]:[PORT]/postgres
   ```
5. Replace `[PASSWORD]` with your database password
6. Keep this safe - you'll need it in next step

## Step 2: Push Code to GitHub

```powershell
cd C:\Users\mbanw\carifive_workspace\01.Projects\08.waylo

# Run cleanup (if not done already)
powershell -ExecutionPolicy Bypass -File cleanup.ps1

# Reset database to new PostgreSQL schema
npx prisma migrate dev --name init

# Stage and commit changes
git add -A
git commit -m "refactor: setup for Vercel + Supabase deployment"
git push origin cleanup/remove-old-shuttleflow-waylo

# Then create PR and merge to main on GitHub
```

## Step 3: Deploy to Vercel

### 3.1 Connect Repository to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Click "Import Git Repository"
4. Search for your GitHub repo (waylo)
5. Click "Import"

### 3.2 Configure Environment Variables

In the Vercel project setup form:

1. **Framework Preset**: Select "Next.js"
2. **Build Command**: Leave as default
3. **Output Directory**: `.next`
4. **Install Command**: `npm install`

### 3.3 Add Environment Variables

Click "Environment Variables" and add:

```
DATABASE_URL = postgresql://postgres:[PASSWORD]@[HOST]:[PORT]/postgres
NEXT_PUBLIC_SUPABASE_URL = https://[PROJECT_ID].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = [your-anon-key]
SUPABASE_SERVICE_ROLE_KEY = [your-service-key]
```

**To get Supabase keys:**
1. Supabase Dashboard → Settings → API
2. Copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role secret** → `SUPABASE_SERVICE_ROLE_KEY`

### 3.4 Deploy

1. Click "Deploy"
2. Wait for build to complete (~3 minutes)
3. You'll get a URL like: `https://compare-shore-excursions.vercel.app`

## Step 4: Verify Deployment

```
✓ Homepage loads: https://[your-url]/
✓ Ports page loads: https://[your-url]/ports
✓ API working: https://[your-url]/api/affiliate-clicks (should return 200)
```

## Step 5: Run Migrations on Production

Your Vercel deployment uses the Supabase database. To set up tables:

```powershell
# Locally, with production DATABASE_URL
$env:DATABASE_URL = "postgresql://..."  # Your Supabase production string
npx prisma migrate deploy
```

Or use Supabase SQL Editor:

1. Supabase Dashboard → SQL Editor
2. Create new query
3. Paste the SQL from your latest migration
4. Run query

## Troubleshooting

### Build fails: "Cannot find module"

**Fix:**
```powershell
# Locally
rm -r node_modules package-lock.json
npm install
git add -A
git commit -m "fix: reinstall dependencies"
git push
# Vercel will auto-rebuild
```

### Database connection error on Vercel

1. Verify `DATABASE_URL` is set in Vercel Environment Variables
2. Check database password doesn't have special characters that need escaping
3. Confirm Supabase project is active (not paused)

### Prisma schema mismatch

```powershell
# Regenerate Prisma client
npx prisma generate

# Push to Vercel
git add -A
git commit -m "fix: regenerate prisma client"
git push
```

### Tables don't exist

```powershell
# Deploy migrations to production database
$env:DATABASE_URL = "postgresql://..."  # Production URL
npx prisma migrate deploy
```

## Ongoing Development

### Local Development
```powershell
# Use local Supabase (optional) or staging database
npm run dev
```

### Deploy Changes
```powershell
git add -A
git commit -m "feature: add new feature"
git push origin branch-name
# Create PR, merge to main
# Vercel auto-deploys on main branch push
```

### Add New Features

1. Update `prisma/schema.prisma`
2. Run migration locally:
   ```powershell
   npx prisma migrate dev --name feature_name
   ```
3. Test locally
4. Push to GitHub
5. Vercel auto-deploys
6. Run `npx prisma migrate deploy` with production DATABASE_URL

## Production Checklist

- [ ] Supabase project created
- [ ] Database connection string saved
- [ ] GitHub repository up to date
- [ ] Vercel project created
- [ ] All environment variables set in Vercel
- [ ] Build successful on Vercel
- [ ] Database tables created (migrations deployed)
- [ ] Homepage loads at `https://[project].vercel.app`
- [ ] No console errors in browser
- [ ] API endpoints responding

## Performance Tips

1. **Enable Vercel Analytics**: Vercel Dashboard → Analytics → Enable
2. **Monitor database**: Supabase → Database → Replication → Monitor
3. **Set up backups**: Supabase → Settings → Backups
4. **Monitor logs**: Vercel → Deployments → Logs

## Next Steps After Deployment

1. **Add Viator Integration** - Connect real API
2. **Add GetYourGuide Integration** - Affiliate feeds
3. **Seed Initial Data** - Ports, cruise ships
4. **Setup Analytics** - Track user behavior
5. **Add Authentication** - User signups for group matching

## Need Help?

- Vercel Docs: https://vercel.com/docs
- Supabase Docs: https://supabase.com/docs
- Prisma Docs: https://www.prisma.io/docs/
- Next.js Docs: https://nextjs.org/docs

## Rollback (If Needed)

```powershell
# Revert Vercel to previous deployment
# In Vercel Dashboard: Deployments → [Previous] → Redeploy

# Or reset git and redeploy
git reset --hard HEAD~1
git push --force
```
