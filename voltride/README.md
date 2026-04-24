# VoltRide

EV ride-sharing demo (React + Vite + React Router).

## Run

```bash
cd voltride
npm install
npm run dev
```

`npm run build` · `npm run preview`

## Deploy on Vercel

1. Import the Git repo in Vercel.
2. If the app is not at the repo root, set **Root Directory** to the folder that contains `package.json` (e.g. `voltride`).
3. Leave **Build Command** as `npm run build` (or empty so Vercel uses `vercel.json`).
4. **Output Directory** should be `dist`.

`vite` is listed in `dependencies` so the build image always installs it. If the dashboard **Build Command** was set to `vite build`, change it to **`npm run build`**.

## Routes

`/`, `/favorites`, `/charging`, `/about`, `/help`

## Bugs (intentional — only these six)

**bug 1:** Max range filter keeps the wrong vehicles (uses `>=` instead of `<=`).

**bug 2:** Booking subtotal should be `price/hr × hours` but it uses `price/hr × 1.5` instead (ignores duration).

**bug 3:** Today’s date is shown on the home page, but the booking form still accepts a start date **before** today and shows a normal total (it should block or warn).

**bug 4:** “Top rated” sort should order by rating high → low, but the list is **shuffled randomly**.

**bug 5:** Help chat lists many questions, but the **reply is the answer to a different question** in the list (misplaced). It also shows **loading** and **“submitted / you got an answer”** at the same time.

**bug 6:** Home has **no** search bar. Search lives at the **bottom** of **Saved rides** and should match **vehicles** and **charging stations** correctly.

Everything else in the app should behave normally.

## License

Demo only.
