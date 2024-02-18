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
            .maybeSingle();

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

export async function fetchStudentDetails(auto_id: number) {
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


export async function fetchStudentByPhoneNumber(phoneNumber: string) {
    try {
        const responseHandler = new ResponseHandler<Student>();

        const { data, error } = await supabaseCacheFreeClient
            .from('students')
            .select()
            .eq('phonenumber', phoneNumber)
            .maybeSingle();

        if (error) {
            return responseHandler.setError(error.message ?? errorMessage);
        }

        return data;

    } catch (error) {
        throw error;
    }
}

export async function fetchStudentByAutoid(id: string) {
    try {
        const responseHandler = new ResponseHandler<Student>();

        const { data, error } = await supabaseCacheFreeClient
            .from('students')
            .select()
            .eq('auto_id', id)
            .maybeSingle();

        if (error) {
            return responseHandler.setError(error.message ?? errorMessage);
        }

        return data;

    } catch (error) {
        throw error;
    }
}

export async function updateStudent(auto_id: string, student: any) {
    try {
        const responseHandler = new ResponseHandler<any>();
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
