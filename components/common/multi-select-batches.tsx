"use client";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { fetchStudents } from "@/server/actions/student.actions";
import { Control } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader } from "@/lib/spinners";
import { fetchBatches } from "@/server/actions/batch.actions";

type MultiSelectBatchProps = {
  control: Control<any>;
  name: string;
  max?: number;
  filter?: string;
};

export const MultiSelectBatches = ({
  control,
  name,
  max,
  filter,
}: MultiSelectBatchProps) => {
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [options, setOptions] = useState<{ value: string; label: string }[]>(
    []
  );

  const convertToList = (data: any) => {
    return data.map((batch: any) => {
      return {
        value: batch.auto_id ?? "", // Handle null or undefined
        label: batch.batch_name ?? "", // Handle null or undefined
      };
    });
  };

  useEffect(() => {
    setIsMounted(true);
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchBatches(filter);
      setOptions(convertToList(data));
      setLoading(false);
    };
    fetchData();
  }, [filter]);

  return isMounted ? (
    <div>
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Batches</FormLabel>
            <div className="flex items-center justify-center gap-2">
              <Select
                className="w-full"
                onChange={(selectedOptions) => {
                  const values = selectedOptions.map((option) =>
                    option.value.toString()
                  );
                  field.onChange(values);
                }}
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    borderColor: state.isFocused ? "bg-red-600" : "bg-red-600",
                    borderRadius: "0",
                    borderWidth:
                      state.isFocused || state.isMulti ? "1px" : "1px", // Adjust the values as needed
                    fontSize: "14px",
                  }),
                }}
                isMulti
                options={options}
                isOptionDisabled={() =>
                  Array.isArray(field.value) &&
                  field.value.length >= (max ?? Infinity)
                }
              />
              {loading && <Loader size={13} color="black" />}
            </div>

            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  ) : null;
};
