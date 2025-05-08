import React from "react";
import AppCard from "./AppCard";

const appNames = [
  "Student Information System",
  "Gradebook / LMS",
  "Parent Teacher Conferences",
  "Importer",
  "Student Portal",
  "Teacher Portal",
  "Parent Portal",
  "Quizes",
  "Admissions",
  "Financial",
  "Device Manager",
];

const AppsList: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 max-w-screen-xl mx-auto">
      {appNames.map((name) => (
        <AppCard
          key={name}
          appName={name}
          // Using the first letter as a placeholder icon
          icon={name.charAt(0)}
        />
      ))}
    </div>
  );
};

export default AppsList;
