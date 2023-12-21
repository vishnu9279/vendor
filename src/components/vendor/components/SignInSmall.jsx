import React from "react";
import vendor from "../../../assets/PNG/vendor-removebg-preview 1.png";
import SignupInput from "./SignupInput";
import Button from "../../auth/Button";

const SignInSmall = () => {
  return (
    <div className="small-devices">
      <h2 className="text-center font-semibold text-[16.55px] text-[#5AB344] border-b-2 border-b-[#5AB344] p-5 mt-5">
        Sign In
      </h2>
      <div className="pl-10 pr-10">
        <img src={vendor} className="w-full h-[255px] xs:h-[400px]" alt="" />
      </div>
      <div>
        <h2 className="text-[#303030] text-center text-[32px] mt-2 mb-0">
          Welcome, Vendor!
        </h2>
        <p className="text-[#707070] text-center text-[14px]">
          Sign into your account or create an
          <br /> account in four simple steps
        </p>
      </div>
      <form className="p-5">
        <SignupInput
          input={{ label: "Phone Number", name: "phoneNumber", type: "number" }}
        />
        <SignupInput
          input={{ label: "Password", name: "password", type: "password" }}
        />
        <p className="text-[16px] text-[#E33629] text-right font-semibold">
          Forgot Password?
        </p>
        <Button
          label="Sign In"
          classname="w-full bg-[#5AB344] h-[48px] p-3 font-semibold text-white mt-7 rounded-[27px]"
        />
        <p className="text-[14px] text-[#4A4A4A] mt-2 text-center font-[400]">
          Don't have an account?{" "}
          <span className="text-[#81D742] hover:font-semibold hover:underline cursor-pointer">
            Sign Up
          </span>
        </p>
      </form>
    </div>
  );
};

export default SignInSmall;
