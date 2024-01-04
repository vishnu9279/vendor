import React, { useState } from "react";
import Button from "../../auth/Button";
import customer from "../../../assets/PNG/tractor 2.png";
import Input from "../../auth/Input";
import { useLocation, useNavigate } from "react-router-dom";
import LabeledInput from "../../auth/LabeledInput";
import showSuccessMessage from "../../../utils/SwalPopup";
import axiosInstance from "../../../api-config/axiosInstance";
import OtpSmall from "../components/OtpSmall";

const VendorOtpRegister = () => {
  const [checked, setChecked] = React.useState(false);
  const [otp, setOtp] = useState("");
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(false);
  const navigate = useNavigate();

  const location = useLocation();

  console.log("phoneNumberObj", location.state.mobile);
  const handlePhoneNumberChange = (e) => {
    const value = e.target.value;
    const phoneRegex = /^\d{6}$/;
    const isValid = phoneRegex.test(value);

    setOtp(value);
    setIsValidPhoneNumber(isValid);
  };
  const otpVerifyService = async () => {
    if (!checked) showSuccessMessage("Select Term And Condition", "error");

    const payload = {
      otp: otp,
      phoneNumber: location.state.mobile,
    };

    try {
      const resp = await axiosInstance.post("/otpVerify", payload);
      const dataObject = resp.data;
      const tokenParse = JSON.parse(dataObject.data);
      console.log("response from api", resp);

      const userResp = JSON.parse(resp.data.data);
      console.log("userResp", userResp);

      if (userResp.isDocumentUploaded) {
        console.log("token", tokenParse.token);
        localStorage.setItem("token", tokenParse.token);
        showSuccessMessage(dataObject.message, "success");
        // console.log("token store ", localStorage.getItem("token"));

        navigate("/vendor-dashboard", {});
      }
      navigate("/vendor-signup", {
        state: {
          userId: userResp.userId,
        },
      });
      // if (dataObject.statusCode === 200) {
      //   if (data.isDocumentUploaded === false) {
      //     navigate("/vendor-signup", {
      //       state: {
      //         id: data.userId,
      //       },
      //     });
      //   } else {
      //     Swal.fire({
      //       icon: "success",
      //       position: "center",
      //       showConfirmButton: false,
      //       timer: 2500,
      //       title: dataObject.message,
      //     });
      //     console.log("token store ", localStorage.getItem("token"));

      //     navigate("/vendor-dashboard", {});
      //   }
      // }
    } catch (error) {
      console.error("Error", error);
      showSuccessMessage(error.response.data.error._message, "error");
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
              handleChange={handlePhoneNumberChange}
            />
            {isValidPhoneNumber || (
              <p className="text-red-500 text-sm">
                Please enter a valid 6-digit OTP.
              </p>
            )}
            {/* <StepThree /> */}
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
              handleClick={otpVerifyService}
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
