import { supabaseCacheFreeClient } from "../server";

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

export async function fetchStudentMappingsByAutoId(studentAutoId: string): Promise<any[]> {
    try {
        let query = supabaseCacheFreeClient
            .from('students_mapping')
            .select(`* , students!inner(name,phonenumber) , batches!inner(end_date,batch_name,password,auto_id,courses!inner(course_name,course_code,auto_id))`)
            .order('auto_id', { ascending: true });

        if (studentAutoId) {
            query = query.eq('student_auto_id', studentAutoId);
        }

        let { data: mappings, error } = await query;

        if (error || !mappings) {
            return [];
        }

        // Filter out mappings where batch end_date is more than 60 days ago
        const filteredMappings = mappings.filter(mapping => {
            if (mapping.batches && mapping.batches.end_date) {
                const endDate = new Date(mapping.batches.end_date);
                const sixtyDaysAgo = new Date();
                sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60);
                return endDate >= sixtyDaysAgo;
            }
            return true;
        });

        return filteredMappings;
    } catch (error) {
        return [];
    }
}

export async function resetPassword(phoneNumber: string, studentAutoId: number): Promise<any> {
    try {
        const { data, error, count } = await supabaseCacheFreeClient
            .from('students_auth')
            .update({ password: 'abc@123' })
            .eq('phone_number', phoneNumber).select();

        if (error) {
            throw error;  // If there's a system error, throw it
        }

        if (data.length === 0) {
            const { error: insertError } = await supabaseCacheFreeClient
                .from('students_auth')
                .insert({
                    phone_number: phoneNumber,
                    password: 'abc@123',
                    student_auto_id: studentAutoId,
                });

            if (insertError) throw new Error("Error occured while resetting student auth");
        }

        return data; // Optionally return the data if needed

    } catch (error) {
        throw error; // Propagate the error further
    }
}


export async function fetchFingerprintData(autoId: string): Promise<any> {
    const { data: fingerprint, error } = await
        supabaseCacheFreeClient
            .from('fingerprint')
            .select("*").eq('user_id', autoId).maybeSingle();

    if (!error) {
        return fingerprint;
    }


}