---
description: Deploy TBF.COM — commit local changes and push to main (triggers Vercel auto-deploy)
---

# deploy

Project root: `/Users/factory/0. TBF | CODE SYSTEM STARTUP/1. TBF.COM/frontend`
Repo: `github.com/thebrfactory/TBF-WEB` — branch `main`
Vercel account: `thebrazilianfactory@gmail.com`

## Rules

- **Never push without explicit user approval** — always confirm before `git push`
- **Never use `git add .` or `git add -A`** — stage specific files only to avoid committing `.env.local` or binaries
- **Co-Authored-By is allowed** in this repo (unlike LP-TFD/Melfiore where it breaks Vercel Hobby)
- Pushing to `main` triggers Vercel deploy automatically — no manual action needed

## Steps

1. Check status and diff:
   ```bash
   cd "/Users/factory/0. TBF | CODE SYSTEM STARTUP/1. TBF.COM/frontend"
   git status
   git diff
   ```

2. Stage specific files:
   ```bash
   git add <file1> <file2> ...
   ```

3. Commit:
   ```bash
   git commit -m "$(cat <<'EOF'
   <type>: <short description>

   <bullet list of what changed>

   Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
   EOF
   )"
   ```

4. **Ask user for approval**, then push:
   ```bash
   git push origin main
   ```

5. Confirm push succeeded. Vercel will pick it up automatically — no CLI needed.

## Vercel dashboard (if deploy check needed)

- URL: vercel.com → login as `thebrazilianfactory@gmail.com`
- Project: `tbfweb`
- Domain: `thebrfactory.com`
