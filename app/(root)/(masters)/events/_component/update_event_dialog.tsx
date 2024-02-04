import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { EventForm } from "./event_form";

export function UpdateEventDialog({ data }: { data: any }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Update</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-xl overflow-y-scroll max-h-[95vh]">
        <DialogHeader>
          <DialogTitle className="text-3xl">Update Event</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <Separator />
        <EventForm data={data} />
      </DialogContent>
    </Dialog>
  );
}
