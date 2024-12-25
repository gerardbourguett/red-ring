import { createClient } from "@supabase/supabase-js";
import React, { useEffect, useRef, useState } from "react";
import SvgComponent from "./SVGComponent";

interface Event {
  svg_path: string;
  gmt_offset: number;
  country_code: string;
  country_name: string;
  zone_name: string;
  city: string;
  isPreMidnight?: boolean;
  isMidnight?: boolean;
}

interface Props {
  events: Event[];
}

const WorldMap = ({ events }: Props) => {
  const [paths, setPaths] = useState<Event[]>([]);
  const svgContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const loadSvg = async () => {
      try {
        const response = await fetch("/world.svg");
        const svgText = await response.text();

        if (svgContainerRef.current) {
          svgContainerRef.current.innerHTML = svgText;
        }
      } catch (error) {
        console.error("Error loading SVG:", error);
      }
    };

    loadSvg();
  }, []);

  useEffect(() => {
    const updatePaths = async () => {
      const currentUTC = Math.floor(new Date().getTime() / 1000);

      const updatedPaths = events.map((row) => {
        const localTimestamp = currentUTC + row.gmt_offset;
        const localDate = new Date(localTimestamp * 1000);
        const localHour = localDate.getUTCHours();
        const localDay = localDate.getUTCDate();
        const localMonth = localDate.getUTCMonth() + 1; // Meses son 0-indexados

        const isMidnight = localDay === 1 && localMonth === 1;
        const isPreMidnight =
          localDay === 31 && localMonth === 12 && localHour === 23;

        return {
          svg_path: row.svg_path,
          gmt_offset: row.gmt_offset,
          country_code: row.country_code,
          country_name: row.country_name,
          zone_name: row.zone_name,
          city: row.city,
          isMidnight,
          isPreMidnight,
        };
      });

      setPaths(updatedPaths);
    };

    updatePaths();
    const interval = setInterval(updatePaths, 1000); // Actualizar cada segundo
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Actualiza el color de los elementos SVG según el estado `isPreMidnight` o `isMidnight`
    paths.forEach((path) => {
      const svgElement = document.getElementById(path.svg_path);
      if (svgElement) {
        if (path.isMidnight) {
          svgElement.style.fill = "red"; // Sin color de relleno
          svgElement.style.stroke = "none"; // Contorno rojo con color de Tailwind
          svgElement.style.strokeWidth = "1"; // Grosor de la línea roja
        } else if (path.isPreMidnight) {
          svgElement.style.fill = "none"; // Sin color de relleno
          svgElement.style.stroke = "red"; // Contorno rojo con color de Tailwind
          svgElement.style.strokeWidth = "1"; // Grosor de la línea roja leve
        } else {
          svgElement.style.fill = "none"; // Sin color
          svgElement.style.stroke = "none"; // Sin contorno
        }
      }
    });
  }, [paths]);
  return (
    <div>
      <SvgComponent className="xl:w-[1000px] lg:w-[800px] md:w-[600px] sm:w-[400px] w-[200px] h-auto" />
    </div>
  );
};

export default WorldMap;
