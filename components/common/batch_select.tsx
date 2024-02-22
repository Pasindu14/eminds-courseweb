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
    // Define the async function inside the effect
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await fetchBatches(filter); // Use the filter variable directly
        setBatches(data); // Update your state with the fetched data
      } catch (error) {
        console.error("Failed to fetch batches:", error);
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
            <FormLabel>Batch</FormLabel>
            <div className="flex items-center justify-center gap-2">
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value ?? "1"}
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
