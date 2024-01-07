import React from "react";
import customer from "../../assets/PNG/tractor 2.png";
import Button from "../auth/Button";
import LabeledInput from "../auth/LabeledInput";
import { useNavigate } from "react-router-dom";
import SignInSmall from "./components/SignInSmall";

const VendorSignin = () => {
  const [state, setState] = React.useState({ username: "", password: "" });
  const navigate = useNavigate();
  const handleChange = (event) =>
    setState({ ...state, [event.target.name]: event.target.value });

  return (
    <>
      <SignInSmall />
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
            Sign In
          </h2>
          <form className="mt-11">
            <LabeledInput
              label="Username"
              type="text"
              name="username"
              value={state.username}
              handleChange={handleChange}
            />
            <LabeledInput
              label="Password"
              type="password"
              name="password"
              value={state.password}
              handleChange={handleChange}
            />
            <Button
              classname="font-semibold text-[19px] p-[2] text-center bg-[#5AB344] w-full text-white rounded-[27px] outline-none border-none h-[55px] hover:opacity-80 mt-[180px]"
            />
            <p className="text-[#333333] text-[16px] font-[400] text-center mt-5 -mb-3">
              Already have an account?{" "}
              <span
                className="font-semibold cursor-pointer underline hover:text-[#5AB344]"
                onClick={() => navigate("/add-documents")}
              >
                Sign Up
              </span>{" "}
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default VendorSignin;
