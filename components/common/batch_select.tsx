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

import React, { useEffect, useState } from "react";
import { fetchBatches } from "@/server/actions/batch.actions";
import { Batch } from "@/server/types/batch.type";
import { Loader } from "@/lib/spinners";

type BatchSelectProps = {
  control: Control<any>;
  name: string;
  filter?: string;
};

const BatchSelect = ({ control, name, filter }: BatchSelectProps) => {
  const [loading, setLoading] = useState(false);
  const [batches, setBatches] = useState<Batch[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchBatches(filter);
      setBatches(data);
      setLoading(false);
    };
    fetchData();
  }, [filter]);

  return (
    <div>
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Batch</FormLabel>
            <div className="flex items-center justify-center gap-2">
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={loading}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a batch" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {batches.length > 0 ? (
                    batches.map((batch) => (
                      <SelectItem
                        key={batch.auto_id}
                        value={batch.auto_id!.toString()}
                      >
                        {batch.batch_name}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="-1" disabled>
                      No batches available
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

export default BatchSelect;
