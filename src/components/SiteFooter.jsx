import { Link } from "react-router-dom";

export function SiteFooter() {
  return (
    <footer className="site-footer" id="about">
      <div className="footer-inner">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">VoltRide</div>
            <p className="footer-desc">
              India&apos;s friendly EV ride-sharing experience. Clean, affordable,
              and bright urban mobility for everyone.
            </p>
          </div>
          <div>
            <div className="footer-col-title">Platform</div>
            <div className="footer-links">
              <Link className="footer-link" to="/#vehicles">
                Find Vehicles
              </Link>
              <Link className="footer-link" to="/charging">
                Charging Map
              </Link>
              <Link className="footer-link" to="/favorites">
                Saved Rides
              </Link>
              <Link className="footer-link" to="/about">
                Partner With Us
              </Link>
            </div>
          </div>
          <div>
            <div className="footer-col-title">Company</div>
            <div className="footer-links">
              <Link className="footer-link" to="/about">
                About Us
              </Link>
              <Link className="footer-link" to="/about">
                Careers
              </Link>
              <Link className="footer-link" to="/about">
                Press
              </Link>
              <Link className="footer-link" to="/about">
                Sustainability
              </Link>
            </div>
          </div>
          <div>
            <div className="footer-col-title">Support</div>
            <div className="footer-links">
              <Link className="footer-link" to="/help">
                Help Center
              </Link>
              <Link className="footer-link" to="/help">
                Safety
              </Link>
              <Link className="footer-link" to="/help">
                Contact Us
              </Link>
              <Link className="footer-link" to="/help">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span className="footer-copy">
            © 2026 VoltRide Technologies Pvt. Ltd. · Bengaluru, India
          </span>
          <div className="footer-chips">
            <span className="footer-chip">⚡ 100% Green</span>
            <span className="footer-chip">🔒 Secure</span>
            <span className="footer-chip">🇮🇳 Made in India</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
