import { SignIn } from "@clerk/clerk-react";

export default function Login() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <SignIn
        path="/test/login"
        routing="path"
        signUpUrl="/test/register"
        fallbackRedirectUrl="/test/dashboard"
      />
    </div>
  );
}
