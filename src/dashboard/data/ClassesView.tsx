import { useAppStore } from "@/appStore";
import { useState } from "react";
import Navbar from "./Navbar";

const ClassesView = () => {
  const allClasses = useAppStore((state) => state.classes);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredClasses = allClasses.filter((classItem) =>
    classItem.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="flex flex-col w-full">
      <Navbar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <div className="p-4 flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {filteredClasses.map((classItem) => (
            <div
              key={classItem._id}
              className="p-6 rounded-lg shadow-lg bg-white border-2 border-slate-200"
            >
              <h3 className="text-xl font-semibold mb-2">{classItem.name}</h3>
              {classItem.startDate && (
                <p className="text-sm text-gray-700 mb-1">
                  Start: {new Date(classItem.startDate).toLocaleDateString()}
                </p>
              )}
              {classItem.endDate && (
                <p className="text-sm text-gray-700">
                  End: {new Date(classItem.endDate).toLocaleDateString()}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClassesView;
