import { Link } from "react-router-dom";
import { HelpChat } from "../components/HelpChat";

export function HelpPage() {
  return (
    <div className="page page-help">
      <div className="page-inner narrow">
        <p className="page-kicker">Support</p>
        <h1 className="page-title">Help center</h1>
        <p className="page-lead">
          Use the chat below to ask common questions. A human-style reply is
          generated for each topic.
        </p>
        <HelpChat />
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
