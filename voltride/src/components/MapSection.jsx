export function MapSection() {
  return (
    <div className="section map-section-wrap">
      <div className="map-section" role="img" aria-label="Stylized map of Bengaluru EV network">
        <div className="map-bg" />
        <div className="map-grid" />
        <div className="map-pin" style={{ top: "35%", left: "30%" }} />
        <div className="map-pin" style={{ top: "55%", left: "60%" }} />
        <div className="map-pin" style={{ top: "25%", left: "70%" }} />
        <div className="map-pin amber" style={{ top: "65%", left: "25%" }} />
        <div className="map-pin amber" style={{ top: "40%", left: "55%" }} />
        <div className="map-pin" style={{ top: "70%", left: "72%" }} />
        <div className="map-pin" style={{ top: "20%", left: "45%" }} />
        <div className="map-pin amber" style={{ top: "50%", left: "80%" }} />
        <div className="map-overlay">
          <h3>📍 Bengaluru EV Network</h3>
          <p>Live fleet view · Teal pins are EVs, amber are charging hubs</p>
        </div>
        <div className="map-legend">
          <div className="map-legend-item">
            <div className="map-dot map-dot-teal" />
            EV vehicle
          </div>
          <div className="map-legend-item">
            <div className="map-dot map-dot-amber" />
            Charging station
          </div>
        </div>
      </div>
    </div>
  );
}
