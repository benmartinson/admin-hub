import { classDataTabs } from "@/constants";
import { DataTablesType, Klass } from "@/types";
import classNames from "classnames";
import { useQuery } from "convex/react";
import Category from "@/common/Category";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Navbar from "./Navbar";
import { useAppStore } from "@/appStore";
import NewClassForm from "./NewClassForm";

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
  const { classes } = useAppStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddingClass, setIsAddingClass] = useState(false);
  const filteredClasses =
    classes?.filter((klass) =>
      klass.name.toLowerCase().includes(searchTerm.toLowerCase()),
    ) || [];

  if (isAddingClass) {
    return <NewClassForm closeForm={() => setIsAddingClass(false)} />;
  }

  return (
    <div className="bg-white border-2 border-r-0 border-slate-200">
      <Navbar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <div className="w-96 relative">
        {filteredClasses?.map((klassItem, idx) => (
          <Category
            key={idx}
            title={klassItem.name}
            isExpanded={selectedClass === klassItem._id}
            onToggle={() => {
              setSelectedClass(
                selectedClass === klassItem._id ? null : klassItem._id,
              );
            }}
          >
            {classDataTabs.map((tab) => (
              <TableCategory
                key={tab}
                label={tab as DataTablesType}
                isSelected={selectedTab === tab}
                onClick={() => {
                  setSelectedTab(tab);
                }}
              />
            ))}
          </Category>
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
