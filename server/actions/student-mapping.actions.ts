"use server";
import ResponseHandler from "../models/response.model";
import { supabase, supabaseCacheFreeClient } from "../server";
import { revalidatePath } from 'next/cache';
import { errorMessage } from "@/constants/messages";
import { StudentMapping } from "../types/student-mapping.type";


export async function fetchStudentMappings(batchParam?: string): Promise<StudentMapping[]> {
    try {
        let query = supabaseCacheFreeClient
            .from('students_mapping')
            .select(`* , students!inner(name,phonenumber) , batches!inner(batch_name,auto_id)`)
            .order('auto_id', { ascending: true });


        if (batchParam) {
            query = query.eq('batch_auto_id', batchParam);
        }

        let { data: mappings, error } = await query;

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

        for (const studentId of mapping.students) {

            const { data: existingRecords, error: existingError } = await supabaseCacheFreeClient
                .from('students_mapping')
                .select('*')
                .eq('student_auto_id', studentId)
                .eq('batch_auto_id', mapping.batch_auto_id)
                .maybeSingle();

            if (existingError) {
                return responseHandler.setError(existingError.message ?? errorMessage);
            }

            if (!existingRecords) {
                const { error } = await supabaseCacheFreeClient
                    .from('students_mapping')
                    .insert([{
                        student_auto_id: studentId,
                        batch_auto_id: mapping.batch_auto_id,
                        block_status: 1
                    }])
                    .single();

                if (error) {
                    return responseHandler.setError(error.details ?? errorMessage);
                }
            }
        }

        revalidatePath('/student-mappings', 'page');
        return responseHandler.setSuccess("Success");
    } catch (error) {
        throw error;
    }
}


export async function updateMapping(auto_id: number, status: boolean) {

    try {
        const responseHandler = new ResponseHandler<any>();
        const { data, error } = await supabaseCacheFreeClient
            .from('students_mapping')
            .update({
                block_status: status == false ? 1 : 0,
            })
            .eq('auto_id', auto_id)
            .select();

        if (error != null) {
            return responseHandler.setError(
                error.details ?? errorMessage,
            );
        }
        revalidatePath('/jobs', 'page');
        return responseHandler.setSuccess("Success", data);
    } catch (error) {
        throw error;
    }
}

export async function removeMapping(auto_id: string) {
    try {
        const responseHandler = new ResponseHandler<any>();

        const { error } = await supabase
            .from('students_mapping')
            .delete()
            .eq('auto_id', auto_id)

        if (error != null) {
            console.log(error)
            return responseHandler.setError(
                error.details ?? errorMessage,
            );
        }
        revalidatePath('/student-mappings', 'page');
        return responseHandler.setSuccess("Success");
    } catch (error) {
        throw error;
    }
}


