/**
 * @returns {{ hours: number, subtotal: number, tax: number, grandTotal: number } | null}
 */
export function computeBookingCost(pricePerHour, startTime, endTime) {
  if (!startTime || !endTime) return null;
  const [sh, sm] = startTime.split(":").map(Number);
  const [eh, em] = endTime.split(":").map(Number);
  const startMins = sh * 60 + sm;
  const endMins = eh * 60 + em;
  const diffMins = endMins - startMins;
  if (diffMins <= 0) return null;

  const hours = diffMins / 60;
  const subtotal = Math.round(hours * pricePerHour);
  const tax = Math.round(subtotal * 0.18);
  const grandTotal = subtotal + tax;
  return { hours, subtotal, tax, grandTotal };
}
