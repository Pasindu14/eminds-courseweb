export type Badge = {
  auto_id: number;
  student_auto_id: number;
  course_auto_id: number;
  image_name: string;
  created_date: string;
  link: string;
  students: {
    name: string;
    phonenumber: string;
  };
  courses: {
    course_name: string;
  };
};
