import React, { useEffect, useState } from "react";

const TimeProgress = () => {
  const [timeLeft, setTimeLeft] = useState({ progress: 0 });
  const year = new Date().getFullYear();

  useEffect(() => {
    const calculateProgress = () => {
      const startDate = new Date(Date.UTC(year, 0, 1));
      const endDate = new Date(Date.UTC(year + 1, 0, 1));
      const now = Date.now();

      const progress =
        ((now - startDate.getTime()) /
          (endDate.getTime() - startDate.getTime())) *
        100;
      return Math.min(100, Math.max(0, progress));
    };

    const updateProgress = () => {
      setTimeLeft((prev) => {
        const newProgress = calculateProgress();
        if (Math.abs(prev.progress - newProgress) > 0.00001) {
          return { progress: newProgress };
        }
        return prev;
      });
    };

    updateProgress();
    const interval = setInterval(updateProgress, 1000);
    return () => clearInterval(interval);
  }, [year]);

  return (
    <div className="">
      <div className="relative h-4 bg-gray-800 rounded-full overflow-hidden">
        <div
          className="absolute h-full bg-red-500 transition-all duration-500"
          style={{ width: `${timeLeft.progress}%` }}
        />
      </div>
      <p className="text-gray-400 mt-2 text-center">
        {year} Progress: {timeLeft.progress.toFixed(5)}%
      </p>
    </div>
  );
};

export default TimeProgress;
