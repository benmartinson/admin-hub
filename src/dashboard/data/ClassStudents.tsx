import { getClassStudents, useAppStore } from "@/appStore";
import StudentInfo from "./StudentInfo";
import { ClassItem } from "@/types";
import { useUpdateClass } from "@/GradebookDataFetcher";

const ClassStudents = ({ classDetails }: { classDetails: ClassItem }) => {
  const enrollments = getClassStudents(classDetails._id);

  return (
    <div className="p-6 bg-white shadow rounded-lg w-full max-w-2xl mx-auto my-4 overflow-hidden">
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        {classDetails?.name}
      </h2>
      <div className="grid grid-cols-2 gap-4 overflow-y-auto h-full px-4 py-10">
        {enrollments.map((enrollment) => (
          <StudentInfo key={enrollment.studentId} student={enrollment} />
        ))}
      </div>
    </div>
  );
};

export default ClassStudents;
