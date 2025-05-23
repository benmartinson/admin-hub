import { useAppStore } from "@/appStore";
import { useState } from "react";
import ClassDetails from "./ClassDetails";
import ClassStudents from "./ClassStudents";
import { ClassItem } from "@/types";
import NewClassEnrollmentModal from "./NewClassEnrollmentModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const ClassView = ({ classDetails }: { classDetails: ClassItem }) => {
  const [isAdding, setIsAdding] = useState(false);

  return (
    <div className="flex flex-col px-6 py-4 bg-white shadow w-full h-full overflow-hidden">
      <ClassDetails classDetails={classDetails} />
      <div className="flex justify-between items-center mt-4">
        <h2 className="text-lg text-slate-500">Class Enrollments</h2>
        <button
          onClick={() => setIsAdding(true)}
          className="text-green-600 hover:text-green-700 cursor-pointer h-10 w-10 flex items-center justify-center"
          aria-label="Add new class enrollment"
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
      <ClassStudents
        classDetails={classDetails}
        isAdding={isAdding}
        setIsAdding={setIsAdding}
      />
    </div>
  );
};

export default ClassView;
