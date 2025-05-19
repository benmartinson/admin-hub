import { create } from "zustand";
import { ClassItem, ClassStudent, Enrollment } from "./types";

interface AppState {
  classes: ClassItem[];
  setClasses: (classes: ClassItem[]) => void;
  enrollments: ClassStudent[];
  setEnrollments: (enrollments: ClassStudent[]) => void;
}

export const useAppStore = create<AppState>((set) => ({
  classes: [],
  enrollments: [],
  setClasses: (classes) =>
    set({
      classes,
    }),
  setEnrollments: (enrollments) =>
    set({
      enrollments,
    }),
}));

export const getClassStudents = (classId: string): ClassStudent[] => {
  const enrollments = useAppStore((state) => state.enrollments);
  return enrollments.filter((enrollment) => enrollment.classId === classId);
};
