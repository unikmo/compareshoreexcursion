# Cleanup Guide - PowerShell Version

## Quick Start: Run the Script

```powershell
cd C:\Users\mbanw\carifive_workspace\01.Projects\08.waylo
powershell -ExecutionPolicy Bypass -File cleanup.ps1
```

This will delete all old Waylo files automatically with colored progress output.

---

## Or Use One-Liner Script

```powershell
powershell -ExecutionPolicy Bypass -File cleanup-simple.ps1
```

---

## Or Run Commands Manually

### Option 1: All at Once

```powershell
# Navigate to project
cd C:\Users\mbanw\carifive_workspace\01.Projects\08.waylo

# Delete old app routes
Remove-Item -Path "app/(admin)" -Recurse -Force
Remove-Item -Path "app/(customer)" -Recurse -Force
Remove-Item -Path "app/(operator)" -Recurse -Force
Remove-Item -Path "app/actions.ts" -Force

# Delete old libraries
Remove-Item -Path "lib/stripe.ts" -Force
Remove-Item -Path "lib/email.ts" -Force
Remove-Item -Path "lib/auth" -Recurse -Force
Remove-Item -Path "lib/supabase" -Recurse -Force
Remove-Item -Path "lib/tickets.ts" -Force
Remove-Item -Path "lib/savings.ts" -Force

# Delete middleware
Remove-Item -Path "middleware.ts" -Force

# Delete old assets
Remove-Item -Path "public/waylo" -Recurse -Force

# Delete old migrations
Get-ChildItem "prisma/migrations" -Directory | Where-Object { $_.Name -like "2026*" } | ForEach-Object { Remove-Item -Path $_.FullName -Recurse -Force }

# Reset database
npx prisma migrate reset --force

# Install and test
npm install
npm run dev
```

### Option 2: Step by Step

```powershell
cd C:\Users\mbanw\carifive_workspace\01.Projects\08.waylo

# Step 1: Delete old user portals
Write-Host "Deleting old user portals..." -ForegroundColor Yellow
Remove-Item -Path "app/(admin)" -Recurse -Force
Remove-Item -Path "app/(customer)" -Recurse -Force
Remove-Item -Path "app/(operator)" -Recurse -Force
Remove-Item -Path "app/actions.ts" -Force
Write-Host "✓ Done" -ForegroundColor Green

# Step 2: Delete old libraries
Write-Host "Deleting old library files..." -ForegroundColor Yellow
Remove-Item -Path "lib/stripe.ts" -Force
Remove-Item -Path "lib/email.ts" -Force
Remove-Item -Path "lib/auth" -Recurse -Force
Remove-Item -Path "lib/supabase" -Recurse -Force
Remove-Item -Path "lib/tickets.ts" -Force
Remove-Item -Path "lib/savings.ts" -Force
Remove-Item -Path "middleware.ts" -Force
Write-Host "✓ Done" -ForegroundColor Green

# Step 3: Delete old assets
Write-Host "Deleting old assets..." -ForegroundColor Yellow
Remove-Item -Path "public/waylo" -Recurse -Force
Write-Host "✓ Done" -ForegroundColor Green

# Step 4: Delete old migrations
Write-Host "Deleting old migrations..." -ForegroundColor Yellow
Get-ChildItem "prisma/migrations" -Directory | Where-Object { $_.Name -like "2026*" } | ForEach-Object {
    Remove-Item -Path $_.FullName -Recurse -Force
}
Write-Host "✓ Done" -ForegroundColor Green

# Step 5: Reset database
Write-Host "Resetting database..." -ForegroundColor Yellow
npx prisma migrate reset --force
Write-Host "✓ Done" -ForegroundColor Green

# Step 6: Install dependencies
Write-Host "Installing dependencies..." -ForegroundColor Yellow
npm install
Write-Host "✓ Done" -ForegroundColor Green

# Step 7: Start dev server
Write-Host "Starting dev server..." -ForegroundColor Yellow
npm run dev
```

### Option 3: Using File Manager

1. Open File Manager: `C:\Users\mbanw\carifive_workspace\01.Projects\08.waylo`
2. Delete these **folders**:
   - `app/(admin)`
   - `app/(customer)`
   - `app/(operator)`
   - `lib/auth`
   - `lib/supabase`
   - `public/waylo`
   - `prisma/migrations/20260521131500_add_location_display_metadata`
   - `prisma/migrations/20260521172602_init`
   - `prisma/migrations/20260522120000_fix_location_columns`
   - `prisma/migrations/20260523120000_add_booking_ticket_number`
   - `prisma/migrations/20260524120000_add_booking_policy_fields`

3. Delete these **files**:
   - `app/actions.ts`
   - `lib/stripe.ts`
   - `lib/email.ts`
   - `lib/tickets.ts`
   - `lib/savings.ts`
   - `middleware.ts`

4. Then run in PowerShell:
   ```powershell
   cd C:\Users\mbanw\carifive_workspace\01.Projects\08.waylo
   npx prisma migrate reset --force
   npm install
   npm run dev
   ```

---

## Useful PowerShell Commands Reference

```powershell
# Delete a file
Remove-Item -Path "file.ts" -Force

# Delete a folder and all contents
Remove-Item -Path "folder" -Recurse -Force

# Delete multiple folders in a loop
@("folder1", "folder2") | ForEach-Object { Remove-Item -Path $_ -Recurse -Force }

# Find and delete files matching a pattern
Get-ChildItem "path" -Filter "*.ts" -Recurse | Remove-Item -Force

# List what would be deleted (without actually deleting)
Get-ChildItem "app" -Recurse | Where-Object { $_.Name -like "*admin*" }

# Confirm each deletion
Remove-Item -Path "file.ts" -Force -Confirm

# Ignore errors and continue
Remove-Item -Path "file.ts" -Force -ErrorAction SilentlyContinue
```

---

## Post-Cleanup Verification

```powershell
cd C:\Users\mbanw\carifive_workspace\01.Projects\08.waylo

# Check git status
git status

# Should show files deleted like:
# deleted:    app/(admin)/admin/page.tsx
# deleted:    app/(customer)/customer/page.tsx
# ... etc

# Show what git thinks is deleted
git diff --name-status HEAD | Select-String "^D"
```

---

## Commit and Push

```powershell
# Stage all deletions
git add -A

# Commit
git commit -m "refactor: remove legacy Waylo shuttle code, keep only Compare Shore Excursions"

# Push to GitHub
git push origin cleanup/remove-old-shuttleflow-waylo
```

---

## If Something Goes Wrong

```powershell
# See what changed
git status

# Revert file deletions (restore deleted files)
git checkout HEAD -- app lib prisma/migrations public/waylo middleware.ts

# Or completely revert the cleanup
git reset --hard HEAD~1
```

---

## Troubleshooting

### "Access Denied" when deleting
```powershell
# Try running PowerShell as Administrator
# Or use alternate delete method:
cmd /c rmdir /s /q "folder_path"
```

### "Cannot find path" error
```powershell
# Check if path exists first
if (Test-Path "path") { Remove-Item "path" -Recurse -Force }
```

### Database errors after cleanup
```powershell
# Completely reset database
npx prisma migrate reset --force

# Or manually
Remove-Item -Path "dev.db" -Force
npx prisma migrate dev
```

### Import/module errors
```powershell
# Reinstall everything
Remove-Item -Path "node_modules" -Recurse -Force
Remove-Item -Path "package-lock.json" -Force
npm install
npm run dev
```

---

## Done! 🎉

Your repository is now cleaned up and ready for Compare Shore Excursions development!
