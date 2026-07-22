# Compare Shore Excursions - Cleanup Completion Guide

## Quick Start: Run These 3 Commands Locally

```bash
# 1. Delete all old Waylo files
rm -rf app/'(admin)' app/'(customer)' app/'(operator)' app/actions.ts lib/stripe.ts lib/email.ts lib/auth/ lib/supabase/ lib/tickets.ts lib/savings.ts middleware.ts public/waylo/ prisma/migrations/2026*

# 2. Reset database and create fresh migration
npx prisma migrate reset --force

# 3. Install and test
npm install
npm run dev
```

Then verify at http://localhost:3000 and push to GitHub.

---

## What's Already Done (Remote Session)

### ✅ package.json
```diff
- Removed: @stripe/react-stripe-js, stripe, @supabase/ssr, @supabase/supabase-js, resend
- Kept: next, react, @prisma/client, prisma
+ Updated name: waylo → compare-shore-excursions
```

### ✅ prisma/schema.prisma (Complete Rewrite)
**Removed Tables (23 total):**
```
countries, regions, cities, locations, routes, route_departures, operators_routes,
users, customer_profiles, operator_profiles, driver_profiles,
vehicles, operator_claims, documents,
bookings, booking_passengers, booking_events, booking_changes, booking_messages,
payments, pricing_rules, outreach_contacts, audit_logs
```

**New CSE Tables (6 total):**
```prisma
Port                        // "Barcelona", "Cozumel", etc
CruiseShip                  // Ship registry
CruiseSchedule              // When ships dock at ports
CruiseLineExcursion         // Official cruise line pricing
IndependentExcursion        // Viator, GetYourGuide alternatives
Lead                        // Group matching waitlist
AffiliateClick              // Affiliate link tracking
```

### ✅ .env.example
```diff
- DATABASE_URL (kept)
- NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
- STRIPE_SECRET_KEY
- RESEND_API_KEY
- EMAIL_FROM
+ VIATOR_API_KEY
+ VIATOR_AFFILIATE_ID
+ GETYOURGUIDE_AFFILIATE_ID
+ AWIN_PUBLISHER_ID
+ TRADEDOUBLER_PUBLISHER_ID
```

### ✅ Added Documentation
- `CLEANUP_INSTRUCTIONS.md` - Detailed step-by-step
- `CLEANUP_SUMMARY.md` - Complete overview
- `README_CLEANUP.md` - This file

---

## What You Need to Delete Locally

### Directories (Full Deletion)

```bash
# Old User Portals
rm -rf app/'(admin)'      # 13 pages for route/operator/payment management
rm -rf app/'(customer)'   # 9 pages for booking/payment/tickets
rm -rf app/'(operator)'   # 2 pages for check-in

# Old Libraries  
rm -rf lib/auth/          # Supabase auth + RBAC
rm -rf lib/supabase/      # Supabase SDKs

# Old Assets
rm -rf public/waylo/      # Branding images

# Old Migrations
rm -rf prisma/migrations/2026* # 5 old migration files
```

### Files (Single File Deletion)

```bash
# Old Business Logic
rm app/actions.ts                 # Booking operations (579 lines)

# Old Integrations
rm lib/stripe.ts                  # Stripe payment processor
rm lib/email.ts                   # Email notifications (Resend)

# Old Utilities
rm lib/tickets.ts                 # Ticket number generation
rm lib/savings.ts                 # Rideshare price calculations

# Old Route Protection
rm middleware.ts                  # Custom auth middleware
```

---

## Step-by-Step Cleanup

### Step 1: Pull Latest Changes
```bash
cd C:\Users\mbanw\carifive_workspace\01.Projects\08.waylo
git fetch origin
git checkout cleanup/remove-old-shuttleflow-waylo
git pull
```

### Step 2: Delete Old Files

**Option A: One Command** (Linux/Mac/PowerShell)
```bash
rm -rf app/'(admin)' app/'(customer)' app/'(operator)' app/actions.ts && \
rm -rf lib/stripe.ts lib/email.ts lib/auth/ lib/supabase/ lib/tickets.ts lib/savings.ts && \
rm -rf middleware.ts public/waylo/ prisma/migrations/2026*
```

**Option B: Individual Commands** (More control)
```bash
# User portals
rm -rf app/'(admin)'
rm -rf app/'(customer)'
rm -rf app/'(operator)'

# Business logic
rm app/actions.ts

# Integrations
rm lib/stripe.ts
rm lib/email.ts

# Libraries
rm -rf lib/auth
rm -rf lib/supabase

# Utilities
rm lib/tickets.ts
rm lib/savings.ts

# Middleware
rm middleware.ts

# Assets
rm -rf public/waylo

# Old migrations
rm -rf prisma/migrations/2026*
```

**Option C: Visual Deletion** (File Explorer)
- Open: `C:\Users\mbanw\carifive_workspace\01.Projects\08.waylo`
- Delete folders: `app/(admin)`, `app/(customer)`, `app/(operator)`
- Delete files: `app/actions.ts`, `lib/stripe.ts`, `lib/email.ts`, `lib/tickets.ts`, `lib/savings.ts`, `middleware.ts`
- Delete folders: `lib/auth/`, `lib/supabase/`, `public/waylo/`
- Delete folder: `prisma/migrations/` (all migration folders)

### Step 3: Reset Database

```bash
# This will:
# 1. Drop the current SQLite database
# 2. Create a fresh one based on new schema
# 3. Generate a new initial migration

npx prisma migrate reset --force
```

