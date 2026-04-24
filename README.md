# VoltRide

EV ride-sharing demo (React + Vite + React Router). The app lives at the **repository root** (`package.json` here).

## Run

```bash
npm install
npm run dev
```

`npm run build` · `npm run preview`

## Deploy on Vercel

1. Import this repo.
2. **Root Directory:** leave empty (`.`). Do **not** point at a `voltride` subfolder unless that folder exists in your fork.
3. **Build Command:** `npm run build` (default).
4. **Output Directory:** `dist` (default for Vite).
5. Keep **`vercel.json`** in the repo: it rewrites non-file routes to `index.html` so `/favorites` etc. work on refresh.

If you still see 404, open the deployment **Build Logs** and confirm `dist/index.html` exists after the build.

**Repo layout:** This project expects `package.json` at the **Git root**. If you still have an old `voltride/` folder in Git, remove it (`git rm -rf voltride`) so Vercel does not use the wrong directory.

## Routes

`/`, `/favorites`, `/charging`, `/about`, `/help`

## Bugs (intentional — six)

**bug 1:** Max range filter keeps the wrong vehicles (uses `>=` instead of `<=`).

**bug 2:** Booking subtotal should be `price/hr × hours` but it uses `price/hr × 1.5` instead (ignores duration).

**bug 3:** Today’s date is shown on the home page, but the booking form still accepts a start date **before** today and shows a normal total (it should block or warn).

**bug 4:** “Top rated” sort should order by rating high → low, but the list is **shuffled randomly**.

**bug 5:** Help chat lists many questions, but the **reply is the answer to a different question** in the list (misplaced).

**bug 6: **search bar is missing on the home page and its in saved rides section** 

Everything else in the app should behave normally.

## License

Demo only.
