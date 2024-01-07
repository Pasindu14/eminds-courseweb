"use server"
import { errorMessage } from "@/constants/messages";
import ResponseHandler from "../models/response.model";
import { supabase, supabaseCacheFreeClient } from "../server";
import { Student } from "../types/student.type";
import { revalidatePath } from 'next/cache'

export async function fetchStudents(): Promise<Student[]> {
    try {

        let { data: students, error } = await supabaseCacheFreeClient
            .from('students')
            .select('*').order('auto_id', { ascending: true })

        if (error) {
            return [];
        }

        return students ?? [];
    } catch (error) {
        return [];
    }
}

export async function addStudent(student: any) {
    try {
        const responseHandler = new ResponseHandler<any>();

        // Check if a student with the same phone number already exists
        const { data: existingStudent, error: searchError } = await supabaseCacheFreeClient
            .from('students')
            .select('phonenumber')
            .eq('phonenumber', student.phoneNumber)
            .single();

        if (searchError) {
            return responseHandler.setError(
                searchError.details ?? errorMessage,
            );
        }

        if (existingStudent) {
            return responseHandler.setError("A student with this phone number already exists.");
        }

        // If no existing student, proceed with insertion
        const { data, error } = await supabaseCacheFreeClient
            .from('students')
            .insert([
                { name: student.name, phonenumber: student.phoneNumber, address: student.address, nic: student.nic, email: student.email, birthday: student.birthDay },
            ])
            .select();

        if (error != null) {
            return responseHandler.setError(
                error.details ?? errorMessage,
            );
        }

        revalidatePath('/students', 'page');
        return responseHandler.setSuccess("Success", data);

    } catch (error) {
        throw error;
    }
}




export async function updateStudent(auto_id: string, student: any) {
    try {
        const responseHandler = new ResponseHandler<any>();
        console.log(auto_id, student.auto_id);
        const { data, error } = await supabaseCacheFreeClient
            .from('students')
            .update({ name: student.name, phonenumber: student.phoneNumber, address: student.address, nic: student.nic, email: student.email, birthday: student.birthDay })
            .eq('auto_id', student.auto_id)
            .select()
        if (error != null) {
            return responseHandler.setError(
                error.details ?? errorMessage,
            );
        }

        revalidatePath('/students', 'page')
        return responseHandler.setSuccess("Succes", data);

    } catch (error) {
        throw error
    }
}
