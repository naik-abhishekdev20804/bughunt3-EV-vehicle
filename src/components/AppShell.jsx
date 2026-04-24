import { Outlet, useNavigate } from "react-router-dom";
import { useAppState } from "../context/useAppState.js";
import { NavBar } from "./NavBar";
import { SiteFooter } from "./SiteFooter";
import { BookingModal } from "./BookingModal";
import { ToastStack } from "./ToastStack";

export function AppShell() {
  const navigate = useNavigate();
  const {
    favorites,
    bookingVehicle,
    bookingSession,
    closeBooking,
    confirmBooking,
    toasts,
    dismissToast,
    pushToast,
  } = useAppState();

  return (
    <>
      <div className="bg-mesh" aria-hidden />
      <NavBar
        favCount={favorites.length}
        onFavoritesClick={() => {
          navigate("/favorites");
          if (favorites.length === 0) {
            queueMicrotask(() =>
              pushToast("Save vehicles with ♥ — they will appear here.", "info"),
            );
          }
        }}
      />
      <Outlet />
      <SiteFooter />
      {bookingVehicle ? (
        <BookingModal
          key={`${bookingVehicle.id}-${bookingSession}`}
          vehicle={bookingVehicle}
          onClose={closeBooking}
          onConfirm={confirmBooking}
        />
      ) : null}
      <ToastStack toasts={toasts} onDismiss={dismissToast} />
    </>
  );
}
