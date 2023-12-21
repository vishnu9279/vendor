import React, { useEffect } from "react";
import Button from "../components/auth/Button";
import customer from "../assets/PNG/customer 1.png";
import Input from "../components/auth/Input";
import LabeledInput from "../components/auth/LabeledInput";

const Signup = () => {
  const [state, setState] = React.useState({
    phoneNumber: "",
    otp: "",
    address: "",
  });
  const [currentPage, setCurrentPage] = React.useState(1);
  const [checked, setChecked] = React.useState(true);
  const [loading, setLoading] = React.useState(false);

  const inputs = [
    {
      name: "phoneNumber",
      type: "number",
      value: state.phoneNumber,
      label: "Phone number",
    },
    { name: "otp", type: "number", value: state.otp, label: "Enter OTP" },
    {
      name: "address",
      type: "text",
      value: state.address,
      label: "Enter Address",
    },
  ];

  const inputsPerPage = 1;
  const lastIndex = currentPage * inputsPerPage;
  const firstIndex = lastIndex - inputsPerPage;
  const myInputs = inputs.slice(firstIndex, lastIndex);
  let pages = [];
  for (let index = 0; index < inputs.length; index++) {
    pages = [...pages, index + 1];
  }
  return (
    <div className="flex flex-col signup-container lg:pl-[50px] lg:pr-[50px]">
      <div className="p-5 width">
        <h2 className="head text-[38px] md:text-[48px] mt-10 mb-2 font-[600] text-[#4A4A4A] hidden">
          Welcome To <span className="text-[#5AB344]">JunkBazar</span>
        </h2>
        <p className="head hidden text-[20px] md:text-[24px] text-[#707070] font-[400]">
          Sign up to enjoy exclusive access!
        </p>
        <img
          src={customer}
          alt=""
          className="signup-img w-[251px] h-[251px] mx-auto xs:w-[320px] xs:h-[320px] max-w-[886px] sm:mx-1 lg:h-[500px]"
        />
      </div>
      <div className="form-data-content width p-6 w-full max-w-[772px]">
        <h2 className="text-[#333333] font-semibold text-[24px] mt-6 mb-2 xs:text-[28px]">
          Sign up now
        </h2>
        <p className="text-[#707070] text-[16px] font-medium mt-0 xs:text-[19px]">
          Create a new account in three simple steps
        </p>
        <div className="w-full flex justify-between mt-8 mb-5">
          {pages.map((page) => (
            <div
              key={page}
              className={`w-[28.23px] h-[28.23px] rounded-full text-white font-semibold text-center pt-[2px] pr-[1px] cursor-pointer ${
                page === currentPage ? "active" : "not-active"
              }`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </div>
          ))}
        </div>
        <form className="mt-11">
          {myInputs.map((input, index) => (
            <LabeledInput
              name={input.name}
              type={input.type}
              value={input.value}
              handleChange={(event) =>
                setState({
                  ...state,
                  [event.target.name]: event.target.value,
                })
              }
              label={input.label}
              key={index}
            />
          ))}
          <p className="text-[14px] text-[#666666] font-semibold mt-24 mb-5">
            <Input
              type="checkbox"
              classname="w-[18px] h-[18px] bg-[#5AB344] mr-2 translate-y-1 cursor-pointer"
              value={checked}
              checked={checked}
              handleChange={() => setChecked((prevState) => !prevState)}
            />
            <span className="underline cursor-pointer">Terms of use</span> and{" "}
            <span className="underline cursor-pointer">Privacy Policy </span>
          </p>
          <Button
            label={loading ? "Please wait ...." : "Continue"}
            classname="font-semibold text-[19px] p-[2] text-center bg-[#5AB344] w-full text-white rounded-[27px] outline-none border-none h-[55px] hover:opacity-80"
            handleClick={() => setCurrentPage(currentPage + 1)}
          />
        </form>
      </div>
    </div>
  );
};

export default Signup;
