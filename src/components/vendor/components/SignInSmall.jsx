import React, { useState } from "react";
import vendor from "../../../assets/PNG/tractor 2.png";
import SignupInput from "./SignupInput";
import Button from "../../auth/Button";
import Swal from "sweetalert2";
import axiosInstance from "../../../api-config/axiosInstance";
import { useNavigate } from "react-router-dom";

const SignInSmall = () => {

  const navigate = useNavigate();

  const [checked, setChecked] = React.useState(true);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(false);

  const handlePhoneNumberChange = (e) => {
    const value = e.target.value;
    const phoneRegex = /^\d{10}$/;
    const isValid = phoneRegex.test(value);

    console.log("isValid", isValid);
    setPhoneNumber(value);
    setIsValidPhoneNumber(isValid);
  };
  const signInService = async () => {
    const payload = {
      dialCode: "+91",
      phoneNumber: phoneNumber
    };

    try {
      const resp = await axiosInstance.post("/login", payload);
      const dataObject = resp.data;

      if (dataObject.statusCode === 200) {
        Swal.fire({
          icon: "success",
          position: "center",
          showConfirmButton: true,
          timer: 2500,
          title: dataObject.message
        });
        navigate("/vendor-otp", {
          state: {
            phoneNumber
          }
        });
      }
    }
    catch (error) {
      console.error("error", error);

      if (error.response) {
        Swal.fire({
          icon: "error",
          position: "center",
          showConfirmButton: false,
          timer: 2500,
          title: error.response.data.error._message
        });
      }
      else if (error.request) {
        // Client made a request but response is not received 
        console.log("<<<<<<<Response Not Received>>>>>>>>");
        console.log(error.request);
      }
      else {
        // Other case 
        console.log("Error", error.message);
      }
      // Error handling here 
    }
  };


  return (
    <div className="small-devices p-5">
      <div className="shadow-lg">
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
            Sign into your Account
          </p>
        </div>
        <form className="p-5">
          <SignupInput
            input={{ label: "Phone Number", name: "phoneNumber", type: "number" }}
            type='number'
            inputMode='numeric'
            pattern="[0-9]*"
            maxlength="10"
            handleChange={handlePhoneNumberChange}
          />

          <Button handleClick={signInService}
            label="Sign In"
            classname="w-full bg-[#5AB344] h-[48px] p-3 font-semibold text-white mt-7 rounded-[27px]"
          />
          <p className="text-[14px] text-[#4A4A4A] mt-2 text-center font-[400]">
            Don't have an account?{" "}
            <span onClick={() => navigate("/")}
              className="text-[#81D742] hover:font-semibold hover:underline cursor-pointer">
              Sign Up
            </span>
          </p>
        </form>
      </div>

    </div>
  );
};

export default SignInSmall;
