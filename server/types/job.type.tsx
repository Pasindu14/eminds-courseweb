export type Job = {
  job_auto_id: number | null;
  title: string;
  expire_date: string; // Assuming date is stored in ISO format (YYYY-MM-DD)
  link: string;
  status: number; // or use a specific enum type if you have predefined status values
};
