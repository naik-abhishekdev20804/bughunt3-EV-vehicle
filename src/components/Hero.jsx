import { Link } from "react-router-dom";

function formatToday() {
  return new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function Hero({ favoritesCount = 0, stats }) {
  const {
    availableEv,
    hubs,
    avgRating,
    happyRiders,
  } = stats;

  return (
    <section className="hero" id="home">
      <p className="hero-today" aria-live="polite">
        Today · {formatToday()}
      </p>
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
          <div className="hero-stat-num">{availableEv}</div>
          <div className="hero-stat-label">EVs available</div>
        </div>
        <div>
          <div className="hero-stat-num">{hubs}</div>
          <div className="hero-stat-label">Charging hubs</div>
        </div>
        <div>
          <div className="hero-stat-num">{avgRating}★</div>
          <div className="hero-stat-label">Avg rating</div>
        </div>
        <div>
          <div className="hero-stat-num">
            {happyRiders >= 1000
              ? `${(happyRiders / 1000).toFixed(1).replace(/\.0$/, "")}K`
              : happyRiders}
          </div>
          <div className="hero-stat-label">Total reviews</div>
        </div>
      </div>
    </section>
  );
}
