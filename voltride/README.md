# VoltRide

EV ride-sharing demo (React + Vite + React Router). Bengaluru-themed UI with fleet search, favorites, charging stations, and a booking modal.

## Run

```bash
cd voltride
npm install
npm run dev
```

Build: `npm run build` · Preview: `npm run preview`

## Routes

- `/` — Home  
- `/favorites` — Saved rides  
- `/charging` — Charging network  
- `/about` — About  
- `/help` — Help  

## Bugs (old HTML prototype)

These were in the first single-file version. **This React app fixes all of them.**

**bug 1** — Max range filter kept the wrong vehicles (used `>=` instead of `<=`).

**bug 2** — Sort by price used string order, not numeric.

**bug 3** — “Available only” for stations showed the wrong rows (inverted condition).

**bug 4** — Grand total forgot to add GST (only subtotal).

**bug 5** — Removing a favorite used `splice(idx + 1, 1)` and deleted the wrong id.

**bug 6** — Clearing search returned early and left the old list on screen.

**bug 7** — Distance was too short (haversine missing the `2 *` before `atan2`).

**bug 8** — (idea only) Multi-day booking if end time is “before” start time.

**bug 9** — (idea only) Wrong `useEffect` deps → stale UI.

**bug 10** — (idea only) Parsing prices with `₹`/commas breaks numbers.

**bug 11** — (idea only) Sorting mutates the original vehicle array.

**bug 12** — (idea only) Modal focus not returned to the button that opened it.

**bug 13** — (idea only) No image `onError` fallback.

**bug 14** — (idea only) Async filter race overwrites newer results.

Bugs 8–14 are just ideas for practice; they are **not** in this repo.

## License

Demo only. VoltRide is a fake brand for the sample.
