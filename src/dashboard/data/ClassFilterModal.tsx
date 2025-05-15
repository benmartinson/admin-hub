import React, { useState, useEffect } from "react";
import Modal from "../../common/components/Modal";

interface ClassFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (selectedPeriod: string) => void;
  gradingPeriods: string[];
  currentGradingPeriod: string;
}

const ClassFilterModal: React.FC<ClassFilterModalProps> = ({
  isOpen,
  onClose,
  onApply,
  gradingPeriods,
  currentGradingPeriod,
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState(currentGradingPeriod);

  useEffect(() => {
    setSelectedPeriod(currentGradingPeriod);
  }, [currentGradingPeriod]);

  const handleApply = () => {
    onApply(selectedPeriod);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Filters">
      <div className="mb-4">
        <label
          htmlFor="grading-period"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Grading Period
        </label>
        <div className="relative">
          <select
            id="grading-period"
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg shadow-sm appearance-none focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white pr-8 w-full"
          >
            {gradingPeriods.map((period) => (
              <option key={period} value={period}>
                {period}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M5.516 7.548c.436-.446 1.043-.48 1.576 0L10 10.405l2.908-2.857c.533-.48 1.14-.446 1.576 0 .436.445.408 1.197 0 1.615l-3.667 3.6c-.533.524-1.408.524-1.942 0L5.516 9.163c-.408-.418-.436-1.17 0-1.615z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <button
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Cancel
        </button>
        <button
          onClick={handleApply}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Apply Filters
        </button>
      </div>
    </Modal>
  );
};

export default ClassFilterModal;
