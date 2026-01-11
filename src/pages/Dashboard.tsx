import { useEffect, } from "react";
import { useNavigate } from "react-router-dom";
import { useUser, useClerk } from "@clerk/clerk-react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import wave from "../assets/wave-hand.png"

export default function Dashboard() {
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();
  const navigate = useNavigate();
  
  // Fetch Firestore data only when Clerk user is fully loaded
  useEffect(() => {
    if (!user) return;

    const createDb = async () => {
      const userRef = doc(db, "users", user.id); // Use Clerk user ID
      const snap = await getDoc(userRef);
      if (!snap.exists()) {
        try {
          await setDoc(doc(db, "users", user.id), {
            firstName: user.firstName ?? "",
            lastName: user.lastName ?? "",
            email: user.primaryEmailAddress?.emailAddress ?? "",
          });
          console.log("Firestore user created successfully!");
        } catch (error) {
          console.error("Error creating Firestore user:", error);
        }
      }
    };

    createDb();
  }, [user]);

  // Logout
  const handleLogout = async (): Promise<void> => {
    await signOut();
    navigate("/test/login");
  };

  if (!isLoaded) {
    return <div>Loading...</div>; // Prevent rendering until Clerk fully loads
  }

  return (
    <div>
      <div
        style={{
          // marginTop: "3rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          width: "100%",
          padding: "1rem",
        }}>
        <div 
          style={{
            textAlign: "center", 
            marginBottom: "35px", 
            marginTop: "-90px",
            fontWeight: "500", 
            color: "white",
            fontSize: "20px",
            backgroundColor: "#646CFF",
            borderRadius: "50px",
            padding: "13px 27px"
          }}>
          Dashboard
        </div>

        <div style={{marginBottom: "1rem", color: "black", display: "flex"}}>
          <span>Hello {user?.firstName || ""}</span>
          <img src={wave} 
            style={{
              height: "30px",
              width: "30px",
              marginTop: "-5px",
              marginLeft: "2.5px"
            }}
            alt="" 
          />
        </div>
        <button
          onClick={handleLogout}
          style={{
            width: "100%",
            maxWidth: "300px",
            padding: "12px",
            fontSize: "16px",
            cursor: "pointer",
            marginBottom: "1rem",
            color: "white",
            backgroundColor: "black",
          }}>
          Logout
        </button>
        <a href="/test/security"
          style={{
              width: "100%",
              maxWidth: "300px",
              padding: "12px",
              fontSize: "16px",
              cursor: "pointer",
              marginBottom: "1rem",
              border: "1px solid #646cff",
              textAlign: "center",
              borderRadius: "8px"
            }}
        >
          Security
        </a>
      </div>
    </div>
  );
}
