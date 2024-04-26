import { supabaseCacheFreeClient } from "../server";
import { StudentMapping } from "../types/student-mapping.type";


export async function validateStudent(phoneNumber: string, password: string): Promise<any> {
    try {
        let { data: student, error } = await supabaseCacheFreeClient
            .from('students_auth')
            .select(`*`)
            .eq('phone_number', phoneNumber).maybeSingle();

        if (error) {
            throw error;
        }

        if (student == null) {
            return null;
        }

        if (student.password != password) {
            throw new Error('Invalid credentials please try again!');
        }

        return student;
    } catch (error) {
        throw error;

    }
}

export async function fetchStudentMappingsByAutoId(studentAutoId: string): Promise<StudentMapping[]> {
    try {
        let query = supabaseCacheFreeClient
            .from('students_mapping')
            .select(`* , students!inner(name,phonenumber) , batches!inner(batch_name,password,auto_id,courses!inner(course_name,course_code,auto_id))`)
            .order('auto_id', { ascending: true });


        if (studentAutoId) {
            query = query.eq('student_auto_id', studentAutoId);
        }

        let { data: mappings, error } = await query;

        if (error) {
            return [];
        }

        return mappings ?? [];
    } catch (error) {
        return [];
    }
}