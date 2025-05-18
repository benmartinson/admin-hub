import Modal from "@/common/components/Modal";
import { useCreateClass } from "@/GradebookDataFetcher";
import { useState } from "react";
import moment from "moment";
const NewClassModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const createClass = useCreateClass();
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    startDate: moment().format("YYYY-MM-DD"),
    endDate: moment().add(1, "month").format("YYYY-MM-DD"),
    teacher: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.startDate ||
      !formData.endDate ||
      !formData.teacher
    ) {
      return;
    }

    try {
      setIsSubmitting(true);
      await createClass({
        name: formData.name,
        classCode: formData.code,
        startDate: moment(formData.startDate).format("YYYY-MM-DD"),
        endDate: moment(formData.endDate).format("YYYY-MM-DD"),
        teacher: formData.teacher,
      });
      onClose();
    } catch (error) {
      console.error("Failed to create class:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="New Class">
      <form onSubmit={handleSave} className="flex flex-col gap-4 w-full mt-2">
        <div className="flex flex-col">
          <label
            htmlFor="name"
            className="text-sm font-medium text-gray-700 mb-1"
          >
            Class Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g., Mathematics 101"
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="code"
            className="text-sm font-medium text-gray-700 mb-1"
          >
            Class Code
          </label>
          <input
            id="code"
            name="code"
            type="text"
            required
            value={formData.code}
            onChange={handleChange}
            placeholder="e.g., MATH101"
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="startDate"
            className="text-sm font-medium text-gray-700 mb-1"
          >
            Start Date
          </label>
          <input
            id="startDate"
            name="startDate"
            type="date"
            required
            value={formData.startDate}
            onChange={handleChange}
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="endDate"
            className="text-sm font-medium text-gray-700 mb-1"
          >
            End Date
          </label>
          <input
            id="endDate"
            name="endDate"
            type="date"
            required
            value={formData.endDate}
            onChange={handleChange}
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="teacher"
            className="text-sm font-medium text-gray-700 mb-1"
          >
            Teacher
          </label>
          <input
            id="teacher"
            name="teacher"
            type="text"
            value={formData.teacher}
            onChange={handleChange}
            placeholder="e.g., John Smith"
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default NewClassModal;
