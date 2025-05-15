import { useQuery, useMutation } from "convex/react";
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

function useCreateClass() {
  const createClassMutation = useMutation("classes:createClass" as any);

  const createClass = async (newClass: any) => {
    try {
      await createClassMutation(newClass);
    } catch (error) {
      console.error("Failed to create class:", error);
    }
  };

  return createClass;
}

function GradebookDataFetcher({
  gradebookUrl,
}: {
  gradebookUrl: string | undefined;
}) {
  if (!gradebookUrl) {
    return null;
  }
  return <FetchAndSetClasses />;
}

export default GradebookDataFetcher;

export { useCreateClass };
