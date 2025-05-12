import { getAuthUserId } from "@convex-dev/auth/server";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// export const getUser = query({
//   args: {
//     id: v.id("users"),
//   },
//   handler: async (ctx, args) => {
//     return await ctx.db.get(args.id);
//   },
// });

export const currentUser = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      return null;
    }
    return await ctx.db.get(userId);
  },
});

export const updateUser = mutation({
  args: {
    name: v.optional(v.string()),
    phone: v.optional(v.string()),
    email: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      return null;
    }
    return await ctx.db.patch(userId, args);
  },
});

// export const createUser = mutation({
//   args: {
//     tokenIdentifier: v.string(),
//     name: v.optional(v.string()),
//     email: v.optional(v.string()),
//   },
//   handler: async (ctx, args) => {
//     const existingUser = await ctx.db
//       .query("users")
//       .withIndex("by_tokenIdentifier", (q) =>
//         q.eq("tokenIdentifier", args.tokenIdentifier),
//       )
//       .unique();

//     if (existingUser) {
//       return existingUser._id;
//     }

//     return await ctx.db.insert("users", {
//       tokenIdentifier: args.tokenIdentifier,
//       name: args.name,
//       email: args.email,
//     });
//   },
// });
