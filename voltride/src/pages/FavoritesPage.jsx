import { useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import { VehicleCard } from "../components/VehicleCard";
import { allVehicles } from "../data/vehicles";
import { USER_LAT, USER_LNG } from "../data/constants";
import { calculateDistance } from "../utils/distance";
import { useAppState } from "../context/useAppState.js";

export function FavoritesPage() {
  const {
    favorites,
    handleFavHeartClick,
    openBooking,
    clearFavorites,
    pushToast,
  } = useAppState();

  const saved = useMemo(() => {
    const set = new Set(favorites);
    return allVehicles.filter((v) => set.has(v.id));
  }, [favorites]);

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
                onClick={() => {
                  clearFavorites();
                }}
              >
                Clear all
              </button>
            ) : null}
            <button
              type="button"
              className="btn-login"
              onClick={() => pushToast("Sign-in flow is a demo — coming soon!", "info")}
            >
              Sign in to sync
            </button>
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
                Find EVs on home
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
      </div>
    </div>
  );
}
