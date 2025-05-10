import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createAppSetting = mutation({
  args: {
    descriptionLabel: v.string(),
    systemValue: v.string(),
    category: v.string(),
    appConfigId: v.id("appConfiguration"),
    enabled: v.boolean(),
    teacherCanUpdate: v.boolean(),
  },
  handler: async (ctx, args) => {
    const appSettingId = await ctx.db.insert("appSetting", {
      descriptionLabel: args.descriptionLabel,
      systemValue: args.systemValue,
      category: args.category,
      appConfigId: args.appConfigId,
      enabled: args.enabled,
      teacherCanUpdate: args.teacherCanUpdate,
    });
    return appSettingId;
  },
});

export const getAppSettingsByAppConfigId = query({
  args: { appConfigId: v.id("appConfiguration") },
  handler: async (ctx, args) => {
    console.log({ appConfigId: args.appConfigId });
    const appSettings = await ctx.db
      .query("appSetting")
      .withIndex("by_appConfigId", (q) => q.eq("appConfigId", args.appConfigId))
      .collect();
    return appSettings;
  },
});

export const updateAppSetting = mutation({
  args: {
    id: v.id("appSetting"),
    descriptionLabel: v.optional(v.string()),
    systemValue: v.optional(v.string()),
    category: v.optional(v.string()),
    appConfigId: v.optional(v.id("appConfiguration")),
    enabled: v.optional(v.boolean()),
    teacherCanUpdate: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { id, ...rest } = args;
    await ctx.db.patch(id, rest);
  },
});

export const deleteAppSetting = mutation({
  args: { id: v.id("appSetting") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
