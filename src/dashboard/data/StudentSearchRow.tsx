import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faEdit,
  faTrash,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { ClassItem, ClassStudent } from "@/types";
import { getClassStudents } from "@/appStore";
import { useAppStore } from "@/appStore";
import { useMutation } from "convex/react";
import { useEffect, useState } from "react";

const StudentSearchRow = ({
  classDetails,
  setIsAdding,
}: {
  classDetails: ClassItem;
  setIsAdding: (isAdding: boolean) => void;
}) => {
  // const students = useAppStore((state) => state.students);
  // const enrollments = getClassStudents(classDetails._id);

  const addStudentMutation = useMutation("students:addStudent" as any);
  const addEnrollmentMutation = useMutation("students:addClassStudent" as any);
  const [name, setName] = useState("");

  // const studentsNotEnrolled = students.filter(
  //   (student) =>
  //     !enrollments.some((enrollment) => enrollment.studentId === student._id),
  // );

  useEffect(() => {
    //scroll into view
    const element = document.getElementById("student-search-row");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const handleAddStudent = async () => {
    const student = await addStudentMutation({
      firstName: name.split(" ")[0],
      lastName: name.split(" ").length > 1 ? name.split(" ")[1] : "",
    });

    await addEnrollmentMutation({
      studentId: student._id,
      classId: classDetails._id,
      schoolYear: 2025,
    });
    setIsAdding(false);
  };

  return (
    <div
      id="student-search-row"
      className="bg-white flex items-center justify-between p-3 hover:bg-slate-50 transition-colors cursor-pointer border-b border-slate-200 h-14"
    >
      <div className="flex items-center gap-3">
        <div className="text-gray-400 text-3xl">
          <FontAwesomeIcon icon={faUserCircle} />
        </div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="text-slate-600 text-lg border border-slate-200 rounded-md p-2"
        />
      </div>
      <div className="flex gap-2">
        <button
          className="p-2 text-green-500 hover:text-green-700 transition-colors cursor-pointer"
          onClick={handleAddStudent}
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
        <button
          className="p-2 text-red-500 hover:text-red-700 transition-colors cursor-pointer"
          onClick={() => setIsAdding(false)}
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </div>
  );
};

export default StudentSearchRow;
