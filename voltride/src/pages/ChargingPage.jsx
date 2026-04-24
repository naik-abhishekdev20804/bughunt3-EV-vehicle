import { useMemo, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { ChargingPanel } from "../components/ChargingPanel";
import { allStations } from "../data/stations";
import { USER_LAT, USER_LNG } from "../data/constants";
import { calculateDistance } from "../utils/distance";
import { filterStations } from "../utils/stationFilters";
import { useAppState } from "../context/useAppState.js";

export function ChargingPage() {
  const { pushToast } = useAppState();
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);

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

  return (
    <div className="page page-charging">
      <div className="page-inner">
        <header className="page-header">
          <div>
            <p className="page-kicker">Infrastructure</p>
            <h1 className="page-title">Charging network</h1>
            <p className="page-lead">
              DC fast hubs and AC points around Bengaluru. Filter to open stalls
              only.
            </p>
          </div>
          <div className="page-header-actions">
            <Link to="/" className="btn-outline">
              ← Home
            </Link>
            <button
              type="button"
              className="btn-secondary"
              onClick={() =>
                pushToast("Route planning is demo-only for now.", "info")
              }
            >
              Plan a trip
            </button>
            <button
              type="button"
              className="btn-login"
              onClick={() =>
                pushToast("Station alerts: enable in the mobile app (demo).", "info")
              }
            >
              Notify me
            </button>
          </div>
        </header>
        <ChargingPanel
          stations={visibleStations}
          showAvailableOnly={showAvailableOnly}
          onToggleAvailable={() => setShowAvailableOnly((x) => !x)}
          getDistance={getDistance}
        />
      </div>
    </div>
  );
}
