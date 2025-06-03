import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserTie, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { ClassTeacher } from "@/types";

const TeacherInfo = ({
  teacher,
  onEdit,
  onRemove,
}: {
  teacher: ClassTeacher;
  onEdit: () => void;
  onRemove: () => void;
}) => {
  console.log({ teacher });
  return (
    <div className="bg-white flex items-center justify-between p-3 hover:bg-slate-50 transition-colors cursor-pointer border-b border-slate-200 h-14">
      <div className="flex items-center gap-3">
        <div className="text-gray-400 text-3xl">
          <FontAwesomeIcon icon={faUserTie} />
        </div>
        <div className="flex gap-6 items-center">
          <span className="text-slate-600 text-lg">
            {teacher.firstName} {teacher.lastName}
          </span>
          {teacher.email && (
            <span className="text-slate-400">{teacher.email}</span>
          )}
        </div>
      </div>
      <div className="flex gap-2">
        <button
          className="p-2 text-blue-500 hover:text-blue-700 transition-colors cursor-pointer"
          onClick={onEdit}
          disabled={true}
        >
          <FontAwesomeIcon icon={faEdit} />
        </button>
        <button
          className="p-2 text-red-500 hover:text-red-700 transition-colors cursor-pointer"
          onClick={onRemove}
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </div>
  );
};

export default TeacherInfo;
