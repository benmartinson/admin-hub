import classNames from "classnames";
import { Doc } from "../../../convex/_generated/dataModel";
import { useState, useEffect, useMemo, useRef } from "react";
import { useAppStore } from "@/appStore";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

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
  const { appViewUrl, setAppViewUrl } = useAppStore();
  const appViewUrlChanged = useRef(appViewUrl);

  const sessionId = useQuery(api.auth.getSessionId);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (appConfig.domain && event?.origin?.includes(appConfig.domain)) {
        if (appViewUrlChanged.current !== event.data) {
          appViewUrlChanged.current = event.data;
        }
      }
    };

    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
      if (appViewUrlChanged.current !== appViewUrl) {
        setAppViewUrl(appViewUrlChanged.current);
      }
    };
  }, []);

  const addParams = (url: string) => {
    const domain = window.location.origin;
    let urlWithParams = domain.includes("localhost")
      ? `${url}?parent_domain=${domain}`
      : `${url}?parent_domain=${domain}`;

    if (sessionId) {
      urlWithParams = urlWithParams + `&admin_session_id=${sessionId}`;
    }

    return urlWithParams;
  };

  const validatedUrl = useMemo(() => {
    let url = appViewUrl || appConfig?.testUrl;
    if (url && typeof url === "string") {
      url = url.trim();
      if (!url.startsWith("http://") && !url.startsWith("https://")) {
        if (
          url.startsWith("localhost") ||
          /^[a-zA-Z0-9.-]+:\d+/.test(url) ||
          !url.includes("://")
        ) {
          return addParams(`http://${url}`);
        }
      }
      return addParams(url);
    }
    return "";
  }, [appConfig?.testUrl, appViewUrl, sessionId]);

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
    "flex h-screen min-h-[750px] w-full flex-3 border border-slate-200",
    {
      "max-w-[400px]":
        selectedScreenSize === "mobile" && !iframeError && !isLoading,
      "bg-white": selectedScreenSize !== "mobile",
      "pt-10 justify-center": iframeError || isLoading,
    },
  );

  const outerContainerClasses = classNames(
    "w-full h-full border-0 bg-slate-200 flex justify-center items-center",
    {
      "pt-10 pb-20":
        selectedScreenSize === "mobile" && !iframeError && !isLoading,
    },
  );

  const iframeClasses = classNames("w-full h-full border-0", {
    "border-3 border-slate-700 rounded-3xl": selectedScreenSize === "mobile",
  });

  if (isLoading || !sessionId) {
    return <div className={containerClasses}></div>;
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
    <div className={outerContainerClasses}>
      <div className={containerClasses}>
        <iframe
          src={validatedUrl}
          className={iframeClasses}
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
    </div>
  );
};

export default AppView;
