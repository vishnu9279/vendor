import React from "react";
import Input from "../components/auth/Input";
import Button from "../components/auth/Button";
import { HiEyeOff } from "react-icons/hi";
import { FaRegEye } from "react-icons/fa";
import client from "../api/client";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [error, setError] = React.useState("");
  const [view, setView] = React.useState({ password: false, confirm: false });
  const [state, setState] = React.useState({ password: "", confirm: "" });
  const navigate = useNavigate();

  React.useEffect(() => {
    if (state.password !== state.confirm) {
      setError("Password don't match");
    } else {
      setError("");
    }
  }, [state.confirm]);

  const handleChange = (event) =>
    setState({ ...state, [event.target.name]: event.target.value });

  const handlePasswordInputIcon = () =>
    setView((prevState) => ({ ...prevState, password: !prevState.password }));

  const handleConfirmInputIcon = () =>
    setView((prevState) => ({ ...prevState, confirm: !prevState.confirm }));

  const handlePasswordReset = async (event) => {
    event.preventDefault();
    try {
      if (error === "") {
        const response = await client.patch(
          "/user/reset-password",
          {
            password: state.password,
          },
          { headers: { "Access-Control-Allow-Origin": "*" } }
        );
        if (response) {
          navigate("/pagethree");
        }
        console.log(response, ">>>>>");
      }
    } catch (error) {
      alert(error?.response?.data?.message);
      console.log(error);
    }
  };
  return (
    <div className="forgotpassword-container">
      <div className="div-one">
        <h2>
          Create a New <br />
          Password
        </h2>
        <p style={{ marginTop: 20 }}>
          Set your new password so <br />
          you can login to JunkBazer
        </p>
      </div>
      <div className="form-content">
        <form className="mt-6" onSubmit={handlePasswordReset}>
          <label>New Password</label>
          <span className="span-content">
            <Input
              classname="confirm input-content "
              placeHolder="New Password"
              name="password"
              value={state.password}
              handleChange={handleChange}
              type={view.password ? "text" : "password"}
            />
            {view.password ? (
              <FaRegEye
                size={20}
                className="icon"
                onClick={handlePasswordInputIcon}
              />
            ) : (
              <HiEyeOff
                size={20}
                className="icon"
                onClick={handlePasswordInputIcon}
              />
            )}
          </span>
          <label className="password-label">Confirm Password</label>
          <span className="span-content">
            <Input
              classname="confirm input-content"
              placeHolder="Confirm Password"
              name="confirm"
              value={state.confirm}
              handleChange={handleChange}
              type={view.confirm ? "text" : "password"}
            />
            {view.confirm ? (
              <FaRegEye
                size={20}
                className="icon"
                onClick={handleConfirmInputIcon}
              />
            ) : (
              <HiEyeOff
                size={20}
                className="icon"
                onClick={handleConfirmInputIcon}
              />
            )}
          </span>
          <p>{error}</p>
          <Button
            classname="input-content btn-confirm btn"
            label="Reset password"
            handleClick={handlePasswordReset}
            disabled={!state.password && !state.confirm}
          />
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
