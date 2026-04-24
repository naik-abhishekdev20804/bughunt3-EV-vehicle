import { Link } from "react-router-dom";
import { VehicleCard } from "./VehicleCard";

export function VehiclesPanel({
  vehicles,
  getDistance,
  favorites,
  onToggleFavorite,
  onBook,
  typeFilter,
  onTypeFilter,
  maxRange,
  onMaxRange,
  sortMode,
  onSortMode,
  favoritesCount = 0,
}) {
  return (
    <section className="section vehicles-section" id="vehicles">
      <div className="section-header">
        <div>
          <h2 className="section-title">
            Nearby <span>Electric Vehicles</span>
          </h2>
          <p className="section-sub">Available for instant rental in your area</p>
        </div>
        <div className="section-header-links">
          <Link to="/favorites" className="view-all view-all-muted">
            Saved rides{favoritesCount > 0 ? ` (${favoritesCount})` : ""}{" "}
            <svg viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                strokeWidth="2"
              />
            </svg>
          </Link>
          <button
            type="button"
            className="view-all"
            onClick={() =>
              document.getElementById("vehicles")?.scrollIntoView({
                behavior: "smooth",
              })
            }
          >
            Jump to grid{" "}
            <svg viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="m9 18 6-6-6-6"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="filter-bar">
        <div className="filter-group">
          <span className="filter-label">Type</span>
          {[
            { key: "all", label: "All" },
            { key: "car", label: "🚗 Cars" },
            { key: "scooter", label: "🛵 Scooters" },
          ].map(({ key, label }) => (
            <button
              key={key}
              type="button"
              className={`type-chip${typeFilter === key ? " active" : ""}`}
              onClick={() => onTypeFilter(key)}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="filter-sep" aria-hidden />
        <div className="filter-group range-wrap">
          <span className="filter-label">Max range</span>
          <input
            type="range"
            className="range-slider"
            min={100}
            max={500}
            step={10}
            value={maxRange}
            onChange={(e) => onMaxRange(Number(e.target.value))}
            aria-valuemin={100}
            aria-valuemax={500}
            aria-valuenow={maxRange}
            aria-label="Maximum vehicle range"
          />
          <span className="range-val">{maxRange} km</span>
        </div>
        <div className="filter-sep" aria-hidden />
        <div className="filter-group">
          <span className="filter-label">Sort</span>
          <select
            className="sort-sel"
            value={sortMode}
            onChange={(e) => onSortMode(e.target.value)}
            aria-label="Sort vehicles"
          >
            <option value="default">Default</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
            <option value="range">Most Range</option>
          </select>
        </div>
        <span className="results-count" aria-live="polite">
          {vehicles.length} vehicle{vehicles.length !== 1 ? "s" : ""} found
        </span>
      </div>

      <div className="vehicles-grid">
        {vehicles.length === 0 ? (
          <div className="no-results">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden>
              <circle cx="11" cy="11" r="8" strokeWidth="1.5" />
              <path d="m21 21-4.35-4.35" strokeWidth="1.5" />
            </svg>
            <h3>No vehicles found</h3>
            <p>Try adjusting your filters or search term</p>
          </div>
        ) : (
          vehicles.map((v) => (
            <VehicleCard
              key={v.id}
              vehicle={v}
              distanceKm={getDistance(v)}
              isFavorite={favorites.includes(v.id)}
              onToggleFavorite={onToggleFavorite}
              onBook={onBook}
            />
          ))
        )}
      </div>
    </section>
  );
}
