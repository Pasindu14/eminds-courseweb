"use server"
import ResponseHandler from "../models/response.model";
import { supabase, supabaseCacheFreeClient } from "../server";
import { revalidatePath } from 'next/cache';
import { Batch } from "../types/batch.type";
import { errorMessage } from "@/constants/messages";

export async function fetchBatches(courseParam?: string): Promise<Batch[]> {
    try {
        let query = supabaseCacheFreeClient
            .from('batches')
            .select(`*, courses(course_code, course_name)`)
            .order('auto_id', { ascending: true });

        if (courseParam) {
            query = query.eq('course_auto_id', courseParam);
        }

        let { data: batches, error } = await query;

        if (error) {
            return [];
        }

        return batches ?? [];
    } catch (error) {
        return [];
    }
}


export async function fetchBatchByPassword(
    password: string
) {
    try {
        const { data: batch, error } = await supabaseCacheFreeClient
            .from('batches')
            .select()
            .eq('password', password)
            .maybeSingle()
        if (error) {
            return null;
        }


        return batch ?? null;
    } catch (error) {
        return null;
    }
}


export async function addBatch(batch: any) {

    try {
        const responseHandler = new ResponseHandler<any>();
        const { data, error } = await supabaseCacheFreeClient
            .from('batches')
            .insert([
                {
                    batch_no: batch.batch_no,
                    batch_name: batch.batch_name,
                    zoom_link: batch.zoom_link,
                    course_auto_id: batch.course_auto_id,
                    start_date: batch.start_date,
                    end_date: batch.end_date,
                    status: batch.status,
                    password: batch.password,
                    price: batch.price
                },
            ])
            .select();

        console.log(error)
        if (error != null) {
            return responseHandler.setError(
                error.details ?? errorMessage,
            );
        }
        revalidatePath('/batches', 'page');
        return responseHandler.setSuccess("Success", data);
    } catch (error) {
        throw error;
    }
}

export async function updateBatch(auto_id: string, batch: any) {

    try {
        const responseHandler = new ResponseHandler<any>();
        const { data, error } = await supabaseCacheFreeClient
            .from('batches')
            .update({
                batch_no: batch.batch_no,
                batch_name: batch.batch_name,
                zoom_link: batch.zoom_link,
                course_auto_id: batch.course_auto_id,
                start_date: batch.start_date,
                end_date: batch.end_date,
                status: batch.status,
                password: batch.password,
                price: batch.price
            })
            .eq('auto_id', auto_id)
            .select();
        if (error != null) {
            return responseHandler.setError(
                error.details ?? errorMessage,
            );
        }
        revalidatePath('/batches', 'page');
        return responseHandler.setSuccess("Success", data);
    } catch (error) {
        throw error;
    }
}

