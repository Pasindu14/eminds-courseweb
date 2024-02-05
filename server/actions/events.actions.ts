"use server"
import ResponseHandler from "../models/response.model";
import { supabase, supabaseCacheFreeClient } from "../server";
import { revalidatePath } from 'next/cache';
import { errorMessage } from "@/constants/messages";
import { Event } from "../types/events.type";
import { uploadFile } from "./file.actions";

export async function fetchEvents(): Promise<Event[]> {
    try {
        let { data: events, error } = await supabaseCacheFreeClient
            .from('events')
            .select(`*`)
            .eq('status', 1)
            .order('event_auto_id', { ascending: true });

        if (error) {
            return [];
        }
        return events ?? [];
    } catch (error) {
        return [];
    }
}

export async function addEvent(event: FormData, fileFormData: FormData) {
    try {
        const responseHandler = new ResponseHandler<any>();

        const jsonResponse = await uploadFile(fileFormData);

        if (jsonResponse.success !== true) {
            return responseHandler.setError(
                jsonResponse.message ?? errorMessage,
            );
        }

        const name = event.get('name');
        const description = event.get('description');
        const link = event.get('link');
        const status = event.get('status') ?? false as boolean;
        const fileId = jsonResponse.file_id;
        const date = event.get('date');

        console.log(status)

        const { data, error } = await supabaseCacheFreeClient
            .from('events')
            .insert([
                {
                    name: name,
                    description: description,
                    link: link,
                    status: status == "true" ? 1 : 0,
                    image: fileId,
                    date: date
                },
            ])
            .select();

        if (error != null) {
            return responseHandler.setError(
                error.details ?? errorMessage,
            );
        }
        revalidatePath('/events', 'page');
        return responseHandler.setSuccess("Success", "data");
    } catch (error) {
        throw error;
    }
}

export async function updateEvent(eventId: number, event: FormData, fileFormData?: FormData) {
    try {
        const responseHandler = new ResponseHandler<any>();
        let fileId;

        // Only attempt to upload if fileFormData is provided
        if (fileFormData) {

            console.log(fileFormData)
            const jsonResponse = await uploadFile(fileFormData);

            if (jsonResponse.success !== true) {
                return responseHandler.setError(
                    jsonResponse.message ?? errorMessage,
                );
            }

            fileId = jsonResponse.file_id; // This is the updated image/file ID
        }

        const name = event.get('name');
        const description = event.get('description');
        const link = event.get('link');
        const status = event.get('status') === 'true'; // Ensure 'status' is treated as a boolean
        const date = event.get('date');

        // Prepare the update object, conditionally include 'image' field
        const updateObject = {
            name: name,
            description: description,
            link: link,
            status: status ? 1 : 0, // Convert boolean to 1 or 0
            date: date,
            ...(fileId && { image: fileId }), // Spread operator to conditionally add image field
        };

        const { data, error } = await supabaseCacheFreeClient
            .from('events')
            .update(updateObject)
            .match({ event_auto_id: eventId }) // Use `.match` to specify which event to update
            .select();

        if (error != null) {
            return responseHandler.setError(
                error.details ?? errorMessage,
            );
        }
        revalidatePath('/events', 'page');
        return responseHandler.setSuccess("Event updated successfully", data);
    } catch (error) {
        throw error;
    }
}


export async function deleteEvent(eventId: string) {
    const responseHandler = new ResponseHandler<any>();

    try {
        const { data, error } = await supabaseCacheFreeClient
            .from('events')
            .delete()
            .eq('event_auto_id', eventId)
            .select();

        if (error) {
            return responseHandler.setError(error.message ?? errorMessage);
        }
        revalidatePath('/events', 'page');
        return responseHandler.setSuccess("Event deleted successfully");

    } catch (error) {
        return responseHandler.setError(errorMessage);
    }
}