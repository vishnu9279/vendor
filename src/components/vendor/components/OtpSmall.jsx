import React, { useState } from "react";
import Button from "../../auth/Button";
import Input from "../../auth/Input";
import { useLocation, useNavigate } from "react-router-dom";
import scrapBus from "../../../assets/PNG/scrapbus.png";
import showSuccessMessage from "../../../utils/SwalPopup";
import LabeledInput from "../../auth/LabeledInput";

import { otpVerifyService, handleOTP,resendOtpService } from "../../../services/user";

const OtpSmall = () => {
  const [checked, setChecked] = React.useState(false);
  const [otp, setOtp] = useState("");
  const [isValidPhoneNumber, setIsValidOTP] = useState(false);

  const navigate = useNavigate();

  const location = useLocation();
  const handleOTPChange = (e) => {
    console.log("events", e);
    const value = e.target.value;
    const isValidOtp = handleOTP(value);
    setOtp(value);
    setIsValidOTP(isValidOtp);
  };

  const otpVerify = async () => {
    try {
      if (!checked) {
        showSuccessMessage("Select Term And Condition", "error");
        return;
      }

      const otpVerifyResp = await otpVerifyService(location.state.phoneNumber, otp);
      console.log("otpVerifyResp from Service File", otpVerifyResp);

      if (!otpVerifyResp.isDocumentUploaded) {
        navigate("/add-documents", {
          state: {
            userId: otpVerifyResp.userId,
          },
        });
      } else {
        console.log("token", otpVerifyResp.token);
        localStorage.setItem("token", otpVerifyResp.token);
        showSuccessMessage(otpVerifyResp.message, "success");
        navigate("/vendor-dashboard", {});
      }
    } catch (error) {
      console.error("Error", error);
      const errorMessage = !error.response.data.error.message
        ? error.response.data.error?._message
        : error.response.data.error.message;

      showSuccessMessage(errorMessage, "error");
    }
  };
  const resendOtp = async () => {
    try {
      const otpVerifyResp = await resendOtpService(
        location.state.countryCode,
        location.state.phoneNumber
      );
      showSuccessMessage(otpVerifyResp.message, "success");
    } catch (error) {
      console.error("Error", error);
      const errorMessage = !error.response.data.error.message
        ? error.response.data.error?._message
        : error.response.data.error.message;

      showSuccessMessage(errorMessage, "error");
    }
  };
  return (
    <div className="small-devices bg-[#5AB344]">
      <div className="pl-10 pr-10">
        <img src={scrapBus} className="w-full h-[255px] xs:h-[400px]" alt="" />
      </div>
      <div className="bg-white -mt-12 p-10 rounded-t-lg">
        <div className="mt-5">
          <h2 className="text-[#303030]  text-[32px] mt-2 mb-0"> OTP Verification</h2>
          <p className="text-[#707070]  text-[14px]">
            Create a new account in four simple steps
          </p>
        </div>
        <form className="mt-5">
          <p className="text-[#666666] text-[16px]">OTP Verification</p>
          <LabeledInput
            className="col-span-2"
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength="6"
            handleChange={handleOTPChange}
          />
          {isValidPhoneNumber || (
            <p className="text-red-500 text-sm">
              Please enter a valid 6-digit OTP.
            </p>
          )}
          {/* <StepThree /> */}
          <div className="absolute right-50">
              <span
                className="text-[14px] text-[#666666] font-semibold mt-20 mb-5 max-w-2xl cursor-pointer"
                onClick={resendOtp}
              >
                Resend Otp
              </span>
            </div>
          <div className="mt-40 text-start text-xl  leading-[25.3px] text-[#707070] "></div>
          <p className="text-[14px] text-[#666666] font-semibold mt-20 mb-5 max-w-2xl">
            <Input
              type="checkbox"
              classname="w-[18px] h-[18px] bg-[#5AB344] mr-2 translate-y-1 cursor-pointer"
              value={checked}
              checked={checked}
              handleChange={() => setChecked((prevState) => !prevState)}
            />{" "}
            By creating an account, I agree to our
            <span className="underline cursor-pointer">
              Terms of use
            </span> and{" "}
            <span className="underline cursor-pointer">Privacy Policy </span>
          </p>
          <Button
            label="Continue"
            classname="font-semibold text-[19px] p-[2] text-center bg-[#5AB344] w-full text-white rounded-[27px] outline-none border-none h-[55px] hover:opacity-80"
            handleClick={otpVerify}
          />
          <p className="text-[#333333] text-[16px] font-[400] text-center mt-5 -mb-3">
            Already have an account?{" "}
            <span
              className="font-semibold cursor-pointer none hover:text-[#5AB344]"
              onClick={() => navigate("/vendor-signIn")}
            >
              Sign in
            </span>{" "}
          </p>
        </form>
      </div>
    </div>
  );
};

export default OtpSmall;
