"use server"

import { errorMessage } from "@/constants/messages";
import ResponseHandler from "../models/response.model";
import { supabaseCacheFreeClient } from "../server";

export async function addExamMarks(examMarks: any) {
    try {
        const responseHandler = new ResponseHandler<any>();
        const { data, error } = await supabaseCacheFreeClient
            .from('exam_marks')
            .insert([
                {
                    student_phone: examMarks.studentPhone,
                    exam_code: examMarks.examCode,
                    result: examMarks.result
                },
            ])
            .select();

        if (error != null) {
            return responseHandler.setError(
                error.details ?? errorMessage,
            );
        }
        return responseHandler.setSuccess("Success", data);
    } catch (error) {
        throw error;
    }
}

export async function checkIfExamMarkExists(studentPhone: string, examCode: string) {
    const responseHandler = new ResponseHandler<any>();
    try {
        const { data, error } = await supabaseCacheFreeClient
            .from('exam_marks')
            .select()
            .eq('student_phone', studentPhone)
            .eq('exam_code', examCode)
            .maybeSingle();

        if (error) {
            return responseHandler.setError(error.message ?? errorMessage);
        }

        if (data != null) {
            return responseHandler.setError("Exam already submitted");
        }

        return responseHandler.setSuccess("No data found", data);
    } catch (error) {
        return responseHandler.setError(errorMessage);
    }
}

export async function fetchAllExamResults(studentPhone: string) {

    try {
        const { data, error } = await supabaseCacheFreeClient
            .from('exam_marks')
            .select(`* , exams(exam_code)`)
            .eq('student_phone', studentPhone);

        if (error) {

            return [];
        }

        return data;
    } catch (error) {
        return [];
    }
}


export async function fetchMarksByExamId(examCode: string) {
    try {
        const { data, error } = await supabaseCacheFreeClient
            .from('exam_marks')
            .select()
            .eq('exam_code', examCode)
            .maybeSingle();

        if (error) {
            return [];
        }

        return data;
    } catch (error) {
        return [];
    }
}