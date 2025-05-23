import { create } from "zustand";
import { ClassItem, ClassStudent, Student } from "./types";

interface AppState {
  classes: ClassItem[];
  setClasses: (classes: ClassItem[]) => void;
  students: Student[];
  setStudents: (students: Student[]) => void;
  enrollments: ClassStudent[];
  setEnrollments: (enrollments: ClassStudent[]) => void;
  appViewUrl: string;
  setAppViewUrl: (appViewUrl: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  classes: [],
  students: [],
  enrollments: [],
  setClasses: (classes) =>
    set({
      classes,
    }),
  setEnrollments: (enrollments) =>
    set({
      enrollments,
    }),
  setStudents: (students) =>
    set({
      students,
    }),
  appViewUrl: "",
  setAppViewUrl: (appViewUrl) =>
    set({
      appViewUrl,
    }),
}));

export const getClassStudents = (classId: string): ClassStudent[] => {
  const enrollments = useAppStore((state) => state.enrollments);
  return enrollments.filter((enrollment) => enrollment.classId === classId);
};
