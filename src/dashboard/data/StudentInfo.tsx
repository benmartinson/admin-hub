import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { ClassStudent } from "@/types";

const StudentInfo = ({ student }: { student: ClassStudent }) => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
      <div className="flex flex-col items-center gap-3">
        <div className="text-gray-400 text-5xl">
          <FontAwesomeIcon icon={faUserCircle} />
        </div>

        <div className="flex justify-center items-center gap-2">
          <span className=" text-slate-600 text-lg">
            {student.firstName} {student.lastName}
          </span>
        </div>
      </div>
    </div>
  );
};

export default StudentInfo;
