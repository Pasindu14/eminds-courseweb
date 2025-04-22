"use server";
import ResponseHandler from "../models/response.model";
import { supabase, supabaseCacheFreeClient } from "../server";
import { revalidatePath } from 'next/cache';
import { errorMessage } from "@/constants/messages";
import { SessionProgress } from "../types/sessions-progress.type";

export async function fetchSessionProgress(batchParam?: string): Promise<SessionProgress[]> {
    try {
        let query = supabaseCacheFreeClient
            .from('session_progress')
            .select()
            .order('created_at', { ascending: true });

        if (batchParam) {
            query = query.eq('batch_auto_id', batchParam);
        }

        let { data: sessionProgress, error } = await query;

        if (error) {
            return [];
        }
        return sessionProgress ?? [];
    } catch (error) {
        return [];
    }
}

export async function addSessionProgress(title: string, batchAutoId: string) {
    try {
        const responseHandler = new ResponseHandler();

        const { error } = await supabaseCacheFreeClient
            .from('session_progress')
            .insert([
                {
                    title: title,
                    is_completed: 0, // Assuming default is not completed
                    batch_auto_id: batchAutoId,
                },
            ])
            .select();

        if (error != null) {
            return responseHandler.setError(
                error?.details ?? errorMessage,
            );
        }
        revalidatePath('/admin-session-progress', 'page'); // Adjust path as needed
        return responseHandler.setSuccess("Session progress added successfully");
    } catch (error) {
        throw error;
    }
}

export async function updateSessionProgressCompletion(session_progress_auto_id: number, is_completed: number) {
    try {
        const responseHandler = new ResponseHandler<SessionProgress>();
        const { data, error } = await supabaseCacheFreeClient
            .from('session_progress')
            .update({ is_completed: is_completed })
            .eq('session_progress_auto_id', session_progress_auto_id)
            .select();

        if (error != null) {
            return responseHandler.setError(
                error.details ?? errorMessage,
            );
        }
        revalidatePath('/admin-session-progress', 'page'); // Adjust path as needed
        return responseHandler.setSuccess("Session progress updated successfully", data?.[0]);
    } catch (error) {
        throw error;
    }
}

export async function removeSessionProgress(session_progress_auto_id: number) {
    try {
        const responseHandler = new ResponseHandler();

        const { error } = await supabase
            .from('session_progress')
            .delete()
            .eq('session_progress_auto_id', session_progress_auto_id);

        if (error != null) {
            return responseHandler.setError(
                error.details ?? errorMessage,
            );
        }
        revalidatePath('/admin-session-progress', 'page'); // Adjust path as needed
        return responseHandler.setSuccess("Session progress removed successfully");
    } catch (error) {
        throw error;
    }
}