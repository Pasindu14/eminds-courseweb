"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { fetchJobs, fetchJobsForStudents } from "@/server/actions/jobs.actions";
import { Button } from "@/components/ui/button";

const Badges = () => {
  const generateHtmlContent = () => {
    // Your HTML content goes here
    // You can generate it dynamically based on your application data
    return `
            <!DOCTYPE html>
            <html>
            <head>
                <title>My Page</title>
            </head>
            <body>
                <h1>This is my HTML content</h1>
            </body>
            </html>
        `;
  };

  const downloadHtmlFile = () => {
    const content = generateHtmlContent();
    const blob = new Blob([content], { type: "text/html" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "mypage.html";
    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <Card className="w-full rounded-sm">
        <CardHeader>
          <CardTitle className="text-4xl">Badges</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="pt-4">
          <Button onClick={downloadHtmlFile}>Download</Button>
        </CardContent>
        <CardFooter className="flex justify-between"></CardFooter>
      </Card>
    </div>
  );
};

export default Badges;
