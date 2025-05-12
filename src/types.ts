import { Id } from "../convex/_generated/dataModel";

export type AppSetting = {
  _id: Id<"appSetting">;
  category: string;
  descriptionLabel: string;
  enabled: boolean;
  systemValue: string;
  teacherCanUpdate: boolean;
};
