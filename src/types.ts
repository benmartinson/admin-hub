import { Id } from "../convex/_generated/dataModel";

export type Klass = {
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

export type DataTablesType = "Classes" | "Grading Periods" | "Assignment Types";
