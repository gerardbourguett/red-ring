import React, { useEffect, useMemo, useState } from "react";

const Countdown = () => {
  const [now, setNow] = useState(() => Date.now());
  const year = useMemo(() => new Date().getFullYear(), []);
  const targetDate = useMemo(
    () => new Date(Date.UTC(year, 11, 31, 10)).getTime(),
    [year]
  );

  const timeLeft = useMemo(() => {
    const gap = targetDate - now;
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    return {
      days: Math.max(0, Math.floor(gap / day)),
      hours: Math.max(0, Math.floor((gap % day) / hour)),
      minutes: Math.max(0, Math.floor((gap % hour) / minute)),
      seconds: Math.max(0, Math.floor((gap % minute) / second)),
    };
  }, [now, targetDate]);

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  const timeUnits = useMemo(
    () => ["days", "hours", "minutes", "seconds"] as const,
    []
  );

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
      {timeUnits.map((unit) => (
        <div key={unit} className="flex flex-col items-center space-y-3">
          <div className="bg-gradient-to-b from-zinc-800 to-zinc-900 rounded-2xl p-6 shadow-xl backdrop-blur-sm border border-zinc-800 hover:scale-105 transition-all duration-300">
            <span className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
              {timeLeft[unit].toString().padStart(2, "0")}
            </span>
          </div>
          <span className="text-sm md:text-base uppercase font-medium text-zinc-400 tracking-wider">
            {unit}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Countdown;
