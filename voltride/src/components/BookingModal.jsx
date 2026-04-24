import { useMemo, useState } from "react";
import { computeBookingCost } from "../utils/bookingCost";

function defaultBookingTimes() {
  const today = new Date().toISOString().split("T")[0];
  const now = new Date();
  const start = new Date(now);
  const end = new Date(now);
  end.setHours(end.getHours() + 2, end.getMinutes(), 0, 0);
  const pad = (n) => String(n).padStart(2, "0");
  return {
    bookDate: today,
    startTime: `${pad(start.getHours())}:${pad(start.getMinutes())}`,
    endTime: `${pad(end.getHours())}:${pad(end.getMinutes())}`,
  };
}

export function BookingModal({ vehicle, onClose, onConfirm }) {
  const defaults = defaultBookingTimes();
  const [bookDate, setBookDate] = useState(defaults.bookDate);
  const [startTime, setStartTime] = useState(defaults.startTime);
  const [endTime, setEndTime] = useState(defaults.endTime);

  const cost = useMemo(() => {
    if (!vehicle) return null;
    return computeBookingCost(
      vehicle.pricePerHour,
      startTime,
      endTime,
      bookDate,
    );
  }, [vehicle, startTime, endTime, bookDate]);

  if (!vehicle) return null;

  const invalid = startTime && endTime && cost === null;

  return (
    <div
      className="modal-overlay open"
      role="presentation"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="booking-title">
        <div className="modal-header">
          <span className="modal-title" id="booking-title">
            Book vehicle
          </span>
          <button type="button" className="modal-close" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>
        <div className="modal-body">
          <div className="modal-vehicle-preview">
            <div className="mvp-thumb-wrap" aria-hidden>
              <img src={vehicle.image} alt="" className="mvp-thumb" />
            </div>
            <div>
              <div className="mvp-name">{vehicle.name}</div>
              <div className="mvp-price">₹{vehicle.pricePerHour}/hr</div>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label" htmlFor="bookDate">
                Start date
              </label>
              <input
                id="bookDate"
                type="date"
                className="form-control"
                value={bookDate}
                onChange={(e) => setBookDate(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="startTime">
                Start time
              </label>
              <input
                id="startTime"
                type="time"
                className="form-control"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label" htmlFor="endTime">
                End time
              </label>
              <input
                id="endTime"
                type="time"
                className="form-control"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="durationDisplay">
                Duration
              </label>
              <input
                id="durationDisplay"
                type="text"
                className="form-control duration-readonly"
                value={
                  invalid
                    ? "Invalid time range"
                    : cost
                      ? `${cost.hours.toFixed(1)} hrs`
                      : "—"
                }
                readOnly
              />
            </div>
          </div>
          <div className="cost-breakdown">
            <div className="cost-row">
              <span>Base rate</span>
              <span>₹{vehicle.pricePerHour}/hr</span>
            </div>
            <div className="cost-row">
              <span>Duration</span>
              <span>{cost ? `${cost.hours.toFixed(1)} hrs` : "—"}</span>
            </div>
            <div className="cost-row">
              <span>Subtotal</span>
              <span>{cost ? `₹${cost.subtotal}` : "—"}</span>
            </div>
            <div className="cost-row">
              <span>GST (18%)</span>
              <span>{cost ? `₹${cost.tax}` : "—"}</span>
            </div>
            <div className="cost-row cost-row-total">
              <span>Grand total</span>
              <strong>{cost ? `₹${cost.grandTotal}` : "—"}</strong>
            </div>
          </div>
          <button
            type="button"
            className="btn-confirm"
            disabled={!cost}
            onClick={() => cost && onConfirm(vehicle, cost.grandTotal)}
          >
            ⚡ Confirm &amp; pay
          </button>
        </div>
      </div>
    </div>
  );
}
