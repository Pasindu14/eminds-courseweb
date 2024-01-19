"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { set, useForm, useWatch } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toastError, toastSuccess } from "@/lib/toast/toast";
import { useState } from "react";
import { Loader } from "@/lib/spinners";
import { errorMessage, successMessage } from "@/constants/messages";
import examSelectionSchema from "@/validations/exam.selection.validation";
import ExamSelect from "@/components/common/exam_select";
import { useSession } from "next-auth/react";
import { fetchQuestions } from "@/server/actions/question.actions";
import { Separator } from "@/components/ui/separator";
import { Question } from "@/server/types/question.type";
import QuestionTemplate from "./question_template";
import {
  addExamMarks,
  checkIfExamMarkExists,
} from "@/server/actions/exam-marks.actions";

export function StudentExamSelectionForm() {
  const { data: session }: any = useSession();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitLoading, setsubmitLoading] = useState(false);
  const [qaList, setQaList] = useState<QA[]>([]);

  const form = useForm<z.infer<typeof examSelectionSchema>>({
    resolver: zodResolver(examSelectionSchema),
    defaultValues: {
      exam_auto_id: undefined,
    },
  });
  const examCode = useWatch({
    control: form.control,
    name: "exam_auto_id",
  });
  const updateQA = (
    questionId: number,
    newAnswer: number,
    isCorrectAnswer: boolean
  ) => {
    setQaList((prevQaList) => {
      const isQuestionIdPresent = prevQaList.some(
        (qa) => qa.questionId === questionId
      );

      if (isQuestionIdPresent) {
        return prevQaList.map((qa) =>
          qa.questionId === questionId
            ? { ...qa, answer: newAnswer, isCorrectAnswer: isCorrectAnswer }
            : qa
        );
      } else {
        return [
          ...prevQaList,
          { questionId, answer: newAnswer, isCorrectAnswer: isCorrectAnswer },
        ];
      }
    });
  };

  const getTotalCorrectAnswers = () => {
    return qaList.reduce((total, current) => {
      return current.isCorrectAnswer ? total + 1 : total;
    }, 0);
  };

  async function onSubmit(values: z.infer<typeof examSelectionSchema>) {
    try {
      setLoading(true);
      const phoneNumber = session.phoneNumber;
      const existREsult = await checkIfExamMarkExists(
        phoneNumber,
        values.exam_auto_id
      );

      if (!existREsult.success) {
        toastError(existREsult.message);
        return;
      }
      const result = await fetchQuestions(values.exam_auto_id);
      setQuestions(result);
    } catch (error) {
      toastError(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  if (!session) {
    return (
      <div className="flex gap-4 items-center justify-start">
        <p>Loading please wait....</p>
      </div>
    );
  }

  const submitAnswers = async () => {
    try {
      if (qaList.length !== questions.length) {
        toastError("Please answer all questions");
        return;
      }
      setsubmitLoading(true);
      const phoneNumber = session.phoneNumber;
      const correctAnswers = getTotalCorrectAnswers();
      const result = `${correctAnswers} / ${questions.length}`;

      const submitResult = await addExamMarks({
        studentPhone: phoneNumber,
        examCode: examCode,
        result: result,
      });

      if (!submitResult.success) {
        toastError(submitResult.message);
      } else {
        toastSuccess(successMessage);
        setQuestions([]);
      }
    } catch (error) {
      toastError(errorMessage);
    } finally {
      setsubmitLoading(false);
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <div className="md:flex items-end w-full gap-2">
            <ExamSelect
              control={form.control}
              name="exam_auto_id"
              batch={session?.batchId}
            />

            <Button type="submit" disabled={loading}>
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <p>Select</p>
                  <Loader size={13} />
                </div>
              ) : (
                "Select"
              )}
            </Button>
          </div>
        </form>
      </Form>

      <Separator className="mt-4" />
      <div className="w-full mt-3">
        {questions.map((q: Question, index: number) => (
          <QuestionTemplate
            data={q}
            key={q.question_auto_id}
            index={index}
            onAnswerChange={updateQA}
          />
        ))}
      </div>

      <Separator className="mt-4" />

      {qaList.length === questions.length && qaList.length != 0 && (
        <div className="flex justify-center mt-4">
          <Button
            type="submit"
            disabled={submitLoading}
            onClick={submitAnswers}
          >
            {submitLoading ? (
              <div className="flex items-center justify-center gap-2">
                <p>Submit</p>
                <Loader size={13} />
              </div>
            ) : (
              "Submit"
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
