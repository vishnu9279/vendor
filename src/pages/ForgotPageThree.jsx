import React from "react";
import Button from "../components/auth/Button";
import { useNavigate } from "react-router-dom";

const ForgotPageThree = () => {
  const navigate = useNavigate();
  return (
    <div className="p-4 flex flex-col justify-center items-center my-auto">
      <h1 className="-mb-4 text-center font-semibold text-2xl mt-14">
        Password Successfully
        <br /> changed
      </h1>
      <Button
        label="Continue"
        classname="w-[300px] input-content btn"
        handleClick={() => navigate("/login_signup")}
      />
    </div>
  );
};

export default ForgotPageThree;
