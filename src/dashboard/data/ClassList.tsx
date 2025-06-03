import { classDataTabs } from "@/constants";
import { DataTablesType, ClassItem } from "@/types";
import classNames from "classnames";
import { useQuery } from "convex/react";
import Category from "@/common/Category";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import NewClassForm from "./NewClassForm";
import { ChevronDown } from "lucide-react";
import { ChevronRight } from "lucide-react";

const TableCategory = ({
  label,
  isSelected,
  onClick,
}: {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}) => {
  const classes = classNames(
    "flex items-center justify-between py-2 border-b border-slate-200 p-4 w-full",
    {
      "text-slate-700": isSelected,
      "cursor-pointer text-slate-500": !isSelected,
    },
  );

  return (
    <div className={classes} onClick={onClick}>
      <span className="">{label}</span>
      <div className="flex items-center gap-3">
        {isSelected && <FontAwesomeIcon icon={faChevronRight} />}
      </div>
    </div>
  );
};

const ClassList = ({
  selectedClass,
  setSelectedClass,
  selectedTab,
  setSelectedTab,
}: {
  selectedClass: string | null;
  setSelectedClass: (selectedClass: string | null) => void;
  selectedTab: string | null;
  setSelectedTab: (selectedTab: string | null) => void;
}) => {
  const classes = useQuery("classes:getClasses" as any) || [];
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddingClass, setIsAddingClass] = useState(false);
  const filteredClasses =
    classes?.filter((classItem: ClassItem) =>
      classItem.name.toLowerCase().includes(searchTerm.toLowerCase()),
    ) || [];

  useEffect(() => {
    if (classes && classes.length === 0) {
      setIsAddingClass(true);
    }
  }, [classes]);

  useEffect(() => {
    if (classes && classes.length > 0 && !selectedClass) {
      setSelectedClass(classes[0]._id);
    }
  }, [classes, selectedClass]);

  const buttonClasses = (classItem: ClassItem) => {
    return classNames("w-full flex items-center p-4 bg-slate-50 h-10 text-sm", {
      "bg-slate-500 text-white font-bold": selectedClass === classItem._id,
      "hover:bg-slate-100 cursor-pointer": selectedClass !== classItem._id,
    });
  };

  const iconClasses = (classItem: ClassItem) => {
    return classNames("w-4 h-4 mr-2", {
      "": selectedClass === classItem._id,
    });
  };

  return (
    <div className="bg-white border-2 border-r-0 border-slate-200">
      <Navbar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <div className="w-64 relative">
        {filteredClasses?.map((classItem, idx) => (
          <div className="border-b border-slate-200">
            <button
              onClick={() => setSelectedClass(classItem._id)}
              className={buttonClasses(classItem)}
            >
              <FontAwesomeIcon
                icon={faChevronRight}
                className={iconClasses(classItem)}
              />
              <span className="">
                {classItem.classCode} - {classItem.name}
              </span>
            </button>
          </div>
        ))}
        <button
          className="absolute -bottom-12 right-2 rounded-md h-12 bg-transparent flex justify-start items-center text-slate-400 hover:text-slate-500 text-sm p-2 cursor-pointer"
          onClick={() => setIsAddingClass(true)}
        >
          <FontAwesomeIcon icon={faPlus} className="mr-2" /> Add Class
        </button>
      </div>
    </div>
  );
};

export default ClassList;
