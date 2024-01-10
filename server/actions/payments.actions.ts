"use server"
import ResponseHandler from "../models/response.model";
import { supabase, supabaseCacheFreeClient } from "../server";
import { errorMessage } from "@/constants/messages";



export async function fetchPaymentLinesWithBatchNo(student_auto_id: number): Promise<PaymentLines[]> {
    try {
        const student = await fetchStudentDetails(student_auto_id)
        const { data, error } = await supabaseCacheFreeClient
            .from('payments_line')
            .select(`
                payments_line_auto_id,
                amount,
                image_url,
                is_admin,
                approve_status,
                payments:payment_hdr_id (
                    student_phone,
                    batch_auto_id,
                    created_at,
                    batches (
                        batch_no,   
                        batch_name 
                    )
                )
            `)
            .eq('payments.student_phone', student.phonenumber).returns<PaymentLines[]>();

        if (error) {
            console.error('Error fetching payment lines with batch no:', error);
            return [];
        }
        console.log(data);
        return data;
    } catch (error) {
        return [];
    }
};

export async function addPaymentByAdmin(paymentParam: any) {

    const responseHandler = new ResponseHandler<any>();

    try {
        for (const studentId of paymentParam.students) {

            const student_auto_id = studentId;
            const amount = paymentParam.amount;
            const batch_auto_id = paymentParam.batch_auto_id;

            const student = await fetchStudentDetails(student_auto_id);

            const phoneNumber = student.phonenumber;

            const payment = await fetchPayment(phoneNumber, batch_auto_id);

            if (payment?.length == 0) {

                const batch = await fetchBatches(batch_auto_id);

                const addPaymentResult = await addPayment(phoneNumber, batch_auto_id, batch.price, amount);

                await addPaymentLineByAdmin(addPaymentResult![0].payment_auto_id, amount);

            } else {

                const batch = await fetchBatches(batch_auto_id);

                const totalAmount = payment![0].current + amount;

                const status = (batch.price == totalAmount) ? 1 : 0;

                if (totalAmount > batch.price) {
                    throw new Error(`Amount exceeds batch price balance is ${batch.price - payment![0].current}`);
                }

                const updatePaymentResult = await updatePayment(phoneNumber, batch_auto_id, totalAmount, status);

                await addPaymentLineByAdmin(updatePaymentResult![0].payment_auto_id, amount);

            }
        }

        return responseHandler.setSuccess("All payments processed successfully");
    } catch (error: any) {
        return responseHandler.setError(
            error.message ?? errorMessage,
        );

    }

}

async function updatePayment(phoneNumber: string, batch_auto_id: number, amount: number, status: number) {

    const { data: payments, error } = await supabaseCacheFreeClient
        .from('payments')
        .update({ student_phone: phoneNumber, batch_auto_id: batch_auto_id, status: status, current: amount })
        .eq('student_phone', phoneNumber)
        .eq('batch_auto_id', batch_auto_id)
        .select()

    if (error) {
        throw new Error(error?.details ?? "Error updating payment");
    }

    return payments;
}

async function addPayment(phoneNumber: string, batch_auto_id: number, price: number, amount: number) {
    let { data: payments, error } = await supabaseCacheFreeClient
        .from('payments')
        .insert([
            { student_phone: phoneNumber, batch_auto_id: batch_auto_id, batch_price: price, status: 0, current: amount },
        ])
        .select();

    if (error) {
        throw new Error(error?.details ?? "Error fetching batch details or batch not found.");
    }

    return payments;
}

async function fetchBatches(batch_auto_id: number) {
    let { data: batch, error } = await supabaseCacheFreeClient
        .from("batches")
        .select("*")
        .eq("auto_id", batch_auto_id)
        .single();

    if (error) {
        throw new Error(error?.details ?? "Error fetching batch details or batch not found.");
    }

    if (batch.price <= 0) {
        throw new Error("Batch price should be greater than 0");
    }

    return batch;
}

async function fetchStudentDetails(auto_id: number) {
    let { data: student, error } = await supabaseCacheFreeClient
        .from("students")
        .select("*")
        .eq("auto_id", auto_id)
        .single();

    if (error) {
        throw new Error(error?.details ?? "Error fetching student details.");
    }

    return student;
}

async function fetchPayment(phoneNumber: string, batch_auto_id: number) {
    let { data: payments, error } = await supabaseCacheFreeClient
        .from('payments')
        .select("*").eq('student_phone', phoneNumber).eq('batch_auto_id', batch_auto_id);

    if (error) {
        throw new Error(error?.details ?? "Error fetching payment details");
    }

    return payments;
}

export async function addPaymentLineByAdmin(payment_hdr: string, price: number) {

    const { error } = await supabaseCacheFreeClient
        .from('payments_line')
        .insert([
            { payment_hdr_id: payment_hdr, amount: price, approve_status: 1, is_admin: 1 },
        ])
        .select()

    if (error) {
        throw new Error(error?.details ?? "Error adding payment line");
    }


}