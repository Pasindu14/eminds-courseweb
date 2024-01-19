"use server"
import ResponseHandler from "../models/response.model";
import { supabase, supabaseCacheFreeClient } from "../server";
import { revalidatePath } from 'next/cache';
import { Exam } from "../types/exam.type"; // Assuming you have a corresponding type for exams
import { errorMessage } from "@/constants/messages";

export async function fetchExams(courseParams?: string, batchParam?: string): Promise<Exam[]> {
    try {
        let query = supabaseCacheFreeClient
            .from('exams')
            .select(`*, courses(course_code, course_name), batches(batch_no, batch_name)`)
            .order('exam_auto_id', { ascending: true });

        if (courseParams) {
            query = query.eq('course_code', courseParams);
        }

        if (batchParam) {
            query = query.eq('batch_code', batchParam);
        }

        let { data: exams, error } = await query;

        if (error) {
            return [];
        }

        return exams ?? [];
    } catch (error) {
        return [];
    }
}


export async function addExam(exam: any) {
    try {
        const responseHandler = new ResponseHandler<any>();
        const { data, error } = await supabaseCacheFreeClient
            .from('exams')
            .insert([
                { batch_code: exam.batch_code, course_code: exam.course_code, exam_code: exam.exam_code },
            ])
            .select();
        if (error != null) {
            return responseHandler.setError(
                error.details ?? errorMessage,
            );
        }
        revalidatePath('/exams', 'page'); // Adjust the path as needed
        return responseHandler.setSuccess("Success", data);
    } catch (error) {
        throw error;
    }
}

export async function removeExam(exam_auto_id: string) {
    try {
        const responseHandler = new ResponseHandler<any>();

        const { error } = await supabase
            .from('exams')
            .delete()
            .eq('exam_auto_id', exam_auto_id)

        if (error != null) {
            console.log(error);
            return responseHandler.setError(
                error.details ?? errorMessage,
            );
        }
        revalidatePath('/exams', 'page'); // Adjust the path as needed
        return responseHandler.setSuccess("Success");
    } catch (error) {
        throw error;
    }
}
