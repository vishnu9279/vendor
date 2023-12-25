import React, { useState } from "react";
import vendor from "../../../assets/PNG/tractor 2.png";
import SignupInput from "./SignupInput";
import Button from "../../auth/Button";
import Swal from "sweetalert2";
import axiosInstance from "../../../api-config/axiosInstance";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-number-input";
import 'react-phone-number-input/style.css'
import scrapBus from '../../../assets/PNG/scrapbus.png'
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
    console.log("phone number ", phoneNumber.slice(3, 13))
    const mobile = phoneNumber.slice(3, 13)
    const payload = {
      dialCode: "+91",
      phoneNumber: mobile
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
            mobile
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
    <div className="small-devices bg-[#5AB344]">
      <div className="pl-10 pr-10">
        <img src={scrapBus} className="w-full h-[255px] xs:h-[400px]" alt="" />
      </div>
      <div className="bg-white -mt-12 p-10 rounded-t-lg">
        <div className="mt-5">
          <h2 className="text-[#303030]  text-[32px] mt-2 mb-0">
            Sign In now
          </h2>
        </div>
        <form className=" mt-5">
          <div className="border border-l-zinc-600 rounded p-2 max-w-sm">
            <PhoneInput
              international
              defaultCountry="IN"
              value={phoneNumber}
              onChange={setPhoneNumber} />
          </div>
          <div className="mt-20">
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
          </div>

        </form>
      </div>

    </div>


  );
};

export default SignInSmall;
