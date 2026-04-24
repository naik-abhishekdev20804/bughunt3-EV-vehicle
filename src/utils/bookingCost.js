/**
 * @returns {{ hours: number, subtotal: number, tax: number, grandTotal: number, bookDateInvalid?: boolean } | null}
 */
export function computeBookingCost(
  pricePerHour,
  startTime,
  endTime,
  bookDate,
) {
  if (!startTime || !endTime) return null;
  const [sh, sm] = startTime.split(":").map(Number);
  const [eh, em] = endTime.split(":").map(Number);
  const startMins = sh * 60 + sm;
  const endMins = eh * 60 + em;
  let diffMins = endMins - startMins;
  // No same-day-only cap: if end is earlier on the clock, treat as next day (any length up to 24h span)
  if (diffMins <= 0) {
    diffMins += 24 * 60;
  }

  const hours = diffMins / 60;

  const today = new Date().toISOString().split("T")[0];
  const bookDateInvalid = Boolean(bookDate && bookDate < today);

  // bug 2: should be hours * pricePerHour; wrongly uses pricePerHour * 1.5 (ignores duration)
  const subtotal = Math.round(pricePerHour * 1.5);

  const tax = Math.round(subtotal * 0.18);
  const grandTotal = subtotal + tax;

  // bug 3: still returns a price when start date is before today (should refuse / show error)
  return { hours, subtotal, tax, grandTotal, bookDateInvalid };
}
