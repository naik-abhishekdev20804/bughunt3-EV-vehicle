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
  } = useAppState();

  const [typeFilter, setTypeFilter] = useState("all");
  const [maxRange, setMaxRange] = useState(500);
  const [sortMode, setSortMode] = useState("default");
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);

  const heroStats = useMemo(() => {
    const availableEv = allVehicles.filter((v) => v.available).length;
    const hubs = allStations.length;
    const avgRating = (
      allVehicles.reduce((s, v) => s + v.rating, 0) / allVehicles.length
    ).toFixed(1);
    const happyRiders = allVehicles.reduce((s, v) => s + v.reviews, 0);
    return { availableEv, hubs, avgRating, happyRiders };
  }, []);

  const filteredVehicles = useMemo(
    () =>
      filterAndSortVehicles(allVehicles, {
        searchQuery: "",
        typeFilter,
        maxRange,
        sortMode,
      }),
    [typeFilter, maxRange, sortMode],
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
        favoritesCount={favorites.length}
        stats={heroStats}
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
