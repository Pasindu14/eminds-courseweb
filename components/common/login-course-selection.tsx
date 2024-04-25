import Link from "next/link";
import { Control, useController } from "react-hook-form";

import {
  FormControl,
  FormDescription,
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
import { fetchCourses } from "@/server/actions/course.actions";
import { Course } from "@/server/types/course.type";
import { Loader } from "@/lib/spinners";

type CourseSelectProps = {
  control: Control<any>;
  name: string;
};

const LoginCourseSelection = ({ control, name }: CourseSelectProps) => {
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await fetchCourses();
        setCourses(data);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      } finally {
        setLoading(false);
      }
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
            <div className="flex items-center justify-center gap-2">
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value.toString() ?? "1"}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a course" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {courses.length > 0 ? (
                    courses.map((course) => (
                      <SelectItem
                        key={course.auto_id}
                        value={course.auto_id!.toString()}
                      >
                        {course.course_name}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="-1" disabled>
                      No courses available
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

export default LoginCourseSelection;
