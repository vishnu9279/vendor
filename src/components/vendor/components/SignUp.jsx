import React, { useState, useEffect } from "react";
import Button from "../../auth/Button";
import { useNavigate } from "react-router-dom";
import "react-phone-number-input/style.css";
import scrapBus from "../../../assets/PNG/scrapbus.png";
import {
  getCountries,
  signUpUser,
  handlePhoneNumberValidation,
} from "../../../services/user";
import Input from "../../auth/Input";

import showSuccessMessage from "../../../utils/SwalPopup";
const SignUpSmall = () => {
  const [countriesAndStates, setcountriesAndStates] = useState([]);
  const [isValidCountryCode, setIsValidCountryCode] = useState(false);
  const [countryCode, setCountryCode] = useState("");
  const [checked, setChecked] = React.useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let loginToken = localStorage.getItem("token");
    if (loginToken) {
      navigate("/vendor-dashboard");
    }

    const countries = async () => {
      const country = await getCountries();
      console.log("county", country);
      setcountriesAndStates(country);
    };
    countries();
  }, []);
  const handlePhoneNumberChange = (e) => {
    console.log("handlePhoneNumberChange", e);
    const value = e.target.value;

    const isPhoneNumberValid = handlePhoneNumberValidation(value);

    console.log("isValid", isPhoneNumberValid);
    setPhoneNumber(value);
    setIsValidPhoneNumber(isPhoneNumberValid);
  };
  const handleCountryChange = (event) => {
    const selectedCountry = event.target.value;

    console.log("selectedCountry", selectedCountry);
    if (selectedCountry) {
      setIsValidCountryCode(true);
      const countryObj = countriesAndStates.find(
        (el) => el.iso2 === selectedCountry
      );
      console.log("countryObj", countryObj);
      setCountryCode(countryObj.phone_code);
    } else {
      setIsValidCountryCode(false);
    }
  };

  const signUpService = async () => {
    try {
      console.log("checked", checked);
      if (!checked) {
        showSuccessMessage("Select Term And Condition", "error");
        return;
      }
      const userResp = await signUpUser(countryCode, phoneNumber);
      console.log("user login from Service File", userResp);

      showSuccessMessage(userResp.message, "success");
      navigate("/vendor-otp", {
        state: {
          phoneNumber,
          countryCode
        },
      });
    } catch (error) {
      console.error("error", error);
      const errorMessage = !error.response.data.error.message
        ? error.response.data.error?._message
        : error.response.data.error.message;

      showSuccessMessage(errorMessage, "error");
    }
  };

  return (
    <div className="small-devices bg-[#5AB344]">
      <div className="pl-10 pr-10">
        <img src={scrapBus} className="w-full h-[255px] xs:h-[400px]" alt="" />
      </div>
      <div className="bg-white -mt-12 p-10 rounded-t-lg">
        <div className="mt-5">
          <h2 className="text-[#303030]  text-[32px] mt-2 mb-0">Sign up now</h2>
          <p className="text-[#707070]  text-[14px]">
            Create a new account in four simple steps
          </p>
        </div>
        <form className="mt-5">
          <p className="text-[#666666] text-[16px]">Phone Number</p>

          <div className="border border-l-zinc-600 rounded p-2 w-full">
            <div className="w-full flex">
              {/* Country Selection */}
              <div className="w-full  col-span-1 mr-4">
                <div className="flex items-center p-2 border rounded-md bg-[#80d7421c]">
                  <div className="w-full">
                    <select
                      className="w-full bg-[#80d7421c] p-1"
                      onChange={handleCountryChange}
                    >
                      <option className="w-full" value="">
                        Select Country
                      </option>
                      {countriesAndStates.map((country) => (
                        <option key={country.iso2} value={country.iso2}>
                          {`${country.emoji} ${country.name}`}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              {/* Phone Input Field */}
              <div className="w-full col-span-1">
                <div className="flex items-center p-2 border rounded-md bg-[#80d7421c]">
                  <input
                    type="tel"
                    className="w-full bg-[#80d7421c] p-1"
                    maxLength={15}
                    placeholder="Phone Number"
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Validation Message */}
          {isValidPhoneNumber || (
            <p className="text-red-500 text-sm">
              Please enter a valid 10-digit Phone Number.
            </p>
          )}
          {isValidCountryCode || (
            <p className="text-red-500 text-sm">Please Select Country.</p>
          )}
          <div className="mt-40 text-start text-xl leading-[25.3px] text-[#707070]"></div>

          <div className="">
            <p className="text-[14px] text-[#666666] font-semibold mt-20 mb-5 max-w-2xl">
              <Input
                type="checkbox"
                classname="w-[18px] h-[18px] bg-[#5AB344] mr-2 translate-y-1 cursor-pointer"
                value={checked}
                checked={checked}
                handleChange={() => setChecked((prevState) => !prevState)}
              />{" "}
              By creating an account, I agree to our
              <span className="underline cursor-pointer"
              onClick={() => {
                navigate("/terms-condition", {
                  state: {
                    from_page: "VendorRegister",
                  },
                });
              }}
              >
                Terms of use
              </span> and{" "}
              <span className="underline cursor-pointer"
              onClick={() => {
                navigate("/terms-condition", {
                  state: {
                    from_page: "VendorRegister",
                  },
                });
              }}
              >Privacy Policy </span>
            </p>
            <Button
              label="Continue"
              classname="font-semibold text-[19px] p-[2] text-center bg-[#5AB344] w-full text-white rounded-[27px] outline-none border-none h-[55px] hover:opacity-80"
              handleClick={signUpService}
            />
            <p className="text-[#333333] text-[16px] font-[400] text-center mt-5 -mb-3">
              Already have an account?{" "}
              <span
                className="font-semibold cursor-pointer none hover:text-[#5AB344]"
                onClick={() => navigate("/vendor-signIn")}
              >
                Sign In
              </span>{" "}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpSmall;
