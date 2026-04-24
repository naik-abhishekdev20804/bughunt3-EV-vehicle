# VoltRide — EV ride sharing (React)

Light, colorful marketing and booking UI for an electric-vehicle fleet in Bengaluru. Built with **Vite**, **React**, and **React Router**. Shared UI state (favorites, booking modal, toasts) lives in `src/context/`; business logic in `src/utils/` and `src/data/`; pages in `src/pages/`.

## Run locally

```bash
cd voltride
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

```bash
npm run build   # production bundle
npm run preview # serve dist
```

## Routes

| Path | Page |
|------|------|
| `/` | Home — hero, map, vehicle filters, charging teaser |
| `/favorites` | Saved rides — vehicles you marked with ♥ |
| `/charging` | Full charging network view + filters |
| `/about` | About / company (demo copy + CTAs) |
| `/help` | Help center + FAQ |
| `*` | 404 |

The **nav heart** and **Saved** link go to `/favorites`. Adding or removing favorites on home updates the list on that page instantly.

## Project layout

| Path | Purpose |
|------|---------|
| `src/context/AppStateProvider.jsx` | Favorites, booking modal, toasts |
| `src/context/useAppState.js` | Hook to read/update app state |
| `src/components/AppShell.jsx` | Layout: nav, outlet, footer, modal, toasts |
| `src/pages/*` | Route screens |
| `src/data/vehicles.js` | Fleet records + Unsplash image URLs |
| `src/data/stations.js` | Charging locations + imagery |
| `src/data/constants.js` | Reference coordinates (user “pin”) |
| `src/utils/distance.js` | Haversine distance (km) |
| `src/utils/vehicleFilters.js` | Search, type, max-range, sort |
| `src/utils/stationFilters.js` | “Available only” filter |
| `src/utils/bookingCost.js` | Duration, subtotal, GST, grand total |

---

## Complete bug catalog

### Part A — Original HTML prototype bugs (7) — **fixed in this codebase**

These existed in the first single-file HTML demo. This React app implements the **correct** behavior.

| ID | Severity | Area | What was wrong | Correct behavior |
|----|----------|------|----------------|------------------|
| A1 | Medium | Max range filter | Used `range >= maxRange` when the max-range slider was under 500 km | Keep vehicles with **`range <= maxRange`**. |
| A2 | Medium | Sort by price | `String.localeCompare` on hourly rates | **Numeric** sort: `a.pricePerHour - b.pricePerHour`. |
| A3 | Medium | Charging filter | “Available only” used **`status !== 'available'`** | Filter **`status === 'available'`**. |
| A4 | Medium | Booking modal | GST shown but **grand total = subtotal only** | **Grand total = subtotal + tax**. |
| A5 | Hard | Favorites | **`splice(idx + 1, 1)`** removed wrong item | **`splice(idx, 1)`** or immutable **`filter`**. |
| A6 | Hard | Search input | **Early return on empty** query, list never reset | Clearing search **updates query** and **re-runs filters**. |
| A7 | Hard | Distance | Haversine: **`atan2`** without **`2 ×`** | **`c = 2 * atan2(sqrt(a), sqrt(1 - a))`**. |

### Part B — Suggested workshop / interview bugs (7) — **not implemented here**

Ideas for a **buggy branch** or take-home; do not expect these in `main`.

| ID | Theme | Idea |
|----|--------|------|
| B1 | Booking | Overnight / multi-day: end time before start time without adding 24h or using dates. |
| B2 | React | Wrong `useEffect` dependencies → stale favorites or filters after “API” updates. |
| B3 | Parsing | `parseInt` on localized prices (`₹`, commas) → `NaN` and blank UI. |
| B4 | Mutation | `results.sort` on shared array mutates source fleet data. |
| B5 | A11y | Modal does not trap focus or return focus to opener. |
| B6 | Media | No `onError` on remote images → broken layout. |
| B7 | Async | Race: out-of-order responses overwrite newer filter results. |

**Totals:** **7** legacy prototype bugs (fixed) + **7** suggested additions = **14** documented items.

---

## Assets

Vehicle and station photos use [Unsplash](https://unsplash.com/) URLs in the data files. Replace with your own CDN or local assets for production.

## License

Demo / educational use. VoltRide is a fictional brand name for this sample.
