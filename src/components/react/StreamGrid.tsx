import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, Divider } from "@nextui-org/react";
import ReactPlayer from "react-player";

interface Stream {
  id: number;
  title: string;
  link: string;
  country: string;
}

interface Props {
  events: Stream[];
}

const StreamGrid = ({ events }: Props) => {
  const [streams, setStreams] = useState<Stream[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setStreams(events); // Set initial streams

    const interval = setInterval(() => {
      setStreams(events);
    }, 1000);

    return () => clearInterval(interval);
  }, [events]);

  return (
    <div className="">
      {streams.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-screen-xl mx-auto">
          {streams.map((stream) => (
            <div
              key={stream.id}
              className="relative bg-gradient-to-b dark:from-zinc-900/80 dark:to-zinc-950/80 from-zinc-100/80 to-zin-50/80 rounded-2xl overflow-hidden backdrop-blur-sm border dark:border-zinc-800/50 border-zinc-200/50 group dark:hover:border-zinc-700/50 hover:border-zinc-300/50 transition-all duration-300"
            >
              <div className="absolute top-4 right-4 z-10">
                <span className="px-3 py-1 text-xs font-semibold bg-red-500 text-white rounded-full animate-pulse">
                  LIVE
                </span>
              </div>

              <div className="p-4 pb-0">
                <div className="space-y-1 mb-4">
                  <h2 className="text-xl font-semibold dark:text-white flex items-center gap-2">
                    {stream.country}
                  </h2>
                  <p className="text-zinc-400 text-sm line-clamp-1">
                    {stream.title}
                  </p>
                </div>
              </div>

              <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                <ReactPlayer
                  url={stream.link}
                  width="100%"
                  height="100%"
                  playing
                  className="absolute top-0 left-0"
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[400px] bg-gradient-to-b from-zinc-900/50 to-zinc-950/50 rounded-2xl border border-zinc-800/50">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-red-500 mb-4" />
          <p className="text-zinc-400 font-medium">
            Streams available since Dec 31, 2024 10:00 UTC...
          </p>
        </div>
      )}
    </div>
  );
};

export default StreamGrid;
