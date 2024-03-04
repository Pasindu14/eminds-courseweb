"use server"
import ResponseHandler from "../models/response.model";
import { supabase, supabaseCacheFreeClient } from "../server";
import { revalidatePath } from 'next/cache';
import { errorMessage } from "@/constants/messages";
import { Session } from "../types/sessions.type";
import { uploadFile } from "./file.actions";

export async function fetchSessions(batchParam?: string): Promise<Session[]> {
    try {
        let query = supabaseCacheFreeClient
            .from('sessions')
            .select(`*, batches(batch_name,batch_no)`)
            .order('session_auto_id', { ascending: true });

        if (batchParam) {
            query = query.eq('batch_auto_id', batchParam);
        }

        let { data: sessions, error } = await query;

        if (error) {
            return [];
        }
        return sessions ?? [];
    } catch (error) {
        return [];
    }
}

export async function fetchSessionsByBatchId(batch_auto_id: number): Promise<Session[]> {
    try {
        let { data: sessions, error } = await supabaseCacheFreeClient
            .from('sessions')
            .select()
            .order('session_auto_id', { ascending: true }).eq('batch_auto_id', batch_auto_id);

        if (error) {
            return [];
        }
        return sessions ?? [];
    } catch (error) {
        return [];
    }
}

export async function addSession(session: FormData, fileFormData: FormData) {
    try {
        const responseHandler = new ResponseHandler<any>();

        throw new Error('Not implemented');
        const jsonResponse = await uploadFile(fileFormData);

        if (jsonResponse.success !== true) {
            return responseHandler.setError(
                jsonResponse.message ?? errorMessage,
            );
        }

        const title = session.get('title');
        const zoomLink = session.get('zoom_link');
        const zoomPassword = session.get('zoom_password');
        const batchAutoId = session.get('batch_auto_id');
        const courseAutoId = session.get('course_auto_id');

        const fileId = jsonResponse.file_id;


        const { data, error } = await supabaseCacheFreeClient
            .from('sessions')
            .insert([
                {
                    title: title,
                    zoom_link: zoomLink,
                    zoom_password: zoomPassword,
                    batch_auto_id: batchAutoId,
                    course_auto_id: courseAutoId,
                    new_url: fileId
                },
            ])
            .select();

        if (error != null) {
            return responseHandler.setError(
                error?.details ?? errorMessage,
            );
        }
        revalidatePath('/sessions', 'page');
        return responseHandler.setSuccess("Success", "data");
    } catch (error) {
        throw error;
    }
}

export async function removeSession(session_auto_id: string) {
    try {
        const responseHandler = new ResponseHandler<any>();

        const { error } = await supabase
            .from('sessions')
            .delete()
            .eq('session_auto_id', session_auto_id)

        if (error != null) {
            console.log(error);
            return responseHandler.setError(
                error.details ?? errorMessage,
            );
        }
        revalidatePath('/sessions', 'page'); // Adjust the path as needed
        return responseHandler.setSuccess("Success");
    } catch (error) {
        throw error;
    }
}
