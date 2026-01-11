import { UserProfile, useClerk } from "@clerk/clerk-react";
import { useNavigate, } from "react-router-dom";

export default function Security() {
  const { signOut } = useClerk();
  const navigate = useNavigate();

  const handleLogout = async (): Promise<void> => {
    await signOut();
    navigate("/test/login");
  };

  return (
    <div style={{display: "flex", justifyContent: "center", marginTop: "1.5rem"}}>
      <div>
        <UserProfile />
        <br />
        <div style={{display: "flex", justifyContent: "space-between", flexWrap: "wrap"}}>
          <a
            href="/test/dashboard"
            style={{
              width: "100%",
              maxWidth: "100%",
              padding: "12px",
              fontSize: "16px",
              cursor: "pointer",
              marginBottom: "1rem",
              border: "1px solid #646cff",
              textAlign: "center",
              borderRadius: "8px",
            }}>
            Dashboard
          </a>
          <button
            onClick={handleLogout}
            style={{
              width: "100%",
              maxWidth: "100%",
              padding: "12px",
              fontSize: "16px",
              cursor: "pointer",
              marginBottom: "1rem",
              color: "white",
              backgroundColor: "black",
            }}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
