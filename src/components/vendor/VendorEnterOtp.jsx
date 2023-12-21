import React from "react";
import Input from "../auth/Input";
import Button from "../auth/Button";
import { useNavigate } from "react-router-dom";

const VendorEnterOtp = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = React.useState("");
  const [loader, setLoader] = React.useState(false);

  return (
    <div className="p-5 flex flex-col justify-center items-center m-10">
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
      />
    </div>
  );
};

export default VendorEnterOtp;
