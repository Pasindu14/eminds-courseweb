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
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event: any) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async (event: any) => {
    event.preventDefault();
    if (!selectedFile) {
      console.log("No file selected.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch(
        "https://eminds.com.au/coursewebfiles/uploadfiles.php",
        {
          method: "POST",
          body: formData,
        }
      );
      console.log(response);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.text();
      console.log("File uploaded successfully:", result);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

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
