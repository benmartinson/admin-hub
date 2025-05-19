import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

export default defineSchema({
  ...authTables,

  appConfiguration: defineTable({
    userId: v.id("users"),
    domain: v.optional(v.string()),
    testUrl: v.optional(v.string()),
    appId: v.number(),
    convexUrl: v.optional(v.string()),
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

  users: defineTable({
    name: v.optional(v.string()),
    email: v.optional(v.string()),
    phone: v.optional(v.string()),
    tokenIdentifier: v.optional(v.string()),
    emailVerificationTime: v.optional(v.number()),
  }).index("by_tokenIdentifier", ["tokenIdentifier"]),
});
