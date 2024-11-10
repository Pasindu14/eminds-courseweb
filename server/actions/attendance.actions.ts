"use server";

import ResponseHandler from "../models/response.model";
import { supabase, supabaseCacheFreeClient } from "../server";
import { AttendanceRecord } from "../types/attendance-record.type";


export async function fetchAttendanceRecords(batchTimeScheduleId: string, batchParam?: string): Promise<AttendanceRecord[]> {
    try {
        // Fetch student mappings
        let studentQuery = supabaseCacheFreeClient
            .from('students_mapping')
            .select(`
                *,
                students (name, phonenumber),
                batches (batch_name, auto_id)
            `)
            .order('auto_id', { ascending: true });

        if (batchParam) {
            studentQuery = studentQuery.eq('batch_auto_id', batchParam);
        }

        const { data: studentMappings, error: studentError } = await studentQuery;

        if (studentError || !studentMappings) {
            console.error('Error fetching student mappings:', studentError);
            return [];
        }

        // Log studentMappings for debugging
        //console.log("Student Mappings:", studentMappings);

        // Fetch attendance records for the students and the specific batch time schedule
        const attendanceQuery = supabaseCacheFreeClient
            .from('attendance')
            .select('*')
            .in('student_auto_id', studentMappings.map(mapping => mapping.student_auto_id || 0))
            .eq('batch_time_schedule_auto_id', batchTimeScheduleId);  // Ensure this is correctly filtering by schedule ID

        const { data: attendanceRecords, error: attendanceError } = await attendanceQuery;

        if (attendanceError || !attendanceRecords) {
            console.error('Error fetching attendance records:', attendanceError);
            return [];
        }

        // Log attendanceRecords for debugging
        // console.log("Attendance Records:", attendanceRecords);

        // Map attendance to student mappings
        const processedRecords = studentMappings.map(mapping => {
            const attendance = attendanceRecords.find(
                a => a.student_auto_id === mapping.student_auto_id && a.batch_time_schedule_auto_id === Number(batchTimeScheduleId)
            );

            return {
                studentId: mapping.student_auto_id,
                studentName: mapping.students.name,
                phoneNumber: mapping.students.phonenumber,
                batchId: mapping.batches.auto_id,
                batchName: mapping.batches.batch_name,
                attendanceStatus: attendance?.attendance_status ?? 0, // Default to 0 if no attendance record
                batchTimeScheduleId: Number(batchTimeScheduleId),
            };
        });

        //console.log("Processed Records:", processedRecords);

        return processedRecords;
    } catch (error) {
        console.error('Unexpected error:', error);
        return [];
    }
}


export async function updateAttendanceStatus(
    student_auto_id: number,
    batch_time_schedule_auto_id: number,
    attendance_status: number
): Promise<any> {

    const responseHandler = new ResponseHandler<any>();
    try {
        // Check if the attendance record exists
        const { data: existingRecord, error: fetchError } = await supabaseCacheFreeClient
            .from('attendance')
            .select('*')
            .eq('student_auto_id', student_auto_id)
            .eq('batch_time_schedule_auto_id', batch_time_schedule_auto_id)
            .maybeSingle();

        if (fetchError) {
            return responseHandler.setError(fetchError.details ?? 'Error fetching attendance record.');
        }

        if (existingRecord) {
            // Update existing record
            const { error: updateError } = await supabaseCacheFreeClient
                .from('attendance')
                .update({ attendance_status })
                .eq('student_auto_id', student_auto_id)
                .eq('batch_time_schedule_auto_id', batch_time_schedule_auto_id);

            if (updateError) {
                return responseHandler.setError(updateError.details ?? 'Error updating attendance status.');
            }
        } else {
            // Insert new record if none exists
            const { error: insertError } = await supabaseCacheFreeClient
                .from('attendance')
                .insert({
                    student_auto_id,
                    batch_time_schedule_auto_id,
                    attendance_status
                });

            if (insertError) {
                return responseHandler.setError(insertError.details ?? 'Error inserting new attendance record.');
            }
        }

        return responseHandler.setSuccess('Attendance status updated successfully.');
    } catch (error) {
        return responseHandler.setError('An unexpected error occurred.');
    }
}

export async function fetchTotalAttendanceForBatch(studentId: string, batchId: string): Promise<any[]> {
    try {
        const { data, error } = await supabaseCacheFreeClient
            .rpc('fetch_student_attendance_for_batch', { student_id: studentId, batch_id: batchId });

        if (error) {
            console.error('Error fetching total attendance:', error);
            return [];
        }

        return data;
    } catch (error) {
        console.error('Exception when fetching total attendance:', error);
        return [];
    }
}

export async function fetchStudentAttendanceForSendingEmails(): Promise<any[]> {
    try {
        const { data, error } = await supabaseCacheFreeClient
            .rpc('get_student_attendance_for_sending_emails');

        if (error) {
            console.error('Error fetching attendance for sending emails:', error);
            return [];
        }

        return data;
    } catch (error) {
        console.error('Exception when fetching attendance for sending emails:', error);
        return [];
    }
}
