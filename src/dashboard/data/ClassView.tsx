import { useState } from "react";
import ClassDetails from "./ClassDetails";
import ClassStudents from "./ClassStudents";
import ClassTeachers from "./ClassTeachers";
import { ClassItem } from "@/types";
import NewClassEnrollmentModal from "./NewClassEnrollmentModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";

const ClassView = ({ classDetails }: { classDetails: ClassItem }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [activeTab, setActiveTab] = useState<"students" | "teachers">(
    "students",
  );

  return (
    <div className="flex flex-col px-6 py-4 bg-white shadow w-full h-full overflow-hidden">
      <ClassDetails classDetails={classDetails} />

      <div className="flex items-center justify-between mt-4 mb-2">
        <div className="flex space-x-6">
          <button
            onClick={() => setActiveTab("students")}
            className={classNames(
              "text-lg  border-b-2 transition-colors",
              activeTab === "students"
                ? "text-slate-700 border-blue-500"
                : "text-slate-500 border-transparent hover:text-slate-700",
            )}
          >
            Students
          </button>
          <button
            onClick={() => setActiveTab("teachers")}
            className={classNames(
              "text-lg  border-b-2 transition-colors",
              activeTab === "teachers"
                ? "text-slate-700 border-blue-500"
                : "text-slate-500 border-transparent hover:text-slate-700",
            )}
          >
            Teachers
          </button>
        </div>
        <button
          onClick={() => setIsAdding(true)}
          className="text-green-600 hover:text-green-700 cursor-pointer h-10 w-10 flex items-center justify-center"
          aria-label={
            activeTab === "students" ? "Add new student" : "Add new teacher"
          }
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>

      {activeTab === "students" ? (
        <ClassStudents
          classDetails={classDetails}
          isAdding={isAdding}
          setIsAdding={setIsAdding}
        />
      ) : (
        <ClassTeachers
          classDetails={classDetails}
          isAdding={isAdding}
          setIsAdding={setIsAdding}
        />
      )}
    </div>
  );
};

export default ClassView;
