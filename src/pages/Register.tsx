import { SignUp, } from "@clerk/clerk-react";

export default function Register() {

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <SignUp
        path="/test/register"
        routing="path"
        signInUrl="/test/login"
        fallbackRedirectUrl="/test/dashboard"
      />
    </div>
  );
}
