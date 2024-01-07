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

type MultiSelectProps = {
  control: Control<any>;
  name: string;
};

export const MultiSelect = ({ control, name }: MultiSelectProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [options, setOptions] = useState<{ value: string; label: string }[]>(
    []
  );

  const convertToList = (data: any) => {
    return data.map((student: any) => {
      return {
        value: student.auto_id ?? "", // Handle null or undefined
        label: student.name ?? "", // Handle null or undefined
      };
    });
  };

  useEffect(() => {
    setIsMounted(true);
    const fetchData = async () => {
      const data = await fetchStudents();
      setOptions(convertToList(data));
    };
    fetchData();
  }, []);

  return isMounted ? (
    <div>
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Students</FormLabel>

            <Select
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
                  borderWidth: state.isFocused || state.isMulti ? "1px" : "1px", // Adjust the values as needed
                  fontSize: "14px",
                }),
              }}
              isMulti
              options={options}
            />

            <FormMessage />
          </FormItem>
        )}
      />
      <FormLabel>Students</FormLabel>
    </div>
  ) : null;
};
