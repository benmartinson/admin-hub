import { ClassTeacher } from "@/types";

const TeacherDetails = ({ teacher }: { teacher: ClassTeacher }) => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">
        {teacher.firstName} {teacher.lastName}
      </h2>
      <div className="space-y-2">
        <div>
          <span className="font-medium">Email:</span> {teacher.email || "N/A"}
        </div>
        <div>
          <span className="font-medium">Phone:</span> {teacher.phone || "N/A"}
        </div>
      </div>
    </div>
  );
};

export default TeacherDetails;