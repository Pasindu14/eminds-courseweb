import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AddSessionProgressDialog } from "./_component/add_session_progress_dialog";
import SessionProgressFilterForm from "./_component/session_progress_filter_form";

const SessionProgressPage = async () => {
  return (
    <div>
      <Card className="w-full rounded-sm">
        <CardHeader>
          <CardTitle className="text-4xl">Session Progress</CardTitle>{" "}
          {/* Updated title */}
          <CardDescription>
            Monitor and manage the progress of learning sessions, providing
            insights into completion status and engagement.
          </CardDescription>{" "}
          {/* Updated description */}
        </CardHeader>
        <Separator />
        <CardContent className="pt-4">
          <SessionProgressFilterForm />
          {/* Ensure columns are for session progress data */}
        </CardContent>
      </Card>
    </div>
  );
};

export default SessionProgressPage; // Updated component name
