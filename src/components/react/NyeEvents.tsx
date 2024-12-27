import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import {
  Badge,
  Button,
  Chip,
  Divider,
  Image,
  Link,
  Progress,
} from "@nextui-org/react";
import { Globe, MapPin } from "lucide-react"; // Faltaba importar los iconos
import toast, { Toaster } from "react-hot-toast";

interface Event {
  id: number;
  country_code: string;
  country_name: string;
  zone_name: string;
  gmt_offset: number;
  city: string;
  active: boolean;
  stream: string;
  svg_path: string;
  location: string;
  lat: number;
  lng: number;
}

interface Props {
  events: Event[];
}

const TimeDisplay = ({ value, label }: { value: string; label: string }) => (
  <div className="flex flex-col items-center justify-center bg-gradient-to-br dark:from-zinc-900  to-zinc-800 p-3 rounded-xl">
    <span className="font-mono text-3xl font-bold dark:text-white">
      {value}
    </span>
    <span className="text-xs dark:text-zinc-400 text-zinc-600 mt-1">
      {label}
    </span>
  </div>
);

const EventCard = ({ event }: { event: Event }) => {
  const gmtOffset = `GMT${event.gmt_offset >= 0 ? "+" : ""}${
    event.gmt_offset / 3600
  }`;

  return (
    <Card
      className="border-none bg-gradient-to-br dark:from-zinc-900/50 dark:to-zinc-900 from-zinc-100 to-zinc-100/50"
      radius="lg"
    >
      <CardHeader className="flex gap-3">
        <Image
          alt={`Flag of ${event.country_name}`}
          src={`/flags/1x1/${event.country_code.toLowerCase()}.svg`}
          className="rounded-full w-12 h-12 object-cover"
        />
        <div className="flex flex-col">
          <p className="text-lg font-semibold dark:text-white">
            {event.country_name}
          </p>
          <div className="flex items-center gap-2 text-sm dark:text-zinc-400 text-zinc-600">
            <Globe className="w-4 h-4" />
            <span>{gmtOffset}</span>
          </div>
        </div>
      </CardHeader>
      <CardBody className="py-0">
        {/*         <MapView lat={event.lat} lng={event.lng} />
         */}{" "}
      </CardBody>
      <CardFooter className="flex flex-col gap-3">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-red-500" />
            <span className="text-sm font-medium dark:text-zinc-300 text-zinc-700">
              {event.city || "Capital City"}
            </span>
          </div>
          <Chip
            className="bg-gradient-to-r from-red-500 to-red-600 text-white"
            size="sm"
          >
            {event.stream ? "Live Now" : "No Stream"}
          </Chip>
        </div>
        {event.stream && (
          <Button
            className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white"
            size="sm"
          >
            Watch Celebration
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

const NyeEvents = ({ events }: Props) => {
  const [timeSegments, setTimeSegments] = useState({
    hours: "00",
    minutes: "00",
    seconds: "00",
    date: "",
    time: "",
    timezone: "",
  });
  const [closest, setClosest] = useState<Event[]>([]);
  const [nextGroup, setNextGroup] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentTimezone, setCurrentTimezone] = useState<string>("");
  const [lastNotifiedGroup, setLastNotifiedGroup] = useState<number[]>([]);

  const showNewYearToast = (country_name: string[]) => {
    const countryText = country_name.join(", ");
    toast(() => {
      return (
        <div className="flex flex-col items-center gap-2 p-4">
          <span className="text-xl font-bold bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
            Happy New Year! 🎉
          </span>
          <span className="text-sm text-zinc-600 dark:text-zinc-400">
            It's midnight in {countryText}
          </span>
        </div>
      );
    });
  };

  useEffect(() => {
    const fetchAndFilterData = async () => {
      const currentUTC = new Date();
      const targetDate = new Date(
        Date.UTC(
          currentUTC.getUTCFullYear(),
          currentUTC.getUTCMonth(),
          currentUTC.getUTCDate() + 1, // siguiente día
          0, // 00 horas UTC
          0, // 00 minutos
          0, // 00 segundos
          0 // 00 milisegundos
        )
      );

      const currentTimestamp = Math.floor(currentUTC.getTime() / 1000);

      const dataWithDifference = events.map((row) => {
        const localTimestamp = currentTimestamp + row.gmt_offset;
        const localDate = new Date(localTimestamp * 1000);

        const nextNYE = new Date(targetDate);
        nextNYE.setSeconds(nextNYE.getSeconds() - row.gmt_offset);

        let secondsToTarget =
          Math.floor(nextNYE.getTime() / 1000) - currentTimestamp;

        if (secondsToTarget < 0) {
          nextNYE.setFullYear(nextNYE.getFullYear() + 1);
          secondsToTarget =
            Math.floor(nextNYE.getTime() / 1000) - currentTimestamp;
        }

        return { ...row, secondsToTarget };
      });

      const sortedData = dataWithDifference.sort(
        (a, b) => a.secondsToTarget - b.secondsToTarget
      );

      const closestGroup = sortedData.filter(
        (row) => row.secondsToTarget === sortedData[0].secondsToTarget
      );

      // Check if we need to show a notification
      const closestIds = closestGroup.map((event) => event.id);
      if (
        closestGroup[0]?.secondsToTarget <= 1 && // Within 1 second of midnight
        !lastNotifiedGroup.some((id) => closestIds.includes(id)) // Haven't notified for this group yet
      ) {
        const locations = closestGroup.map(
          (event) => event.city || event.country_name
        );
        showNewYearToast(locations);
        setLastNotifiedGroup(closestIds);
      }

      const nextGroup = sortedData.filter(
        (row) =>
          row.secondsToTarget > sortedData[0].secondsToTarget &&
          row.secondsToTarget <=
            Math.min(
              ...sortedData
                .filter(
                  (item) => item.secondsToTarget > sortedData[0].secondsToTarget
                )
                .map((item) => item.secondsToTarget)
            )
      );

      setClosest(closestGroup);
      setNextGroup(nextGroup);
      setLoading(false);

      if (closestGroup.length > 0) {
        const firstItem = closestGroup[0];
        const localTimestamp = currentTimestamp + firstItem.gmt_offset;
        const localDate = new Date(localTimestamp * 1000);

        // Formatear las horas, minutos y segundos para el display
        const hours = localDate.getUTCHours().toString().padStart(2, "0");
        const minutes = localDate.getUTCMinutes().toString().padStart(2, "0");
        const seconds = localDate.getUTCSeconds().toString().padStart(2, "0");

        const gmtOffsetHours = firstItem.gmt_offset / 3600;
        const gmtSign = gmtOffsetHours >= 0 ? "+" : "-";
        const timezone = `GMT${gmtSign}${Math.abs(gmtOffsetHours)}`;

        setTimeSegments({
          hours,
          minutes,
          seconds,
          date: localDate.toISOString().split("T")[0],
          time: `${hours}:${minutes}:${seconds}`,
          timezone,
        });
        setCurrentTimezone(timezone);
      }
    };

    fetchAndFilterData();
    const interval = setInterval(fetchAndFilterData, 1000);
    return () => clearInterval(interval);
  }, [events, lastNotifiedGroup]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-8 p-4 max-w-7xl mx-auto">
      <Toaster position="top-right" />
      <div className="bg-gradient-to-br dark:from-zinc-900 dark:to-black from-zinc-100 to-white p-8 rounded-2xl border dark:border-zinc-800 border-zinc-200">
        <div className="text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
            New Year's Eve Around the World
          </h1>
          <p className="dark:text-zinc-400 text-zinc-600 max-w-2xl mx-auto">
            Follow the New Year celebrations as they happen across different
            time zones
          </p>
          <div className="flex justify-center gap-4">
            <TimeDisplay value={timeSegments.hours} label="HOURS" />
            <TimeDisplay value={timeSegments.minutes} label="MINUTES" />
            <TimeDisplay value={timeSegments.seconds} label="SECONDS" />
          </div>
        </div>
      </div>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold dark:text-white">
            Approaching New Year's Eve
          </h2>
          <Progress
            size="sm"
            radius="full"
            value={40}
            classNames={{
              indicator: "bg-gradient-to-r from-red-500 to-red-600",
              track: "bg-zinc-800",
            }}
            className="w-32"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {closest.map((event, index) => (
            <EventCard key={index} event={event} />
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-semibold dark:text-white">Up Next</h2>
          <Divider className="flex-grow" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {nextGroup.map((event, index) => (
            <EventCard key={index} event={event} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default NyeEvents;
