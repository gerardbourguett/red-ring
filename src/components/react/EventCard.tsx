import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
  Link,
} from "@nextui-org/react";
import { Globe, MapPin } from "lucide-react";

interface Event {
  gmt_offset: number;
  country_code: string;
  country_name: string;
  city: string;
  stream: string;
  lat: number;
  lng: number;
}

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
          {/* <Chip
            className="bg-gradient-to-r from-red-500 to-red-600 text-white"
            size="sm"
          >
            {event.stream ? "Live Now" : "No Stream"}
          </Chip> */}
        </div>
        {event.stream && (
          <Button
            className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white"
            size="sm"
          >
            <Link href={event.stream} target="_blank">
              Watch Live Stream
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default EventCard;
