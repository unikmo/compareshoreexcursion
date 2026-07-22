# Simple one-command cleanup script
# Usage: powershell -ExecutionPolicy Bypass -File cleanup-simple.ps1

Write-Host "Deleting old Waylo files..." -ForegroundColor Yellow

# Delete directories
@(
    "app/(admin)",
    "app/(customer)",
    "app/(operator)",
    "lib/auth",
    "lib/supabase",
    "public/waylo"
) | ForEach-Object {
    if (Test-Path $_) {
        Write-Host "  Deleting: $_"
        Remove-Item -Path $_ -Recurse -Force -ErrorAction SilentlyContinue
    }
}

# Delete files
@(
    "app/actions.ts",
    "lib/stripe.ts",
    "lib/email.ts",
    "lib/tickets.ts",
    "lib/savings.ts",
    "middleware.ts"
) | ForEach-Object {
    if (Test-Path $_) {
        Write-Host "  Deleting: $_"
        Remove-Item -Path $_ -Force -ErrorAction SilentlyContinue
    }
}

# Delete old migrations
Get-ChildItem "prisma/migrations" -Directory | Where-Object { $_.Name -like "2026*" } | ForEach-Object {
    Write-Host "  Deleting: prisma/migrations/$($_.Name)"
    Remove-Item -Path $_.FullName -Recurse -Force -ErrorAction SilentlyContinue
}

Write-Host "`n✓ Deletion complete!" -ForegroundColor Green
Write-Host "`nNext: npx prisma migrate reset --force && npm install && npm run dev" -ForegroundColor Cyan
