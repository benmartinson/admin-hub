import { useEffect, useState, useRef } from "react";
import { useAppStore } from "@/appStore";
import { ClassStudent } from "@/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

// Type for the Student with email field
interface Student
  extends Omit<ClassStudent, "classId" | "enrollmentId" | "schoolYear"> {
  email: string;
}

// Extended ClassStudent type with a student prop
const StudentDetails = ({ student }: { student: ClassStudent }) => {
  const { classes } = useAppStore();
  const [formData, setFormData] = useState<Partial<Student>>({});
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof Student, string>>
  >({});

  const [successTimeouts, setSuccessTimeouts] = useState<
    Partial<Record<keyof Student, number | null>>
  >({});

  const studentIdRef = useRef<string | null>(null);

  // Mock update function (replace with real API call)
  const updateStudent = async (updatedStudent: Partial<Student>) => {
    // Replace this with your actual update function
    console.log("Updating student:", updatedStudent);
    // Simulate successful update
    return Promise.resolve();
  };

  useEffect(() => {
    const hasStudentIdChanged = student.studentId !== studentIdRef.current;

    if (student) {
      // Assume we fetch the complete student data including email
      // In a real app, you might want to fetch this from an API
      setFormData({
        firstName: student.firstName,
        lastName: student.lastName,
        studentId: student.studentId,
        email: "", // This should come from your backend/API
      });

      if (hasStudentIdChanged) {
        setFieldErrors({});
      }
    }

    studentIdRef.current = student.studentId;
  }, [student]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: keyof Student,
  ) => {
    const { value } = e.target;
    setFormData((prev) => ({ ...prev, [fieldName]: value }));

    if (fieldErrors[fieldName]) {
      setFieldErrors((prev) => ({ ...prev, [fieldName]: undefined }));
    }
  };

  const handleFieldBlur = async (fieldName: keyof Student) => {
    if (!student.studentId) return;

    const currentValue = formData[fieldName];
    // For a new field like email that might not be in the original student object
    const originalValue = student[fieldName as keyof ClassStudent] || "";

    if (currentValue === originalValue) return;

    if (fieldErrors[fieldName]) {
      setFieldErrors((prev) => ({ ...prev, [fieldName]: undefined }));
    }

    try {
      const payload = {
        studentId: student.studentId,
        firstName:
          formData.firstName !== undefined
            ? formData.firstName
            : student.firstName,
        lastName:
          formData.lastName !== undefined
            ? formData.lastName
            : student.lastName,
        email: formData.email !== undefined ? formData.email : "",
      };

      await updateStudent(payload);

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

  // Get all classes this student is enrolled in
  const studentClasses = classes.filter(
    (classItem) => student.classId === classItem._id,
  );

  return (
    <div className="p-6 bg-white shadow rounded-lg w-full max-w-2xl mx-auto my-4">
      <form className="flex flex-col gap-5 w-full">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Student Information
        </h2>

        <div>
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            First Name
          </label>
          <div className="relative flex items-center">
            <input
              id="firstName"
              name="firstName"
              type="text"
              required
              value={formData.firstName || ""}
              onChange={(e) => handleChange(e, "firstName")}
              onBlur={() => handleFieldBlur("firstName")}
              placeholder="e.g., John"
              className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full pr-8"
            />
            {successTimeouts["firstName"] &&
              Date.now() - successTimeouts["firstName"] < 2000 && (
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-green-500">
                  <FontAwesomeIcon icon={faCheck} />
                </span>
              )}
          </div>
          {fieldErrors.firstName && (
            <p className="mt-1 text-xs text-red-600">{fieldErrors.firstName}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Last Name
          </label>
          <div className="relative flex items-center">
            <input
              id="lastName"
              name="lastName"
              type="text"
              required
              value={formData.lastName || ""}
              onChange={(e) => handleChange(e, "lastName")}
              onBlur={() => handleFieldBlur("lastName")}
              placeholder="e.g., Smith"
              className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full pr-8"
            />
            {successTimeouts["lastName"] &&
              Date.now() - successTimeouts["lastName"] < 2000 && (
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-green-500">
                  <FontAwesomeIcon icon={faCheck} />
                </span>
              )}
          </div>
          {fieldErrors.lastName && (
            <p className="mt-1 text-xs text-red-600">{fieldErrors.lastName}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <div className="relative flex items-center">
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email || ""}
              onChange={(e) => handleChange(e, "email")}
              onBlur={() => handleFieldBlur("email")}
              placeholder="e.g., john.smith@example.com"
              className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full pr-8"
            />
            {successTimeouts["email"] &&
              Date.now() - successTimeouts["email"] < 2000 && (
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-green-500">
                  <FontAwesomeIcon icon={faCheck} />
                </span>
              )}
          </div>
          {fieldErrors.email && (
            <p className="mt-1 text-xs text-red-600">{fieldErrors.email}</p>
          )}
        </div>

        {/* Class Enrollments Section */}
        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-800 mb-4">
            Class Enrollments
          </h3>
          {studentClasses.length > 0 ? (
            <div className="border rounded-md divide-y">
              {studentClasses.map((classItem) => (
                <div
                  key={classItem._id}
                  className="p-3 flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium">{classItem.name}</p>
                    <p className="text-sm text-gray-500">
                      Code: {classItem.classCode}
                    </p>
                  </div>
                  <div className="text-sm text-gray-500">
                    Teacher: {classItem.teacher}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No class enrollments found.</p>
          )}
        </div>
      </form>
    </div>
  );
};

export default StudentDetails;
