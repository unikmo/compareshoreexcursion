# Compare Shore Excursions - Cleanup Script
# PowerShell version for Windows
#
# Usage:
#   cd C:\Users\mbanw\carifive_workspace\01.Projects\08.waylo
#   powershell -ExecutionPolicy Bypass -File cleanup.ps1

Write-Host "===============================================" -ForegroundColor Cyan
Write-Host "  Waylo → Compare Shore Excursions Cleanup" -ForegroundColor Cyan
Write-Host "===============================================" -ForegroundColor Cyan
Write-Host ""

# Color codes
$Success = "Green"
$Error = "Red"
$Warning = "Yellow"
$Info = "Cyan"

# Track progress
$tasksCompleted = 0
$totalTasks = 6

# Function to safely delete directories
function Remove-DirectoryIfExists {
    param([string]$Path)
    if (Test-Path $Path) {
        Write-Host "  ✓ Deleting: $Path" -ForegroundColor $Success
        Remove-Item -Path $Path -Recurse -Force -ErrorAction SilentlyContinue
        if ($?) {
            Write-Host "    └─ Success" -ForegroundColor $Success
            return $true
        } else {
            Write-Host "    └─ Failed - trying alternate method..." -ForegroundColor $Warning
            cmd /c "rmdir /s /q `"$Path`"" 2>$null
            if ($?) {
                Write-Host "    └─ Success (CMD)" -ForegroundColor $Success
                return $true
            }
        }
    }
    return $false
}

# Function to safely delete files
function Remove-FileIfExists {
    param([string]$Path)
    if (Test-Path $Path) {
        Write-Host "  ✓ Deleting: $Path" -ForegroundColor $Success
        Remove-Item -Path $Path -Force -ErrorAction SilentlyContinue
        if ($?) {
            Write-Host "    └─ Success" -ForegroundColor $Success
            return $true
        }
    }
    return $false
}

# Check current directory
if (-not (Test-Path ".\package.json")) {
    Write-Host "ERROR: package.json not found!" -ForegroundColor $Error
    Write-Host "Please run this script from the project root directory:" -ForegroundColor $Warning
    Write-Host "  cd C:\Users\mbanw\carifive_workspace\01.Projects\08.waylo" -ForegroundColor $Info
    exit 1
}

Write-Host "✓ Current directory is correct: $(Get-Location)" -ForegroundColor $Success
Write-Host ""

# Task 1: Delete App Routes
Write-Host "Task 1: Deleting old app routes (admin, customer, operator)..." -ForegroundColor $Info
Remove-DirectoryIfExists "app/(admin)"
Remove-DirectoryIfExists "app/(customer)"
Remove-DirectoryIfExists "app/(operator)"
Remove-FileIfExists "app/actions.ts"
$tasksCompleted++
Write-Host "  ✓ App routes deleted ($tasksCompleted/$totalTasks)" -ForegroundColor $Success
Write-Host ""

# Task 2: Delete Library Files
Write-Host "Task 2: Deleting old library files (stripe, email, auth, supabase)..." -ForegroundColor $Info
Remove-FileIfExists "lib/stripe.ts"
Remove-FileIfExists "lib/email.ts"
Remove-DirectoryIfExists "lib/auth"
Remove-DirectoryIfExists "lib/supabase"
Remove-FileIfExists "lib/tickets.ts"
Remove-FileIfExists "lib/savings.ts"
$tasksCompleted++
Write-Host "  ✓ Library files deleted ($tasksCompleted/$totalTasks)" -ForegroundColor $Success
Write-Host ""

# Task 3: Delete Middleware
Write-Host "Task 3: Deleting old middleware..." -ForegroundColor $Info
Remove-FileIfExists "middleware.ts"
$tasksCompleted++
Write-Host "  ✓ Middleware deleted ($tasksCompleted/$totalTasks)" -ForegroundColor $Success
Write-Host ""

# Task 4: Delete Old Assets
Write-Host "Task 4: Deleting old Waylo branding assets..." -ForegroundColor $Info
Remove-DirectoryIfExists "public/waylo"
$tasksCompleted++
Write-Host "  ✓ Old assets deleted ($tasksCompleted/$totalTasks)" -ForegroundColor $Success
Write-Host ""

# Task 5: Delete Old Migrations
Write-Host "Task 5: Deleting old database migrations..." -ForegroundColor $Info
$migrationDirs = Get-ChildItem "prisma/migrations" -Directory | Where-Object { $_.Name -like "2026*" }
if ($migrationDirs) {
    foreach ($dir in $migrationDirs) {
        Write-Host "  ✓ Deleting: prisma/migrations/$($dir.Name)" -ForegroundColor $Success
        Remove-Item -Path "prisma/migrations/$($dir.Name)" -Recurse -Force -ErrorAction SilentlyContinue
    }
} else {
    Write-Host "  ℹ No old migrations found to delete" -ForegroundColor $Info
}
$tasksCompleted++
Write-Host "  ✓ Old migrations deleted ($tasksCompleted/$totalTasks)" -ForegroundColor $Success
Write-Host ""

# Summary of deletions
Write-Host "===============================================" -ForegroundColor $Success
Write-Host "  File Deletion Complete! ($tasksCompleted/$totalTasks)" -ForegroundColor $Success
Write-Host "===============================================" -ForegroundColor $Success
Write-Host ""

# Task 6: Verify git status
Write-Host "Task 6: Checking git status..." -ForegroundColor $Info
Write-Host ""
git status --short | Select-Object -First 20
Write-Host ""
$deletedCount = (git status --short | Where-Object { $_ -match '^ D ' }).Count
Write-Host "  ✓ Git shows ~$deletedCount files staged for deletion" -ForegroundColor $Success
Write-Host ""

# Next steps
Write-Host "===============================================" -ForegroundColor $Cyan
Write-Host "  Next Steps" -ForegroundColor $Cyan
Write-Host "===============================================" -ForegroundColor $Cyan
Write-Host ""
Write-Host "1. Reset the database:" -ForegroundColor $Info
Write-Host "   npx prisma migrate reset --force" -ForegroundColor $Warning
Write-Host ""
Write-Host "2. Install dependencies:" -ForegroundColor $Info
Write-Host "   npm install" -ForegroundColor $Warning
Write-Host ""
Write-Host "3. Start development server:" -ForegroundColor $Info
Write-Host "   npm run dev" -ForegroundColor $Warning
Write-Host ""
Write-Host "4. Test in browser:" -ForegroundColor $Info
Write-Host "   ✓ http://localhost:3000 (should load)" -ForegroundColor $Success
Write-Host "   ✓ http://localhost:3000/ports (should load)" -ForegroundColor $Success
Write-Host "   ✓ http://localhost:3000/customer (should be 404)" -ForegroundColor $Success
Write-Host ""
Write-Host "5. Commit and push to GitHub:" -ForegroundColor $Info
Write-Host "   git add -A" -ForegroundColor $Warning
Write-Host "   git commit -m `"refactor: remove legacy Waylo shuttle code`"" -ForegroundColor $Warning
Write-Host "   git push origin cleanup/remove-old-shuttleflow-waylo" -ForegroundColor $Warning
Write-Host ""
Write-Host "6. Create pull request on GitHub" -ForegroundColor $Info
Write-Host ""
Write-Host "✓ Cleanup script complete!" -ForegroundColor $Success
