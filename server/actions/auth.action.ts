import { supabaseCacheFreeClient } from "../server";

export async function validateUser(phoneNumber: string, password: string): Promise<any> {
    try {
        let { data: student, error } = await supabaseCacheFreeClient
            .from('students_mapping')
            .select(`* , batches!inner(auto_id,batch_name,password) , students!inner(auto_id,name,phonenumber,email)`)
            .eq('students.phonenumber', phoneNumber).eq('batches.password', password).maybeSingle()

        if (error) {
            return null;
        }
        return student;
    } catch (error) {
        return null;
    }
}
