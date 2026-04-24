/** Shared text search: multi-word AND, case-insensitive, extra fields for fleet + hubs. */

export function searchTokens(query) {
  return query
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);
}

export function vehicleMatchesQuery(vehicle, query) {
  const tokens = searchTokens(query);
  if (tokens.length === 0) return true;
  const v = vehicle;
  const blob = [
    v.name,
    v.type,
    v.badgeText,
    ...(v.features || []),
    String(v.pricePerHour),
    String(v.range),
    String(v.battery),
    String(v.seats),
    String(v.rating),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  return tokens.every((t) => blob.includes(t));
}

export function stationMatchesQuery(station, query) {
  const tokens = searchTokens(query);
  if (tokens.length === 0) return true;
  const s = station;
  const statusWords = {
    available: "available open",
    busy: "busy occupied",
    unavailable: "unavailable offline closed",
  };
  const blob = [
    s.name,
    s.address,
    s.power,
    s.price,
    ...s.types,
    statusWords[s.status] || s.status,
    String(s.ports),
    String(s.available),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  return tokens.every((t) => blob.includes(t));
}
