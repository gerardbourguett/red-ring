import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { Globe, MapPin } from "lucide-react";

interface NyeToastInfo {
  countries: Array<{
    country_name: string;
    country_code: string;
    city?: string;
    gmt_offset: number;
  }>;
}

const ToastContent = ({ countries }: NyeToastInfo) => {
  // Obtener el offset GMT del primer país (asumiendo que todos los países en el grupo tienen el mismo)
  const gmtOffset = countries[0]?.gmt_offset;
  const gmtString = `GMT${gmtOffset >= 0 ? "+" : ""}${gmtOffset / 3600}`;

  return (
    <div className="flex items-start gap-4 min-w-[300px] p-4 bg-gradient-to-br dark:from-zinc-900 dark:to-zinc-900/50 from-zinc-100 to-zinc-100/50 rounded-xl border dark:border-zinc-800 border-zinc-200 shadow-lg">
      <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-r from-red-500 to-red-600">
        <span className="text-2xl">🎉</span>
      </div>

      <div className="flex-1">
        <h4 className="font-bold text-lg bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
          Happy New Year! 🎆
        </h4>

        <div className="mt-2 space-y-3">
          {countries.map((country, index) => (
            <div key={index} className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <img
                  src={`/flags/1x1/${country.country_code.toLowerCase()}.svg`}
                  alt={`Flag of ${country.country_name}`}
                  className="w-4 h-4 rounded-full"
                />
                <span className="text-sm font-medium dark:text-white">
                  {country.country_name}
                </span>
              </div>

              {country.city && (
                <div className="flex items-center gap-2 ml-6">
                  <MapPin className="w-3 h-3 text-red-500" />
                  <span className="text-xs dark:text-zinc-400">
                    {country.city}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-3 flex items-center gap-2 text-xs dark:text-zinc-400">
          <Globe className="w-3 h-3" />
          <span>{gmtString}</span>
        </div>
      </div>
    </div>
  );
};

export const showNyeToast = (toastInfo: NyeToastInfo) => {
  // Configurar el sonido
  const sound = new Audio("/sounds/nye.mp3");
  sound.play().catch((err) => console.warn("Error playing sound:", err));

  return toast.custom(
    (t: { visible: boolean }) => (
      <div className={`${t.visible ? "animate-enter" : "animate-leave"}`}>
        <ToastContent countries={toastInfo.countries} />
      </div>
    ),
    {
      duration: 8000,
      position: "top-right",
    }
  );
};

// Componente contenedor para el sistema de toasts
export const ToastContainer = () => {
  return <Toaster position="top-right" />;
};

export default {
  showNyeToast,
  ToastContainer,
};
