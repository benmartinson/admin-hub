import { v } from "convex/values";
import { query, mutation, action } from "./_generated/server";
import { api } from "./_generated/api";
import { getAuthUserId } from "@convex-dev/auth/server";

// Write your Convex functions in any file inside this directory (`convex`).
// See https://docs.convex.dev/functions for more.

// You can read data from the database via a query:
// export const listNumbers = query({
//   // Validators for arguments.
//   args: {
//     count: v.number(),
//   },

//   // Query implementation.
//   handler: async (ctx, args) => {
//     //// Read the database as many times as you need here.
//     //// See https://docs.convex.dev/database/reading-data.
//     const numbers = await ctx.db
//       .query("numbers")
//       // Ordered by _creationTime, return most recent
//       .order("desc")
//       .take(args.count);
//     const userId = await getAuthUserId(ctx);
//     const user = userId === null ? null : await ctx.db.get(userId);
//     return {
//       viewer: user?.email ?? null,
//       numbers: numbers.reverse().map((number) => number.value),
//     };
//   },
// });
