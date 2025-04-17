"use client";
import { Control } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import React, { useEffect, useMemo, useState } from "react";
import { Loader } from "@/lib/spinners";
import { fetchBatchTimeSchedules } from "@/server/actions/batch-time-schedule.actions";
import { BatchTimeSchedule } from "@/server/types/batch-time-schedule";
import { extractDateOnly } from "@/lib/utils";

type BatchTimeScheduleSelectProps = {
  control: Control<any>;
  name: string;
  filter?: string;
};

const BatchTimeScheduleSelect = ({
  control,
  name,
  filter,
}: BatchTimeScheduleSelectProps) => {
  const [loading, setLoading] = useState(false);
  const [schedules, setBatchTimeSchedules] = useState<BatchTimeSchedule[]>([]);

  useEffect(() => {
    // Define the async function inside the effect
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await fetchBatchTimeSchedules(filter); // Use the filter variable directly
        setBatchTimeSchedules(data); // Update your state with the fetched data
      } catch (error) {
        console.error("Failed to fetch batche time schedules:", error);
        // Optionally, handle errors, e.g., by setting an error state
      } finally {
        setLoading(false); // Ensure loading is false after data is fetched or if an error occurs
      }
    };

    // Call the async function
    fetchData();
  }, [filter]); // Dependency array includes filter, so effect runs when filter changes

  return (
    <div>
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Batch Schedule</FormLabel>
            <div className="flex items-center justify-center gap-2">
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value ?? "1"}
                disabled={loading}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a schedule" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {schedules.length > 0 ? (
                    schedules.map((schedule) => (
                      <SelectItem
                        key={schedule.auto_id}
                        value={schedule.auto_id!.toString()}
                      >
                        {extractDateOnly(schedule.date)}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="-1" disabled>
                      No schedules available
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>

              {loading && <Loader size={13} color="black" />}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default BatchTimeScheduleSelect;
