"use client";
import React, { useCallback, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useSession } from "next-auth/react";
import {
  fetchTotalSessions,
  fetchUsage,
} from "@/server/actions/student-usage.actions";
import { DataTable } from "@/components/datatable";
import { columns } from "./datatable/columns";
import { LoaderFull } from "@/lib/spinners";
import { ProgressBar } from "./_component/progress";
import { getUserLoginActivity } from "@/server/actions/auth.action";
import { toastError } from "@/lib/toast/toast";
import NotFoundAnimationComponent from "@/components/common/not-found-component";

interface State {
  usageData: any[];
  percentage: number;
  userLoginActivity: any;
}

const StudentUsage = () => {
  const { data: session }: any = useSession();

  const [state, setState] = useState<State>({
    usageData: [],
    percentage: 0,
    userLoginActivity: 0,
  });

  const [loading, setLoading] = useState(true);

  const manipulateData = (usageData: any, totalSessions: any) => {
    let array: UsageData[] = [];
    for (let i = 0; i < totalSessions.length; i++) {
      let filteredData = usageData.filter((element: any) => {
        return element.session_id === totalSessions[i].session_auto_id;
      });

      if (filteredData.length === 0) {
        array.push({
          sessionTitle: totalSessions[i].title,
          dropClicksCount: 0,
          slidesClicksCount: 0,
          totalSessionCount: totalSessions.length,
        });
      } else {
        array.push({
          sessionTitle: filteredData[0].sessions.title,
          dropClicksCount: filteredData[0].dropbox_clicks,
          slidesClicksCount: filteredData[0].slide_clicks,
          totalSessionCount: totalSessions.length,
        });
      }
    }

    let total = 0;

    for (let i = 0; i < array.length; i++) {
      const element = array[i];

      if (element.dropClicksCount >= 1) {
        total = total + 1;
      }

      if (element.slidesClicksCount >= 1) {
        total = total + 1;
      }
    }

    const totalSessionCount = totalSessions.length * 2;
    const percentage = total / totalSessionCount;

    return { percentage: percentage * 100, aasd: array };
  };

  const fetchUsageData = useCallback(async () => {
    try {
      if (!session?.batchId) return;
      setLoading(true);
      const usageData = await fetchUsage(session.batchId);
      const totalSessionData = await fetchTotalSessions(session.batchId);
      const userLoginActivity = await getUserLoginActivity(session.phoneNumber);
      const { percentage, aasd } = manipulateData(usageData, totalSessionData);

      setState({
        usageData: aasd,
        percentage: percentage,
        userLoginActivity: userLoginActivity,
      });
      setLoading(false);
    } catch (error) {
      toastError("Something went wrong, please try again later");
    }
  }, [session?.batchId, session?.phoneNumber]);

  useEffect(() => {
    fetchUsageData();
  }, [fetchUsageData]);

  return (
    <div>
      <Card className="w-full rounded-sm">
        <CardHeader>
          <CardTitle className="text-4xl">Usage Summary</CardTitle>
          <CardDescription>
            The Usage Summary shows your attendance for each subject, helping
            you keep track of your class participation easily.
          </CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="pt-4">
          <Separator className="mt-3 mb-3" />
          {loading && (
            <div className="md:min-h-[40vh] flex justify-center items-center">
              <LoaderFull size={25} color="#2563EB" />
            </div>
          )}
          {!loading && state.usageData.length > 0 && (
            <>
              <ProgressBar percentage={state.percentage} />
              <DataTable columns={columns} data={state.usageData} />
              <p className="text-xl mb-2">
                Times logged in to the system: {state.userLoginActivity}
              </p>
            </>
          )}

          {!loading && state.usageData.length == 0 && (
            <NotFoundAnimationComponent />
          )}
        </CardContent>
        <CardFooter className="flex justify-between"></CardFooter>
      </Card>
    </div>
  );
};

export default StudentUsage;
