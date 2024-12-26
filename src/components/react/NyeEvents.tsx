import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import CountryFlag from "react-country-flag";
import { Badge, Button, Divider, Link } from "@nextui-org/react";

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
}

interface Props {
  events: Event[];
}

const DigitalClockSegment = ({ value }: { value: string }) => (
  <div className="bg-zinc-800 px-4 py-2 rounded-lg border border-zinc-700">
    <span className="font-mono text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
      {value}
    </span>
  </div>
);

const NyeEvents = ({ events }: Props) => {
  const [timeSegments, setTimeSegments] = useState({
    date: "",
    time: "",
    timezone: "",
  });
  const [closest, setClosest] = useState<Event[]>([]);
  const [nextGroup, setNextGroup] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentTimezone, setCurrentTimezone] = useState<string>("");

  useEffect(() => {
    const fetchAndFilterData = async () => {
      const currentUTC = new Date();

      const targetDate = new Date(currentUTC);
      targetDate.setMonth(11);
      targetDate.setDate(31);
      targetDate.setHours(0, 0, 0, 0);

      const currentTimestamp = Math.floor(currentUTC.getTime() / 1000);
      const targetTimestamp = Math.floor(targetDate.getTime() / 1000);

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

        const year = localDate.getUTCFullYear();
        const month = (localDate.getUTCMonth() + 1).toString().padStart(2, "0");
        const day = localDate.getUTCDate().toString().padStart(2, "0");
        const hours = localDate.getUTCHours().toString().padStart(2, "0");
        const minutes = localDate.getUTCMinutes().toString().padStart(2, "0");
        const seconds = localDate.getUTCSeconds().toString().padStart(2, "0");

        const gmtOffsetHours = firstItem.gmt_offset / 3600;
        const gmtSign = gmtOffsetHours >= 0 ? "+" : "-";
        const timezone = `GMT${gmtSign}${Math.abs(gmtOffsetHours)}`;

        setTimeSegments({
          date: `${year}-${month}-${day}`,
          time: `${hours}:${minutes}:${seconds}`,
          timezone: timezone,
        });
        setCurrentTimezone(timezone);
      }
    };

    fetchAndFilterData();
    const interval = setInterval(fetchAndFilterData, 1000);
    return () => clearInterval(interval);
  }, [events]);

  const renderCards = (data: Event[]) => {
    return data.map((item, index) => (
      <Card
        key={index}
        className="bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm hover:bg-zinc-900/80 transition-all duration-300"
      >
        <CardHeader className="flex justify-center p-6">
          <CountryFlag
            countryCode={item.country_code}
            svg
            style={{ fontSize: 64 }}
            title={item.country_name}
            alt={item.country_name}
          />
        </CardHeader>
        <Divider className="bg-zinc-800" />
        <CardBody className="text-center p-4">
          <p className="text-lg font-semibold text-white mb-1">
            {item.country_name}
          </p>
          <p className="text-zinc-400">{item.city}</p>
        </CardBody>
        <CardFooter className="justify-center pb-6">
          {item.stream && (
            <Link isExternal href={item.stream}>
              <Button
                color="danger"
                size="sm"
                variant="shadow"
                className="hover:scale-105 transition-transform"
              >
                <span className="px-2 py-1 text-xs bg-red-500 text-white rounded-full">
                  LIVE
                </span>
              </Button>
            </Link>
          )}
        </CardFooter>
      </Card>
    ));
  };

  return (
    <div className="space-y-12">
      <div className="text-center bg-gradient-to-b from-zinc-900 to-zinc-950 p-8 rounded-2xl border border-zinc-800">
        <div className="space-y-4">
          <p className="text-zinc-400 uppercase tracking-wider text-sm">
            Current Timezone Time
          </p>
          <div className="flex flex-col items-center gap-4">
            <DigitalClockSegment value={timeSegments.date} />
            <div className="flex items-center gap-2">
              <DigitalClockSegment value={timeSegments.time} />
              <DigitalClockSegment value={timeSegments.timezone} />
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Next Timezones Celebrating New Year's Eve
          </h2>
          <p className="text-zinc-400">
            Stay tuned for celebrations around the world
          </p>
        </div>
      </div>
      <div className="space-y-6">
        <h3 className="text-2xl font-semibold text-red-500">
          Closest to Midnight ({currentTimezone})
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {renderCards(closest)}
        </div>
      </div>
      <div className="space-y-6">
        <h3 className="text-2xl font-semibold text-red-500">Next Up</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {renderCards(nextGroup)}
        </div>
      </div>
    </div>
  );
};

export default NyeEvents;
