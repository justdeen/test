import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import Dashboard from "./pages/Dashboard";
import Security from "./pages/Security";
import Login from "./pages/Login";
import Register from "./pages/Register";

export default function App() {
  return (
    <>
      {/* ---------------- Authenticated routes ---------------- */}
      <SignedIn>
        <HashRouter>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/security" element={<Security />} />
            {/* Optional fallback redirects */}
            <Route path="/login" element={<Navigate to="/dashboard" replace />} />
            <Route path="/register" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </HashRouter>
      </SignedIn>

      {/* ---------------- Unauthenticated routes ---------------- */}
      <SignedOut>
        <HashRouter>
          <Routes>
            <Route path="/login/*" element={<Login />} />
            <Route path="/register/*" element={<Register />} />
            {/* Remove PasswordRst if using Clerk's built-in reset */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </HashRouter>
      </SignedOut>
    </>
  );
}
