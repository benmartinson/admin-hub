import classNames from "classnames";
import { Doc } from "../../../convex/_generated/dataModel";
import { useState, useEffect, useMemo } from "react";
import LoadingSpinner from "@/common/LoadingSpinner";

const AppView = ({
  appConfig,
  selectedScreenSize,
}: {
  appConfig: Doc<"appConfiguration">;
  selectedScreenSize: "mobile" | "normal" | "maximize";
}) => {
  const [iframeError, setIframeError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const validatedUrl = useMemo(() => {
    let url = appConfig?.testUrl;
    if (url && typeof url === "string") {
      url = url.trim();
      if (!url.startsWith("http://") && !url.startsWith("https://")) {
        if (
          url.startsWith("localhost") ||
          /^[a-zA-Z0-9.-]+:\d+/.test(url) ||
          !url.includes("://")
        ) {
          return `http://${url}`;
        }
      }
      return url;
    }
    return "";
  }, [appConfig?.testUrl]);

  useEffect(() => {
    if (!validatedUrl) {
      setIframeError(true);
      setIsLoading(false);
      return;
    }

    setIframeError(false);
    setIsLoading(true);

    fetch(validatedUrl)
      .then((response) => {
        if (!response.ok) {
          setIframeError(true);
        }
      })
      .catch(() => {
        setIframeError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [validatedUrl]);

  const containerClasses = classNames(
    "flex h-screen w-full flex-3 bg-white border border-slate-200",
    {
      "px-68 py-4":
        selectedScreenSize === "mobile" && !iframeError && !isLoading,
      "pt-20 justify-center": iframeError || isLoading,
    },
  );

  const iframeWrapperClasses = classNames("w-full h-full", {
    "px-68 py-4": selectedScreenSize === "mobile",
  });

  if (isLoading) {
    return (
      <div className={containerClasses}>
        <LoadingSpinner />
      </div>
    );
  }

  if (iframeError) {
    return (
      <div className={containerClasses}>
        <p className="text-slate-500 text-center">
          There was a problem loading the application.
          <br />
          Please confirm the test URL is set correctly on the configuration
          page.
          <br />
          Attempted URL: {validatedUrl || "N/A (URL possibly empty or invalid)"}
        </p>
      </div>
    );
  }

  return (
    <div className={containerClasses}>
      <div
        className={iframeWrapperClasses}
        style={
          selectedScreenSize === "mobile"
            ? {
                width: "375px",
                height: "667px",
                boxShadow: "0 0 10px rgba(0,0,0,0.1)",
              }
            : { width: "100%", height: "100%" }
        }
      >
        <iframe
          src={validatedUrl}
          className="w-full h-full border-0"
          sandbox="allow-scripts allow-same-origin"
          title="lms"
          onError={() => {
            if (!iframeError) setIframeError(true);
            setIsLoading(false);
          }}
          onLoad={() => {
            setIsLoading(false);
          }}
        />
      </div>
    </div>
  );
};

export default AppView;
