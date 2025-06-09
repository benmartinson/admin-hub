import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { api } from "./_generated/api";
import { auth } from "./auth";

const http = httpRouter();

auth.addHttpRoutes(http);

// HTTP endpoint to get app settings by app config ID
http.route({
  path: "/api/app-settings",
  method: "GET",
  handler: httpAction(async (ctx, request) => {
    // Extract appConfigId from URL search params
    const url = new URL(request.url);
    const appConfigId = url.searchParams.get("appConfigId");

    if (!appConfigId) {
      return new Response(
        JSON.stringify({ error: "appConfigId parameter is required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    try {
      // Call the query function
      const appSettings = await ctx.runQuery(
        api.appSetting.getAppSettingsByAppConfigId,
        {
          appConfigId: appConfigId as any, // Type assertion needed for ID
        },
      );

      return new Response(JSON.stringify({ settings: appSettings }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      return new Response(
        JSON.stringify({ error: "Failed to fetch app settings" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        },
      );
    }
  }),
});

export default http;
