import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "../../../../components/datatable";
import { fetchSessions } from "@/server/actions/sessions.actions";
import { AddEventDialog } from "./_component/add_event_dialog";
import { columns } from "./datatable/columns";
import { fetchEvents } from "@/server/actions/events.actions";
import Image from "next/image";

const Events = async () => {
  const data = await fetchEvents();
  return (
    <div>
      <Card className="w-full rounded-sm">
        <CardHeader>
          <CardTitle className="text-4xl">Events</CardTitle>
          <CardDescription>
            Discover and participate in our latest events, workshops, and
            webinars tailored for professional growth and networking.
          </CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="pt-4">
          <div className="flex mb-4">
            <AddEventDialog />
          </div>
          <DataTable columns={columns} data={data} />
        </CardContent>
        <CardFooter className="flex justify-between"></CardFooter>
      </Card>
    </div>
  );
};

export default Events;
