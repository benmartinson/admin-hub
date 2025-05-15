import React, { useState } from "react";
import ClassFilterModal from "./ClassFilterModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import NewClassModal from "./NewClassModal";

interface NavbarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ searchTerm, onSearchChange }) => {
  const gradingPeriods = ["Grading Period 1", "Grading Period 2", "All Year"];
  const [selectedGradingPeriod, setSelectedGradingPeriod] = useState(
    gradingPeriods[0],
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNewClassModalOpen, setIsNewClassModalOpen] = useState(false);

  const handleApplyFilters = (selectedPeriod: string) => {
    setSelectedGradingPeriod(selectedPeriod);
    setIsModalOpen(false);
  };

  return (
    <div className="bg-slate-100 border-b border-slate-200 p-4 w-full h-[58px] flex justify-between mx-auto flex items-center">
      <div className="flex items-center justify-start">
        <button className="rounded-full bg-red-100 border-2 h-8 flex items-center justify-center border-red-200 p-2 text-sm text-red-500">
          Classes
        </button>
      </div>
      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Search classes..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="p-2 border bg-white w-64 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
        />
        {/* <button
          onClick={() => setIsModalOpen(true)}
          className="p-2 border border-gray-300 rounded-lg shadow-sm flex items-center gap-2 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z"
            />
          </svg>
          Filters
        </button> */}
        {/* We will add the ClassFilterModal component here later */}
        <div
          className="flex items-center gap-4 text-slate-500 rounded-full bg-white p-2 border border-slate-200 shadow-sm cursor-pointer"
          onClick={() => setIsNewClassModalOpen(true)}
        >
          <FontAwesomeIcon icon={faPlus} />
        </div>
      </div>
      {isNewClassModalOpen && (
        <NewClassModal
          isOpen={isNewClassModalOpen}
          onClose={() => setIsNewClassModalOpen(false)}
        />
      )}
      {isModalOpen && (
        <ClassFilterModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onApply={handleApplyFilters}
          gradingPeriods={gradingPeriods}
          currentGradingPeriod={selectedGradingPeriod}
        />
      )}
    </div>
  );
};

export default Navbar;
