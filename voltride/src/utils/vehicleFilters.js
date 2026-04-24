export function filterAndSortVehicles(vehicles, options) {
  const { searchQuery, typeFilter, maxRange, sortMode } = options;
  let results = [...vehicles];

  const q = searchQuery.trim().toLowerCase();
  if (q) {
    results = results.filter(
      (v) =>
        v.name.toLowerCase().includes(q) ||
        v.type.toLowerCase().includes(q),
    );
  }

  if (typeFilter !== "all") {
    results = results.filter((v) => v.type === typeFilter);
  }

  if (maxRange < 500) {
    results = results.filter((v) => v.range <= maxRange);
  }

  if (sortMode === "price_asc") {
    results.sort((a, b) => a.pricePerHour - b.pricePerHour);
  } else if (sortMode === "price_desc") {
    results.sort((a, b) => b.pricePerHour - a.pricePerHour);
  } else if (sortMode === "rating") {
    results.sort((a, b) => b.rating - a.rating);
  } else if (sortMode === "range") {
    results.sort((a, b) => b.range - a.range);
  } else {
    results.sort((a, b) => a.id - b.id);
  }

  return results;
}
