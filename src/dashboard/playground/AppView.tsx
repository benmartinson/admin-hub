import classNames from "classnames";
import { Doc } from "../../../convex/_generated/dataModel";
import { useState, useEffect, useMemo } from "react";
import LoadingSpinner from "@/common/LoadingSpinner";

const AppView = ({
  appConfig,
  selectedScreenSize,
  toggleRefresh,
}: {
  appConfig: Doc<"appConfiguration">;
  selectedScreenSize: "mobile" | "normal" | "maximize";
  toggleRefresh: number;
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
      "px-60 py-10":
        selectedScreenSize === "mobile" && !iframeError && !isLoading,
      "pt-10 justify-center": iframeError || isLoading,
    },
  );

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
      <iframe
        src={validatedUrl}
        className="w-full h-full border-0"
        sandbox="allow-scripts allow-same-origin"
        key={toggleRefresh}
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
  );
};

export default AppView;
