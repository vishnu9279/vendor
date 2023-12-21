import React from "react";
import Input from "../auth/Input";
import Button from "../auth/Button";

const ForgotPasswordComponent = ({
  label,
  inputLabel,
  handleChange,
  input: { value, type, name, placeHolder },
  handleClick,
  disabled,
  errorMessage,
  loading,
}) => {
  return (
    <div className="page-1 forgotpassword-container">
      <div className="div-one">
        <h2>
          Create a New <br />
          Password
        </h2>
        <p style={{ marginTop: 15 }}>{label}</p>
      </div>
      <div className="form-content">
        <form className="mt-6">
          <label>{inputLabel}</label>
          <span className="span-content">
            <Input
              classname="confirm input-content placeholder:font-[Gilroy-Regular] "
              placeHolder={placeHolder}
              name={name}
              value={value}
              handleChange={handleChange}
              type={type}
            />
          </span>
          <span className="text-right -mb-3 mr-3 text-sm font-semibold text-red-500">
            {errorMessage}
          </span>
          <Button
            style={{ fontFamily: "Gilroy-Regular" }}
            classname="input-content btn-confirm btn"
            label={loading ? "Loading...." : "Continue"}
            handleClick={handleClick}
            disabled={disabled}
          />
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordComponent;
