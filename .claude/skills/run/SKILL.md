---
description: Start the TBF.COM dev server and open it in Chrome
---

# run

Project root: `/Users/factory/0. TBF | CODE SYSTEM STARTUP/1. TBF.COM/frontend`

## Steps

1. Check if the dev server is already running on port 3000:
   ```bash
   lsof -ti:3000
   ```
   If a PID is returned, the server is already up, skip to step 3.

2. Start the dev server in the background:
   ```bash
   cd "/Users/factory/0. TBF | CODE SYSTEM STARTUP/1. TBF.COM/frontend"
   npm run dev > /tmp/tbf-dev.log 2>&1 &
   ```
   Wait ~4 seconds, then confirm it's ready:
   ```bash
   grep -E "ready|localhost|error" /tmp/tbf-dev.log | head -5
   ```

3. Open in Chrome:
   ```bash
   open -a "Google Chrome" "http://localhost:3000"
   ```

4. Report the URL and confirm the server is running.

## Notes

- Port is always 3000 (Next.js default, no `.env.local` override)
- `.env.local` is required for Sanity and Resend, it's gitignored and should already exist locally
- If port 3000 is in use by another process, kill it first: `kill $(lsof -ti:3000)`
