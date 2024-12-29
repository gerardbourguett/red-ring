import React from 'react'

const TimeDisplay = ({
  value,
  label,
  variant = "default",
}: {
  value: string;
  label: string;
  variant?: "default" | "date";
}) => (
  <div
    className={`flex flex-col items-center justify-center ${
      variant === "date"
        ? "bg-gradient-to-br from-red-500 to-red-600 p-4 rounded-2xl"
        : "bg-gradient-to-br dark:from-zinc-900 to-zinc-800 p-3 rounded-xl"
    }`}
  >
    <span
      className={`font-mono text-3xl font-bold ${
        variant === "date" ? "text-white" : "dark:text-white"
      }`}
    >
      {value}
    </span>
    {label && (
      <span
        className={`text-xs ${
          variant === "date"
            ? "text-zinc-100"
            : "dark:text-zinc-400 text-zinc-600"
        } mt-1`}
      >
        {label}
      </span>
    )}
  </div>
);

export default TimeDisplay