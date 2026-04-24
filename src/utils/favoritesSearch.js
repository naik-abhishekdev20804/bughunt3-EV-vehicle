/** bug 6: unified search for vehicles + charging stations (correct matching). */

export function searchVehicles(vehicles, query) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return vehicles.filter(
    (v) =>
      v.name.toLowerCase().includes(q) ||
      v.type.toLowerCase().includes(q) ||
      (v.features && v.features.some((f) => f.toLowerCase().includes(q))),
  );
}

export function searchStations(stations, query) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return stations.filter(
    (s) =>
      s.name.toLowerCase().includes(q) ||
      s.address.toLowerCase().includes(q) ||
      s.power.toLowerCase().includes(q) ||
      s.types.some((t) => t.toLowerCase().includes(q)),
  );
}
