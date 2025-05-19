import React from "react";

interface NewClassEnrollmentModalProps {
  onClose: () => void;
}

const NewClassEnrollmentModal: React.FC<NewClassEnrollmentModalProps> = ({
  onClose,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl">
        <h2 className="text-xl font-semibold mb-4">New Class Enrollment</h2>
        {/* Modal content will go here */}
        <p>This is the New Class Enrollment Modal.</p>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default NewClassEnrollmentModal;
