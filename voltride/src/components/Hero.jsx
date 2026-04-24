import { Link } from "react-router-dom";

export function Hero({
  searchInput,
  onSearchInput,
  onSearchSubmit,
  favoritesCount = 0,
}) {
  return (
    <section className="hero" id="home">
      <div className="hero-label">
        <span className="hero-label-dot" aria-hidden />
        Live in Bengaluru · 48 EVs Available Now
      </div>
      <h1>
        Ride Electric.
        <br />
        <span className="grad">Travel Smarter.</span>
      </h1>
      <p className="hero-sub">
        Find, book and ride premium electric vehicles near you. Zero emissions,
        zero hassle. Unlock the future of urban mobility.
      </p>
      <div className="hero-cta-row">
        <Link to="/favorites" className="btn-hero-secondary">
          Saved rides{favoritesCount > 0 ? ` · ${favoritesCount}` : ""}
        </Link>
        <Link to="/charging" className="btn-hero-outline">
          Charging map
        </Link>
        <Link to="/help" className="btn-hero-ghost">
          How it works
        </Link>
        <button
          type="button"
          className="btn-hero-ghost"
          onClick={() =>
            document.getElementById("vehicles")?.scrollIntoView({
              behavior: "smooth",
            })
          }
        >
          Browse fleet ↓
        </button>
      </div>
      <div className="hero-stats">
        <div>
          <div className="hero-stat-num">48+</div>
          <div className="hero-stat-label">EVs Available</div>
        </div>
        <div>
          <div className="hero-stat-num">12</div>
          <div className="hero-stat-label">Charging Hubs</div>
        </div>
        <div>
          <div className="hero-stat-num">4.8★</div>
          <div className="hero-stat-label">Avg Rating</div>
        </div>
        <div>
          <div className="hero-stat-num">2.4K</div>
          <div className="hero-stat-label">Happy Riders</div>
        </div>
      </div>
      <div className="search-wrap">
        <div className="search-field search-field-wide">
          <svg viewBox="0 0 24 24" fill="none" aria-hidden>
            <circle cx="11" cy="11" r="8" strokeWidth="2" />
            <path d="m21 21-4.35-4.35" strokeWidth="2" />
          </svg>
          <input
            id="searchInput"
            type="search"
            placeholder="Search by vehicle name or type..."
            value={searchInput}
            onChange={(e) => onSearchInput(e.target.value)}
            autoComplete="off"
          />
        </div>
        <div className="search-divider" aria-hidden />
        <div className="search-field">
          <svg viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
              strokeWidth="2"
            />
            <circle cx="12" cy="10" r="3" strokeWidth="2" />
          </svg>
          <input
            type="text"
            value="Koramangala, Bengaluru"
            readOnly
            className="readonly-loc"
            aria-label="Pickup location"
          />
        </div>
        <button type="button" className="search-btn" onClick={onSearchSubmit}>
          Find EVs
        </button>
      </div>
    </section>
  );
}
