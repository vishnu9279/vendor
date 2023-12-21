import React from "react";
import Button from "../components/auth/Button";
import Input from "../components/auth/Input";
import { useNavigate } from "react-router-dom";
import client from "../api/client";

const EnterOtp = ({ userId }) => {
  const [otp, setOtp] = React.useState("");
  const [loader, setLoader] = React.useState(false);
  const navigate = useNavigate();

  const handleOtp = async (event) => {
    event.preventDefault();
    try {
      setLoader(true);
      const response = await client.patch(
        `/user/verify?userID=${userId}`,
        { otp: otp },
        { headers: { "Access-Control-Allow-Origin": "*" } }
      );
      if (response) {
        setLoader(false);
        alert(response?.data?.message);
        navigate("/login_signup");
      }
      console.log(response);
    } catch (error) {
      setLoader(false);
      console.log(error);
    }
  };
  return (
    <div className="p-4 flex flex-col justify-center items-center m-10">
      <h1 className="mb-2 text-center font-semibold text-3xl mt-14 text-[#4A4A4A]">
        Enter OTP
      </h1>
      <p className="text-[14px] text-center text-[#4A4A4A] mb-5">
        Verify your phone number
      </p>
      <Input
        classname="w-[300px] input-content"
        placeHolder="Enter your phone number"
        type="number"
        name="otp"
        value={otp}
        handleChange={(event) => setOtp(event.target.value)}
      />
      <Button
        label={loader ? "Loading please wait" : "Continue"}
        classname="w-[300px] input-content btn"
        handleClick={handleOtp}
      />
    </div>
  );
};

export default EnterOtp;
