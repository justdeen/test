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
            <Route path="/test/dashboard" element={<Dashboard />} />
            <Route path="/test/security" element={<Security />} />
            {/* Optional fallback redirects */}
            <Route path="/test/login" element={<Navigate to="/test/dashboard" replace />} />
            <Route path="/test/register" element={<Navigate to="/test/dashboard" replace />} />
            <Route path="*" element={<Navigate to="/test/dashboard" replace />} />
          </Routes>
        </HashRouter>
      </SignedIn>

      {/* ---------------- Unauthenticated routes ---------------- */}
      <SignedOut>
        <HashRouter>
          <Routes>
            <Route path="/test/login/*" element={<Login />} />
            <Route path="/test/register/*" element={<Register />} />
            {/* Remove PasswordRst if using Clerk's built-in reset */}
            <Route path="*" element={<Navigate to="/test/login" replace />} />
          </Routes>
        </HashRouter>
      </SignedOut>
    </>
  );
}
