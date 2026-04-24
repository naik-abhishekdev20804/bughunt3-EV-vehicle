import { Link } from "react-router-dom";

export function ChargingPanel({
  stations,
  showAvailableOnly,
  onToggleAvailable,
  getDistance,
  showViewAllButton = false,
}) {
  const statusLabel = {
    available: "Available",
    busy: "Busy",
    unavailable: "Offline",
  };

  return (
    <section className="section charging-section" id="charging">
      <div className="section-header">
        <div>
          <h2 className="section-title">
            Nearby <span>Charging Stations</span>
          </h2>
          <p className="section-sub">Fast and AC hubs within the city</p>
        </div>
        {showViewAllButton ? (
          <Link to="/charging" className="view-all">
            Full network page{" "}
            <svg viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="m9 18 6-6-6-6"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </Link>
        ) : null}
      </div>
      <div className="station-toggle-wrap">
        <span className="toggle-label" id="avail-toggle-label">
          Show available only
        </span>
        <button
          type="button"
          className={`toggle${showAvailableOnly ? " on" : ""}`}
          onClick={onToggleAvailable}
          role="switch"
          aria-checked={showAvailableOnly}
          aria-labelledby="avail-toggle-label"
        />
        <span className="station-count" aria-live="polite">
          {stations.length} station{stations.length !== 1 ? "s" : ""} nearby
        </span>
      </div>
      <div className="stations-wrap">
        {stations.map((s) => (
          <article key={s.id} className="station-card">
            <div
              className="station-photo"
              style={{ backgroundImage: `url(${s.image})` }}
              aria-hidden
            />
            <div className="station-card-body">
              <div className="station-header">
                <div className={`station-icon-wrap ${s.status}`}>
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" aria-hidden>
                    <path d="M5 18H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3.19M15 6h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-3.19" />
                    <line x1="23" y1="13" x2="23" y2="11" />
                    <polyline points="11 6 7 12 13 12 9 18" />
                  </svg>
                </div>
                <div className="station-info">
                  <h3 className="station-name">{s.name}</h3>
                  <p className="station-addr">{s.address}</p>
                </div>
                <span className={`station-status-badge ${s.status}`}>
                  {statusLabel[s.status]}
                </span>
              </div>
              <div className="station-meta">
                <div className="station-meta-item">
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" aria-hidden>
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <strong>{getDistance(s)} km</strong>
                </div>
                <div className="station-meta-item">
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" aria-hidden>
                    <rect x="2" y="7" width="20" height="14" rx="2" />
                    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                  </svg>
                  <strong>
                    {s.available}/{s.ports}
                  </strong>{" "}
                  ports free
                </div>
                <div className="station-meta-item">
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" aria-hidden>
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                  <strong>{s.power}</strong>
                </div>
                <div className="station-meta-item station-price">{s.price}</div>
              </div>
              <div className="station-ports">
                {s.types.map((t) => (
                  <span key={t} className="port-pill">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
