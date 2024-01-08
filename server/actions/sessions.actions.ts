"use server"
import ResponseHandler from "../models/response.model";
import { supabase, supabaseCacheFreeClient } from "../server";
import { revalidatePath } from 'next/cache';
import { errorMessage } from "@/constants/messages";
import { Session } from "../types/sessions.type";

export async function fetchSessions(batchParam?: string): Promise<Session[]> {
    try {
        let query = supabaseCacheFreeClient
            .from('sessions')
            .select(`*, batches(batch_name)`)  // Assuming you have a batches table to join
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


export async function addSession(session: FormData) {
    try {
        const responseHandler = new ResponseHandler<any>();
        const file = session.get('file');

        const response = await fetch(
            "https://eminds.com.au/coursewebfiles/uploadfiles.php",
            {
                method: "POST",
                body: file,
            }
        );


        const jsonResponse = (await response.json()) // Parse and cast to UploadResponse

        if (jsonResponse.success !== true) {
            return responseHandler.setError(
                jsonResponse.message ?? errorMessage,
            );
        }

        /*         const { data, error } = await supabaseCacheFreeClient
                    .from('sessions')
                    .insert([
                        {
                            title: session.title,
                            zoom_link: session.zoom_link,
                            zoom_password: session.zoom_password,
                            batch_auto_id: session.batch_auto_id,
                            course_auto_id: session.course_auto_id,
                            slide_extension: jsonResponse.file_id
                        },
                    ])
                    .select();
        
                if (error != null) {
                    return responseHandler.setError(
                        error.details ?? errorMessage,
                    );
                } */
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
