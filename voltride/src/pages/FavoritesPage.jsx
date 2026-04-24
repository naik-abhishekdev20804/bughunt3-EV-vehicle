import { useMemo, useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { VehicleCard } from "../components/VehicleCard";
import { allVehicles } from "../data/vehicles";
import { allStations } from "../data/stations";
import { USER_LAT, USER_LNG } from "../data/constants";
import { calculateDistance } from "../utils/distance";
import { searchVehicles, searchStations } from "../utils/favoritesSearch";
import { useAppState } from "../context/useAppState.js";

export function FavoritesPage() {
  const {
    favorites,
    handleFavHeartClick,
    openBooking,
    clearFavorites,
  } = useAppState();

  const [bottomQuery, setBottomQuery] = useState("");

  const saved = useMemo(() => {
    const set = new Set(favorites);
    return allVehicles.filter((v) => set.has(v.id));
  }, [favorites]);

  const vehicleHits = useMemo(
    () => searchVehicles(allVehicles, bottomQuery),
    [bottomQuery],
  );

  const stationHits = useMemo(
    () => searchStations(allStations, bottomQuery),
    [bottomQuery],
  );

  const getDistance = useCallback((entity) => {
    return calculateDistance(
      USER_LAT,
      USER_LNG,
      entity.location.lat,
      entity.location.lng,
    );
  }, []);

  return (
    <div className="page page-favorites">
      <div className="page-inner">
        <header className="page-header">
          <div>
            <p className="page-kicker">Your garage</p>
            <h1 className="page-title">Saved rides</h1>
            <p className="page-lead">
              Vehicles you marked with ♥. Book in one tap or remove anytime.
            </p>
          </div>
          <div className="page-header-actions">
            <Link to="/" className="btn-outline">
              ← Back to home
            </Link>
            <Link to="/#vehicles" className="btn-secondary">
              Browse fleet
            </Link>
            {saved.length > 0 ? (
              <button
                type="button"
                className="btn-danger-outline"
                onClick={() => clearFavorites()}
              >
                Clear all
              </button>
            ) : null}
          </div>
        </header>

        {saved.length === 0 ? (
          <div className="empty-favorites">
            <div className="empty-favorites-icon" aria-hidden>
              ♥
            </div>
            <h2>No saved rides yet</h2>
            <p>
              Explore the fleet on the home page and tap the heart on any card to
              save it here.
            </p>
            <div className="empty-favorites-actions">
              <Link to="/" className="search-btn">
                Go to home
              </Link>
              <Link to="/charging" className="btn-outline">
                View charging hubs
              </Link>
            </div>
          </div>
        ) : (
          <div className="vehicles-grid favorites-grid">
            {saved.map((v) => (
              <VehicleCard
                key={v.id}
                vehicle={v}
                distanceKm={getDistance(v)}
                isFavorite
                onToggleFavorite={handleFavHeartClick}
                onBook={openBooking}
              />
            ))}
          </div>
        )}

        <section className="favorites-search-section" aria-labelledby="fav-search-title">
          <h2 id="fav-search-title" className="favorites-search-title">
            Search vehicles &amp; charging stations
          </h2>
          <p className="favorites-search-hint">
            Matches across the full fleet and all hubs (not only saved rides).
          </p>
          <div className="favorites-search-bar">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden>
              <circle cx="11" cy="11" r="8" strokeWidth="2" />
              <path d="m21 21-4.35-4.35" strokeWidth="2" />
            </svg>
            <input
              type="search"
              className="favorites-search-input"
              placeholder="e.g. Nexon, scooter, CCS2, Koramangala…"
              value={bottomQuery}
              onChange={(e) => setBottomQuery(e.target.value)}
              autoComplete="off"
              aria-label="Search vehicles and stations"
            />
          </div>

          {bottomQuery.trim() ? (
            <div className="favorites-search-results">
              <div className="favorites-search-col">
                <h3 className="favorites-search-col-title">Vehicles</h3>
                {vehicleHits.length === 0 ? (
                  <p className="favorites-search-empty">No vehicle matches.</p>
                ) : (
                  <ul className="favorites-hit-list">
                    {vehicleHits.map((v) => (
                      <li key={v.id} className="favorites-hit-row">
                        <div>
                          <Link to="/#vehicles" className="favorites-hit-name">
                            {v.name}
                          </Link>
                          <span className="favorites-hit-meta">
                            {v.type} · {v.range} km
                          </span>
                        </div>
                        <span className="favorites-hit-price">₹{v.pricePerHour}/hr</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="favorites-search-col">
                <h3 className="favorites-search-col-title">Charging stations</h3>
                {stationHits.length === 0 ? (
                  <p className="favorites-search-empty">No station matches.</p>
                ) : (
                  <ul className="favorites-hit-list">
                    {stationHits.map((s) => (
                      <li key={s.id} className="favorites-hit-row">
                        <div>
                          <Link to="/charging" className="favorites-hit-name">
                            {s.name}
                          </Link>
                          <span className="favorites-hit-meta">{s.address}</span>
                        </div>
                        <span className="favorites-hit-price">{s.power}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ) : null}
        </section>
      </div>
    </div>
  );
}
