import { getClassStudents } from "@/appStore";
import StudentInfo from "./StudentInfo";
import { ClassItem, ClassStudent } from "@/types";
import { useState } from "react";
import StudentDetails from "./StudentDetails";
import { useMutation } from "convex/react";
import DeleteEnrollmentModal from "./DeleteEnrollmentModal";

const ClassStudents = ({ classDetails }: { classDetails: ClassItem }) => {
  const enrollments = getClassStudents(classDetails._id);
  const removeEnrollmentMutation = useMutation(
    "enrollments:removeEnrollment" as any,
  );
  const [editingStudent, setEditingStudent] = useState<ClassStudent | null>(
    null,
  );
  const [isDeleteEnrollmentModalOpen, setIsDeleteEnrollmentModalOpen] =
    useState(false);
  const [deletingEnrollment, setDeletingEnrollment] =
    useState<ClassStudent | null>(null);

  if (editingStudent) {
    return <StudentDetails student={editingStudent} />;
  }

  const handleRemove = async () => {
    setDeletingEnrollment(null);
    try {
      await removeEnrollmentMutation({
        enrollmentId: deletingEnrollment?.enrollmentId,
      });
      setIsDeleteEnrollmentModalOpen(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleteEnrollmentModalOpen(false);
    }
  };

  return (
    <div className="flex-grow overflow-y-auto px-4 pb-4 border-y border-slate-200">
      {enrollments.map((enrollment) => (
        <StudentInfo
          key={enrollment.studentId}
          student={enrollment}
          onEdit={() => setEditingStudent(enrollment)}
          onRemove={() => {
            setDeletingEnrollment(enrollment);
            setIsDeleteEnrollmentModalOpen(true);
          }}
        />
      ))}
      <DeleteEnrollmentModal
        isOpen={isDeleteEnrollmentModalOpen}
        onClose={() => setIsDeleteEnrollmentModalOpen(false)}
        onConfirm={handleRemove}
        enrollment={deletingEnrollment}
      />
    </div>
  );
};

export default ClassStudents;
