export type Exam = {
  exam_auto_id: number | null;
  batch_code: string;
  course_code: string;
  exam_code: string;
  courses: {
    course_code: string;
    course_name: string;
  };
  batches: {
    batch_no: string;
    batch_name: string;
  };
};
