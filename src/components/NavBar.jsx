import { Link, NavLink } from "react-router-dom";

export function NavBar({ favCount, onFavoritesClick }) {
  const navClass = ({ isActive }) =>
    `nav-link${isActive ? " active" : ""}`;

  return (
    <nav className="nav">
      <div className="nav-inner">
        <Link className="logo" to="/">
          <div className="logo-icon">V</div>
          <span className="logo-text">VoltRide</span>
        </Link>
        <div className="nav-links">
          <NavLink className={navClass} to="/" end>
            Home
          </NavLink>
          <NavLink className={navClass} to="/favorites">
            Saved
          </NavLink>
          <NavLink className={navClass} to="/charging">
            Charging
          </NavLink>
          <NavLink className={navClass} to="/about">
            About
          </NavLink>
          <NavLink className={navClass} to="/help">
            Help
          </NavLink>
        </div>
        <div className="nav-actions">
          <button
            type="button"
            className="fav-btn"
            onClick={onFavoritesClick}
            title="Open saved rides"
            aria-label="Open saved rides page"
          >
            <svg viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                strokeWidth="2"
              />
            </svg>
            {favCount > 0 ? (
              <span className="fav-badge" aria-live="polite">
                {favCount}
              </span>
            ) : null}
          </button>
        </div>
      </div>
    </nav>
  );
}
