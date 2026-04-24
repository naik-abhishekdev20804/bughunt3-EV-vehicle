import { Link } from "react-router-dom";
import { useAppState } from "../context/useAppState.js";

const FAQ = [
  {
    q: "How do I save a vehicle?",
    a: "Tap the heart on any fleet card. Open Saved rides from the heart in the nav to see your list.",
  },
  {
    q: "Are prices final?",
    a: "The booking modal adds 18% GST to the hourly subtotal. Real taxes may differ.",
  },
  {
    q: "Why do distances change?",
    a: "Distance is computed from a fixed Koramangala pin to each listing using the haversine formula.",
  },
];

export function HelpPage() {
  const { pushToast } = useAppState();

  return (
    <div className="page page-help">
      <div className="page-inner narrow">
        <p className="page-kicker">Support</p>
        <h1 className="page-title">Help center</h1>
        <p className="page-lead">
          Quick answers for this demo. Live chat and phone support are not wired
          up — buttons below show toasts.
        </p>
        <div className="help-actions">
          <button
            type="button"
            className="btn-login"
            onClick={() => pushToast("Live chat: not connected in demo.", "info")}
          >
            Start live chat
          </button>
          <button
            type="button"
            className="btn-secondary"
            onClick={() => pushToast("Safety tips emailed (simulated).", "success")}
          >
            Email safety guide
          </button>
          <button
            type="button"
            className="btn-outline"
            onClick={() => pushToast("Callback requested — demo only.", "info")}
          >
            Request callback
          </button>
        </div>
        <ul className="faq-list">
          {FAQ.map((item) => (
            <li key={item.q} className="faq-item">
              <h2 className="faq-q">{item.q}</h2>
              <p className="faq-a">{item.a}</p>
            </li>
          ))}
        </ul>
        <p className="help-footer-links">
          <Link to="/">Home</Link>
          <span aria-hidden> · </span>
          <Link to="/charging">Charging</Link>
          <span aria-hidden> · </span>
          <Link to="/about">About</Link>
        </p>
      </div>
    </div>
  );
}
