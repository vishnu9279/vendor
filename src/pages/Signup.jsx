import React, { useEffect } from "react";
import Label from "../components/auth/Label";
import Upload from "../components/auth/Upload";
import Button from "../components/auth/Button";
import client from "../api/client";
import DesktopSignin from "./DesktopSignin";
import NavLinks from "../components/auth/NavLinks";
import { useNavigate } from "react-router-dom";

const Signup = ({ activateSignin, activateSignup, getUserId }) => {
  const [state, setState] = React.useState({
    fullname: "",
    phonenumber: "",
    password: "",
    pincode: "",
    address: "",
    city: "",
    landMark: "",
  });
  const [loader, setLoader] = React.useState(false);
  const [error, setError] = React.useState("");
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const inputs = [
    {
      type: "text",
      name: "fullname",
      value: state.fullname,
      label: "Full Name",
      placeHolder: "Full Name",
    },
    {
      type: "number",
      name: "phonenumber",
      value: state.phonenumber,
      label: "Phone Number",
      placeHolder: "Phone Number",
    },
    {
      type: "password",
      name: "password",
      value: state.password,
      label: "Password",
      placeHolder: "Password",
    },
    {
      type: "number",
      name: "pincode",
      value: state.pincode,
      label: "Pincode",
      placeHolder: "Pincode",
    },
    {
      type: "text",
      name: "address",
      value: state.address,
      label: "Address",
      placeHolder: "Address",
    },
    {
      type: "text",
      name: "city",
      value: state.city,
      label: "City",
      placeHolder: "City",
    },
    {
      type: "text",
      name: "landMark",
      value: state.landMark,
      label: "Land Mark",
      placeHolder: "Land Mark",
    },
  ];

  const handleChange = (event) =>
    setState({ ...state, [event.target.name]: event.target.value });

  const handleSignup = async () => {
    setLoader(true);
    try {
      const response = await client.post(
        "/user/register/customer",
        {
          fullName: state.fullname,
          phoneNumber: "+" + state.phonenumber,
          pincode: state.pincode,
          address: state.address,
          landmark: state.landMark,
          city: state.city,
          password: state.password,
        },
        {
          headers: {
            "Access-Contro-Allow-Origin": "*",
          },
        }
      );
      // 23456565677
      if (response) {
        setLoader(false);
        getUserId(response?.data?.data);
        navigate("/enter-otp");
      }
      console.log(response?.data, ">>>");
    } catch (error) {
      setError(error?.response?.data?.error);
      setLoader(false);
      console.log(error);
    }
  };

  const canContinue = { ...state };

  return (
    <>
      <div className="login-container">
        <div className="mt-8">
          {" "}
          <NavLinks
            activateSignin={activateSignin}
            activateSignup={activateSignup}
          />
        </div>
        <div className="inputs">
          {inputs.map((input, index) => (
            <Label key={index} input={input} handleChange={handleChange} />
          ))}
          {/* <Upload label="Upload Adhar Card" /> */}
          {/* <Upload label="upload Pan Card" /> */}
          {/* <Upload label="Upload Photo" /> */}
          <p className="text-xs text-red-500 text-center text-semibold -mb-2">
            {error}
          </p>
          <Button
            label={loader ? "Loading plaese wait..." : "Continue"}
            classname="input-content btn"
            handleClick={handleSignup}
            disabled={!canContinue}
          />
          <p
            className="font-semibold text-center underline mt-3 cursor-pointer"
            onClick={() => navigate("/")}
          >
            Go back home
          </p>
        </div>
      </div>
      <span className="desktop">
        <DesktopSignin />
      </span>
    </>
  );
};

export default Signup;
