import { AppSetting } from "@/types";
import React from "react";

const EditSettingForm = ({
  initialFormData,
  onSubmit,
  closeForm,
  onDelete,
}: {
  initialFormData: AppSetting;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  closeForm: () => void;
  onDelete: () => void;
}) => {
  return (
    <div className="w-96 border border-r-0 border-slate-200 bg-white p-4 shadow-md relative">
      <button
        onClick={closeForm}
        className="absolute top-4 right-4 text-slate-500 hover:text-slate-700 text-2xl font-bold"
        aria-label="Close form"
      >
        &times;
      </button>
      <h1 className="text-2xl font-semibold mb-4 text-slate-700">
        Edit Setting
      </h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="descriptionLabel"
            className="block text-sm font-medium text-slate-600 mb-1"
          >
            Description
          </label>
          <input
            type="text"
            id="descriptionLabel"
            name="descriptionLabel"
            defaultValue={initialFormData.descriptionLabel}
            className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label
            htmlFor="systemValue"
            className="block text-sm font-medium text-slate-600 mb-1"
          >
            System Value
          </label>
          <input
            type="text"
            id="systemValue"
            name="systemValue"
            defaultValue={initialFormData.systemValue}
            className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-slate-600 mb-1"
          >
            Category
          </label>
          <input
            type="text"
            id="category"
            name="category"
            className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            defaultValue={initialFormData.category || "Gradebook"}
            required
          />
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="teacherCanUpdate"
            name="teacherCanUpdate"
            defaultChecked={initialFormData.teacherCanUpdate}
            className="h-4 w-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500"
          />
          <label
            htmlFor="teacherCanUpdate"
            className="ml-2 block text-sm text-slate-600"
          >
            Teacher Can Update
          </label>
        </div>
        <div className="flex space-x-2">
          <button
            type="submit"
            className="w-1/2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-slate-600 cursor-pointer hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Update
          </button>
          <button
            type="button"
            onClick={onDelete}
            className="w-1/2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-slate-200 cursor-pointer hover:bg-slate-300"
          >
            Delete
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditSettingForm;
