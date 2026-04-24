import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { Hero } from "../components/Hero";
import { MapSection } from "../components/MapSection";
import { VehiclesPanel } from "../components/VehiclesPanel";
import { ChargingPanel } from "../components/ChargingPanel";
import { allVehicles } from "../data/vehicles";
import { allStations } from "../data/stations";
import { USER_LAT, USER_LNG } from "../data/constants";
import { calculateDistance } from "../utils/distance";
import { filterAndSortVehicles } from "../utils/vehicleFilters";
import { filterStations } from "../utils/stationFilters";
import { useAppState } from "../context/useAppState.js";

export function HomePage() {
  const location = useLocation();
  const {
    favorites,
    handleFavHeartClick,
    openBooking,
    pushToast,
  } = useAppState();

  const [searchInput, setSearchInput] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [maxRange, setMaxRange] = useState(500);
  const [sortMode, setSortMode] = useState("default");
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);

  const filteredVehicles = useMemo(
    () =>
      filterAndSortVehicles(allVehicles, {
        searchQuery: searchInput,
        typeFilter,
        maxRange,
        sortMode,
      }),
    [searchInput, typeFilter, maxRange, sortMode],
  );

  const visibleStations = useMemo(
    () => filterStations(allStations, showAvailableOnly),
    [showAvailableOnly],
  );

  const getDistance = useCallback((entity) => {
    return calculateDistance(
      USER_LAT,
      USER_LNG,
      entity.location.lat,
      entity.location.lng,
    );
  }, []);

  const handleSearchSubmit = useCallback(() => {
    const q = searchInput.trim();
    if (!q) pushToast("Showing all nearby EVs", "info");
    else pushToast(`Searching for “${q}”…`, "info");
  }, [searchInput, pushToast]);

  useEffect(() => {
    if (location.hash === "#vehicles") {
      requestAnimationFrame(() =>
        document.getElementById("vehicles")?.scrollIntoView({ behavior: "smooth" }),
      );
    }
  }, [location]);

  return (
    <>
      <Hero
        searchInput={searchInput}
        onSearchInput={setSearchInput}
        onSearchSubmit={handleSearchSubmit}
        favoritesCount={favorites.length}
      />
      <MapSection />
      <div className="section-line">
        <hr />
      </div>
      <VehiclesPanel
        vehicles={filteredVehicles}
        getDistance={getDistance}
        favorites={favorites}
        favoritesCount={favorites.length}
        onToggleFavorite={handleFavHeartClick}
        onBook={openBooking}
        typeFilter={typeFilter}
        onTypeFilter={setTypeFilter}
        maxRange={maxRange}
        onMaxRange={setMaxRange}
        sortMode={sortMode}
        onSortMode={setSortMode}
      />
      <div className="section-line">
        <hr />
      </div>
      <ChargingPanel
        stations={visibleStations}
        showAvailableOnly={showAvailableOnly}
        onToggleAvailable={() => setShowAvailableOnly((x) => !x)}
        getDistance={getDistance}
        showViewAllButton
      />
      <div className="section-line">
        <hr />
      </div>
    </>
  );
}
