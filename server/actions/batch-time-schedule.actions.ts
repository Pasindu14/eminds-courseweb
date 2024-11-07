"use server"
import ResponseHandler from "../models/response.model";
import { supabase, supabaseCacheFreeClient } from "../server";
import { revalidatePath } from 'next/cache';
// Ensure you have this type defined
import { errorMessage } from "@/constants/messages";
import { BatchTimeSchedule } from "../types/batch-time-schedule";

// Fetch all batch time schedules
// Fetch all batch time schedules with an optional batch parameter for filtering
export async function fetchBatchTimeSchedules(batchParam?: string): Promise<BatchTimeSchedule[]> {
    try {
        let query = supabaseCacheFreeClient
            .from('batch_time_schedule')
            .select('*, batches (batch_no, batch_name)')
            .order('auto_id', { ascending: true });

        // Apply filter if batchParam is provided
        if (batchParam) {
            query = query.eq('batch_auto_id', batchParam);
        }

        let { data: schedules, error } = await query;

        if (error) {
            return [];
        }

        return schedules ?? [];
    } catch (error) {
        return [];
    }
}


// Add a new batch time schedule
export async function addBatchTimeSchedule(schedule: any) {
    try {
        const responseHandler = new ResponseHandler<any>();
        for (const dateItem of schedule.dates) {
            const { data, error } = await supabaseCacheFreeClient
                .from('batch_time_schedule')
                .insert([{
                    batch_auto_id: schedule.batch_auto_id,
                    date: dateItem,
                }])
                .select();

            if (error != null) {
                return responseHandler.setError(
                    error.details ?? errorMessage,
                );
            }

        }

        revalidatePath('/batch-time-schedule', 'page'); // Adjust path if needed
        return responseHandler.setSuccess("Success");
    } catch (error) {
        throw error;
    }
}


// Delete a batch time schedule by auto_id
export async function removeBatchTimeSchedule(auto_id: string) {
    try {
        const responseHandler = new ResponseHandler<any>();

        const { error } = await supabaseCacheFreeClient
            .from('batch_time_schedule')
            .delete()
            .eq('auto_id', auto_id);

        if (error != null) {
            return responseHandler.setError(
                error.details ?? errorMessage,
            );
        }

        revalidatePath('/batch-time-schedule', 'page'); // Adjust path if needed
        return responseHandler.setSuccess("Success");
    } catch (error) {
        throw error;
    }
}
