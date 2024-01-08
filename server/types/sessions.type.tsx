export type Session = {
  session_auto_id: number;
  title: string;
  zoom_link: string;
  zoom_password: string;
  batch_auto_id: number;
  course_auto_id: number;
  slide_extension: string;
  batches?: {
    // Optional, assuming you might join with a batches table
    batch_name: string;
  };
  courses?: {
    // Optional, assuming you might join with a courses table
    course_code: string;
    course_name: string;
  };
};
