import { fetchStudentMappingsByAutoId } from "@/server/actions/students-auth.actions";

import React from "react";
import SelectionComponent from "../_components/selection";

const StudentChooseCourse = async ({ params }: { params: { id: number } }) => {
  const courses = await fetchStudentMappingsByAutoId(params.id);

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <h1 className="text-7xl mb-4">Choose your course</h1>
      <SelectionComponent courses={courses} />
    </div>
  );
};

export default StudentChooseCourse;
