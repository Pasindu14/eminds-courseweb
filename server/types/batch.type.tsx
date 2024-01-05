export type Batch = {
  auto_id: number;
  batch_no: string;
  batch_name: string;
  zoom_link: string;
  course_auto_id: number;
  start_date: string;
  end_date: string;
  status: number;
  password: string;
  price: number;
  courses: {
    course_code: string;
    course_name: string;
  };
};
