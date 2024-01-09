"use server"
import ResponseHandler from "../models/response.model";
import { supabase, supabaseCacheFreeClient } from "../server";
import { errorMessage } from "@/constants/messages";

export async function addPayment(phoneNumber: string, batch_auto_id: number, amount: number) {
    try {

        const responseHandler = new ResponseHandler<any>();

        let { data: payments, error } = await supabaseCacheFreeClient
            .from('payments')
            .select("*").eq('student_phone', phoneNumber).eq('batch_auto_id', batch_auto_id);

        if (error != null) {
            return responseHandler.setError(
                error.details ?? errorMessage,
            );
        }

        if ((payments?.length ?? 0) == 0) {
            const { data, error } = await supabase
                .from('payments')
                .insert([
                    { student_phone: phoneNumber },
                    { batch_auto_id: batch_auto_id },
                ])
                .select()
        }


        //revalidatePath('/batches', 'page');
        return responseHandler.setSuccess("Success", payments);

        return payments ?? [];
    } catch (error) {
        return [];
    }
}