import React from "react";
import ForgotPasswordComponent from "../components/ForgotPassword/ForgotPasswordComponent";
import { useNavigate } from "react-router-dom";
import client from "../api/client";

const ForgotPasswordPageTwo = () => {
  const [otp, setOtp] = React.useState("");
  const navigate = useNavigate();
  const [error, setError] = React.useState("");

  const handleChange = (event) => setOtp(event.target.value);

  const handleOtp = async (event) => {
    event.preventDefault();
    try {
      const response = await client.patch("/user/verify-password-otp", {
        otp: otp,
      });
      if (response) {
        navigate("/forgotpassword");
      }
      console.log(response, ">>>");
    } catch (error) {
      setError(error?.error?.data?.message);
      console.log(error);
    }
  };

  return (
    <ForgotPasswordComponent
      handleChange={handleChange}
      input={{ value: otp, name: "otp", type: "text", placeHolder: "OTP" }}
      label="Provide the OTP code sent to your phone"
      inputLabel="OTP"
      handleClick={handleOtp}
      disabled={!otp}
      errorMessage={error}
    />
  );
};

export default ForgotPasswordPageTwo;
