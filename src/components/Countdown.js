import React, { useEffect, useState } from "react";

export const WEDDING_DATE = "2027-08-17T00:00:00+01:00";

export function toCountdown({ from = new Date(), until = WEDDING_DATE } = {}) {
  const remaining = new Date(until).getTime() - new Date(from).getTime();
  if (!Number.isFinite(remaining)) return "";
  if (remaining <= 0) {
    return remaining > -86400000 ? "Today is the day!" : "Just married!";
  }
  const minutes = Math.floor(remaining / 60000);
  return [
    [Math.floor(minutes / 1440), "day"],
    [Math.floor((minutes % 1440) / 60), "hour"],
    [minutes % 60, "minute"],
  ]
    .map(([value, unit]) => `${value} ${unit}${value === 1 ? "" : "s"}`)
    .join(" · ");
}

export default function Countdown() {
  const [countdown, setCountdown] = useState("");
  useEffect(() => {
    const update = () => setCountdown(toCountdown());
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, []);
  return (
    <div className="wedding-countdown">
      <p className="wedding-eyebrow">Counting down to 17 August 2027</p>
      <p className="counter" role="timer" aria-label="Time until our wedding">
        {countdown || "17 August 2027"}
      </p>
    </div>
  );
}
