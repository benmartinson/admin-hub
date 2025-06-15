import StudentInfo from "./StudentInfo";
import { ClassItem, ClassStudent } from "@/types";
import { useState } from "react";
import StudentDetails from "./StudentDetails";
import { useMutation, useQuery } from "convex/react";
import DeleteEnrollmentModal from "./DeleteEnrollmentModal";
import StudentSearchRow from "./StudentSearchRow";

const ClassStudents = ({
  classDetails,
  isAdding,
  setIsAdding,
}: {
  classDetails: ClassItem;
  isAdding: boolean;
  setIsAdding: (isAdding: boolean) => void;
}) => {
  const enrollments = useQuery("enrollments:getEnrollments" as any) || [];
  const classStudents = enrollments.filter(
    (enrollment: ClassStudent) => enrollment.classId === classDetails._id,
  );
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
      {classStudents.map((enrollment: ClassStudent) => (
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
      {isAdding && (
        <StudentSearchRow
          classDetails={classDetails}
          setIsAdding={setIsAdding}
        />
      )}
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
