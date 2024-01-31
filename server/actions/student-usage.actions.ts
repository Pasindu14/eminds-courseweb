import { supabaseCacheFreeClient } from "../server";

async function checkExistence(phone: string, sessionId: number) {
    const { data, error } = await supabaseCacheFreeClient
        .from('user_activity')
        .select('*')
        .match({ user_phone: phone, session_id: sessionId })
        .maybeSingle();

    if (error) {
        console.error('Error querying user_activity:', error);
        return null;
    }

    return data;
}


export async function upsertUserLoginCount(phone: string, sessionId: number) {
    const existingData = await checkExistence(phone, sessionId);

    if (existingData) {
        const { data: updatedData, error: updateError } = await supabaseCacheFreeClient
            .from('user_activity')
            .update({ times_logged_in: existingData.times_logged_in + 1 })
            .match({ user_phone: phone, session_id: sessionId });

        if (updateError) {
            console.error('Error updating user_activity:', updateError);
            return null;
        }

        return updatedData;
    } else {
        const { data: insertedData, error: insertError } = await supabaseCacheFreeClient
            .from('user_activity')
            .insert([{ user_phone: phone, session_id: sessionId, times_logged_in: 1 }]);

        if (insertError) {
            console.error('Error inserting into user_activity:', insertError);
            return null;
        }

        return insertedData;
    }
}


export async function upsertUserDropboxCount(phone: string, sessionId: number) {
    const existingData = await checkExistence(phone, sessionId);

    if (existingData) {
        const { data: updatedData, error: updateError } = await supabaseCacheFreeClient
            .from('user_activity')
            .update({ dropbox_clicks: existingData.dropbox_clicks + 1 })
            .match({ user_phone: phone, session_id: sessionId });

        if (updateError) {
            console.error('Error updating user_activity:', updateError);
            return null;
        }

        return updatedData;
    } else {
        const { data: insertedData, error: insertError } = await supabaseCacheFreeClient
            .from('user_activity')
            .insert([{ user_phone: phone, session_id: sessionId, dropbox_clicks: 1 }]);

        if (insertError) {
            console.error('Error inserting into user_activity:', insertError);
            return null;
        }

        return insertedData;
    }
}


export async function upsertUserSlidesClicksCount(phone: string, sessionId: number) {
    const existingData = await checkExistence(phone, sessionId);

    if (existingData) {
        const { data: updatedData, error: updateError } = await supabaseCacheFreeClient
            .from('user_activity')
            .update({ slide_clicks: existingData.slide_clicks + 1 })
            .match({ user_phone: phone, session_id: sessionId });

        if (updateError) {
            console.error('Error updating user_activity:', updateError);
            return null;
        }

        return updatedData;
    } else {
        const { data: insertedData, error: insertError } = await supabaseCacheFreeClient
            .from('user_activity')
            .insert([{ user_phone: phone, session_id: sessionId, slide_clicks: 1 }]);

        if (insertError) {
            console.error('Error inserting into user_activity:', insertError);
            return null;
        }

        return insertedData;
    }
}


