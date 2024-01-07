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
import { Exam } from "@/server/types/exam.type";
import { fetchExams } from "@/server/actions/exams.actions";
import { Loader } from "@/lib/spinners";

type ExamSelectProps = {
  control: Control<any>; // Use a more specific type instead of 'any' if available
  name: string;
  batch?: string;
  course?: string;
};

const ExamSelect = ({ control, name, batch, course }: ExamSelectProps) => {
  const [loading, setLoading] = useState(false);
  const [exams, setExams] = useState<Exam[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchExams(course, batch);
      setExams(data);
      setLoading(false);
    };

    fetchData();
  }, [course, batch]);

  return (
    <div>
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Batch</FormLabel>
            <div className="flex items-center justify-center gap-2">
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a exam" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {exams.length > 0 ? (
                    exams.map((exam) => (
                      <SelectItem
                        key={exam.exam_auto_id}
                        value={exam.exam_auto_id!.toString()}
                      >
                        {exam.exam_code}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="-1" disabled>
                      No exams available
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

export default ExamSelect;
