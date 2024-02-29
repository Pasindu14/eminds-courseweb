"use server"
import { revalidatePath } from "next/cache";
import ResponseHandler from "../models/response.model";
import { supabase, supabaseCacheFreeClient } from "../server";
import { errorMessage } from "@/constants/messages";
import { uploadFile } from "./file.actions";
import { fetchStudentDetails } from "./student.actions";


export async function fetchPaymentLinesWithBatchNo(batch_auto_id?: number, student_auto_id?: number, pending?: number): Promise<PaymentLines[]> {
    try {
        let query = supabaseCacheFreeClient
            .from('payments_line')
            .select(`
                payments_line_auto_id,
                amount,
                image_url,
                image_ext,
                is_admin,
                approve_status,
                created_at,
                payments!inner (
                    student_phone,
                    batch_auto_id,
                    created_at,
                    batches (
                        batch_no,   
                        batch_name 
                    )
                )
            `).order('created_at', { ascending: false })


        if (batch_auto_id != undefined) {
            query = query.eq('payments.batch_auto_id', batch_auto_id);
        }

        if (student_auto_id != undefined) {
            const student = await fetchStudentDetails(student_auto_id);
            query = query.eq('payments.student_phone', student.phonenumber);
        }

        if (pending != undefined) {
            query = query.eq('approve_status', pending);
        }


        const { data, error } = await query.returns<PaymentLines[]>();

        if (error) {
            console.error('Error fetching payment lines with batch no:', error);
            return [];
        }
        return data;
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
};

export async function fetchAllPaymentsForReport(batch_auto_id?: number, course_auto_id?: number): Promise<Payment[]> {
    try {
        let query = supabaseCacheFreeClient
            .from('payments')
            .select(`
                    student_phone,
                    batch_auto_id,
                    created_at,
                    batch_price,
                    current,
                    batches (
                        batch_no,   
                        batch_name,
                        course_auto_id,
                        courses (auto_id,course_code)
                    )`
            ).order('created_at', { ascending: false });

        if (batch_auto_id) {
            query = query.eq('batch_auto_id', batch_auto_id);
        }

        if (course_auto_id) {
            query = query.eq('batches.course_auto_id', course_auto_id);
        }
        const { data, error } = await query.returns<Payment[]>();

        if (error) {
            console.error('Error fetching payment lines with batch no:', error);
            return [];
        }

        let filteredData = data;
        filteredData = data?.filter(item =>
            item.batches != null
        );
        return filteredData;

    } catch (error) {
        console.error('Error:', error);
        return [];
    }
};

export async function addPaymentsByStudent(paymentData: FormData, fileFormData: FormData) {
    const responseHandler = new ResponseHandler<any>();
    try {


        const batchAutoId = paymentData.get('batch_auto_id');
        const amount = paymentData.get('amount');
        const studentId = paymentData.get('student_auto_id');

        const paymentParam = {
            batch_auto_id: batchAutoId,
            amount: Number(amount),
            students: [studentId],
        };

        const result = await addPaymentByUser(paymentParam, 'STUDENT', fileFormData);

        if (result.success) {

            revalidatePath('/student-payment', 'page');
            return responseHandler.setSuccess("All payments processed successfully");
        } else {
            return responseHandler.setError(
                result.message ?? errorMessage,
            );
        }
    } catch (error: any) {
        return responseHandler.setError(
            error.message ?? errorMessage,
        );
    }
}

export async function addPaymentByUser(paymentParam: any, role: string, fileFormData?: FormData) {

    const responseHandler = new ResponseHandler<any>();

    try {
        for (const studentId of paymentParam.students) {

            const student_auto_id = studentId;
            const amount = paymentParam.amount;
            const batch_auto_id = paymentParam.batch_auto_id;
            let image_url = "";

            const student = await fetchStudentDetails(student_auto_id);

            const phoneNumber = student.phonenumber;

            const payment = await fetchPayment(phoneNumber, batch_auto_id);

            if (payment?.length == 0) {

                const batch = await fetchBatches(batch_auto_id);

                const addPaymentResult = await addPayment(phoneNumber, batch_auto_id, batch.price, amount);


                if (fileFormData) {
                    const jsonResponse = await uploadFile(fileFormData);

                    if (jsonResponse.success !== true) {
                        return responseHandler.setError(
                            jsonResponse.message ?? errorMessage,
                        );
                    }

                    image_url = jsonResponse.file_id;
                }


                await addPaymentLines(addPaymentResult![0].payment_auto_id, amount, role, image_url);

            } else {

                const batch = await fetchBatches(batch_auto_id);

                const totalAmount = payment![0].current + amount;

                const status = (batch.price == totalAmount) ? 1 : 0;

                if (totalAmount > batch.price) {
                    throw new Error(`Amount exceeds batch price balance is ${batch.price - payment![0].current}`);
                }

                const updatePaymentResult = await updatePayment(phoneNumber, batch_auto_id, totalAmount, status);

                if (fileFormData) {
                    const jsonResponse = await uploadFile(fileFormData);

                    if (jsonResponse.success !== true) {
                        return responseHandler.setError(
                            jsonResponse.message ?? errorMessage,
                        );
                    }

                    image_url = jsonResponse.file_id;
                }

                await addPaymentLines(updatePaymentResult![0].payment_auto_id, amount, role, image_url);

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

export async function updatePaymentLine(payments_line_auto_id: string) {
    const responseHandler = new ResponseHandler<any>();

    try {
        const { data, error } = await supabaseCacheFreeClient
            .from('payments_line')
            .update({ approve_status: 1 })
            .eq('payments_line_auto_id', payments_line_auto_id)
            .select()

        if (error) {
            return responseHandler.setError(
                error.message ?? errorMessage,
            );

        }

        return responseHandler.setSuccess("All payments processed successfully");
    } catch (error: any) {
        return responseHandler.setError(
            error.message ?? errorMessage,
        );
    }
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


async function fetchPayment(phoneNumber: string, batch_auto_id: number) {
    let { data: payments, error } = await supabaseCacheFreeClient
        .from('payments')
        .select("*").eq('student_phone', phoneNumber).eq('batch_auto_id', batch_auto_id);

    if (error) {
        throw new Error(error?.details ?? "Error fetching payment details");
    }

    return payments;
}

export async function addPaymentLines(payment_hdr: string, price: number, role: string, imageUrl?: string) {

    const { error } = await supabaseCacheFreeClient
        .from('payments_line')
        .insert([
            { payment_hdr_id: payment_hdr, amount: price, approve_status: (role == "STUDENT" ? 0 : 1), is_admin: role == "STUDENT" ? 0 : 1, image_url: imageUrl ?? "" },
        ])
        .select()

    if (error) {
        throw new Error(error?.details ?? "Error adding payment line");
    }


}

export async function fetchPendingApprovalPayments() {

    let { count } = await supabaseCacheFreeClient
        .from('payments_line')
        .select('*', { count: 'exact' })
        .eq('approve_status', 0)

    return count;

}