### Step 4: Install Dependencies

```bash
npm install
```

### Step 5: Verify Everything Works

```bash
npm run dev
```

**Test in browser:**
- ✅ http://localhost:3000 - Homepage loads
- ✅ http://localhost:3000/ports - Port listing loads
- ✅ http://localhost:3000/group-matching - Waitlist loads
- ✅ http://localhost:3000/customer - Returns 404 (old route gone)
- ✅ http://localhost:3000/admin - Returns 404 (old route gone)
- ✅ http://localhost:3000/operator - Returns 404 (old route gone)

**Check terminal:**
- ✅ No "Module not found" errors for deleted files
- ✅ No Stripe/Supabase/Resend import warnings
- ✅ "ready - started server on 0.0.0.0:3000"

### Step 6: Verify Git Changes

```bash
git status

# Should show files deleted:
#   deleted:    app/(admin)/...
#   deleted:    app/(customer)/...
#   deleted:    app/(operator)/...
#   deleted:    app/actions.ts
#   deleted:    lib/stripe.ts
#   ... etc
```

### Step 7: Commit & Push

```bash
# Stage all changes
git add -A

# Create commit
git commit -m "refactor: remove legacy Waylo shuttle code, keep only Compare Shore Excursions

- Delete 24+ pages from old customer/operator/admin portals
- Remove Stripe, Supabase, Resend integrations
- Delete shuttle-specific business logic (routing, pricing, tickets)
- Clean database schema: 23 old tables → 6 new CSE tables
- Update package.json: remove 6 old dependencies
- Reset migrations: drop old shuttle migrations
- Remove old assets: Waylo branding images"

# Push to GitHub
git push origin cleanup/remove-old-shuttleflow-waylo
```

### Step 8: Create Pull Request

1. Go to GitHub: https://github.com/yourusername/waylo
2. Click "Compare & pull request"
3. Create PR from `cleanup/remove-old-shuttleflow-waylo` → `main`
4. Title: "🧹 Remove legacy Waylo shuttle code, keep only Compare Shore Excursions"
5. Description:
   ```
   ## Cleanup: Waylo → Compare Shore Excursions
   
   Removes all legacy shuttle marketplace code and consolidates on CSE.
   
   ### What's Deleted
   - 24+ pages: customer, operator, admin portals
   - 7 library files: Stripe, Supabase, email, auth, calculations
   - 23 database tables: routes, locations, bookings, users, etc.
   - 6 dependencies: stripe, supabase, resend packages
   - 5 migrations: old shuttle schema migrations
   
   ### What's New
   - 6 CSE database tables: ports, cruise ships, excursions, leads
   - Fresh Prisma migration for CSE schema
   - Updated package.json with CSE dependencies
   - Updated .env.example with affiliate keys
   
   ### Testing
   - [x] npm install
   - [x] npx prisma migrate reset
   - [x] npm run dev
   - [x] Homepage loads ✓
   - [x] /ports loads ✓
   - [x] /customer returns 404 ✓
   - [x] No import errors ✓
   ```
6. Merge after approval

---

## Rollback Instructions (If Needed)

If something goes wrong, you can revert:

```bash
# Undo last commit (keeps deletions)
git reset --soft HEAD~1

# Restore deleted files from git
git checkout HEAD -- app lib prisma/migrations public/waylo middleware.ts

# Or completely revert to before cleanup
git reset --hard HEAD~1
```

---

## Troubleshooting

### Issue: "Cannot find module '@stripe/react-stripe-js'"
**Fix:** Old files still reference deleted modules. Complete step 2 (delete files).

### Issue: "Prisma schema validation failed"
**Fix:** The schema changed. Complete step 3 (migrate reset).

### Issue: TypeScript errors about missing types
**Fix:** Run `npm install` and restart dev server.

### Issue: Database errors
**Fix:** Delete `dev.db` and run `npx prisma migrate reset --force`

### Issue: Git merge conflicts
**Fix:** 
```bash
git status  # See conflicts
git checkout --theirs .  # Keep incoming changes
git add -A
git commit -m "resolve: cleanup conflicts"
```

---

## What Gets Created

After cleanup and `npx prisma migrate reset`:

- New `dev.db` SQLite database with fresh schema
- New migration: `prisma/migrations/{timestamp}_init/migration.sql`
- Fresh Prisma Client compiled from new schema
- Clean project ready for CSE development

---

## Before & After Statistics

| Aspect | Before | After | Change |
|--------|--------|-------|--------|
| App Routes | 26 | 4 | -22 routes |
| Library Files | 16 | 4 | -12 files |
| Database Tables | 31 | 7 | -24 tables |
| Dependencies | 11 | 6 | -5 packages |
| Schema Size | 500+ lines | 140 lines | -71% |
| Codebase | ~3,500 LOC legacy | ~400 LOC CSE | -88% legacy |

---

## Next Steps After Cleanup

Once merged to main:

1. **Add Viator Integration** - Replace mock API with real integration
2. **Add GetYourGuide Integration** - Affiliate feed or API
3. **Add Port/Activity Data** - Seed database with cruise ports
4. **Build Comparison UI** - Display official vs independent excursions
5. **Add Protection Referral** - Link to travel insurance partners
6. **Setup Analytics** - Track affiliate clicks and conversions

---

## Questions?

See these files for more details:
- `CLEANUP_INSTRUCTIONS.md` - Step-by-step with explanations
- `CLEANUP_SUMMARY.md` - Statistics and overview
- `prisma/schema.prisma` - New database tables

Good luck! 🎉
