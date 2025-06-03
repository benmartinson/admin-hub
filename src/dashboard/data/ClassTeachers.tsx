import TeacherInfo from "./TeacherInfo";
import { ClassItem, ClassTeacher } from "@/types";
import { useState } from "react";
import TeacherDetails from "./TeacherDetails";
import { useMutation, useQuery } from "convex/react";
import DeleteTeacherModal from "./DeleteTeacherModal";
import TeacherSearchRow from "./TeacherSearchRow";

const ClassTeachers = ({
  classDetails,
  isAdding,
  setIsAdding,
}: {
  classDetails: ClassItem;
  isAdding: boolean;
  setIsAdding: (isAdding: boolean) => void;
}) => {
  const classTeachers =
    useQuery("teachers:getClassTeachers" as any, {
      classId: classDetails._id,
    }) || [];
  console.log({ classTeachers, classDetailsId: classDetails._id });
  const removeClassTeacherMutation = useMutation(
    "teachers:removeClassTeacher" as any,
  );
  const [editingTeacher, setEditingTeacher] = useState<ClassTeacher | null>(
    null,
  );
  const [isDeleteTeacherModalOpen, setIsDeleteTeacherModalOpen] =
    useState(false);
  const [deletingTeacher, setDeletingTeacher] = useState<ClassTeacher | null>(
    null,
  );

  if (editingTeacher) {
    return <TeacherDetails teacher={editingTeacher} />;
  }

  const handleRemove = async () => {
    setDeletingTeacher(null);
    try {
      await removeClassTeacherMutation({
        classTeacherId: deletingTeacher?.classTeacherId,
      });
      setIsDeleteTeacherModalOpen(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleteTeacherModalOpen(false);
    }
  };

  return (
    <div className="flex-grow overflow-y-auto px-4 pb-4 border-y border-slate-200">
      {classTeachers.map((teacher: ClassTeacher) => (
        <TeacherInfo
          key={teacher._id}
          teacher={teacher}
          onEdit={() => setEditingTeacher(teacher)}
          onRemove={() => {
            setDeletingTeacher(teacher);
            setIsDeleteTeacherModalOpen(true);
          }}
        />
      ))}
      {isAdding && (
        <TeacherSearchRow
          classDetails={classDetails}
          setIsAdding={setIsAdding}
        />
      )}
      <DeleteTeacherModal
        isOpen={isDeleteTeacherModalOpen}
        onClose={() => setIsDeleteTeacherModalOpen(false)}
        onConfirm={handleRemove}
        teacher={deletingTeacher}
      />
    </div>
  );
};

export default ClassTeachers;
