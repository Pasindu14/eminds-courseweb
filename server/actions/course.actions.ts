"use server"
import ResponseHandler from "../models/response.model";
import { supabase, supabaseCacheFreeClient } from "../server";
import { revalidatePath } from 'next/cache';
import { Course } from "../types/course.type";
import { errorMessage } from "@/constants/messages";


export async function fetchCourses(): Promise<Course[]> {
    try {
        let { data: courses, error } = await supabaseCacheFreeClient
            .from('courses')
            .select('*').order('auto_id', { ascending: true });

        if (error) {
            return [];
        }

        return courses ?? [];
    } catch (error) {
        return [];
    }
}

export async function addCourse(course: any) {
    try {
        const responseHandler = new ResponseHandler<any>();
        const { data, error } = await supabaseCacheFreeClient
            .from('courses')
            .insert([
                { course_code: course.courseCode, course_name: course.courseName },
            ])
            .select();
        if (error != null) {
            return responseHandler.setError(
                error.details ?? errorMessage,
            );
        }
        revalidatePath('/courses', 'page'); // Adjust the path as needed
        return responseHandler.setSuccess("Success", data);
    } catch (error) {
        throw error;
    }
}

export async function updateCourse(auto_id: string, course: any) {
    try {
        const responseHandler = new ResponseHandler<any>();
        const { data, error } = await supabaseCacheFreeClient
            .from('courses')
            .update({ course_code: course.course_code, course_name: course.course_name })
            .eq('auto_id', auto_id)
            .select();
        if (error != null) {
            console.log(error);
            return responseHandler.setError(
                error.details ?? errorMessage,
            );
        }
        revalidatePath('/courses', 'page'); // Adjust the path as needed
        return responseHandler.setSuccess("Success", data);
    } catch (error) {
        throw error;
    }
}
