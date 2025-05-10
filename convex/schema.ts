import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

// The schema is normally optional, but Convex Auth
// requires indexes defined on `authTables`.
// The schema provides more precise TypeScript types.
export default defineSchema({
  ...authTables,

  appConfiguration: defineTable({
    userId: v.id("users"),
    domain: v.string(),
    testUrl: v.string(),
    appId: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_user_and_app", ["userId", "appId"]),

  appSetting: defineTable({
    descriptionLabel: v.string(),
    systemValue: v.string(),
    category: v.string(),
    appConfigId: v.id("appConfiguration"),
    enabled: v.boolean(),
    teacherCanUpdate: v.boolean(),
  }).index("by_appConfigId", ["appConfigId"]),
});
