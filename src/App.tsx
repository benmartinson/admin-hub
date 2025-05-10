import { useConvexAuth } from "convex/react";
import UserProfile from "./auth/UserProfile";
import LoadingSpinner from "./common/LoadingSpinner";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashboardPage from "./dashboard/DashboardPage";
import SignInForm from "./auth/SignInForm";
import Navbar from "./layout/Navbar";
import { useState } from "react";

export default function App() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const [selectedTab, setSelectedTab] = useState<string>("Customizations");

  if (isLoading) {
    return (
      <main className="p-8 flex flex-col gap-16 items-center justify-center min-h-screen">
        <LoadingSpinner />
      </main>
    );
  }

  return (
    <BrowserRouter>
      <div className="flex flex-col h-screen bg-white top-0 left-0 right-0">
        <Navbar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
        <Routes>
          <Route
            path="/login"
            element={
              !isAuthenticated ? <SignInForm /> : <Navigate to="/dashboard" />
            }
          />
          <Route
            path="/dashboard"
            element={
              isAuthenticated ? (
                <DashboardPage selectedTab={selectedTab} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
