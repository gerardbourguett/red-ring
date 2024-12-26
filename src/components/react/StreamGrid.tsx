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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-white mb-8 text-center">
        Live Streams
      </h1>

      {streams.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 sm:gap-6 w-full max-w-screen-xl mx-auto">
          {streams.map((stream) => (
            <Card
              key={stream.id}
              className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800"
            >
              <CardHeader className="flex flex-col gap-1 px-4 pt-4">
                <div className="flex items-center justify-between w-full">
                  <h2 className="text-xl font-semibold text-white">
                    {stream.country}
                  </h2>
                  <span className="px-2 py-1 text-xs bg-red-500 text-white rounded-full">
                    LIVE
                  </span>
                </div>
                <p className="text-zinc-400 text-sm">{stream.title}</p>
              </CardHeader>

              <Divider className="my-4 bg-zinc-800" />

              <CardBody className="overflow-hidden p-0">
                <div className="relative h-[200px] md:h-[300px] lg:h-[400px]">
                  <ReactPlayer
                    url={stream.link}
                    width="100%"
                    height="100%"
                    playing
                    className="absolute top-0 left-0"
                  />
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[400px] bg-zinc-900/50 backdrop-blur-sm rounded-xl border border-zinc-800">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4" />
          <p className="text-zinc-400">Loading streams...</p>
        </div>
      )}
    </div>
  );
};

export default StreamGrid;
