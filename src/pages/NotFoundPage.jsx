import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <div className="page page-404">
      <div className="page-inner narrow center">
        <h1 className="page-title">404</h1>
        <p className="page-lead">This route is not part of the VoltRide demo map.</p>
        <div className="page-header-actions justify-center">
          <Link to="/" className="btn-login">
            Go home
          </Link>
          <Link to="/help" className="btn-outline">
            Help
          </Link>
        </div>
      </div>
    </div>
  );
}
