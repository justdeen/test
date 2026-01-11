// import {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {sendPasswordResetEmail} from "firebase/auth";
import {auth} from "../firebase";
import {Form, Input, Button} from "antd";

interface DashboardProps{
  setRstMessage: React.Dispatch<React.SetStateAction<boolean>>
}

export default function PasswordRst({setRstMessage}: DashboardProps) {
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    const isLocalhost = window.location.hostname === "localhost";
    const actionCodeSettings = {
      url: isLocalhost ? "http://localhost:3000/login" : "",
      handleCodeInApp: false,
    };

    try {
      await sendPasswordResetEmail(auth, values.email, actionCodeSettings);
      setRstMessage(true)
    } catch (e: any) {
      console.log(e.message);
    }
    navigate("/login");
  };

  return (
    <div className="mt-7 flex w-full flex-col items-center">

      <p className="my-0" style={{fontSize: "25px", fontWeight: "500", color: "#1677FF"}}>
        Test Project
      </p>
      <div style={{width: "100%", maxWidth: "800px", padding: "6px"}}>
        <div className="heading" style={{textAlign: "center"}}>
          <h2 style={{fontWeight: "500"}}>Password Reset 🔐</h2>
        </div>

        <p className="my-4 font-semibold" style={{fontSize: "14px"}}>
          {/* A link to reset your password will be sent to this Email (check your primary or Spam folder).
          <br /> */}
          Check your Primary or <span className="font-bold">SPAM</span> folder for the reset link after submission.
          <br />
          <br />
          Tap the "Report not spam" button on the email to enable subsequent emails land in 
          <span className="font-bold"> PRIMARY</span> folder.
        </p>

        <Form name="trigger" layout="vertical" onFinish={onFinish} autoComplete="on">
          <Form.Item
            hasFeedback
            label="Email"
            name="email"
            
            validateFirst
            rules={[{required: true, type: "email"}]}>
            <Input placeholder="Enter email" 
            style={{fontSize: "15px", height: "40px"}}/>
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            style={{fontWeight: "500",outline: "none", fontSize: "15px", height: "40px", marginBottom: "10px"}}
            block>
            Submit
          </Button>
        </Form>

        <Link to="/test/login" style={{fontSize: "15px"}}>
          Back to Login
        </Link>
      </div>
    </div>
  );
}