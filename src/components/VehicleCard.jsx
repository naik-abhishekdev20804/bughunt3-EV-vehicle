export function VehicleCard({
  vehicle,
  distanceKm,
  isFavorite,
  onToggleFavorite,
  onBook,
}) {
  const v = vehicle;
  const stars = "★".repeat(Math.floor(v.rating));

  return (
    <article
      className={`vehicle-card${v.available ? "" : " unavailable"}`}
      onClick={() => v.available && onBook(v.id)}
      onKeyDown={(e) => {
        if ((e.key === "Enter" || e.key === " ") && v.available) {
          e.preventDefault();
          onBook(v.id);
        }
      }}
      role={v.available ? "button" : undefined}
      tabIndex={v.available ? 0 : -1}
      aria-label={`${v.name}, ${distanceKm} km away`}
    >
      <div className="vc-img">
        <img
          className="vc-photo"
          src={v.image}
          alt=""
          loading="lazy"
          decoding="async"
        />
        <div className="vc-img-overlay" style={{ background: v.accent }} />
        {v.badge ? (
          <span className={`vc-badge ${v.badge}`}>{v.badgeText}</span>
        ) : null}
        {!v.available ? (
          <span className="vc-unavail">Unavailable</span>
        ) : null}
        <button
          type="button"
          className={`fav-heart${isFavorite ? " active" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(v.id);
          }}
          title={isFavorite ? "Remove favorite" : "Add favorite"}
          aria-pressed={isFavorite}
        >
          <svg viewBox="0 0 24 24" aria-hidden>
            <path
              d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
              strokeWidth="2"
            />
          </svg>
        </button>
      </div>
      <div className="vc-body">
        <h3 className="vc-name">{v.name}</h3>
        <div className="vc-rating">
          <span className="stars">{stars}</span>
          <span>
            {v.rating} · {v.reviews} reviews
          </span>
        </div>
        <div className="vc-features">
          {v.features.map((f) => (
            <span key={f} className="feat-tag">
              {f}
            </span>
          ))}
        </div>
        <div className="vc-specs">
          <div className="spec-item">
            <span className="spec-val">{v.range}</span>
            <span className="spec-lbl">km Range</span>
          </div>
          <div className="spec-item">
            <span className="spec-val">{v.battery}</span>
            <span className="spec-lbl">kWh</span>
          </div>
          <div className="spec-item">
            <span className="spec-val">{v.seats}</span>
            <span className="spec-lbl">Seats</span>
          </div>
        </div>
        <div className="vc-footer">
          <div>
            <div className="vc-price">
              <span className="vc-price-num">₹{v.pricePerHour}</span>
              <span className="vc-price-unit">/hr</span>
            </div>
            <div className="vc-dist">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
                  strokeWidth="2"
                />
                <circle cx="12" cy="10" r="3" strokeWidth="2" />
              </svg>
              {distanceKm} km away
            </div>
          </div>
          <button
            type="button"
            className="btn-book"
            disabled={!v.available}
            onClick={(e) => {
              e.stopPropagation();
              onBook(v.id);
            }}
          >
            {v.available ? "Book Now" : "Unavailable"}
          </button>
        </div>
      </div>
    </article>
  );
}
