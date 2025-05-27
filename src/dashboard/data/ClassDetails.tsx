import { useEffect, useState, useRef } from "react";
import moment from "moment";
import { useAppStore } from "@/appStore";
import { ClassItem } from "@/types";
import { useUpdateClass } from "@/GradebookDataFetcher";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const ClassDetails = ({ classDetails }: { classDetails: ClassItem }) => {
  const updateClass = useUpdateClass();
  const [formData, setFormData] = useState<Partial<ClassItem>>({});
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof Omit<ClassItem, "_id">, string>>
  >({});
  const classId = classDetails._id;

  const [successTimeouts, setSuccessTimeouts] = useState<
    Partial<Record<keyof Omit<ClassItem, "_id">, number | null>>
  >({});

  const prevSelectedClassIdRef = useRef<string | null>(null);

  useEffect(() => {
    const hasSelectedClassIdChanged =
      classId !== prevSelectedClassIdRef.current;

    if (classDetails) {
      setFormData({
        name: classDetails.name,
        classCode: classDetails.classCode,
        startDate: moment(classDetails.startDate).format("YYYY-MM-DD"),
        endDate: moment(classDetails.endDate).format("YYYY-MM-DD"),
      });

      if (hasSelectedClassIdChanged) {
        setFieldErrors({});
      }
    } else if (!classId) {
      setFormData({ name: "", startDate: "", endDate: "" });
      setFieldErrors({});
    }

    prevSelectedClassIdRef.current = classId;
  }, [classDetails, classId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: keyof Omit<ClassItem, "_id">,
  ) => {
    const { value } = e.target;
    setFormData((prev) => ({ ...prev, [fieldName]: value }));

    if (fieldErrors[fieldName]) {
      setFieldErrors((prev) => ({ ...prev, [fieldName]: undefined }));
    }
  };

  const handleFieldBlur = async (fieldName: keyof Omit<ClassItem, "_id">) => {
    if (!classId || !classDetails) return;

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
        _id: classId,
        name: formData.name !== undefined ? formData.name : classDetails.name,
        classCode:
          formData.classCode !== undefined
            ? formData.classCode
            : classDetails.classCode,
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
      };

      await updateClass(payload);

      setSuccessTimeouts({
        ...successTimeouts,
        [fieldName]: Date.now(),
      });

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

  if (!classId) {
    return (
      <div className="p-8 text-center text-gray-500 w-full">
        Select a class to see details.
      </div>
    );
  }

  if (!classDetails) {
    return (
      <div className="p-8 text-center text-gray-500 w-full">
        Loading details or class not found...
      </div>
    );
  }

  return (
    <form className="grid grid-cols-4 gap-x-4 gap-y-3 w-fit">
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
            className="px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-8"
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

      <div>
        <label
          htmlFor="classCode"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Class Code
        </label>
        <div className="relative flex items-center">
          <input
            id="classCode"
            name="classCode"
            type="text"
            required
            value={formData.classCode || ""}
            onChange={(e) => handleChange(e, "classCode")}
            onBlur={() => handleFieldBlur("classCode")}
            placeholder="e.g., MATH101"
            className="px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-8"
          />
          {successTimeouts["classCode"] &&
            Date.now() - successTimeouts["classCode"] < 2000 && (
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-green-500">
                <FontAwesomeIcon icon={faCheck} />
              </span>
            )}
        </div>
        {fieldErrors.classCode && (
          <p className="mt-1 text-xs text-red-600">{fieldErrors.classCode}</p>
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
        <div className="relative flex items-center w-full">
          <input
            id="startDate"
            name="startDate"
            type="date"
            required
            value={formData.startDate || ""}
            onChange={(e) => handleChange(e, "startDate")}
            onBlur={() => handleFieldBlur("startDate")}
            className="px-2 py-1 border w-full border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
            className="px-2 py-1 border border-gray-300 rounded-md shadow-sm w-full"
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
    </form>
  );
};

export default ClassDetails;
