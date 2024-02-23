import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const QuestionTemplate = ({
  data,
  index,
  onAnswerChange,
}: {
  data: any;
  index: number;
  onAnswerChange: (
    questionId: number,
    newAnswer: number,
    isCorrectAnswer: boolean
  ) => void;
}) => {
  return (
    <div className="w-full border-2  border-gray-600/5 min-h-20 mt-4 p-4 rounded-xl bg-blue-300/20">
      <div className="title">
        <p className="text-2xl font-semibold">{`${index + 1}. ${
          data.question
        }`}</p>

        <div className="pl-4 space-y-2 pt-4">
          <RadioGroup
            defaultValue=""
            onValueChange={(value) => {
              onAnswerChange(
                data.question_auto_id,
                Number(value),
                Number(value) === data.correct_answer
              );
            }}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="1" id="1" />
              <Label htmlFor="1">{data.answer_01}</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="2" id="2" />
              <Label htmlFor="2">{data.answer_02}</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="3" id="3" />
              <Label htmlFor="3">{data.answer_03}</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="4" id="4" />
              <Label htmlFor="4">{data.answer_04}</Label>
            </div>
          </RadioGroup>
        </div>
      </div>
    </div>
  );
};

export default QuestionTemplate;
