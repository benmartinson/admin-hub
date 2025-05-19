import { Id } from "../convex/_generated/dataModel";

export type ClassItem = {
  _id: string;
  name: string;
  classCode: string;
  teacher: string;
  startDate: string;
  endDate: string;
};

export type AppSetting = {
  _id: Id<"appSetting">;
  category: string;
  descriptionLabel: string;
  enabled: boolean;
  systemValue: string;
  teacherCanUpdate: boolean;
};

export type AppConfig = {
  _id: Id<"appConfiguration">;
  domain?: string;
  testUrl?: string;
  convexUrl?: string;
  appId: number;
};

export type Enrollment = {
  _id: string;
  studentId: string;
  classId: string;
  schoolYear: number;
};

export type ClassStudent = {
  enrollmentId: string;
  studentId: string;
  classId: string;
  schoolYear: number;
  firstName: string;
  lastName: string;
};

export type ClassData = {
  _id?: string;
  name: string;
  classCode: string;
  startDate: string;
  endDate: string;
  teacher: string;
};

export type DataTablesType = "Classes" | "Grading Periods" | "Assignment Types";
