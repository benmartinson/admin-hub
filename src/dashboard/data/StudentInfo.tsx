import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { ClassStudent } from "@/types";

const StudentInfo = ({
  student,
  onEdit,
  onRemove,
}: {
  student: ClassStudent;
  onEdit: () => void;
  onRemove: () => void;
}) => {
  return (
    <div className="bg-white p-3 hover:bg-slate-50 transition-colors cursor-pointer border-b border-slate-200 h-14">
      <div className="flex items-center gap-3 justify-between">
        <div className="flex items-center gap-3">
          <div className="text-gray-400 text-3xl">
            <FontAwesomeIcon icon={faUserCircle} />
          </div>
          <span className="text-slate-600 text-lg">
            {student.firstName} {student.lastName}
          </span>
        </div>
        <div className="flex gap-2">
          <button
            className="p-2 text-blue-500 hover:text-blue-700 transition-colors"
            onClick={onEdit}
          >
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <button
            className="p-2 text-red-500 hover:text-red-700 transition-colors"
            onClick={onRemove}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentInfo;
