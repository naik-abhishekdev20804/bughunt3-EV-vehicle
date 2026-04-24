import { Link } from "react-router-dom";
import { useAppState } from "../context/useAppState.js";

export function AboutPage() {
  const { pushToast } = useAppState();

  return (
    <div className="page page-about">
      <div className="page-inner narrow">
        <p className="page-kicker">Company</p>
        <h1 className="page-title">About VoltRide</h1>
        <p className="page-lead">
          We are a demo product team building a brighter, electric-first mobility
          layer for Indian cities — starting with Bengaluru.
        </p>
        <div className="prose">
          <p>
            VoltRide connects riders with curated EVs and reliable charging data.
            This web app is a front-end showcase: search, filters, favorites,
            booking estimates, and hub status are all simulated for UX review.
          </p>
          <p>
            For partnerships or fleet pilots, use the contact actions below — they
            trigger demo toasts in this build.
          </p>
        </div>
        <div className="page-header-actions wrap">
          <Link to="/" className="btn-login">
            Book a ride
          </Link>
          <Link to="/favorites" className="btn-secondary">
            Open saved rides
          </Link>
          <button
            type="button"
            className="btn-outline"
            onClick={() => pushToast("Press: press@voltride.demo (not a real inbox)", "info")}
          >
            Press kit
          </button>
          <button
            type="button"
            className="btn-outline"
            onClick={() => pushToast("Careers — demo only. Thanks for your interest!", "info")}
          >
            Careers
          </button>
        </div>
      </div>
    </div>
  );
}
