import React, { useState } from "react";
import Button from "../../auth/Button";
import customer from "../../../assets/PNG/tractor 2.png";
import Input from "../../auth/Input";
import { useNavigate } from "react-router-dom";
import LabeledInput from "../../auth/LabeledInput";
import Swal from "sweetalert2";
import axiosInstance from "../../../api-config/axiosInstance";
import SignInSmall from "../components/SignInSmall";
import PhoneInput from "react-phone-number-input";
import 'react-phone-number-input/style.css'
const VendorSignIn = () => {

    const navigate = useNavigate();

    const [checked,
        setChecked] = React.useState(false);
    const [phoneNumber,
        setPhoneNumber] = useState("");
    const [isValidPhoneNumber,
        setIsValidPhoneNumber] = useState(false);

    const handlePhoneNumberChange = (e) => {
        const value = e.target.value;
        const phoneRegex = /^\d{10}$/;
        const isValid = phoneRegex.test(value);

        console.log("isValid", isValid);
        setPhoneNumber(value);
        setIsValidPhoneNumber(isValid);
    };


    const signInService = async () => {
        if (checked) {
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
        } else {
            Swal.fire({
                icon: "error",
                position: "center",
                showConfirmButton: false,
                timer: 2500,
                title: "Select Term And Condition",
            });
        }
    };


    return (
        <>
            <SignInSmall />
            <div className="flex flex-col signup-container lg:pl-[50px] lg:pr-[50px]">
                <div className="p-5 width">
                    <h2 className="head text-[38px] md:text-[48px] mt-10 mb-2 font-[600] text-white hidden">
                        Welcome To <span className="text-[#5AB344]">JunkBazar</span>
                    </h2>
                    <p className="head hidden text-[20px] md:text-[24px] text-white font-[400]">
                        Sign In to enjoy exclusive access!
                    </p>
                    <img
                        src={customer}
                        alt=""
                        className="signup-img w-[251px] h-[251px] mx-auto xs:w-[320px] xs:h-[450px] max-w-[886px] lg:h-[500px]"
                    />
                </div>

                <div className="form-data-content width pl-12 pr-12 p-6 mr-5 w-full max-w-[772px] bg-white">
                    <h2 className="text-[#333333] font-semibold text-[24px] mt-6 mb-2 xs:text-[28px]">
                        Sign In now
                    </h2>
                    <p className="text-[#707070] text-[16px] font-medium mt-0 xs:text-[19px]">
                        Create a new account in three simple steps
                    </p>
                    <div className="w-full flex justify-between mt-8 mb-5">

                    </div>
                    <form className="mt-11">
                        <p className="text-[#666666] text-[16px]">Phone Number</p>

                        <div className="border border-l-zinc-600 rounded p-2 max-w-sm">
                            <PhoneInput
                                maxLength={15}
                                className={"input-phone-number"}
                                international
                                defaultCountry="IN"
                                value={phoneNumber}
                                onChange={setPhoneNumber} />
                        </div>
                        <div className="mt-40 text-start text-xl  leading-[25.3px] text-[#707070] ">

                        </div>

                        <div className="">
                            <p className="text-[14px] text-[#666666] font-semibold mt-20  mb-5 max-w-2xl">
                                <Input
                                    type="checkbox"
                                    classname="w-[18px] h-[18px] bg-[#5AB344] mr-2 translate-y-1 cursor-pointer"
                                    value={checked}
                                    checked={checked}
                                    handleChange={() => setChecked((prevState) => !prevState)}
                                />{" "}
                                By creating an account, I agree to our
                                <span className="underline cursor-pointer">
                                    Terms of use
                                </span> and{" "}
                                <span className="underline cursor-pointer">Privacy Policy </span>
                            </p>
                            <Button
                                label="Continue"
                                classname="font-semibold text-[19px] p-[2] text-center bg-[#5AB344] w-full text-white rounded-[27px] outline-none border-none h-[55px] hover:opacity-80"
                                handleClick={signInService}

                            />
                            <p className="text-[#333333] text-[16px] font-[400] text-center mt-5 -mb-3">
                                Already have an account?{" "}
                                <span
                                    className="font-semibold cursor-pointer underline hover:text-[#5AB344]"
                                    onClick={() => navigate("/")}
                                >
                                    Sign Up
                                </span>{" "}
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default VendorSignIn;
