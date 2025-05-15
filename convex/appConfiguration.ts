import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";
import { Doc } from "./_generated/dataModel";

export const getAppConfiguration = query({
  args: {
    appId: v.number(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return {} as Doc<"appConfiguration">;
    }

    const config = await ctx.db
      .query("appConfiguration")
      .withIndex("by_user_and_app", (q) =>
        q.eq("userId", userId).eq("appId", args.appId),
      )
      .first();

    return config || ({} as Doc<"appConfiguration">);
  },
});

export const createAppConfiguration = mutation({
  args: {
    domain: v.string(),
    testUrl: v.string(),
    appId: v.number(),
    convexUrl: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    const configId = await ctx.db.insert("appConfiguration", {
      userId,
      domain: args.domain,
      testUrl: args.testUrl,
      appId: args.appId,
      convexUrl: args.convexUrl,
    });

    return configId;
  },
});

export const updateAppConfiguration = mutation({
  args: {
    id: v.id("appConfiguration"),
    domain: v.string(),
    testUrl: v.string(),
    appId: v.number(),
    convexUrl: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    const config = await ctx.db.get(args.id);
    if (!config) {
      throw new Error("Configuration not found");
    }

    if (config.userId !== userId) {
      throw new Error("Not authorized to update this configuration");
    }

    await ctx.db.patch(args.id, {
      domain: args.domain,
      testUrl: args.testUrl,
      appId: args.appId,
      convexUrl: args.convexUrl,
    });

    return args.id;
  },
});

export const deleteAppConfiguration = mutation({
  args: {
    id: v.id("appConfiguration"),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    const config = await ctx.db.get(args.id);
    if (!config) {
      throw new Error("Configuration not found");
    }

    if (config.userId !== userId) {
      throw new Error("Not authorized to delete this configuration");
    }

    await ctx.db.delete(args.id);
    return args.id;
  },
});
