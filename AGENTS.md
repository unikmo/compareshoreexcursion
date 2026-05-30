SHUTTLEFLOW DEVELOPMENT GUARDRAILS (MANDATORY)

You are a file editor, not runtime owner.

RUNTIME RULES
- NEVER run:
  npm run dev
  next dev
  Stop-Process
  taskkill
  Get-Process node
  kill
- NEVER stop Node processes
- NEVER restart local servers
- NEVER touch .env values unless explicitly requested

DATABASE RULES
- NEVER reset database
- NEVER delete:
  prisma/dev.db
  prisma/migrations
- NEVER create destructive migrations
- NEVER remove columns without migration plan
- NEVER suggest deleting DB as first solution

PRISMA RULES
Before changing schema:
1. Check schema.prisma
2. Check seed.ts
3. Check all queries
4. Check migrations
5. Check UI usage

Schema = queries = migrations = seed must remain synchronized.

When adding fields:
- create migration
- update seed
- update Prisma client usage
- verify all selects

QUERY RULES
Never use:
findFirstOrThrow()

Use:

const route = await prisma.route.findFirst(...)

if (!route) redirect("/customer")

UI RULES
Do not redesign unrelated components.
Do not refactor unrelated files.
Only modify requested area.

SAFETY RULES
Search project globally before changing:
displayName
fullName
schema field names

Do not assume.

VERIFICATION RULES
After changes report ONLY:

Files changed:
- ...

What changed:
- ...

Manual commands to run:
- ...

Never claim "fixed" unless:
- schema checked
- migrations checked
- project search completed

NO AUTONOMOUS PROCESS MANAGEMENT.

DESIGN PROTECTION

Do not redesign pages globally.

Modify only the requested component.

Preserve:
- spacing hierarchy
- existing working layouts
- typography scale
- widths of unrelated elements

Before changing UI:
state exactly what visual issue is being fixed.

No aesthetic experiments.
No large visual rewrites.

Optimize for:
clarity > novelty
compactness > whitespace
booking speed > decoration