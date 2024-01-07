"use server";
import ResponseHandler from "../models/response.model";
import { supabase, supabaseCacheFreeClient } from "../server";
import { revalidatePath } from 'next/cache';
import { errorMessage } from "@/constants/messages";
import { StudentMapping } from "../types/student-mapping.type";

export async function fetchStudentMappings(): Promise<StudentMapping[]> {
    try {
        let { data: mappings, error } = await supabaseCacheFreeClient
            .from('students_mapping')
            .select(`*`)
            .order('auto_id', { ascending: true });

        if (error) {
            return [];
        }

        return mappings ?? [];
    } catch (error) {
        return [];
    }
}

export async function addStudentMapping(mapping: any) {
    try {
        const responseHandler = new ResponseHandler<any>();
        console.log(mapping);

        mapping.students.forEach(async (element: any) => {
            const { data, error } = await supabaseCacheFreeClient
                .from('students_mapping')
                .insert([{
                    student_auto_id: element,
                    batch_auto_id: mapping.batch_auto_id,

                }])
                .select();

            console.log(error);
            if (error != null) {
                return responseHandler.setError(
                    error.details ?? errorMessage,
                );
            }
        });


        revalidatePath('/student-mappings', 'page');
        return responseHandler.setSuccess("Success");
    } catch (error) {
        throw error;
    }
}

export async function updateStudentMapping(auto_id: string, mapping: any) {
    try {
        const responseHandler = new ResponseHandler<any>();
        const { data, error } = await supabaseCacheFreeClient
            .from('students_mapping')
            .update(mapping)
            .eq('auto_id', auto_id)
            .select();

        if (error != null) {
            return responseHandler.setError(
                error.details ?? errorMessage,
            );
        }
        revalidatePath('/student-mappings', 'page');
        return responseHandler.setSuccess("Success", data);
    } catch (error) {
        throw error;
    }
}
