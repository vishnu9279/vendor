import React from "react";
import LabeledInput from "../../auth/LabeledInput";

const StepTwo = ({ otp, setOtp }) => {
  return (
    <>
      <LabeledInput
        label="OTP Verification"
        type="number"
        name="otp"
        value={otp}
        handleChange={setOtp}
      />
      <p className="text-[#666666] font-[400] text-[16px] text-center mt-4 mb-16">
        Enter the code sent to your number
        <br />
        Didn’t receive a code?{" "}
        <span className="uppercase font-semibold text-[#5AB344] underline cursor-pointer">
          resend
        </span>
      </p>
    </>
  );
};

export default StepTwo;
