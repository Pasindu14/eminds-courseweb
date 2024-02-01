
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
        const updateResult = await updateLoginActivity(phoneNumber);

        if (updateResult == null) {
            return null;
        }
        return student;
    } catch (error) {
        return null;
    }
}



export async function updateLoginActivity(phoneNumber: string): Promise<any> {

    let { data: user_login_activity, error } = await supabaseCacheFreeClient
        .from('user_login_activity')
        .select('times_logged_in')
        .eq('user_phone', phoneNumber)
        .maybeSingle();


    if (error) {
        return null;
    }

    if (user_login_activity) {
        return await supabaseCacheFreeClient
            .from('user_login_activity')
            .update({ times_logged_in: user_login_activity.times_logged_in + 1 })
            .eq('user_phone', phoneNumber);

    } else {
        return await supabaseCacheFreeClient
            .from('user_login_activity')
            .insert({
                user_phone: phoneNumber,
                times_logged_in: 1
            });
    }
}

export async function getUserLoginActivity(phoneNumber: string) {

    const { data, error } = await supabaseCacheFreeClient
        .from('user_login_activity')
        .select('times_logged_in')
        .eq('user_phone', phoneNumber)
        .maybeSingle();

    if (error) {
        return 0;
    }

    return data?.times_logged_in ?? 0;

}
