import React, { useState } from "react";
import moment from "moment";
import { useCreateClass } from "@/GradebookDataFetcher";

const NewClassForm = ({ closeForm }: { closeForm: () => void }) => {
  const createClass = useCreateClass();
  const [formData, setFormData] = useState({
    name: "",
    startDate: moment().format("YYYY-MM-DD"),
    endDate: moment().add(1, "month").format("YYYY-MM-DD"),
    classCode: "",
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
      !formData.classCode
    ) {
      return;
    }

    try {
      setIsSubmitting(true);
      await createClass({
        name: formData.name,
        startDate: moment(formData.startDate).format("YYYY-MM-DD"),
        endDate: moment(formData.endDate).format("YYYY-MM-DD"),
        classCode: formData.classCode,
      });
      closeForm();
    } catch (error) {
      console.error("Failed to create class:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="border border-r-0 border-slate-200 bg-white">
      <div className="w-96 border border-r-0 border-slate-200 bg-white p-4 relative">
        <button
          onClick={closeForm}
          className="absolute top-4 right-4 text-slate-500 hover:text-slate-700 text-2xl font-bold"
          aria-label="Close form"
        >
          &times;
        </button>
        <h1 className="text-2xl font-semibold mb-4 text-slate-700">
          New Class
        </h1>
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-slate-600 mb-1"
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
              className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="startDate"
              className="block text-sm font-medium text-slate-600 mb-1"
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
              className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="endDate"
              className="block text-sm font-medium text-slate-600 mb-1"
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
              className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-slate-600 cursor-pointer hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Saving..." : "Save"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewClassForm;
