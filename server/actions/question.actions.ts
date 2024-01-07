"use server";
import ResponseHandler from "../models/response.model";
import { supabase, supabaseCacheFreeClient } from "../server";
import { revalidatePath } from 'next/cache';
import { Question } from "../types/question.type"; // Assuming you have a corresponding type for questions
import { errorMessage } from "@/constants/messages";

export async function fetchQuestions(): Promise<Question[]> {
    try {
        let { data: questions, error } = await supabaseCacheFreeClient
            .from('questions')
            .select(`* , courses (course_code,course_name) , batches(batch_no,batch_name),exams (exam_code)`).order('question_auto_id', { ascending: true });

        if (error) {
            return [];
        }
        return questions ?? [];
    } catch (error) {
        return [];
    }
}

export async function addQuestion(question: any) {
    try {
        const responseHandler = new ResponseHandler<any>();
        const { data, error } = await supabaseCacheFreeClient
            .from('questions')
            .insert([
                {
                    course_code: question.course_code,
                    batch_code: question.batch_code,
                    exam_code: question.exam_code,
                    question: question.question,
                    answer_01: question.answer_01,
                    answer_02: question.answer_02,
                    answer_03: question.answer_03,
                    answer_04: question.answer_04,
                    correct_answer: question.correct_answer
                },
            ])
            .select();
        if (error != null) {
            return responseHandler.setError(
                error.details ?? errorMessage,
            );
        }
        revalidatePath('/questions', 'page'); // Adjust the path as needed
        return responseHandler.setSuccess("Success", data);
    } catch (error) {
        throw error;
    }
}

export async function removeQuestion(question_auto_id: string) {
    try {
        const responseHandler = new ResponseHandler<any>();

        const { error } = await supabase
            .from('questions')
            .delete()
            .eq('question_auto_id', question_auto_id)

        if (error != null) {
            console.log(error);
            return responseHandler.setError(
                error.details ?? errorMessage,
            );
        }
        revalidatePath('/questions', 'page'); // Adjust the path as needed
        return responseHandler.setSuccess("Success");
    } catch (error) {
        throw error;
    }
}
