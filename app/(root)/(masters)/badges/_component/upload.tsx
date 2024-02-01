"use client";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { Control } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

type FileUploadProps = {
  control: Control<any>;
  name: string;
};

const FileUpload = ({ control, name }: FileUploadProps) => {
  return (
    <FormField
      control={control}
      name="title"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Session Title</FormLabel>
          <FormControl>
            <Input
              placeholder="Enter session title..."
              {...field}
              type="file"
              accept=".jpg, .jpeg, .png, .gif, .pdf"
              onChange={field.onChange}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FileUpload;
