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
import { fetchJobs } from "@/server/actions/jobs.actions";
import EventItem from "./_component/event-item";
import { fetchEvents } from "@/server/actions/events.actions";
import NotFoundAnimationComponent from "@/components/common/not-found-component";

const StudentEvents = async () => {
  const events = await fetchEvents();

  return (
    <div>
      <Card className="w-full rounded-sm">
        <CardHeader>
          <CardTitle className="text-4xl">Events</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="pt-4">
          {events.length > 0 &&
            events.map((job: any) => {
              return (
                <div key={job.job_auto_id}>
                  <EventItem event={job} />
                </div>
              );
            })}

          {events.length == 0 && <NotFoundAnimationComponent />}
        </CardContent>
        <CardFooter className="flex justify-between"></CardFooter>
      </Card>
    </div>
  );
};

export default StudentEvents;
