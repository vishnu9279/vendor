import React from "react";
import SignupInput from "./SignupInput";
import Upload from "./Upload";
import Button from "../../auth/Button";
import { useNavigate } from "react-router-dom";

const SmallDevices = () => {
  const [state, setState] = React.useState({
    fullName: "",
    phoneNumber: "",
    pincode: "",
    landMark: "",
    address: "",
    city: "",
  });
  const navigate = useNavigate();
  const inputs = [
    {
      label: "Full Name",
      type: "text",
      name: "fullName",
      value: state.fullName,
    },
    {
      label: "Phone Number",
      type: "number",
      name: "phoneNumber",
      value: state.phoneNumber,
    },
    { label: "Pincode", type: "number", name: "pincode", value: state.pincode },
    { label: "Address", type: "text", name: "address", value: state.address },
    { label: "City", type: "text", name: "city", value: state.city },
    {
      label: "Landmark",
      type: "text",
      name: "landMark",
      value: state.landMark,
    },
  ];

  const handleChange = (event) =>
    setState({ ...state, [event.target.name]: event.target.value });

  return (
    <div className="small-devices">
      <h2 className="text-center font-semibold text-[16.55px] text-[#5AB344] border-b-2 border-b-[#5AB344] p-5 mt-5">
        Sign Up as Vendor
      </h2>
      <form className="p-5 mt-2">
        {inputs.map((input) => (
          <SignupInput
            key={input.label}
            input={input}
            handleChange={handleChange}
          />
        ))}
        <Upload label="Upload Adhar Card" />
        <Upload label="upload Pan Card " />
        <Upload label="Upload Photo" />
        <Button
          label="Continue"
          classname="w-full bg-[#5AB344] h-[48px] p-3 font-semibold text-white mt-5 rounded-[27px]"
          handleClick={() => navigate("/vendor-enter-otp")}
        />
      </form>
    </div>
  );
};

export default SmallDevices;
