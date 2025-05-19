import { useQuery, useMutation } from "convex/react";
import { useEffect } from "react";
import { useAppStore } from "./appStore";
import { ClassData } from "./types";

function FetchAndSetEnrollments() {
  const enrollmentsFromOtherApp = useQuery("enrollments:getEnrollments" as any);
  const setEnrollments = useAppStore((state) => state.setEnrollments);

  useEffect(() => {
    if (enrollmentsFromOtherApp !== undefined) {
      setEnrollments(enrollmentsFromOtherApp);
    }
  }, [enrollmentsFromOtherApp, setEnrollments]);

  return null;
}

function FetchAndSetClasses() {
  const classesFromOtherApp = useQuery("classes:getClasses" as any);
  const setClasses = useAppStore((state) => state.setClasses);

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
      throw error;
    }
  };

  return createClass;
}

function useUpdateClass() {
  const updateClassMutation = useMutation("classes:updateClass" as any);

  const updateClass = async (updatedClass: ClassData) => {
    if (!updatedClass._id) {
      console.error("Class ID is required for update.");
      throw new Error("Class ID is required for update.");
    }
    try {
      await updateClassMutation(updatedClass);
    } catch (error) {
      console.error("Failed to update class:", error);
      throw error;
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
  return (
    <>
      <FetchAndSetClasses />
      <FetchAndSetEnrollments />
    </>
  );
}

export default GradebookDataFetcher;

export { useCreateClass, useUpdateClass };
