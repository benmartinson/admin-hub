import { useQuery, useMutation } from "convex/react";
import { useEffect } from "react";
import { useAppStore } from "./appStore";

export type ClassData = {
  _id?: string;
  name: string;
  classCode: string;
  startDate: string;
  endDate: string;
  teacher: string;
};

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

  const createClass = async (newClass: Omit<ClassData, "_id">) => {
    try {
      await createClassMutation(newClass);
    } catch (error) {
      console.error("Failed to create class:", error);
      throw error; // Re-throw error to handle it in the component
    }
  };

  return createClass;
}

// New hook to update a class
function useUpdateClass() {
  const updateClassMutation = useMutation("classes:updateClass" as any);

  const updateClass = async (updatedClass: ClassData) => {
    if (!updatedClass._id) {
      console.error("Class ID is required for update.");
      throw new Error("Class ID is required for update.");
    }
    try {
      // The mutation should take the updatedClass object, which includes its _id
      await updateClassMutation(updatedClass);
    } catch (error) {
      console.error("Failed to update class:", error);
      throw error; // Re-throw error to handle it in the component
    }
  };

  return updateClass;
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

export { useCreateClass, useUpdateClass }; // Export new hooks
