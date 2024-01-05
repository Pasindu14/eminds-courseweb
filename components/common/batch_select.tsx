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

import React, { useEffect, useState } from "react";
import { fetchBatches } from "@/server/actions/batch.actions";
import { Batch } from "@/server/types/batch.type";

type BatchSelectProps = {
  control: Control<any>; // Use a more specific type instead of 'any' if available
  name: string;
};

const BatchSelect = ({ control, name }: BatchSelectProps) => {
  const [batches, setBatches] = useState<Batch[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchBatches();
      setBatches(data);
    };

    fetchData();
  }, []);

  return (
    <div>
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Course</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a course" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {batches.map((batch) => (
                  <SelectItem
                    key={batch.auto_id}
                    value={batch.auto_id!.toString()}
                  >
                    {batch.batch_no}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default BatchSelect;
