# Waylo to Compare Shore Excursions - Cleanup Instructions

This document contains the remaining cleanup steps needed to fully remove old Waylo shuttle code from the repository.

## What's Already Done ✓

- [x] Updated `package.json` - removed Stripe, Supabase, Resend dependencies
- [x] Updated `prisma/schema.prisma` - replaced with CSE-only tables
- [x] Updated `.env.example` - removed Waylo config, added CSE config

## Remaining Tasks (Run Locally)

These tasks require file deletion which has permission issues in the remote environment. Run these commands in your terminal after cloning:

### 1. Delete Old App Routes (Admin, Operator, Customer)

```bash
# Remove old Waylo user portals
rm -rf app/'(admin)'
rm -rf app/'(customer)'
rm -rf app/'(operator)'
rm -f app/actions.ts

# Verify they're gone
git status  # Should show these as deleted
```

### 2. Delete Old Library Files

```bash
# Remove Stripe integration
rm -f lib/stripe.ts

# Remove Email/Resend integration
rm -f lib/email.ts

# Remove Supabase authentication
rm -rf lib/auth/
rm -rf lib/supabase/

# Remove old calculation utilities
rm -f lib/tickets.ts
rm -f lib/savings.ts

# Remove old middleware (route protection for old roles)
rm -f middleware.ts

# Verify
git status  # Should show these as deleted
```

### 3. Handle Database Migrations

```bash
# Option A: Clean slate (recommended for development)
# This drops your current database and creates a fresh migration
npx prisma migrate reset --force

# Option B: Manual migration
# Delete old migrations
rm -rf prisma/migrations/2026*

# Create new migration based on new schema
npx prisma migrate dev --name init_compare_shore_excursions
```

### 4. Delete Old Assets

```bash
# Remove old Waylo branding images
rm -rf public/waylo/
```

### 5. Delete This File

```bash
rm -f CLEANUP_INSTRUCTIONS.md
```

### 6. Commit All Changes

```bash
git add -A
git commit -m "refactor: remove legacy Waylo shuttle code, keep only Compare Shore Excursions"
git push origin cleanup/remove-old-shuttleflow-waylo
```

## Files Removed by This Cleanup

### Directories
- `app/(admin)/` - Admin dashboard for managing routes, operators, drivers, payments
- `app/(customer)/` - Customer booking flow and management
- `app/(operator)/` - Operator/driver portal
- `lib/auth/` - Supabase authentication and role-based access control
- `lib/supabase/` - Supabase SDK integration
- `public/waylo/` - Old Waylo branding assets

### Files
- `app/actions.ts` - Waylo booking business logic (579 lines)
- `lib/stripe.ts` - Stripe payment integration
- `lib/email.ts` - Email notifications (Resend)
- `lib/tickets.ts` - Ticket number generation
- `lib/savings.ts` - Rideshare savings calculations
- `middleware.ts` - Route protection for old roles
- `prisma/migrations/` - Old Waylo schema migrations

### Dependencies Removed
- `@stripe/react-stripe-js` - Stripe React UI
- `@stripe/stripe-js` - Stripe JavaScript SDK
- `stripe` - Stripe Node.js SDK
- `@supabase/ssr` - Supabase SSR utilities
- `@supabase/supabase-js` - Supabase JavaScript SDK
- `resend` - Resend email service SDK

## New Database Schema (CSE Only)

The `prisma/schema.prisma` now contains only Compare Shore Excursions tables:

- `ports` - Shore excursion ports (Barcelona, Cozumel, etc)
- `cruise_ships` - Cruise ship data
- `cruise_schedules` - When ships dock at ports
- `cruise_line_excursions` - Official cruise line excursion pricing
- `independent_excursions` - Viator, GetYourGuide, Shore Excursions Group options
- `leads` - Group matching waitlist
- `affiliate_clicks` - Tracking affiliate clicks

## What's Kept (Compare Shore Excursions)

### Pages
- `/` - Homepage
- `/ports` - Port listing
- `/ports/[slug]` - Individual port comparison
- `/group-matching` - Waitlist signup

### API Routes
- `/api/affiliate-clicks` - Track affiliate linkouts
- `/api/leads` - Capture group matching leads

### Libraries
- `lib/prisma.ts` - Database client
- `lib/viator-client.ts` - Viator provider integration (scaffold)

### Styling
- `shore-excursions.css` - CSE design system
- `globals.css` - Global styles

## Next Steps

After cleanup:

1. **Install dependencies**: `npm install`
2. **Create fresh database**: `npx prisma migrate dev` 
3. **Test locally**: `npm run dev`
4. **Verify homepage loads**: http://localhost:3000
5. **Verify old routes 404**: http://localhost:3000/customer (should return 404)
6. **Push to GitHub**: `git push origin cleanup/remove-old-shuttleflow-waylo`
7. **Create PR** to merge cleanup branch into main

## Questions?

If you run into issues with the cleanup, check:
- Are all node_modules installed? Run `npm install` first
- Is the database corrupted? Run `npx prisma db push --force-reset` to recreate it
- Are there import errors? Search for remaining references to deleted modules using grep

Good luck! 🚀
