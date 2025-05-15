import { useConvexAuth } from "convex/react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashboardPage from "./dashboard/DashboardPage";
import SignInForm from "./auth/SignInForm";
import Navbar from "./layout/Navbar";
import AccountPage from "./AccountPage";

export default function App() {
  const { isAuthenticated, isLoading } = useConvexAuth();

  if (isLoading) {
    return (
      <main className="p-8 flex flex-col gap-16 items-center justify-center min-h-screen"></main>
    );
  }

  return (
    <BrowserRouter>
      <div className="flex flex-col h-full min-h-screen bg-white top-0 left-0 right-0">
        <Navbar isAuthenticated={isAuthenticated} />
        <Routes>
          <Route
            path="/login"
            element={
              !isAuthenticated ? (
                <SignInForm />
              ) : (
                <Navigate to="/dashboard/view" />
              )
            }
          />
          <Route
            path="/account"
            element={
              isAuthenticated ? <AccountPage /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/dashboard/*"
            element={
              isAuthenticated ? <DashboardPage /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard/view" />
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
