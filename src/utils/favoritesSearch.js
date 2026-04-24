import {
  searchTokens,
  vehicleMatchesQuery,
  stationMatchesQuery,
} from "./searchMatch.js";

export function searchVehicles(vehicles, query) {
  if (searchTokens(query).length === 0) return [];
  return vehicles.filter((v) => vehicleMatchesQuery(v, query));
}

export function searchStations(stations, query) {
  if (searchTokens(query).length === 0) return [];
  return stations.filter((s) => stationMatchesQuery(s, query));
}
