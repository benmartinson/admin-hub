import Modal from "@/common/components/Modal";
import { ClassItem } from "@/types";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useQuery } from "convex/react";

interface NewClassEnrollmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  classDetails: ClassItem;
}

const NewClassEnrollmentModal: React.FC<NewClassEnrollmentModalProps> = ({
  isOpen,
  onClose,
  classDetails,
}) => {
  const students = useQuery("students:getStudents" as any) || [];
  const enrollments = useQuery("enrollments:getEnrollments" as any) || [];

  const classEnrollments = enrollments.filter(
    (enrollment: any) => enrollment.classId === classDetails._id,
  );

  const studentsNotEnrolled = students.filter(
    (student: any) =>
      !classEnrollments.some(
        (enrollment: any) => enrollment.studentId === student._id,
      ),
  );
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Enroll a student in a class"
    >
      <div className="py-2">
        <div className="h-64 overflow-y-auto space-y-2">
          {studentsNotEnrolled.map((student: any) => (
            <div
              key={student._id}
              className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <span className="font-medium text-gray-800">
                {student.firstName} {student.lastName}
              </span>
              <FontAwesomeIcon icon={faPlus} className="text-green" />
            </div>
          ))}
          {studentsNotEnrolled.length === 0 && (
            <div className="text-center text-gray-500 py-8">
              No students available to enroll
            </div>
          )}
        </div>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Close
        </button>
      </div>
    </Modal>
  );
};

export default NewClassEnrollmentModal;
