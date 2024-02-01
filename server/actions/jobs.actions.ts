"use server"
import ResponseHandler from "../models/response.model";
import { supabase, supabaseCacheFreeClient } from "../server";
import { revalidatePath } from 'next/cache';
import { Job } from "../types/job.type"; // Ensure you have a Job type defined
import { errorMessage } from "@/constants/messages";

export async function fetchJobs(): Promise<Job[]> {
    try {
        let { data: jobs, error } = await supabaseCacheFreeClient
            .from('jobs')
            .select('*').order('job_auto_id', { ascending: true })

        if (error) {
            return [];
        }

        return jobs ?? [];
    } catch (error) {
        return [];
    }
}

export async function fetchJobsForStudents(): Promise<Job[]> {
    try {
        let { data: jobs, error } = await supabaseCacheFreeClient
            .from('jobs')
            .select('*').order('job_auto_id', { ascending: true }).eq('status', 1);

        if (error) {
            return [];
        }

        return jobs ?? [];
    } catch (error) {
        return [];
    }
}

export async function addJob(job: any) {
    try {
        const responseHandler = new ResponseHandler<any>();
        const { data, error } = await supabaseCacheFreeClient
            .from('jobs')
            .insert([
                {
                    title: job.title,
                    expire_date: job.expire_date,
                    link: job.link,
                    status: job.status
                },
            ])
            .select();

        if (error != null) {
            return responseHandler.setError(
                error.details ?? errorMessage,
            );
        }
        revalidatePath('/jobs', 'page');
        return responseHandler.setSuccess("Success", data);
    } catch (error) {
        throw error;
    }
}

export async function updateJob(job_auto_id: string, job: any) {
    try {
        const responseHandler = new ResponseHandler<any>();
        const { data, error } = await supabaseCacheFreeClient
            .from('jobs')
            .update({
                title: job.title,
                expire_date: job.expire_date,
                link: job.link,
                status: job.status
            })
            .eq('job_auto_id', job_auto_id)
            .select();

        if (error != null) {
            return responseHandler.setError(
                error.details ?? errorMessage,
            );
        }
        revalidatePath('/jobs', 'page');
        return responseHandler.setSuccess("Success", data);
    } catch (error) {
        throw error;
    }
}
