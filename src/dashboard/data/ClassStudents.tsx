import { getClassStudents } from "@/appStore";
import StudentInfo from "./StudentInfo";
import { ClassItem, ClassStudent } from "@/types";
import { useState } from "react";
import StudentDetails from "./StudentDetails";

const ClassStudents = ({ classDetails }: { classDetails: ClassItem }) => {
  const enrollments = getClassStudents(classDetails._id);
  const [editingStudent, setEditingStudent] = useState<ClassStudent | null>(
    null,
  );

  if (editingStudent) {
    return <StudentDetails student={editingStudent} />;
  }
  return (
    <div className="flex-grow overflow-y-auto px-4 pb-4 border-y border-slate-200">
      {enrollments.map((enrollment) => (
        <StudentInfo
          key={enrollment.studentId}
          student={enrollment}
          onEdit={() => setEditingStudent(enrollment)}
          onRemove={() => {}}
        />
      ))}
    </div>
  );
};

export default ClassStudents;
