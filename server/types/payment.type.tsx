type Payment = {
  student_phone: string;
  batch_auto_id: number;
  created_at: Date;
  batch_price: number;
  current: number;
  batches: {
    batch_no: string;
    batch_name: string;
    course_auto_id: number;
    courses: {
      auto_id: number;
      course_code: string;
    };
  };
};
