import { convexAuth } from "@convex-dev/auth/server";
import { Password } from "@convex-dev/auth/providers/Password";
import { ResendOTPPasswordReset } from "./ResendOTPPasswordReset";
import { query } from "./_generated/server";
import { v } from "convex/values";
import { getAuthSessionId } from "@convex-dev/auth/server";
import { Id } from "./_generated/dataModel";

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [Password({ reset: ResendOTPPasswordReset })],
});

export const getSessionId = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    const sessionId = await getAuthSessionId(ctx);
    return sessionId;
  },
});

export const validateSessionId = query({
  args: { sessionId: v.string() },
  handler: async (ctx, args) => {
    try {
      const sessionId = args.sessionId as Id<"authSessions">;
      const session = await ctx.db.get(sessionId);

      if (!session || !session.userId) return { isValid: false };

      const user = await ctx.db.get((session as any).userId);
      return { isValid: true, user };
    } catch {
      return { isValid: false };
    }
  },
});
