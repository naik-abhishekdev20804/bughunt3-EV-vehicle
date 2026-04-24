export function filterStations(stations, showAvailableOnly) {
  if (!showAvailableOnly) return [...stations];
  return stations.filter((s) => s.status === "available");
}
