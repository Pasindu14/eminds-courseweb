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
import { QuestionForm } from "./_component/question_form";
import { AddQuestionDialog } from "./_component/add_question_dialog";
import { DataTable } from "@/components/datatable";
import { columns } from "./datatable/columns";
import { fetchQuestions } from "@/server/actions/question.actions";

const Questions = async () => {
  const data = await fetchQuestions();
  console.log(data);
  return (
    <div>
      <Card className="w-full rounded-sm">
        <CardHeader>
          <CardTitle className="text-4xl">Questions</CardTitle>
          <CardDescription>
            Efficiently manage and review exam questions, keeping tabs on
            various topics, difficulty levels, and correct answers for
            streamlined exam preparation and assessment
          </CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="pt-4">
          <div className="flex mb-4">
            <AddQuestionDialog />
          </div>

          <DataTable columns={columns} data={data} />
        </CardContent>
        <CardFooter className="flex justify-between"></CardFooter>
      </Card>
    </div>
  );
};

export default Questions;
