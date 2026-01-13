
import { supabaseCacheFreeClient } from "../server";

export async function validateUser(phoneNumber: string, password: string): Promise<any> {
    try {
        let { data: student, error } = await supabaseCacheFreeClient
            .from('students_mapping')
            .select(`* , batches!inner(auto_id,batch_name,password,course_auto_id) , students!inner(auto_id,name,phonenumber,email)`)
            .eq('students.phonenumber', phoneNumber).eq('batches.password', password).eq('batches.status', 1).maybeSingle();

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

export async function validateFingerprint(userId: string, phoneNumber: string, fingerprint: string, batchAutoId: string, browserAgent: string | null) {

    let { data: user_fingerprints, error } = await supabaseCacheFreeClient
        .from('fingerprint')
        .select("*").eq('user_id', userId).limit(1).maybeSingle();

    if (error) {
        throw error;
    }

    const fingerprint_01 = user_fingerprints?.fingerprint_01;
    const fingerprint_02 = user_fingerprints?.fingerprint_02;
    const fingerprint_03 = user_fingerprints?.fingerprint_03;
    const fingerprint_04 = user_fingerprints?.fingerprint_04;
    const fingerprint_05 = user_fingerprints?.fingerprint_05;

    if ((fingerprint_01 && fingerprint_02 && fingerprint_03 && fingerprint_04 && fingerprint_05) && (fingerprint_01 != fingerprint && fingerprint_02 != fingerprint && fingerprint_03 != fingerprint && fingerprint_04 != fingerprint && fingerprint_05 != fingerprint)) {
        await blockUser(userId, batchAutoId);
        await updateFingerprint5(userId, fingerprint, browserAgent);
        throw new Error('More than five devices are not allowed, Please contact the administrator');
    }


    if (fingerprint_01 == fingerprint || fingerprint_02 == fingerprint || fingerprint_03 == fingerprint || fingerprint_04 == fingerprint || fingerprint_05 == fingerprint) {
        return true;
    }

    if (!user_fingerprints) {

        let { error } = await supabaseCacheFreeClient
            .from('fingerprint')
            .insert([{ user_id: userId, phone_number: phoneNumber, fingerprint_01: fingerprint, fingerprint_01_browser_agent: browserAgent, fingerprint_01_time: new Date().toISOString() }]);

        if (error) {
            throw new Error('Error occured while handling fingerprint');
        }

        return;
    }

    if (fingerprint_01 == null) {
        let { error } = await supabaseCacheFreeClient
            .from('fingerprint')
            .update([{ user_id: userId, phone_number: phoneNumber, fingerprint_01: fingerprint, fingerprint_01_browser_agent: browserAgent, fingerprint_01_time: new Date().toISOString() }]).eq('user_id', userId);
        if (error) {
            throw new Error('Error occured while handling fingerprint');
        }
        return;
    }
    if (fingerprint_02 == null) {
        let { error } = await supabaseCacheFreeClient
            .from('fingerprint')
            .update([{ user_id: userId, phone_number: phoneNumber, fingerprint_02: fingerprint, fingerprint_02_browser_agent: browserAgent, fingerprint_02_time: new Date().toISOString() }]).eq('user_id', userId);
        if (error) {
            throw error;
        }
        return;
    }
    if (fingerprint_03 == null) {
        let { error } = await supabaseCacheFreeClient
            .from('fingerprint')
            .update([{ user_id: userId, phone_number: phoneNumber, fingerprint_03: fingerprint, fingerprint_03_browser_agent: browserAgent, fingerprint_03_time: new Date().toISOString() }]).eq('user_id', userId);
        if (error) {
            throw error;
        }
        return;
    }
    if (fingerprint_04 == null) {
        let { error } = await supabaseCacheFreeClient
            .from('fingerprint')
            .update([{ user_id: userId, phone_number: phoneNumber, fingerprint_04: fingerprint, fingerprint_04_browser_agent: browserAgent, fingerprint_04_time: new Date().toISOString() }]).eq('user_id', userId);
        if (error) {
            throw error;
        }
        return;
    }
    if (fingerprint_05 == null) {
        let { error } = await supabaseCacheFreeClient
            .from('fingerprint')
            .update([{ user_id: userId, phone_number: phoneNumber, fingerprint_05: fingerprint, fingerprint_05_browser_agent: browserAgent, fingerprint_05_time: new Date().toISOString() }]).eq('user_id', userId);
        if (error) {
            throw error;
        }
        return;
    }
}

export async function resetFingerprint(userId: string) {
    let { data: user_fingerprints, error } = await supabaseCacheFreeClient
        .from('fingerprint')
        .select("*").eq('user_id', userId).limit(1).maybeSingle();

    if (error) {
        throw error;
    }

    if (!user_fingerprints) {
        throw new Error('No devices found for this user');
    }

    if (user_fingerprints) {
        const resetCount = user_fingerprints.reset_count;

        let { error } = await supabaseCacheFreeClient
            .from('fingerprint')
            .update([{ user_id: userId, fingerprint_01: null, fingerprint_02: null, fingerprint_03: null, fingerprint_04: null, fingerprint_05: null, fingerprint_01_browser_agent: null, fingerprint_01_time: null, fingerprint_02_browser_agent: null, fingerprint_02_time: null, fingerprint_03_browser_agent: null, fingerprint_03_time: null, fingerprint_04_browser_agent: null, fingerprint_04_time: null, fingerprint_05_browser_agent: null, fingerprint_05_time: null, reset_count: resetCount + 1 }]).eq('user_id', userId);
        if (error) {
            throw error;
        }
        return;
    }
}

async function blockUser(userId: string, batchAutoId: string) {
    let { error } = await supabaseCacheFreeClient
        .from('students_mapping')
        .update([{ multiple_device_lock: 1 }]).eq('student_auto_id', userId).eq('batch_auto_id', batchAutoId);;
    if (error) {
        throw error;
    }
}

async function updateFingerprint5(userId: string, fingerprint: string, browserAgent: string | null) {
    let { error } = await supabaseCacheFreeClient
        .from('fingerprint')
        .update([{ fingerprint_05: fingerprint, fingerprint_05_browser_agent: browserAgent, fingerprint_05_time: new Date().toISOString() }]).eq('user_id', userId);
    if (error) {
        throw error;
    }
}

export async function unblockUser(userId: string, batchAutoId: string) {
    let { error } = await supabaseCacheFreeClient
        .from('students_mapping')
        .update([{ multiple_device_lock: 0 }]).eq('student_auto_id', userId);
    if (error) {
        throw error;
    }
}


export async function getBlockedStatus(batchAutoId: string, studentAutoId: string): Promise<any> {
    try {
        let { data: student, error } = await supabaseCacheFreeClient
            .from('students_mapping')
            .select("block_status").eq('student_auto_id', studentAutoId).eq('batch_auto_id', batchAutoId).maybeSingle();

        if (error) {
            return null;
        }
        return student;
    } catch (error) {
        return null;
    }
}
