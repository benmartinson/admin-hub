import { useAppStore } from "@/appStore";
import { useState } from "react";
import Navbar from "./Navbar";

const ClassesView = () => {
  const allClasses = useAppStore((state) => state.classes);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredClasses = allClasses.filter((klass) =>
    klass.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="flex flex-col w-full">
      <Navbar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <div className="p-4 flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClasses.map((klass) => (
            <div key={klass._id} className="p-6 rounded-lg shadow-lg bg-white">
              <h3 className="text-xl font-semibold mb-2">{klass.name}</h3>
              {klass.startDate && (
                <p className="text-sm text-gray-700 mb-1">
                  Start: {new Date(klass.startDate).toLocaleDateString()}
                </p>
              )}
              {klass.endDate && (
                <p className="text-sm text-gray-700">
                  End: {new Date(klass.endDate).toLocaleDateString()}
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
