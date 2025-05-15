import { ConvexReactClient, ConvexProvider, useQuery } from "convex/react";
import { useEffect } from "react";
import { useAppStore } from "./appStore";

function FetchAndSetClasses() {
  const classesFromOtherApp = useQuery("classes:getClasses" as any);
  const setClasses = useAppStore((state) => state.setClasses);
  console.log({ classesFromOtherApp });

  useEffect(() => {
    if (classesFromOtherApp !== undefined) {
      setClasses(classesFromOtherApp);
    }
  }, [classesFromOtherApp, setClasses]);

  return null;
}

function GradebookDataFetcher({
  gradebookUrl,
}: {
  gradebookUrl: string | undefined;
}) {
  if (!gradebookUrl) {
    return null;
  }
  const convexOtherApp = new ConvexReactClient(gradebookUrl);
  return (
    <ConvexProvider client={convexOtherApp}>
      <FetchAndSetClasses />
    </ConvexProvider>
  );
}

export default GradebookDataFetcher;
