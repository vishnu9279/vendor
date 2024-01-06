import React, { useEffect, useState } from "react";
import Button from "../../auth/Button";
import customer from "../../../assets/PNG/tractor 2.png";
import Input from "../../auth/Input";
import { useLocation, useNavigate } from "react-router-dom";
import LabeledInput from "../../auth/LabeledInput";
import showSuccessMessage from "../../../utils/SwalPopup";
import OtpSmall from "../components/OtpSmall";

import {
  otpVerifyService,
  handleOTP,
  resendOtpService,
} from "../../../services/user";
const VendorOtpRegister = () => {
  useEffect(() => {
    let loginToken = localStorage.getItem("token");
    if (loginToken) {
      navigate("/vendor-dashboard");
    }
  }, []);

  const [checked, setChecked] = React.useState(false);
  const [otp, setOtp] = useState("");
  const [isValidOTP, setIsValidOTP] = useState(false);

  const navigate = useNavigate();

  const location = useLocation();

  console.log("phoneNumberObj", location.state);

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
      const otpVerifyResp = await otpVerifyService(
        location.state.phoneNumber,
        otp
      );

      const userResp = JSON.parse(otpVerifyResp.data);
      console.log("userResp", userResp);
      console.log("otpVerifyResp from Service File", userResp);

      if (!userResp.isDocumentUploaded) {
        navigate("/add-documents", {
          state: {
            userId: userResp.userId,
          },
        });
      } else {
        console.log("token", userResp.token);
        localStorage.setItem("token", userResp.token);
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
    <>
      <OtpSmall />
      <div className="flex flex-col signup-container lg:pl-[50px] lg:pr-[50px]">
        <div className="p-5 width">
          <h2 className="head text-[38px] md:text-[48px] mt-10 mb-2 font-[600] text-white hidden">
            Welcome To <span className="text-[#5AB344]">JunkBazar</span>
          </h2>
          <p className="head hidden text-[20px] md:text-[24px] text-white font-[400]">
            Sign up to enjoy exclusive access!
          </p>
          <img
            src={customer}
            alt=""
            className="signup-img w-[251px] h-[251px] mx-auto xs:w-[320px] xs:h-[450px] max-w-[886px] lg:h-[500px]"
          />
        </div>
        <div className="form-data-content width pl-12 pr-12 p-6 mr-5 w-full max-w-[772px] bg-white">
          <h2 className="text-[#333333] font-semibold text-[24px] mt-6 mb-2 xs:text-[28px]">
            OTP Verification
          </h2>
          <p className="text-[#707070] text-[16px] font-medium mt-0 xs:text-[19px]">
            Create a new account in three simple steps
          </p>
          <div className="w-full flex justify-between mt-8 mb-5"></div>
          <form className="mt-11">
            <p className="text-[#666666] text-[16px]">OTP Verification</p>
            <LabeledInput
              className="col-span-2"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength="6"
              handleChange={handleOTPChange}
            />
            {isValidOTP || (
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
            <div className="mt-20 text-start text-xl  leading-[25.3px] text-[#707070] "></div>

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
    </>
  );
};

export default VendorOtpRegister;
