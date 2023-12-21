import React from "react";
import ForgotPasswordComponent from "../components/ForgotPassword/ForgotPasswordComponent";
import { useNavigate } from "react-router-dom";
import client from "../api/client";

const ForgotPasswordPageOne = () => {
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setPhoneNumber(event.target.value);
    setError("");
  };

  const handlePhoneNumber = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await client.patch("/user/forget-password", {
        phoneNumber: `+${phoneNumber}`,
      });
      // +2349135914309
      if (response) {
        setLoading(false);
        alert(response?.data?.message);
        setPhoneNumber("");
        navigate("/forgot-password-page2");
      }
      console.log(response.data, ">>>>>");
    } catch (error) {
      setLoading(false);
      console.log(error, "eeee");
      setError(error?.response?.data?.message);
    }
  };

  return (
    <ForgotPasswordComponent
      loading={loading}
      handleChange={handleChange}
      input={{
        value: phoneNumber,
        name: "phoneNumber",
        type: "number",
        placeHolder: "Phone number",
      }}
      label="Provide your phone number"
      inputLabel="Phone number"
      handleClick={handlePhoneNumber}
      disabled={!phoneNumber}
      errorMessage={error}
    />
  );
};

export default ForgotPasswordPageOne;
