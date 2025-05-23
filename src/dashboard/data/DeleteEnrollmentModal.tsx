import Modal from "@/common/components/Modal";
import { ClassStudent } from "@/types";

const DeleteEnrollmentModal = ({
  isOpen,
  onClose,
  enrollment,
  onConfirm,
}: {
  isOpen: boolean;
  onClose: () => void;
  enrollment: ClassStudent | null;
  onConfirm: () => void;
}) => {
  const isDeleting = Boolean(!enrollment);
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete Enrollment">
      <div className="flex flex-col gap-4">
        <p>Are you sure you want to delete this enrollment?</p>
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            disabled={isDeleting}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteEnrollmentModal;
