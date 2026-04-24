import { useCallback, useMemo, useState } from "react";
import { allVehicles } from "../data/vehicles";
import { AppStateContext } from "./appStateContext.js";

let toastSeq = 0;
function nextToastId() {
  toastSeq += 1;
  return `toast-${toastSeq}`;
}

export function AppStateProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  const [bookingVehicle, setBookingVehicle] = useState(null);
  const [bookingSession, setBookingSession] = useState(0);
  const [toasts, setToasts] = useState([]);

  const pushToast = useCallback((message, type = "info") => {
    const id = nextToastId();
    setToasts((prev) => [...prev, { id, message, type }]);
  }, []);

  const dismissToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toggleFavorite = useCallback((vehicleId) => {
    setFavorites((prev) => {
      if (prev.includes(vehicleId)) {
        return prev.filter((id) => id !== vehicleId);
      }
      return [...prev, vehicleId];
    });
  }, []);

  const handleFavHeartClick = useCallback(
    (vehicleId) => {
      setFavorites((prev) => {
        const willRemove = prev.includes(vehicleId);
        queueMicrotask(() => {
          pushToast(
            willRemove ? "Removed from favorites" : "Added to favorites ♥",
            willRemove ? "info" : "success",
          );
        });
        return willRemove
          ? prev.filter((id) => id !== vehicleId)
          : [...prev, vehicleId];
      });
    },
    [pushToast],
  );

  const clearFavorites = useCallback(() => {
    setFavorites([]);
    pushToast("All favorites cleared", "info");
  }, [pushToast]);

  const openBooking = useCallback((vehicleId) => {
    const v = allVehicles.find((x) => x.id === vehicleId);
    if (!v?.available) return;
    setBookingSession((n) => n + 1);
    setBookingVehicle(v);
  }, []);

  const closeBooking = useCallback(() => setBookingVehicle(null), []);

  const confirmBooking = useCallback(
    (vehicle, grandTotal) => {
      closeBooking();
      pushToast(
        `Booking confirmed for ${vehicle.name}! Total: ₹${grandTotal}`,
        "success",
      );
    },
    [closeBooking, pushToast],
  );

  const value = useMemo(
    () => ({
      favorites,
      toggleFavorite,
      handleFavHeartClick,
      clearFavorites,
      bookingVehicle,
      bookingSession,
      openBooking,
      closeBooking,
      confirmBooking,
      toasts,
      pushToast,
      dismissToast,
    }),
    [
      favorites,
      toggleFavorite,
      handleFavHeartClick,
      clearFavorites,
      bookingVehicle,
      bookingSession,
      openBooking,
      closeBooking,
      confirmBooking,
      toasts,
      pushToast,
      dismissToast,
    ],
  );

  return (
    <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>
  );
}
