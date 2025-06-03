import Modal from "@/common/components/Modal";
import { ClassTeacher } from "@/types";

const DeleteTeacherModal = ({
  isOpen,
  onClose,
  onConfirm,
  teacher,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  teacher: ClassTeacher | null;
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Remove Teacher">
      <div className="px-2">
        <p className="text-slate-600 mb-4">
          Are you sure you want to remove {teacher?.firstName}{" "}
          {teacher?.lastName} from this class?
        </p>
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-slate-600 bg-slate-100 rounded hover:bg-slate-200"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700"
          >
            Remove
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteTeacherModal;
