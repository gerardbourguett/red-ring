import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, Divider } from "@nextui-org/react";

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
    }, 10000);

    return () => clearInterval(interval);
  }, [events]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-white mb-8 text-center">
        Live Streams
      </h1>

      {streams.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

              <CardBody className="overflow-visible p-0">
                <div className="relative pt-[56.25%]">
                  <iframe
                    className="absolute top-0 left-0 w-full h-full rounded-b-lg"
                    src={stream.link}
                    title={stream.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    sandbox="allow-scripts allow-same-origin allow-presentation"
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
