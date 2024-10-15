"use server";
import ResponseHandler from "../models/response.model";
import { supabase, supabaseCacheFreeClient } from "../server";
import { revalidatePath } from 'next/cache';
import { errorMessage } from "@/constants/messages";
import { StudentMapping } from "../types/student-mapping.type";
import { SpecialSession } from "../types/special-session.type";


export async function fetchSpecialSessions(batchParam?: string): Promise<SpecialSession[]> {
    try {
        let query = supabaseCacheFreeClient
            .from('special_sessions')
            .select(`* , batches!inner(batch_name,auto_id)`)
            .order('auto_id', { ascending: true });


        if (batchParam) {
            query = query.eq('batch_auto_id', batchParam);
        }

        let { data: specialSessions, error } = await query;

        if (error) {
            return [];
        }

        return specialSessions ?? [];
    } catch (error) {
        return [];
    }
}

export async function addSpecialSession(specialSessions: any) {
    try {
        const responseHandler = new ResponseHandler<any>();

        for (const batchId of specialSessions.batches) {

            const { error } = await supabaseCacheFreeClient
                .from('special_sessions')
                .insert([{
                    batch_auto_id: batchId,
                    title: specialSessions.title,
                    video_link: specialSessions.video_link,
                }])
                .single();

            if (error) {
                return responseHandler.setError(error.details ?? errorMessage);
            }
        }

        revalidatePath('/special-session', 'page');
        return responseHandler.setSuccess("Success");
    } catch (error) {
        throw error;
    }
}

export async function removeSpecialSession(auto_id: string) {
    try {
        const responseHandler = new ResponseHandler<any>();

        const { error } = await supabase
            .from('special_sessions')
            .delete()
            .eq('auto_id', auto_id)

        if (error != null) {
            return responseHandler.setError(
                error.details ?? errorMessage,
            );
        }
        revalidatePath('/special-session', 'page');
        return responseHandler.setSuccess("Success");
    } catch (error) {
        throw error;
    }
}