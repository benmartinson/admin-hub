import { useEffect, useState, useRef } from "react";
import moment from "moment";
import { useAppStore } from "@/appStore";
import { Klass } from "@/types";
import { useUpdateClass } from "@/GradebookDataFetcher"; // Assuming ClassData is compatible with Klass
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const ClassDetails = ({ selectedClass }: { selectedClass: string | null }) => {
  const { classes } = useAppStore();
  const updateClass = useUpdateClass();
  const classDetails = classes.find((klass) => klass._id === selectedClass);

  const [formData, setFormData] = useState<Partial<Klass>>({});
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof Omit<Klass, "_id">, string>>
  >({});

  const [successTimeouts, setSuccessTimeouts] = useState<
    Partial<Record<keyof Omit<Klass, "_id">, number | null>>
  >({});

  const prevSelectedClassIdRef = useRef<string | null>(null);

  useEffect(() => {
    const hasSelectedClassIdChanged =
      selectedClass !== prevSelectedClassIdRef.current;

    if (classDetails) {
      setFormData({
        name: classDetails.name,
        startDate: moment(classDetails.startDate).format("YYYY-MM-DD"),
        endDate: moment(classDetails.endDate).format("YYYY-MM-DD"),
        teacher: classDetails.teacher,
      });

      if (hasSelectedClassIdChanged) {
        setFieldErrors({});
      }
    } else if (!selectedClass) {
      setFormData({ name: "", startDate: "", endDate: "", teacher: "" });
      setFieldErrors({});
    }

    prevSelectedClassIdRef.current = selectedClass;
  }, [classDetails, selectedClass]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: keyof Omit<Klass, "_id">,
  ) => {
    const { value } = e.target;
    setFormData((prev) => ({ ...prev, [fieldName]: value }));

    if (fieldErrors[fieldName]) {
      setFieldErrors((prev) => ({ ...prev, [fieldName]: undefined }));
    }
  };

  const handleFieldBlur = async (fieldName: keyof Omit<Klass, "_id">) => {
    if (!selectedClass || !classDetails) return;

    const currentValue = formData[fieldName];
    let originalValue = classDetails[fieldName];

    if (fieldName === "startDate" || fieldName === "endDate") {
      originalValue = moment(originalValue).format("YYYY-MM-DD");
    }

    if (currentValue === originalValue) return;

    if (fieldErrors[fieldName]) {
      setFieldErrors((prev) => ({ ...prev, [fieldName]: undefined }));
    }

    try {
      const payload = {
        _id: selectedClass,
        name: formData.name !== undefined ? formData.name : classDetails.name,
        startDate: moment(
          formData.startDate !== undefined
            ? formData.startDate
            : classDetails.startDate,
        ).format("YYYY-MM-DD"),
        endDate: moment(
          formData.endDate !== undefined
            ? formData.endDate
            : classDetails.endDate,
        ).format("YYYY-MM-DD"),
        teacher:
          formData.teacher !== undefined
            ? formData.teacher
            : classDetails.teacher,
      };

      await updateClass(payload);

      // Set the timestamp when the save was successful
      setSuccessTimeouts({
        ...successTimeouts,
        [fieldName]: Date.now(),
      });

      // Clear this timestamp after 2 seconds
      setTimeout(() => {
        setSuccessTimeouts((prev) => ({
          ...prev,
          [fieldName]: null,
        }));
      }, 2000);
    } catch (err) {
      console.error(`Failed to update ${fieldName}:`, err);
      const errorMsg =
        err instanceof Error ? err.message : `Failed to update ${fieldName}.`;
      setFieldErrors((prev) => ({ ...prev, [fieldName]: errorMsg }));
    }
  };

  if (!selectedClass) {
    return (
      <div className="p-8 text-center text-gray-500 w-full">
        Select a class to see details.
      </div>
    );
  }

  if (!classDetails) {
    // Still loading or class not found in appStore
    return (
      <div className="p-8 text-center text-gray-500 w-full">
        Loading details or class not found...
      </div>
    );
  }

  return (
    <div className="p-6 bg-white shadow rounded-lg w-full max-w-2xl mx-auto my-4">
      <form className="flex flex-col gap-5 w-full mt-2">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          {classDetails.name}
        </h2>

        {/* Class Name Field */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Class Name
          </label>
          <div className="relative flex items-center">
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name || ""}
              onChange={(e) => handleChange(e, "name")}
              onBlur={() => handleFieldBlur("name")}
              placeholder="e.g., Mathematics 101"
              className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full pr-8"
            />
            {successTimeouts["name"] &&
              Date.now() - successTimeouts["name"] < 2000 && (
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-green-500">
                  <FontAwesomeIcon icon={faCheck} />
                </span>
              )}
          </div>
          {fieldErrors.name && (
            <p className="mt-1 text-xs text-red-600">{fieldErrors.name}</p>
          )}
        </div>

        {/* Start Date Field */}
        <div>
          <label
            htmlFor="startDate"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Start Date
          </label>
          <div className="relative flex items-center">
            <input
              id="startDate"
              name="startDate"
              type="date"
              required
              value={formData.startDate || ""}
              onChange={(e) => handleChange(e, "startDate")}
              onBlur={() => handleFieldBlur("startDate")}
              className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full pr-8"
            />
            {successTimeouts["startDate"] &&
              Date.now() - successTimeouts["startDate"] < 2000 && (
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-green-500">
                  <FontAwesomeIcon icon={faCheck} />
                </span>
              )}
          </div>
          {fieldErrors.startDate && (
            <p className="mt-1 text-xs text-red-600">{fieldErrors.startDate}</p>
          )}
        </div>

        {/* End Date Field */}
        <div>
          <label
            htmlFor="endDate"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            End Date
          </label>
          <div className="relative flex items-center">
            <input
              id="endDate"
              name="endDate"
              type="date"
              required
              value={formData.endDate || ""}
              onChange={(e) => handleChange(e, "endDate")}
              onBlur={() => handleFieldBlur("endDate")}
              className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full pr-8"
            />
            {successTimeouts["endDate"] &&
              Date.now() - successTimeouts["endDate"] < 2000 && (
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-green-500">
                  <FontAwesomeIcon icon={faCheck} />
                </span>
              )}
          </div>
          {fieldErrors.endDate && (
            <p className="mt-1 text-xs text-red-600">{fieldErrors.endDate}</p>
          )}
        </div>

        {/* Teacher Field */}
        <div>
          <label
            htmlFor="teacher"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Teacher
          </label>
          <div className="relative flex items-center">
            <input
              id="teacher"
              name="teacher"
              type="text"
              value={formData.teacher || ""}
              onChange={(e) => handleChange(e, "teacher")}
              onBlur={() => handleFieldBlur("teacher")}
              placeholder="e.g., John Smith"
              className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full pr-8"
            />
            {successTimeouts["teacher"] &&
              Date.now() - successTimeouts["teacher"] < 2000 && (
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-green-500">
                  <FontAwesomeIcon icon={faCheck} />
                </span>
              )}
          </div>
          {fieldErrors.teacher && (
            <p className="mt-1 text-xs text-red-600">{fieldErrors.teacher}</p>
          )}
        </div>
      </form>
    </div>
  );
};

export default ClassDetails;
