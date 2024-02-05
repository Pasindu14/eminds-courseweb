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
import { StudentForm } from "./student_form";

export function UpdateStudentDialog({ data }: { data: any }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"sm"}>Update</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-xl overflow-y-scroll max-h-[95vh]">
        <DialogHeader>
          <DialogTitle className="text-3xl">Update student</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <Separator />
        <StudentForm data={data} />
      </DialogContent>
    </Dialog>
  );
}
