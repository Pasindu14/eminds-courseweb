export type Question = {
  question_auto_id: number;
  course_code: number;
  batch_code: number;
  exam_code: number;
  question: string;
  answer_01: string;
  answer_02: string;
  answer_03: string;
  answer_04: string;
  correct_answer: number | null;
  courses: {
    course_code: string;
    course_name: string;
  };
  batches: {
    batch_no: string;
    batch_name: string;
  };
  exams: {
    exam_code: string;
  };
};
