import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useState } from "react";

const ConfigurationPage = () => {
  const appConfig = useQuery(api.appConfiguration.getAppConfiguration, {
    appId: 1,
  });

  const [domain, setDomain] = useState(appConfig?.domain || "");
  const [testUrl, setTestUrl] = useState(appConfig?.testUrl || "");

  const createConfig = useMutation(api.appConfiguration.createAppConfiguration);
  const updateConfig = useMutation(api.appConfiguration.updateAppConfiguration);

  const handleSave = async () => {
    if (appConfig) {
      await updateConfig({
        id: appConfig._id,
        domain,
        testUrl: testUrl,
        appId: appConfig.appId,
      });
    } else {
      await createConfig({
        domain,
        testUrl: testUrl,
        appId: 1,
      });
    }
  };

  return (
    <div className="p-6">
      <div className="space-y-6">
        <div>
          <label
            htmlFor="vercelDomain"
            className="block text-sm font-medium text-slate-700 mb-1"
          >
            Domain
          </label>
          <input
            type="text"
            id="vercelDomain"
            className="w-1/2 px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none"
            placeholder="Enter your deployment domain"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
          />
        </div>

        <div>
          <label
            htmlFor="testUrl"
            className="block text-sm font-medium text-slate-700 mb-1"
          >
            Test URL
          </label>
          <input
            type="text"
            id="testUrl"
            className="w-1/2 px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none"
            placeholder="Enter the test URL you want to use to view the app"
            value={testUrl}
            onChange={(e) => setTestUrl(e.target.value)}
          />
        </div>

        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Save Configuration
        </button>
      </div>
    </div>
  );
};

export default ConfigurationPage;
