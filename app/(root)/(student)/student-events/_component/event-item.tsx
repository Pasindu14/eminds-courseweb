import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import Image from "next/image";

const EventItem = ({ event }: { event: any }) => {
  return (
    <div className="border border-1 w-full rounded-xl">
      <div className="grid md:grid-cols-2">
        <Image
          src={`https://eminds.com.au/coursewebfiles/downloadfiles.php?id=${event.image}`}
          alt="asdasdasd"
          height={500}
          width={500}
          objectFit="cover"
        />
        <div className="flex flex-col justify-center p-4">
          <div className="bg-black p-4 text-white mb-4 rounded-xl">
            <div className="flex items-center justify-center">
              {formatDate(event.date)}
            </div>
          </div>
          <div className="text-2xl font-semibold"> {event.name}</div>
          <div className="text-md mt-4"> {event.description}</div>

          <div className="flex justify-center mt-6 items-center">
            <Button asChild>
              <Link href={event.link} target="_blank">
                Register
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventItem;
