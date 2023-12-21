import React from "react";
import Input from "../../auth/Input";

const SignupInput = ({ input: { label, type, name, value }, handleChange }) => {
  return (
    <>
      <label className="text-[16px] text-[#4A4A4A] mb-1">{label}</label>
      <Input
        type={type}
        name={name}
        value={value}
        placeHolder={label}
        handleChange={handleChange}
        classname="w-full p-3 rounded-[43px] h-[48px] border-0 outline-none bg-[#EBFFDD] mb-3"
      />
    </>
  );
};

export default SignupInput;
