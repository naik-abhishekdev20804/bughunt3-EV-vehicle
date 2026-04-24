import { vehicleMatchesQuery } from "./searchMatch.js";

function shuffleInPlace(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function filterAndSortVehicles(vehicles, options) {
  const { searchQuery, typeFilter, maxRange, sortMode } = options;
  let results = [...vehicles];

  if (searchQuery.trim()) {
    results = results.filter((v) => vehicleMatchesQuery(v, searchQuery));
  }

  if (typeFilter !== "all") {
    results = results.filter((v) => v.type === typeFilter);
  }

  // bug 1: should be v.range <= maxRange; wrongly uses >=
  if (maxRange < 500) {
    results = results.filter((v) => v.range >= maxRange);
  }

  if (sortMode === "price_asc") {
    results.sort((a, b) => a.pricePerHour - b.pricePerHour);
  } else if (sortMode === "price_desc") {
    results.sort((a, b) => b.pricePerHour - a.pricePerHour);
  } else if (sortMode === "rating") {
    // bug 4: should sort high rating first; wrongly randomizes order
    shuffleInPlace(results);
  } else if (sortMode === "range") {
    results.sort((a, b) => b.range - a.range);
  } else {
    results.sort((a, b) => a.id - b.id);
  }

  return results;
}
