import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useState } from "react";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AppConfig } from "@/types";

const ConfigurationPage = ({ appConfig }: { appConfig: AppConfig }) => {
  const currentUser = useQuery(api.users.currentUser);
  const [domain, setDomain] = useState(appConfig?.domain || "");
  const [testUrl, setTestUrl] = useState(appConfig?.testUrl || "");
  const [convexUrl, setConvexUrl] = useState(appConfig?.convexUrl || "");
  const [convexUrlInput, setConvexUrlInput] = useState("");
  const [isEditingConvexUrl, setIsEditingConvexUrl] = useState(false);
  const [lastSavedField, setLastSavedField] = useState<
    "domain" | "testUrl" | "convexUrl" | null
  >(null);
  const [saveSuccessTimeout, setSaveSuccessTimeout] =
    useState<NodeJS.Timeout | null>(null);
  const [convexUrlError, setConvexUrlError] = useState("");
  const createConfig = useMutation(api.appConfiguration.createAppConfiguration);
  const updateConfig = useMutation(api.appConfiguration.updateAppConfiguration);
  
  const isConvexUrlBlocked = currentUser?.email === "benmartinson92@gmail.com";

  const handleFieldBlur = async (
    field: "domain" | "testUrl" | "convexUrl",
    value: string,
  ) => {
    if (!appConfig) {
      await createConfig({
        domain: field === "domain" ? value : "",
        testUrl: field === "testUrl" ? value : "",
        convexUrl: field === "convexUrl" ? value : "",
        appId: 1,
      });
      return;
    }

    const currentValue = appConfig[field] || "";
    if (value === currentValue) return;

    try {
      await updateConfig({
        id: appConfig._id,
        domain: field === "domain" ? value : appConfig.domain || "",
        testUrl: field === "testUrl" ? value : appConfig.testUrl || "",
        convexUrl: field === "convexUrl" ? value : appConfig.convexUrl || "",
        appId: appConfig.appId,
      });
      setLastSavedField(field);
      if (saveSuccessTimeout) clearTimeout(saveSuccessTimeout);
      setSaveSuccessTimeout(
        setTimeout(() => {
          setLastSavedField(null);
        }, 2000),
      );
    } catch (error) {
      console.error(`Failed to update ${field}:`, error);
      setLastSavedField(null);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <label
          htmlFor="testUrl"
          className="block text-sm font-medium text-slate-700 mb-1"
        >
          Test URL
        </label>
        <div className="relative w-1/2 flex items-center">
          <input
            type="text"
            id="testUrl"
            className="block w-full px-3 bg-white py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none"
            placeholder="Enter the test URL you want to use to view the app"
            value={testUrl}
            onBlur={() => handleFieldBlur("testUrl", testUrl)}
            onChange={(e) => setTestUrl(e.target.value)}
          />
          {lastSavedField === "testUrl" && (
            <span className="absolute right-2 top-1/2 -translate-y-1/2 mt-0.5 text-green-500">
              <FontAwesomeIcon icon={faCheck} />
            </span>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="vercelDomain"
          className="block text-sm font-medium text-slate-700 mb-1"
        >
          Domain
        </label>
        <div className="relative w-1/2 flex items-center">
          <input
            type="text"
            id="vercelDomain"
            className="block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none"
            placeholder="Enter your deployment domain"
            value={domain}
            onBlur={() => handleFieldBlur("domain", domain)}
            onChange={(e) => setDomain(e.target.value)}
          />
          {lastSavedField === "domain" && (
            <span className="absolute right-2 top-1/2 -translate-y-1/2 mt-0.5 text-green-500">
              <FontAwesomeIcon icon={faCheck} />
            </span>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="convexUrl"
          className="block text-sm font-medium text-slate-700 mb-1"
        >
          Convex URL
        </label>
        <div className="relative w-1/2 flex items-center gap-2">
          {!isEditingConvexUrl && convexUrl ? (
            <>
              <div className="flex-1 px-3 py-2 bg-gray-50 border border-slate-300 rounded-md">
                <span className="text-slate-600">••••••••••••</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsEditingConvexUrl(true);
                  setConvexUrlInput("");
                  setConvexUrlError("");
                }}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Edit
              </button>
            </>
          ) : (
            <>
              <input
                type="password"
                id="convexUrl"
                className="flex-1 px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none"
                placeholder="Enter your Convex deployment URL"
                value={convexUrlInput}
                onChange={(e) => setConvexUrlInput(e.target.value)}
                autoFocus={isEditingConvexUrl}
              />
              {(isEditingConvexUrl || !convexUrl) && (
                <>
                  <button
                    type="button"
                    onClick={async () => {
                      if (isConvexUrlBlocked) {
                        setConvexUrlError("You don't have permission to change this field");
                        return;
                      }
                      if (convexUrlInput) {
                        await handleFieldBlur("convexUrl", convexUrlInput);
                        setConvexUrl(convexUrlInput);
                      }
                      setConvexUrlInput("");
                      setIsEditingConvexUrl(false);
                      setConvexUrlError("");
                    }}
                    className="text-sm text-green-600 hover:text-green-800"
                  >
                    Save
                  </button>
                  {convexUrl && (
                    <button
                      type="button"
                      onClick={() => {
                        setConvexUrlInput("");
                        setIsEditingConvexUrl(false);
                        setConvexUrlError("");
                      }}
                      className="text-sm text-gray-600 hover:text-gray-800"
                    >
                      Cancel
                    </button>
                  )}
                </>
              )}
            </>
          )}
          {lastSavedField === "convexUrl" && !isEditingConvexUrl && (
            <span className="text-green-500">
              <FontAwesomeIcon icon={faCheck} />
            </span>
          )}
        </div>
        {convexUrlError && (
          <p className="mt-1 text-sm text-red-600">{convexUrlError}</p>
        )}
      </div>
    </div>
  );
};

export default ConfigurationPage;
