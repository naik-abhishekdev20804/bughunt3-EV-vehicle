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

**If the Git repo root contains a `voltride` folder** (this project layout): commit the **`vercel.json` at the repository root** (next to `voltride/`). It runs `npm install` / `npm run build` inside `voltride` and publishes **`voltride/dist`**. Leave **Root Directory** empty (`.`).

**If you only pushed the contents of `voltride`** (so `package.json` is at the repo root): delete the parent `vercel.json` if you copied one by mistake, and use the **`vercel.json` inside this app folder** with **Output Directory** `dist`.

In both cases, do **not** set the build command to bare `vite build` — use **`npm run build`**. `vite` is in `dependencies` so CI always installs it.

Client routes (`/favorites`, etc.) need the **rewrite to `/index.html`** in `vercel.json`; without it, refresh or direct links can 404.

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
