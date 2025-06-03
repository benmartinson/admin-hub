import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserTie, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { ClassItem } from "@/types";
import { useMutation } from "convex/react";
import { useEffect, useState } from "react";

const TeacherSearchRow = ({
  classDetails,
  setIsAdding,
}: {
  classDetails: ClassItem;
  setIsAdding: (isAdding: boolean) => void;
}) => {
  const addTeacherMutation = useMutation("teachers:addTeacher" as any);
  const addClassTeacherMutation = useMutation(
    "teachers:addClassTeacher" as any,
  );
  const [teacherId, setTeacherId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [errorTimeout, setErrorTimeout] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    //scroll into view
    const element = document.getElementById("teacher-search-row");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    return () => {
      if (errorTimeout) {
        clearTimeout(errorTimeout);
      }
    };
  }, [errorTimeout]);

  const handleAddTeacher = async () => {
    // Clear any existing error
    setError("");
    if (errorTimeout) {
      clearTimeout(errorTimeout);
    }

    try {
      if (teacherId) {
        // If teacher ID is provided, just add the class-teacher relationship
        await addClassTeacherMutation({
          teacherId: teacherId,
          classId: classDetails._id,
        });
      } else if (name) {
        // If creating a new teacher, first create the teacher then add the relationship
        const newTeacher = await addTeacherMutation({
          teacher: {
            name: name,
            email: email || "",
          },
        });

        await addClassTeacherMutation({
          teacherId: newTeacher,
          classId: classDetails._id,
        });
      }
      setIsAdding(false);
    } catch (error: any) {
      console.error("Error adding teacher:", error);

      // Set error message
      const errorMessage = "Failed to add teacher. Please try again.";
      setError(errorMessage);

      // Clear error after 3 seconds
      const timeout = setTimeout(() => {
        setError("");
        setErrorTimeout(null);
      }, 8000);
      setErrorTimeout(timeout);
    }
  };

  return (
    <div id="teacher-search-row">
      <div className="bg-white flex items-center justify-between p-3 hover:bg-slate-50 transition-colors cursor-pointer border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="text-gray-400 text-3xl">
            <FontAwesomeIcon icon={faUserTie} />
          </div>
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={teacherId}
              onChange={(e) => setTeacherId(e.target.value)}
              placeholder="Teacher ID"
              className="text-slate-600 text-sm border border-slate-200 rounded-md p-2 w-40"
            />
            <span className="text-slate-400 font-medium">OR</span>
            <div className="flex gap-2">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Teacher name"
                className="text-slate-600 text-sm border border-slate-200 rounded-md p-2"
                disabled={!!teacherId}
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email (optional)"
                className="text-slate-600 text-sm border border-slate-200 rounded-md p-2 w-60"
                disabled={!!teacherId}
              />
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            className="p-2 text-green-500 hover:text-green-700 transition-colors cursor-pointer"
            onClick={handleAddTeacher}
            disabled={!teacherId && !name}
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
          <button
            className="p-2 text-red-500 hover:text-red-700 transition-colors cursor-pointer"
            onClick={() => setIsAdding(false)}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      </div>
      {error && (
        <div className="px-3 pb-2 bg-white border-b border-slate-200">
          <p className="text-red-500 text-sm">{error}</p>
        </div>
      )}
    </div>
  );
};

export default TeacherSearchRow;
