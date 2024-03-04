
import { supabaseCacheFreeClient } from "../server";

export async function validateUser(phoneNumber: string, password: string): Promise<any> {
    try {
        let { data: student, error } = await supabaseCacheFreeClient
            .from('students_mapping')
            .select(`* , batches!inner(auto_id,batch_name,password,course_auto_id) , students!inner(auto_id,name,phonenumber,email)`)
            .eq('students.phonenumber', phoneNumber).eq('batches.password', password).eq('batches.status', 1).eq('students_mapping.block_status', 0).maybeSingle()

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

export async function insertOrUpdateSession(
    user_id: number,
    session_token: string
) {
    // Try to find a session that matches the user_id
    let { data: existingSession, error: findError } = await supabaseCacheFreeClient
        .from('user_sessions')
        .select('*')
        .eq('user_id', user_id)
        .maybeSingle();

    if (findError) {
        console.error("Error finding existing session:", findError);
        return { error: findError };
    }

    if (existingSession) {
        // Session exists for the user, update it
        const { data, error: updateError } = await supabaseCacheFreeClient
            .from('user_sessions')
            .update({ session_token, updated_at: new Date().toISOString() }) // Corrected typo in session_token
            .eq('user_id', user_id);

        if (updateError) {
            console.error("Error updating session:", updateError);
            return { error: updateError };
        }
        return { data }; // Successfully updated
    } else {
        // Session does not exist, insert new session
        const { data, error: insertError } = await supabaseCacheFreeClient
            .from('user_sessions')
            .insert([{ user_id, session_token }]);

        if (insertError) {
            console.error("Error inserting new session:", insertError);
            return { error: insertError };
        }
        return { data }; // Successfully inserted
    }
}

export async function getSessionValidity(user_id: number, session_token: string) {
    let { data: user_sessions, error } = await supabaseCacheFreeClient
        .from('user_sessions')
        .select("session_token").eq('user_id', user_id).maybeSingle();

    if (error || !user_sessions) {
        return false;
    }

    const session_token_from_db = user_sessions.session_token;

    if (session_token_from_db == session_token) {
        return true;
    } else {
        return false;
    }


}